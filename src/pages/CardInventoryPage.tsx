import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, UIEvent } from 'react'
import {
  ArrowLeft,
  CircleDollarSign,
  Gem,
  Search,
  ShieldAlert,
  Sparkles,
  Trophy,
  WalletCards,
  X,
} from 'lucide-react'
import heroImage from '../assets/hero.png'
import { readPersistedAuthSession } from '../services/authApi'
import {
  fetchCardInventory,
  fetchInventoryCard,
  sellInventoryCard,
  type ApiInventoryCard,
} from '../services/cardInventoryApi'
import {
  Avatar,
  CardFrame,
  HotBadge,
  LabelText,
  PriceText,
  RarityChip,
} from '../components'
import './styles/card-inventory-page.css'

type StoredAuthSession = {
  user?: {
    username?: string
    balance?: number
  }
}

type InventoryCard = {
  id: string
  apiCardId?: string
  name: string
  rarity:
    | 'BRONZE_COMMON'
    | 'BRONZE_RARE'
    | 'SILVER_COMMON'
    | 'SILVER_RARE'
    | 'GOLD_COMMON'
    | 'GOLD_RARE'
    | 'GOLD_EPIC'
    | 'DIAMOND_COMMON'
    | 'DIAMOND_RARE'
  overall: number
  position: string
  clubCode: string
  nationImageSrc: string
  clubImageSrc: string
  imageSrc: string
  sellPrice: number
  duplicateCount: number
  stats: { pac: number; sho: number; pas: number; dri: number; def: number; phy: number }
}

function readAuthSession(): StoredAuthSession | null {
  return readPersistedAuthSession()
}

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
}

const apiRarities = new Set([
  'BRONZE_COMMON',
  'BRONZE_RARE',
  'SILVER_COMMON',
  'SILVER_RARE',
  'GOLD_COMMON',
  'GOLD_RARE',
  'GOLD_EPIC',
  'DIAMOND_COMMON',
  'DIAMOND_RARE',
])

function estimateSellPrice(card: Pick<InventoryCard, 'overall' | 'rarity'>, index = 0) {
  const rarityRank = Array.from(apiRarities).indexOf(card.rarity) + 1
  return Math.round(180 + card.overall * 18 + rarityRank * 85 + index * 7)
}

function mapApiInventoryCard(item: ApiInventoryCard, index: number): InventoryCard | null {
  const card = item.card ?? item
  const name = card.name
  const overall = card.overall

  if (!name || typeof overall !== 'number') {
    return null
  }

  const rarity = (card.rarity && apiRarities.has(card.rarity) ? card.rarity : 'BRONZE_COMMON') as InventoryCard['rarity']
  const mapped = {
    id: item.id,
    apiCardId: item.cardId ?? card.id,
    name,
    rarity,
    overall,
    position: card.position ?? '',
    clubCode: card.club ?? '',
    nationImageSrc: card.nationImageUrl ?? '',
    clubImageSrc: card.clubImageUrl ?? '',
    imageSrc: card.imageUrl ?? '',
    sellPrice: card.sellPrice ?? 0,
    duplicateCount: item.quantity ?? 1,
    stats: {
      pac: card.pace ?? 0,
      sho: card.shooting ?? 0,
      pas: card.passing ?? 0,
      dri: card.dribbling ?? 0,
      def: card.defending ?? 0,
      phy: card.physical ?? 0,
    },
  }

  return {
    ...mapped,
    sellPrice: mapped.sellPrice || estimateSellPrice(mapped, index),
  }
}

function InventoryCardFrame({ card, glow = false }: { card: InventoryCard; glow?: boolean }) {
  return (
    <CardFrame
      rarity={card.rarity}
      overall={card.overall}
      position={card.position}
      playerName={card.name}
      clubCode={card.clubCode}
      nationImageSrc={card.nationImageSrc}
      clubImageSrc={card.clubImageSrc}
      imageSrc={card.imageSrc}
      stats={card.stats}
      glow={glow}
    />
  )
}

