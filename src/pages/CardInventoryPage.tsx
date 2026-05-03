import { useMemo, useRef, useState } from 'react'
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
  name: string
  rarity: 'BRONZE_COMMON' | 'SILVER_RARE' | 'GOLD_RARE' | 'GOLD_EPIC' | 'DIAMOND_COMMON' | 'DIAMOND_RARE'
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

const cardSeeds = [
  {
    name: 'K. MBAPPÉ',
    rarity: 'DIAMOND_RARE' as const,
    overall: 91,
    position: 'ST',
    clubCode: 'RMA',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png',
    imageSrc: 'https://cdn.sofifa.net/players/231/747/26_120.png',
    stats: { pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 },
  },
  {
    name: 'E. HAALAND',
    rarity: 'DIAMOND_COMMON' as const,
    overall: 90,
    position: 'ST',
    clubCode: 'MCI',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/36.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/10.png',
    imageSrc: 'https://cdn.sofifa.net/players/239/085/26_120.png',
    stats: { pac: 86, sho: 91, pas: 70, dri: 80, def: 45, phy: 88 },
  },
  {
    name: 'K. KVARATSKHELIA',
    rarity: 'GOLD_EPIC' as const,
    overall: 87,
    position: 'LW',
    clubCode: 'PSG',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png',
    imageSrc: 'https://cdn.sofifa.net/players/247/635/26_120.png',
    stats: { pac: 86, sho: 80, pas: 83, dri: 88, def: 58, phy: 78 },
  },
  {
    name: 'B. SAKA',
    rarity: 'GOLD_RARE' as const,
    overall: 86,
    position: 'RW',
    clubCode: 'ARS',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/14.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/1.png',
    imageSrc: 'https://cdn.sofifa.net/players/246/669/26_120.png',
    stats: { pac: 85, sho: 82, pas: 81, dri: 87, def: 60, phy: 70 },
  },
  {
    name: 'PEDRI',
    rarity: 'SILVER_RARE' as const,
    overall: 85,
    position: 'CM',
    clubCode: 'BAR',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/45.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/241.png',
    imageSrc: 'https://cdn.sofifa.net/players/251/854/26_120.png',
    stats: { pac: 78, sho: 69, pas: 84, dri: 88, def: 70, phy: 66 },
  },
  {
    name: 'R. LEÃO',
    rarity: 'BRONZE_COMMON' as const,
    overall: 84,
    position: 'LW',
    clubCode: 'MIL',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/38.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/47.png',
    imageSrc: 'https://cdn.sofifa.net/players/241/721/26_120.png',
    stats: { pac: 93, sho: 80, pas: 75, dri: 87, def: 32, phy: 77 },
  },
]

function readAuthSession(): StoredAuthSession | null {
  const raw = window.localStorage.getItem('packopener.auth') ?? window.sessionStorage.getItem('packopener.auth')

  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredAuthSession
  } catch {
    return null
  }
}

function buildCards(): InventoryCard[] {
  return Array.from({ length: 72 }, (_, index) => {
    const seed = cardSeeds[index % cardSeeds.length]
    const variance = index % 4

    return {
      ...seed,
      id: `CARD-${String(index + 1).padStart(4, '0')}`,
      overall: Math.max(62, seed.overall - variance),
      sellPrice: 180 + seed.overall * 18 + index * 7,
      duplicateCount: index % 6 === 0 ? 2 : 1,
      stats: {
        pac: Math.max(40, seed.stats.pac - variance),
        sho: Math.max(40, seed.stats.sho - variance),
        pas: Math.max(40, seed.stats.pas - variance),
        dri: Math.max(40, seed.stats.dri - variance),
        def: Math.max(30, seed.stats.def - variance),
        phy: Math.max(40, seed.stats.phy - variance),
      },
    }
  })
}

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
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
  const previewTiltRef = useRef<HTMLDivElement | null>(null)
  const previewTiltFrameRef = useRef<number | null>(null)
  const previewTiltStateRef = useRef({ tiltX: '0deg', tiltY: '0deg' })
  const cards = useMemo(() => buildCards(), [])
  const visibleCards = cards.slice(0, visibleCount)
  const focusedCard = focusedId ? (cards.find((card) => card.id === focusedId) ?? null) : null
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const selectedCards = cards.filter((card) => selectedIds.has(card.id))
  const selectedValue = selectedCards.reduce((sum, card) => sum + card.sellPrice, 0)

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
            </div>
          ) : null}

          <div className="card-inventory-grid" onScroll={handleListScroll}>
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
                    onClick={() => setFocusedId(card.id)}
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

            {visibleCount < cards.length ? (
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
                <button type="button">
                  <CircleDollarSign size={18} />
                  Bán thẻ
                  <PriceText>{focusedCard.sellPrice.toLocaleString('en-US')}</PriceText>
                </button>
                <button type="button" disabled={focusedCard.duplicateCount <= 1}>
                  <ShieldAlert size={18} />
                  Bán bản trùng
                  <span>{focusedCard.duplicateCount > 1 ? `${focusedCard.duplicateCount - 1} thẻ` : 'Không có trùng'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
