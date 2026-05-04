import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, UIEvent } from 'react'
import {
  ArrowLeft,
  CircleDollarSign,
  Clock3,
  PackageOpen,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import heroImage from '../assets/hero.png'
import { readPersistedAuthSession } from '../services/authApi'
import {
  fetchPackInventory,
  openUserPack,
  sellInventoryCard,
  type ApiOpenedCard,
  type ApiUserPack,
} from '../services/packInventoryApi'
import {
  Avatar,
  BalanceChangeToast,
  CardFrame,
  CoinDisplay,
  HotBadge,
  LabelText,
  PACK_THEMES,
  PackArtwork,
  PriceText,
  RarityChip,
  StatusBadge,
} from '../components'
import './styles/pack-inventory-page.css'

type StoredAuthSession = {
  user?: {
    username?: string
    balance?: number
  }
}

type UserPack = {
  id: string
  status: 'pending' | 'opened'
  purchasedAt: string
  theme: (typeof PACK_THEMES)[number]
  packName?: string
  oddsTeaser?: string
  cardCount?: number
}

type OpenedCardRarity =
  | 'BRONZE_COMMON'
  | 'BRONZE_RARE'
  | 'SILVER_COMMON'
  | 'SILVER_RARE'
  | 'GOLD_COMMON'
  | 'GOLD_RARE'
  | 'GOLD_EPIC'
  | 'DIAMOND_COMMON'
  | 'DIAMOND_RARE'

type OpenedCard = {
  id: string
  apiCardId?: string
  name: string
  rarity: OpenedCardRarity
  overall: number
  position: string
  clubCode: string
  nationImageSrc: string
  clubImageSrc: string
  imageSrc: string
  sellPrice: number
  stats: { pac: number; sho: number; pas: number; dri: number; def: number; phy: number }
}

const rarityRank: Record<OpenedCardRarity, number> = {
  BRONZE_COMMON: 1,
  BRONZE_RARE: 2,
  SILVER_COMMON: 3,
  SILVER_RARE: 4,
  GOLD_COMMON: 5,
  GOLD_RARE: 6,
  GOLD_EPIC: 7,
  DIAMOND_COMMON: 8,
  DIAMOND_RARE: 9,
}

const tunnelRarities = new Set<OpenedCardRarity>(['GOLD_EPIC', 'DIAMOND_COMMON', 'DIAMOND_RARE'])


function readAuthSession(): StoredAuthSession | null {
  return readPersistedAuthSession()
}

function normalize(value?: string) {
  return value?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? ''
}

function themeForApiPack(pack?: ApiUserPack['pack']) {
  if (!pack?.name) return PACK_THEMES[0]

  return (
    PACK_THEMES.find((theme) => normalize(theme.name) === normalize(pack.name)) ??
    PACK_THEMES.find((theme) => normalize(pack.name).includes(normalize(theme.name)) || normalize(theme.name).includes(normalize(pack.name))) ??
    PACK_THEMES[0]
  )
}

function formatRelativeTime(value?: string | null) {
  if (!value) return 'Vua mua'

  const timestamp = new Date(value).getTime()
  if (Number.isNaN(timestamp)) return 'Vua mua'

  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000))
  if (minutes < 60) return `${minutes} phut truoc`

  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} gio truoc`

  return `${Math.round(hours / 24)} ngay truoc`
}

function mapApiUserPack(pack: ApiUserPack): UserPack {
  const theme = themeForApiPack(pack.pack)

  return {
    id: pack.id,
    status: pack.status === 'OPENED' ? 'opened' : 'pending',
    purchasedAt: formatRelativeTime(pack.purchasedAt ?? pack.createdAt ?? pack.openedAt),
    theme,
    packName: pack.pack?.name,
    oddsTeaser: pack.pack?.description ?? pack.pack?.oddsTeaser,
    cardCount: pack.pack?.cardCount,
  }
}


function estimateSellPrice(card: Pick<OpenedCard, 'overall' | 'rarity'>, index = 0) {
  return Math.round(160 + card.overall * 22 + rarityRank[card.rarity] * 90 + index * 18)
}

function mapApiOpenedCards(cards: ApiOpenedCard[], fallbackPack: UserPack): OpenedCard[] {
  return cards.map((card, index) => {
    const rarity = (card.rarity in rarityRank ? card.rarity : 'BRONZE_COMMON') as OpenedCardRarity
    const mapped = {
      id: `${fallbackPack.id}-${card.cardId}-${index}`,
      apiCardId: card.cardId,
      name: card.name,
      rarity,
      overall: card.overall,
      position: card.position,
      clubCode: card.club ?? '',
      nationImageSrc: card.nationImageUrl ?? '',
      clubImageSrc: card.clubImageUrl ?? '',
      imageSrc: card.imageUrl ?? '',
      sellPrice: card.sellPrice ?? 0,
      stats: {
        pac: card.pace ?? 0,
        sho: card.shooting ?? 0,
        pas: card.passing ?? 0,
        dri: card.dribbling ?? 0,
        def: card.defending ?? 0,
        phy: card.physical ?? 0,
      },
    } satisfies OpenedCard

    return {
      ...mapped,
      sellPrice: mapped.sellPrice || estimateSellPrice(mapped, index),
    }
  }).sort((a, b) => {
    const rarityDelta = rarityRank[a.rarity] - rarityRank[b.rarity]
    return rarityDelta === 0 ? a.overall - b.overall : rarityDelta
  })
}

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
}

function getBestCard(cards: OpenedCard[]) {
  return [...cards].sort((a, b) => {
    const rarityDelta = rarityRank[b.rarity] - rarityRank[a.rarity]
    return rarityDelta === 0 ? b.overall - a.overall : rarityDelta
  })[0]
}

function OpenedCardFrame({ card, glow = false }: { card: OpenedCard; glow?: boolean }) {
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

function PackOpeningOverlay({
  pack,
  startingBalance,
  onClose,
}: {
  pack: UserPack
  startingBalance: number
  onClose: () => void
}) {
  const [cards, setCards] = useState<OpenedCard[]>([])
  const bestCard = getBestCard(cards)
  const [activeIndex, setActiveIndex] = useState(0)
  const [rareStep, setRareStep] = useState(0)
  const [isDroppingRare, setIsDroppingRare] = useState(false)
  const [soldIds, setSoldIds] = useState<Set<string>>(() => new Set())
  const [lastSale, setLastSale] = useState<OpenedCard | null>(null)
  const [serverBalance, setServerBalance] = useState<number | null>(null)
  const revealedCards = cards.slice(0, activeIndex)
  const activeCard = cards[activeIndex]
  const activeIsRare = activeCard ? tunnelRarities.has(activeCard.rarity) : false
  const visibleCards = activeCard && !activeIsRare ? cards.slice(0, activeIndex + 1) : revealedCards
  const soldTotal = revealedCards.filter((card) => soldIds.has(card.id)).reduce((sum, card) => sum + card.sellPrice, 0)
  const currentBalance = serverBalance ?? startingBalance + soldTotal
  const unsoldCards = revealedCards.filter((card) => !soldIds.has(card.id))
  const revealFinished = activeIndex >= cards.length

  useEffect(() => {
    let cancelled = false

    openUserPack(pack.id)
      .then((response) => {
        if (cancelled) return
        setCards(mapApiOpenedCards(response.cards, pack))
        if (typeof response.newBalance === 'number') {
          setServerBalance(response.newBalance)
        }
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [pack])

  useEffect(() => {
    if (!activeCard || activeIsRare) return

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => Math.min(index + 1, cards.length))
    }, 980)

    return () => window.clearTimeout(timer)
  }, [activeCard, activeIsRare, cards.length])

  useEffect(() => {
    if (!activeCard || !activeIsRare || isDroppingRare || rareStep >= 3) return

    const timer = window.setTimeout(() => {
      setRareStep((step) => Math.min(step + 1, 3))
    }, 1250)

    return () => window.clearTimeout(timer)
  }, [activeCard, activeIsRare, isDroppingRare, rareStep])

  const sellCard = async (cardId: string) => {
    const card = revealedCards.find((item) => item.id === cardId)
    if (card) {
      try {
        if (card.apiCardId) {
          const result = await sellInventoryCard(card.apiCardId)
          setLastSale({ ...card, sellPrice: result.totalEarned })
          setServerBalance(result.newBalance)
        } else {
          setLastSale(card)
        }
      } catch {
        setLastSale(card)
      }
    }
    setSoldIds((current) => new Set(current).add(cardId))
  }

  const sellAll = () => {
    const total = unsoldCards.reduce((sum, card) => sum + card.sellPrice, 0)
    if (total > 0) {
      setLastSale({
        ...unsoldCards[0],
        id: 'bulk-sale',
        name: 'Bulk sale',
        sellPrice: total,
      })
    }
    unsoldCards.forEach((card) => {
      if (card.apiCardId) {
        sellInventoryCard(card.apiCardId).then((result) => setServerBalance(result.newBalance)).catch(() => undefined)
      }
    })
    setSoldIds(new Set(revealedCards.map((card) => card.id)))
  }

  const advanceReveal = () => {
    if (!activeCard || isDroppingRare) return

    if (activeIsRare && rareStep < 3) {
      return
    }

    if (activeIsRare) {
      setIsDroppingRare(true)
      window.setTimeout(() => {
        setActiveIndex((index) => Math.min(index + 1, cards.length))
        setRareStep(0)
        setIsDroppingRare(false)
      }, 760)
      return
    }

    setActiveIndex((index) => Math.min(index + 1, cards.length))
  }

  return (
    <div className="pack-opening-overlay">
      <div className="pack-opening-stars" aria-hidden="true" />

      <header className="pack-opening-hud">
        <div>
          <LabelText>Pack Opening</LabelText>
          <h2>{pack.theme.name}</h2>
        </div>
        <div className="pack-opening-hud-actions">
          <div className="pack-opening-coin">
            <CoinDisplay balance={currentBalance} />
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng màn mở pack">
            <X size={18} />
          </button>
        </div>
      </header>

      <section className={`pack-opening-results pack-opening-results-count-${Math.min(cards.length, 7)}${revealFinished ? ' pack-opening-results-complete' : ''}`}>
        <div className="pack-opening-results-head">
          <div>
            <LabelText>Result Grid</LabelText>
            <h2>{revealedCards.length}/{cards.length} thẻ đã mở</h2>
          </div>
          <div className="pack-opening-results-actions">
            <button type="button" onClick={sellAll} disabled={!revealFinished || unsoldCards.length === 0}>
              Bán hết
            </button>
            <button type="button" className="pack-opening-continue" onClick={onClose} disabled={!revealFinished}>
              Tiếp tục
            </button>
          </div>
        </div>

        <div className="pack-opening-card-grid">
          {visibleCards.map((card, index) => {
            const sold = soldIds.has(card.id)
            const isBest = card.id === bestCard.id
            const isFlipping = !activeIsRare && activeCard?.id === card.id && index === activeIndex
            const isNewPull = !sold && index === visibleCards.length - 1

            return (
              <article
                className={`pack-opening-result-card${isBest ? ' pack-opening-result-card-best' : ''}${sold ? ' pack-opening-result-card-sold' : ''}${isFlipping ? ' pack-opening-result-card-flipping' : ''}${isNewPull ? ' pack-opening-result-card-new' : ''}`}
                key={card.id}
              >
                <div className="pack-opening-flip-shell">
                  <div className="pack-opening-card-back">
                    <span>PACKOPENER</span>
                  </div>
                  <div className="pack-opening-result-frame">
                    <OpenedCardFrame card={card} glow={isBest} />
                  </div>
                </div>
                <div className="pack-opening-result-meta">
                  <RarityChip rarity={card.rarity}>{card.rarity.replace(/_/g, ' ')}</RarityChip>
                  <PriceText>{card.sellPrice.toLocaleString('en-US')}</PriceText>
                </div>
                <button type="button" onClick={() => sellCard(card.id)} disabled={sold}>
                  {sold ? 'Sold' : 'Bán'}
                </button>
              </article>
            )
          })}
          {Array.from({ length: cards.length - visibleCards.length }, (_, index) => (
            <div className="pack-opening-empty-slot" key={`slot-${index}`}>
              <span>{visibleCards.length + index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {lastSale ? (
        <BalanceChangeToast
          key={`${lastSale.id}-${lastSale.sellPrice}`}
          className="pack-opening-sale-toast"
          amount={lastSale.sellPrice}
          message={lastSale.name === 'Bulk sale' ? 'BÃ¡n táº¥t cáº£ tháº» Ä‘ang hiá»ƒn thá»‹' : `BÃ¡n ${lastSale.name}`}
        />
      ) : null}

      {!revealFinished && activeCard && activeIsRare ? (
        <button
          className="pack-opening-reveal-layer pack-opening-reveal-layer-rare"
          type="button"
          onClick={advanceReveal}
          aria-label="Tiếp tục reveal thẻ"
        >
          <span className="pack-opening-reveal-vignette" aria-hidden="true" />
          <span className={`pack-opening-reveal-stage${isDroppingRare ? ' pack-opening-reveal-stage-drop' : ''}`} key={`${activeCard.id}-${rareStep}`}>
            {activeIsRare && rareStep === 0 ? (
              <span className="pack-opening-reveal-emblem">
                <img src={activeCard.clubImageSrc} alt={`${activeCard.clubCode} badge`} referrerPolicy="no-referrer" />
              </span>
            ) : null}

            {activeIsRare && rareStep === 1 ? (
              <span className="pack-opening-reveal-emblem">
                <img src={activeCard.nationImageSrc} alt={`${activeCard.name} nation`} referrerPolicy="no-referrer" />
              </span>
            ) : null}

            {activeIsRare && rareStep === 2 ? (
              <span className="pack-opening-reveal-position">
                <strong>{activeCard.position}</strong>
              </span>
            ) : null}

            {rareStep === 3 ? (
              <span className="pack-opening-reveal-card">
                <RarityChip rarity={activeCard.rarity}>{activeCard.rarity.replace(/_/g, ' ')}</RarityChip>
                <OpenedCardFrame card={activeCard} glow={activeIsRare} />
              </span>
            ) : null}
          </span>
          <span className="pack-opening-reveal-hint">
            {rareStep < 3 ? 'Đang reveal...' : 'Click để đưa thẻ vào result grid'}
          </span>
        </button>
      ) : null}
    </div>
  )
}

export default function PackInventoryPage() {
  const [visibleCount, setVisibleCount] = useState(24)
  const [isLeaving, setIsLeaving] = useState(false)
  const [packs, setPacks] = useState<UserPack[]>([])
  const [serverBalance, setServerBalance] = useState<number | null>(null)
  const [openingPack, setOpeningPack] = useState<UserPack | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = serverBalance ?? session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const visiblePacks = packs.slice(0, visibleCount)
  const pendingCount = packs.filter((pack) => pack.status === 'pending').length
  const openedCount = packs.length - pendingCount
  const eliteCount = packs.filter((pack) => pack.theme.shine === 'legendary' || pack.theme.price >= 1900).length

  useEffect(() => {
    let cancelled = false

    fetchPackInventory().then((data) => {
      if (cancelled || !data) return
      setPacks(data.packs.map(mapApiUserPack))
      setServerBalance(data.user.balance)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const handleListScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const remaining = target.scrollHeight - target.scrollTop - target.clientHeight

    if (remaining < 220) {
      setVisibleCount((count) => Math.min(count + 8, packs.length))
    }
  }

  const handleBack = () => {
    setIsLeaving(true)
    window.setTimeout(() => {
      window.history.pushState({}, '', '/home')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }, 280)
  }

  const closeOpening = () => {
    if (openingPack) {
      setPacks((current) =>
        current.map((pack) => (pack.id === openingPack.id ? { ...pack, status: 'opened' } : pack)),
      )
    }
    setOpeningPack(null)
  }

  return (
    <main
      className={`pack-inventory-root${isLeaving ? ' pack-inventory-root-leaving' : ''}`}
      style={{ '--pack-inventory-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="pack-inventory-stars" aria-hidden="true" />

      <button className="pack-inventory-back" type="button" onClick={handleBack}>
        <ArrowLeft size={17} />
        Trở về
      </button>

      <section className="pack-inventory-shell" aria-label="Kho pack người chơi">
        <header className="pack-inventory-topbar">
          <div className="pack-inventory-title">
            <LabelText>Pack Inventory</LabelText>
            <h1>Kho pack của {username}</h1>
          </div>

          <div className="pack-inventory-account">
            <div className="pack-inventory-coin" aria-label={`${formatCoin(balance)} coin`}>
              <CircleDollarSign size={18} />
              <strong>{formatCoin(balance)}</strong>
            </div>
            <Avatar initials={initials} size={38} />
          </div>
        </header>

        <section className="pack-inventory-summary" aria-label="Tổng quan kho pack">
          <div className="pack-inventory-spotlight">
            <PackArtwork theme={PACK_THEMES.find((pack) => pack.key === 'ultimate-pack') ?? PACK_THEMES[15]} compact />
            <div className="pack-inventory-spotlight-copy">
              <LabelText>Storage Overview</LabelText>
              <h2>{packs.length} pack trong kho</h2>
              <p>Grid kho ưu tiên mở nhanh, lọc trạng thái và nhìn được nhiều pack cùng lúc.</p>
            </div>
          </div>

          <div className="pack-inventory-metrics">
            <div>
              <PackageOpen size={18} />
              <strong>{pendingCount}</strong>
              <span>Pending</span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <strong>{openedCount}</strong>
              <span>Opened</span>
            </div>
            <div>
              <Sparkles size={18} />
              <strong>{eliteCount}</strong>
              <span>Elite</span>
            </div>
          </div>
        </section>

        <section className="pack-inventory-board">
          <div className="pack-inventory-toolbar">
            <div className="pack-inventory-search">
              <Search size={17} />
              <span>Tìm pack, tier hoặc trạng thái</span>
            </div>
            <div className="pack-inventory-filter-group" aria-label="Bộ lọc pack">
              <button type="button" className="active">Tất cả</button>
              <button type="button">Chờ mở</button>
              <button type="button">Đã mở</button>
            </div>
          </div>

          <div className="pack-inventory-list" ref={listRef} onScroll={handleListScroll}>
            {packs.length === 0 ? (
              <div className="pack-inventory-empty" aria-live="polite">
                <PackageOpen size={24} />
                <strong>Kho pack rỗng</strong>
                <span>Bạn chưa có pack nào trong kho.</span>
              </div>
            ) : null}

            {visiblePacks.map((pack, index) => {
              const isFeatured = index === 0
              const isFresh = index > 0 && index < 3

              return (
              <article className={`pack-inventory-card${isFeatured ? ' pack-inventory-card-featured' : ''}`} key={pack.id}>
                <div className="pack-inventory-card-art">
                  <PackArtwork theme={pack.theme} compact />
                  {isFeatured ? <HotBadge className="pack-inventory-hot-badge">Hot</HotBadge> : null}
                  {isFresh ? <HotBadge className="pack-inventory-fresh-badge">Fresh</HotBadge> : null}
                </div>
                <div className="pack-inventory-card-main">
                  <div className="pack-inventory-card-title">
                    <div>
                      <h3>{pack.packName ?? pack.theme.name}</h3>
                      <span>{pack.id}</span>
                    </div>
                    <StatusBadge status={pack.status}>
                      {pack.status === 'pending' ? 'Pending' : 'Opened'}
                    </StatusBadge>
                  </div>
                  <p>{pack.oddsTeaser ?? pack.theme.oddsTeaser}</p>
                  <div className="pack-inventory-card-meta">
                    <span>
                      <Clock3 size={15} />
                      {pack.purchasedAt}
                    </span>
                    <span>{pack.cardCount ?? pack.theme.cardCount} cards</span>
                  </div>
                </div>
                <div className="pack-inventory-card-actions">
                  <button
                    type="button"
                    disabled={pack.status === 'opened'}
                    onClick={() => setOpeningPack(pack)}
                  >
                    {pack.status === 'pending' ? 'Mở pack' : 'Xem thẻ'}
                  </button>
                </div>
              </article>
              )
            })}

            {packs.length === 0 ? null : visibleCount < packs.length ? (
              <div className="pack-inventory-loader" aria-live="polite">
                Đang nạp thêm pack...
              </div>
            ) : (
              <div className="pack-inventory-loader" aria-live="polite">
                Đã hiển thị toàn bộ kho pack.
              </div>
            )}
          </div>
        </section>
      </section>

      {openingPack ? (
        <PackOpeningOverlay
          pack={openingPack}
          startingBalance={balance}
          onClose={closeOpening}
        />
      ) : null}
    </main>
  )
}