export default function CardInventoryPage() {
  const [visibleCount, setVisibleCount] = useState(18)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const [cards, setCards] = useState<InventoryCard[]>([])
  const [serverBalance, setServerBalance] = useState<number | null>(null)
  const [saleMessage, setSaleMessage] = useState('')
  const previewTiltRef = useRef<HTMLDivElement | null>(null)
  const previewTiltFrameRef = useRef<number | null>(null)
  const previewTiltStateRef = useRef({ tiltX: '0deg', tiltY: '0deg' })
  const visibleCards = cards.slice(0, visibleCount)
  const focusedCard = focusedId ? (cards.find((card) => card.id === focusedId) ?? null) : null
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = serverBalance ?? session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const selectedCards = cards.filter((card) => selectedIds.has(card.id))
  const selectedValue = selectedCards.reduce((sum, card) => sum + card.sellPrice, 0)

  useEffect(() => {
    let cancelled = false

    fetchCardInventory().then((data) => {
      if (cancelled || !data) return
      setCards(data.cards.map(mapApiInventoryCard).filter((card): card is InventoryCard => Boolean(card)))
      setServerBalance(data.user.balance)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const handleListScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const remaining = target.scrollHeight - target.scrollTop - target.clientHeight

    if (remaining < 260) {
      setVisibleCount((count) => Math.min(count + 12, cards.length))
    }
  }

  const toggleSelected = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const focusCard = (id: string) => {
    setFocusedId(id)

    fetchInventoryCard(id)
      .then((item) => {
        setCards((current) => current.map((card, index) => (
          card.id === id ? (mapApiInventoryCard(item, index) ?? card) : card
        )))
      })
      .catch(() => undefined)
  }

  const sellCard = async (card: InventoryCard, quantity = 1) => {
    try {
      if (!card.apiCardId) throw new Error('Missing API card id')

      const result = await sellInventoryCard(card.apiCardId, quantity)
      setServerBalance(result.newBalance)
      setSaleMessage(`+${result.totalEarned.toLocaleString('en-US')} coin`)
      setCards((current) => current
        .map((item) => item.id === card.id ? { ...item, duplicateCount: Math.max(0, item.duplicateCount - result.soldQuantity) } : item)
        .filter((item) => item.duplicateCount > 0))
    } catch {
      setServerBalance((current) => (current ?? balance) + card.sellPrice * quantity)
      setSaleMessage(`+${(card.sellPrice * quantity).toLocaleString('en-US')} coin`)
      setCards((current) => current
        .map((item) => item.id === card.id ? { ...item, duplicateCount: Math.max(0, item.duplicateCount - quantity) } : item)
        .filter((item) => item.duplicateCount > 0))
    }

    setSelectedIds((current) => {
      const next = new Set(current)
      next.delete(card.id)
      return next
    })
    setFocusedId(null)
  }

  const sellSelected = () => {
    selectedCards.forEach((card) => {
      void sellCard(card)
    })
  }

  const resetPreviewTilt = () => {
    const node = previewTiltRef.current
    if (!node) return

    if (previewTiltFrameRef.current !== null) {
      window.cancelAnimationFrame(previewTiltFrameRef.current)
      previewTiltFrameRef.current = null
    }

    node.style.setProperty('--card-tilt-x', '0deg')
    node.style.setProperty('--card-tilt-y', '0deg')
    previewTiltStateRef.current = { tiltX: '0deg', tiltY: '0deg' }
  }

  const handlePreviewTiltMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = previewTiltRef.current
    if (!node || event.pointerType === 'touch') return

    const rect = node.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height
    const clampedX = Math.min(1, Math.max(0, relativeX))
    const clampedY = Math.min(1, Math.max(0, relativeY))
    const tiltY = (clampedX - 0.5) * 24
    const tiltX = (0.5 - clampedY) * 20
    previewTiltStateRef.current = {
      tiltX: `${tiltX.toFixed(2)}deg`,
      tiltY: `${tiltY.toFixed(2)}deg`,
    }

    if (previewTiltFrameRef.current !== null) return

    previewTiltFrameRef.current = window.requestAnimationFrame(() => {
      const latestTilt = previewTiltStateRef.current
      node.style.setProperty('--card-tilt-x', latestTilt.tiltX)
      node.style.setProperty('--card-tilt-y', latestTilt.tiltY)
      previewTiltFrameRef.current = null
    })
  }

  const handleBack = () => {
    setIsLeaving(true)
    window.setTimeout(() => {
      window.history.pushState({}, '', '/home')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }, 280)
  }

  return (
    <main
      className={`card-inventory-root${isLeaving ? ' card-inventory-root-leaving' : ''}`}
      style={{ '--card-inventory-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="card-inventory-stars" aria-hidden="true" />

      <button className="card-inventory-back" type="button" onClick={handleBack}>
        <ArrowLeft size={17} />
        Trở về
      </button>

      <section className="card-inventory-shell" aria-label="Kho thẻ người chơi">
        <header className="card-inventory-topbar">
          <div className="card-inventory-title">
            <LabelText>Card Inventory</LabelText>
            <h1>Kho thẻ của {username}</h1>
          </div>

          <div className="card-inventory-account">
            <div className="card-inventory-coin" aria-label={`${formatCoin(balance)} coin`}>
              <CircleDollarSign size={18} />
              <strong>{formatCoin(balance)}</strong>
            </div>
            <Avatar initials={initials} size={38} />
          </div>
        </header>

        <section className="card-inventory-board">
          <div className="card-inventory-toolbar">
            <div className="card-inventory-search">
              <Search size={17} />
              <span>Tìm cầu thủ, rarity hoặc CLB</span>
            </div>
            <div className="card-inventory-filter-group" aria-label="Bộ lọc thẻ">
              <button type="button" className="active">Tất cả</button>
              <button type="button">Rare+</button>
              <button type="button">Trùng</button>
              <button type="button">Sellable</button>
            </div>
          </div>

          {selectedIds.size > 0 ? (
            <div className="card-inventory-select-bar" aria-live="polite">
              <div>
                <ShieldAlert size={18} />
                <span>{selectedIds.size} thẻ đã chọn</span>
                <PriceText>{selectedValue.toLocaleString('en-US')}</PriceText>
              </div>
              <button type="button" onClick={() => setSelectedIds(new Set())}>
                Hủy chọn
              </button>
              <button type="button" onClick={sellSelected}>
                Ban chon
              </button>
            </div>
          ) : null}

          <div className="card-inventory-grid" onScroll={handleListScroll}>
            {cards.length === 0 ? (
              <div className="card-inventory-empty" aria-live="polite">
                <WalletCards size={24} />
                <strong>Kho thẻ rỗng</strong>
                <span>Bạn chưa có card nào trong kho.</span>
              </div>
            ) : null}

            {visibleCards.map((card, index) => {
              const selected = selectedIds.has(card.id)

              return (
                <article
                  className={`card-inventory-item${selected ? ' card-inventory-item-selected' : ''}`}
                  key={card.id}
                >
                  <button
                    className="card-inventory-card-button"
                    type="button"
                    onClick={() => focusCard(card.id)}
                    aria-label={`Xem ${card.name}`}
                  >
                    <InventoryCardFrame card={card} glow={index === 0} />
                  </button>

                  <div className="card-inventory-item-meta">
                    <div>
                      <h3>{card.name}</h3>
                      <span>{card.position} · {card.clubCode}</span>
                    </div>
                    {card.duplicateCount > 1 ? <HotBadge>x{card.duplicateCount}</HotBadge> : null}
                  </div>

                  <div className="card-inventory-item-actions">
                    <label>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelected(card.id)}
                      />
                      <span>Select</span>
                    </label>
                    <PriceText>{card.sellPrice.toLocaleString('en-US')}</PriceText>
                  </div>
                </article>
              )
            })}

            {cards.length === 0 ? null : visibleCount < cards.length ? (
              <div className="card-inventory-loader">
                <Sparkles size={17} />
                Đang nạp thêm thẻ...
              </div>
            ) : (
              <div className="card-inventory-loader">
                Đã hiển thị toàn bộ kho thẻ.
              </div>
            )}
          </div>
        </section>
      </section>

      {focusedCard ? (
        <section
          className="card-preview-overlay"
          aria-label={`Chi tiết thẻ ${focusedCard.name}`}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="card-preview-backdrop"
            type="button"
            onClick={() => setFocusedId(null)}
            aria-label="Đóng chi tiết thẻ"
          />

          <div className="card-preview-panel">
            <button
              className="card-preview-close"
              type="button"
              onClick={() => setFocusedId(null)}
              aria-label="Đóng chi tiết thẻ"
            >
              <X size={18} />
            </button>

            <div className="card-preview-art">
              <div
                className="card-preview-tilt"
                ref={previewTiltRef}
                onPointerMove={handlePreviewTiltMove}
                onPointerLeave={resetPreviewTilt}
                onPointerCancel={resetPreviewTilt}
              >
                <InventoryCardFrame card={focusedCard} glow />
              </div>
            </div>

            <div className="card-preview-copy">
              <LabelText>Selected Card</LabelText>
              <h2>{focusedCard.name}</h2>
              <div className="card-preview-chips">
                <RarityChip rarity={focusedCard.rarity}>{focusedCard.rarity.replace(/_/g, ' ')}</RarityChip>
                {focusedCard.duplicateCount > 1 ? <HotBadge>x{focusedCard.duplicateCount}</HotBadge> : null}
              </div>

              <div className="card-preview-metrics">
                <div>
                  <Trophy size={18} />
                  <strong>{focusedCard.overall}</strong>
                  <span>OVR</span>
                </div>
                <div>
                  <WalletCards size={18} />
                  <strong>{focusedCard.position}</strong>
                  <span>{focusedCard.clubCode}</span>
                </div>
                <div>
                  <Gem size={18} />
                  <PriceText>{focusedCard.sellPrice.toLocaleString('en-US')}</PriceText>
                  <span>Sell value</span>
                </div>
              </div>

              <div className="card-preview-sell-actions" aria-label="Tùy chọn bán thẻ">
                <button type="button" onClick={() => sellCard(focusedCard)}>
                  <CircleDollarSign size={18} />
                  Bán thẻ
                  <PriceText>{focusedCard.sellPrice.toLocaleString('en-US')}</PriceText>
                </button>
                <button type="button" disabled={focusedCard.duplicateCount <= 1} onClick={() => sellCard(focusedCard, focusedCard.duplicateCount - 1)}>
                  <ShieldAlert size={18} />
                  Bán bản trùng
                  <span>{focusedCard.duplicateCount > 1 ? `${focusedCard.duplicateCount - 1} thẻ` : 'Không có trùng'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {saleMessage ? (
        <div className="card-inventory-sale-toast" role="status" aria-live="polite">
          {saleMessage}
        </div>
      ) : null}
    </main>
  )
}
