import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, UIEvent } from 'react'
import {
  ArrowLeft,
  CircleDollarSign,
  Clock3,
  Coins,
  PackageOpen,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import heroImage from '../assets/hero.png'
import {
  Avatar,
  CardFrame,
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
}

type MockCardRarity =
  | 'BRONZE_COMMON'
  | 'BRONZE_RARE'
  | 'SILVER_COMMON'
  | 'SILVER_RARE'
  | 'GOLD_COMMON'
  | 'GOLD_RARE'
  | 'GOLD_EPIC'
  | 'DIAMOND_COMMON'
  | 'DIAMOND_RARE'

type MockOpenCard = {
  id: string
  name: string
  rarity: MockCardRarity
  overall: number
  position: string
  clubCode: string
  nationImageSrc: string
  clubImageSrc: string
  imageSrc: string
  sellPrice: number
  stats: { pac: number; sho: number; pas: number; dri: number; def: number; phy: number }
}

const rarityRank: Record<MockCardRarity, number> = {
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

const tunnelRarities = new Set<MockCardRarity>(['GOLD_EPIC', 'DIAMOND_COMMON', 'DIAMOND_RARE'])

const cardSeeds: Array<Omit<MockOpenCard, 'id' | 'sellPrice'>> = [
  {
    name: 'K. MBAPPÉ',
    rarity: 'DIAMOND_RARE',
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
    rarity: 'DIAMOND_COMMON',
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
    rarity: 'GOLD_EPIC',
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
    rarity: 'GOLD_RARE',
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
    rarity: 'GOLD_COMMON',
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
    rarity: 'SILVER_RARE',
    overall: 84,
    position: 'LW',
    clubCode: 'MIL',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/38.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/47.png',
    imageSrc: 'https://cdn.sofifa.net/players/241/721/26_120.png',
    stats: { pac: 93, sho: 80, pas: 75, dri: 87, def: 32, phy: 77 },
  },
  {
    name: 'A. GARNACHO',
    rarity: 'SILVER_COMMON',
    overall: 79,
    position: 'LW',
    clubCode: 'MUN',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/52.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/11.png',
    imageSrc: 'https://cdn.sofifa.net/players/268/438/26_120.png',
    stats: { pac: 87, sho: 74, pas: 70, dri: 82, def: 35, phy: 62 },
  },
  {
    name: 'J. BELLINGHAM',
    rarity: 'BRONZE_RARE',
    overall: 88,
    position: 'CM',
    clubCode: 'RMA',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/14.png',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png',
    imageSrc: 'https://cdn.sofifa.net/players/252/371/26_120.png',
    stats: { pac: 80, sho: 83, pas: 84, dri: 86, def: 78, phy: 82 },
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

function buildUserPacks(): UserPack[] {
  return Array.from({ length: 48 }, (_, index) => {
    const theme = PACK_THEMES[(index * 3 + 1) % PACK_THEMES.length]
    const status = index % 5 === 0 ? 'opened' : 'pending'

    return {
      id: `UP-${String(index + 1).padStart(4, '0')}`,
      status,
      purchasedAt: `${index + 1} phút trước`,
      theme,
    }
  })
}

function buildOpenCards(pack: UserPack): MockOpenCard[] {
  const count = pack.theme.cardCount
  const isElitePack = pack.theme.price >= 1900 || pack.theme.shine === 'legendary'

  return Array.from({ length: count }, (_, index) => {
    const seedIndex = isElitePack && index === count - 1 ? 0 : (pack.id.length + index * 2 + pack.theme.key.length) % cardSeeds.length
    const seed = cardSeeds[seedIndex]
    const variance = (index + pack.theme.price) % 3
    const rarity = isElitePack && index === count - 1 ? seed.rarity : seed.rarity
    const overall = Math.max(64, seed.overall - (isElitePack && index === count - 1 ? 0 : variance))

    return {
      ...seed,
      id: `${pack.id}-CARD-${index + 1}`,
      rarity,
      overall,
      sellPrice: Math.round(160 + overall * 22 + rarityRank[rarity] * 90 + index * 18),
    }
  }).sort((a, b) => {
    if (count < 4) return 0
    const rarityDelta = rarityRank[a.rarity] - rarityRank[b.rarity]
    return rarityDelta === 0 ? a.overall - b.overall : rarityDelta
  })
}

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
}

function getBestCard(cards: MockOpenCard[]) {
  return [...cards].sort((a, b) => {
    const rarityDelta = rarityRank[b.rarity] - rarityRank[a.rarity]
    return rarityDelta === 0 ? b.overall - a.overall : rarityDelta
  })[0]
}

function MockCardFrame({ card, glow = false }: { card: MockOpenCard; glow?: boolean }) {
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
  const cards = useMemo(() => buildOpenCards(pack), [pack])
  const bestCard = getBestCard(cards)
  const [activeIndex, setActiveIndex] = useState(0)
  const [rareStep, setRareStep] = useState(0)
  const [isDroppingRare, setIsDroppingRare] = useState(false)
  const [soldIds, setSoldIds] = useState<Set<string>>(() => new Set())
  const revealedCards = cards.slice(0, activeIndex)
  const activeCard = cards[activeIndex]
  const activeIsRare = activeCard ? tunnelRarities.has(activeCard.rarity) : false
  const visibleCards = activeCard && !activeIsRare ? cards.slice(0, activeIndex + 1) : revealedCards
  const soldTotal = revealedCards.filter((card) => soldIds.has(card.id)).reduce((sum, card) => sum + card.sellPrice, 0)
  const currentBalance = startingBalance + soldTotal
  const unsoldCards = revealedCards.filter((card) => !soldIds.has(card.id))
  const revealFinished = activeIndex >= cards.length

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

  const sellCard = (cardId: string) => {
    setSoldIds((current) => new Set(current).add(cardId))
  }

  const sellAll = () => {
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
            <Coins size={18} />
            <strong>{formatCoin(currentBalance)}</strong>
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

            return (
              <article
                className={`pack-opening-result-card${isBest ? ' pack-opening-result-card-best' : ''}${sold ? ' pack-opening-result-card-sold' : ''}${isFlipping ? ' pack-opening-result-card-flipping' : ''}`}
                key={card.id}
              >
                <div className="pack-opening-flip-shell">
                  <div className="pack-opening-card-back">
                    <span>PACKOPENER</span>
                  </div>
                  <div className="pack-opening-result-frame">
                    <MockCardFrame card={card} glow={isBest} />
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
                <strong>{activeCard.clubCode}</strong>
              </span>
            ) : null}

            {activeIsRare && rareStep === 1 ? (
              <span className="pack-opening-reveal-emblem">
                <img src={activeCard.nationImageSrc} alt={`${activeCard.name} nation`} referrerPolicy="no-referrer" />
                <strong>Nation</strong>
              </span>
            ) : null}

            {activeIsRare && rareStep === 2 ? (
              <span className="pack-opening-reveal-position">
                <strong>{activeCard.position}</strong>
                <span>{activeCard.overall} OVR</span>
              </span>
            ) : null}

            {rareStep === 3 ? (
              <span className="pack-opening-reveal-card">
                <RarityChip rarity={activeCard.rarity}>{activeCard.rarity.replace(/_/g, ' ')}</RarityChip>
                <MockCardFrame card={activeCard} glow={activeIsRare} />
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
  const [visibleCount, setVisibleCount] = useState(14)
  const [isLeaving, setIsLeaving] = useState(false)
  const [packs, setPacks] = useState<UserPack[]>(() => buildUserPacks())
  const [openingPack, setOpeningPack] = useState<UserPack | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const visiblePacks = packs.slice(0, visibleCount)
  const pendingCount = packs.filter((pack) => pack.status === 'pending').length
  const openedCount = packs.length - pendingCount

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

        <aside className="pack-inventory-summary">
          <div className="pack-inventory-spotlight">
            <div className="pack-inventory-spotlight-copy">
              <LabelText>Ready To Open</LabelText>
              <h2>{pendingCount} pack đang chờ</h2>
              <p>Danh sách cuộn bên trong kho, màn hình game bên ngoài vẫn đứng yên.</p>
            </div>
            <PackArtwork theme={PACK_THEMES.find((pack) => pack.key === 'ultimate-pack') ?? PACK_THEMES[15]} />
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
              <strong>4</strong>
              <span>Elite</span>
            </div>
          </div>
        </aside>

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
            {visiblePacks.map((pack, index) => (
              <article className="pack-inventory-card" key={pack.id}>
                <PackArtwork theme={pack.theme} compact />
                <div className="pack-inventory-card-main">
                  <div className="pack-inventory-card-title">
                    <div>
                      <h3>{pack.theme.name}</h3>
                      <span>{pack.id}</span>
                    </div>
                    <StatusBadge status={pack.status}>
                      {pack.status === 'pending' ? 'Pending' : 'Opened'}
                    </StatusBadge>
                  </div>
                  <p>{pack.theme.oddsTeaser}</p>
                  <div className="pack-inventory-card-meta">
                    <span>
                      <Clock3 size={15} />
                      {pack.purchasedAt}
                    </span>
                    <span>{pack.theme.cardCount} cards</span>
                    <PriceText>{pack.theme.price.toLocaleString('en-US')}</PriceText>
                  </div>
                </div>
                <div className="pack-inventory-card-actions">
                  {index < 3 ? <HotBadge>{index === 0 ? 'Next' : 'Fresh'}</HotBadge> : null}
                  <button
                    type="button"
                    disabled={pack.status === 'opened'}
                    onClick={() => setOpeningPack(pack)}
                  >
                    {pack.status === 'pending' ? 'Mở pack' : 'Xem thẻ'}
                  </button>
                </div>
              </article>
            ))}

            {visibleCount < packs.length ? (
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
