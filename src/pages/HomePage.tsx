import type { CSSProperties } from 'react'
import {
  CircleDollarSign,
  Gem,
  Package,
  ShoppingBag,
  Sparkles,
  Trophy,
  UserRound,
  WalletCards,
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
import './styles/home-page.css'

type StoredAuthSession = {
  user?: {
    username?: string
    balance?: number
  }
}

function readAuthSession(): StoredAuthSession | null {
  const raw = window.localStorage.getItem('packopener.auth') ?? window.sessionStorage.getItem('packopener.auth')

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as StoredAuthSession
  } catch {
    return null
  }
}

const featuredPacks = [
  PACK_THEMES.find((pack) => pack.key === 'ultimate-pack') ?? PACK_THEMES[15],
  PACK_THEMES.find((pack) => pack.key === 'premium-gold') ?? PACK_THEMES[7],
  PACK_THEMES.find((pack) => pack.key === 'rare-gold') ?? PACK_THEMES[8],
]

const pendingPacks = [
  PACK_THEMES.find((pack) => pack.key === 'starter-pack') ?? PACK_THEMES[1],
  PACK_THEMES.find((pack) => pack.key === 'gold-pack') ?? PACK_THEMES[6],
]

const topPulls = [
  {
    name: 'K. MBAPPÉ',
    rarity: 'DIAMOND_RARE' as const,
    overall: 91,
    position: 'ST',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png',
    clubCode: 'RMA',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png',
    imageSrc: 'https://cdn.sofifa.net/players/231/747/26_120.png',
    stats: { pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 },
  },
  {
    name: 'K. KVARATSKHELIA',
    rarity: 'GOLD_EPIC' as const,
    overall: 87,
    position: 'LW',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png',
    clubCode: 'PSG',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png',
    imageSrc: 'https://cdn.sofifa.net/players/247/635/26_120.png',
    stats: { pac: 86, sho: 80, pas: 83, dri: 88, def: 58, phy: 78 },
  },
  {
    name: 'E. HAALAND',
    rarity: 'DIAMOND_COMMON' as const,
    overall: 90,
    position: 'ST',
    nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/36.png',
    clubCode: 'MCI',
    clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/10.png',
    imageSrc: 'https://cdn.sofifa.net/players/239/085/26_120.png',
    stats: { pac: 86, sho: 91, pas: 70, dri: 80, def: 45, phy: 88 },
  },
]

const activity = [
  ['Mở pack', 'Rare Gold', '+3 thẻ mới'],
  ['Bán trùng', 'Silver Common', '+120 coin'],
  ['Nhận thưởng', 'Daily Recovery', '+1 pack'],
] as const

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
}

export default function HomePage() {
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const heroPack = featuredPacks[0]

  return (
    <main
      className="home-page-root"
      style={{ '--home-page-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="home-page-stars" aria-hidden="true" />

      <header className="home-topbar">
        <a className="home-brand" href="/">
          <span className="home-brand-mark" aria-hidden="true" />
          <span>PackOpener2026</span>
        </a>
        <nav className="home-nav" aria-label="Điều hướng chính">
          <a className="home-nav-link home-nav-link-active" href="/home">Home</a>
          <a className="home-nav-link" href="/packs">Packs</a>
          <a className="home-nav-link" href="/cards">Cards</a>
          <a className="home-nav-link" href="/market">Market</a>
        </nav>
        <div className="home-account">
          <div className="home-coin-pill" aria-label={`${formatCoin(balance)} coin`}>
            <CircleDollarSign size={18} />
            <strong>{formatCoin(balance)}</strong>
          </div>
          <Avatar initials={initials} size={38} />
        </div>
      </header>

      <section className="home-game-screen">
        <div className="home-hero-panel">
          <div className="home-hero-copy">
            <LabelText>Home Lobby</LabelText>
            <h1>Mở pack tiếp theo, săn cú pull lớn.</h1>
            <p>
              Chào {username}. Kho pack, coin và những thẻ đáng chú ý được gom vào một màn để vào game nhanh hơn.
            </p>
            <div className="home-hero-actions">
              <a className="home-button home-button-gold" href="/packs">
                <Package size={18} />
                Mở pack
              </a>
              <a className="home-button home-button-ghost" href="/cards">
                <WalletCards size={18} />
                Kho thẻ
              </a>
            </div>
          </div>

          <div className="home-hero-pack">
            <div className="home-hero-pack-glow" aria-hidden="true" />
            <PackArtwork theme={heroPack} />
            <div className="home-hero-pack-meta">
              <HotBadge>Limited</HotBadge>
              <span>{heroPack.cardCount} cards</span>
              <PriceText>{heroPack.price.toLocaleString('en-US')}</PriceText>
            </div>
          </div>
        </div>

        <aside className="home-side-panel">
          <div className="home-profile-strip">
            <Avatar initials={initials} size={54} />
            <div>
              <span>Đội hình của {username}</span>
              <strong>Elite chase active</strong>
            </div>
          </div>

          <div className="home-stat-grid">
            <div>
              <Sparkles size={18} />
              <strong>2</strong>
              <span>Pack chờ mở</span>
            </div>
            <div>
              <Gem size={18} />
              <strong>18</strong>
              <span>Thẻ hiếm</span>
            </div>
            <div>
              <Trophy size={18} />
              <strong>91</strong>
              <span>Best OVR</span>
            </div>
          </div>

          <div className="home-activity">
            <LabelText>Hoạt động gần đây</LabelText>
            {activity.map(([type, name, delta]) => (
              <div className="home-activity-row" key={`${type}-${name}`}>
                <span>{type}</span>
                <strong>{name}</strong>
                <em>{delta}</em>
              </div>
            ))}
          </div>
        </aside>

        <div className="home-section home-featured-section">
          <div className="home-section-head">
            <div>
              <LabelText>Featured Packs</LabelText>
              <h2>Pack đáng mở hôm nay</h2>
            </div>
            <a className="home-inline-link" href="/market">Xem tất cả</a>
          </div>
          <div className="home-pack-row">
            {featuredPacks.map((pack, index) => (
              <article className="home-pack-card" key={pack.key}>
                <PackArtwork theme={pack} compact />
                <div className="home-pack-card-copy">
                  <div>
                    <h3>{pack.name}</h3>
                    <p>{pack.oddsTeaser}</p>
                  </div>
                  <div className="home-pack-card-bottom">
                    <PriceText>{pack.price.toLocaleString('en-US')}</PriceText>
                    <HotBadge>{index === 0 ? 'Elite' : 'Store'}</HotBadge>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="home-section home-pending-section">
          <div className="home-section-head">
            <div>
              <LabelText>My Packs</LabelText>
              <h2>Chờ mở</h2>
            </div>
          </div>
          <div className="home-pending-list">
            {pendingPacks.map((pack) => (
              <article className="home-pending-item" key={pack.key}>
                <PackArtwork theme={pack} compact />
                <div>
                  <h3>{pack.name}</h3>
                  <p>{pack.cardCount} cards inside</p>
                  <StatusBadge status="pending">Pending</StatusBadge>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="home-section home-pulls-section">
          <div className="home-section-head">
            <div>
              <LabelText>Top Pulls</LabelText>
              <h2>Thẻ nổi bật trong bộ sưu tập</h2>
            </div>
            <a className="home-inline-link" href="/cards">Kho thẻ</a>
          </div>
          <div className="home-card-row">
            {topPulls.map((card, index) => (
              <article className="home-player-card" key={card.name}>
                <div className="home-player-card-rank">#{index + 1}</div>
                <CardFrame {...card} />
                <RarityChip rarity={card.rarity}>{card.rarity.replace(/_/g, ' ')}</RarityChip>
              </article>
            ))}
          </div>
        </div>

        <div className="home-section home-action-panel">
          <LabelText>Quick Actions</LabelText>
          <a href="/market">
            <ShoppingBag size={19} />
            Mua pack
          </a>
          <a href="/cards">
            <WalletCards size={19} />
            Quản lý thẻ
          </a>
          <a href="/login">
            <UserRound size={19} />
            Đổi tài khoản
          </a>
        </div>
      </section>
    </main>
  )
}
