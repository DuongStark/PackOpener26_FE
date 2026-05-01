import type { ReactNode } from 'react'
import {
  Avatar,
  BackButton,
  BalanceChangeToast,
  BodyText,
  BulkSelectBar,
  CardFrame,
  CaptionText,
  Checkbox,
  CoinDisplay,
  EmptyStateIcon,
  GhostButton,
  HotBadge,
  LabelText,
  LoadingDot,
  PACK_THEMES,
  PackActionCluster,
  PackArtwork,
  PackMetaBlock,
  PackPurchaseChoice,
  PriceText,
  PrimaryButton,
  RarityChip,
  SectionTitle,
  StatLabel,
  SurfacePanel,
} from '..'
import './styles/player-organisms.css'

function BlockHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div>
      <LabelText>{eyebrow}</LabelText>
      <SectionTitle as="h2">{title}</SectionTitle>
      {description ? <BodyText>{description}</BodyText> : null}
    </div>
  )
}

export function Topbar() {
  return (
    <header className="player-org-topbar">
      <div className="player-org-topbar-brand">PackOpener2026</div>
      <div className="player-org-topbar-right">
        <GhostButton>Admin</GhostButton>
        <CoinDisplay balance={128400} />
        <Avatar initials="DS" size={40} />
      </div>
    </header>
  )
}

export function QuickNavPanel() {
  const items = [
    ['Inventory', 'Open saved packs and keep the loop moving.'],
    ['Cards', 'Review your collection and sell duplicates.'],
    ['Market', 'Buy the next pack fast.'],
  ] as const

  return (
    <section className="player-org-quick-nav">
      {items.map(([title, copy]) => (
        <div className="player-org-quick-nav-item" key={title}>
          <SectionTitle as="h3">{title}</SectionTitle>
          <BodyText>{copy}</BodyText>
          <GhostButton>{title}</GhostButton>
        </div>
      ))}
    </section>
  )
}

export function FeaturedPackShelf() {
  const packs = [
    PACK_THEMES.find((pack) => pack.key === 'ultimate-pack') ?? PACK_THEMES[15],
    PACK_THEMES.find((pack) => pack.key === 'elite-pack') ?? PACK_THEMES[14],
    PACK_THEMES.find((pack) => pack.key === 'starter-pack') ?? PACK_THEMES[1],
  ]

  return (
    <section className="player-org-shelf">
      <BlockHeader eyebrow="Featured Pack Shelf" title="Highlighted Packs" description="Home and market should drive users to the next buy action quickly." />
      <div className="player-org-pack-row">
        {packs.map((pack) => (
          <div className="player-org-pack-card" key={pack.key}>
            <PackArtwork theme={pack} compact />
            <div className="player-org-pack-card-top">
              <div>
                <SectionTitle as="h3">{pack.name}</SectionTitle>
                <PriceText>{pack.price.toLocaleString('en-US')}</PriceText>
              </div>
              <HotBadge>Hot</HotBadge>
            </div>
            <PackMetaBlock price={pack.price} cardCount={pack.cardCount} oddsTeaser={pack.oddsTeaser} />
            <PackActionCluster />
          </div>
        ))}
      </div>
    </section>
  )
}

export function RareCardLeaderboard() {
  const cards = [
    { rank: '01', name: 'K. MBAPPÉ', rarity: 'DIAMOND_RARE' as const, overall: 91, position: 'ST', nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png', club: 'RMA', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png' },
    { rank: '02', name: 'K. KVARATSKHELIA', rarity: 'GOLD_EPIC' as const, overall: 87, position: 'LW', nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png', club: 'PSG', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png' },
    { rank: '03', name: 'E. HAALAND', rarity: 'DIAMOND_COMMON' as const, overall: 90, position: 'ST', nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/36.png', club: 'MCI', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/10.png' },
  ]

  return (
    <section className="player-org-shelf">
      <BlockHeader eyebrow="Rare Card Leaderboard" title="Highest OVR Pulls" description="Top 3 should have hierarchy and feel aspirational, not like admin rows." />
      <div className="player-org-leaderboard">
        {cards.map((card, index) => (
          <div
            className={`player-org-leaderboard-item${index === 0 ? ' player-org-leaderboard-item-rank-1' : ''}`}
            key={card.rank}
          >
            <div className="player-org-leaderboard-item-top">
              <LabelText>Rank {card.rank}</LabelText>
              <RarityChip rarity={card.rarity}>{card.rarity}</RarityChip>
            </div>
            <div className="player-org-leaderboard-card">
              <CardFrame
                rarity={card.rarity}
                overall={card.overall}
                position={card.position}
                playerName={card.name}
                clubCode={card.club}
                nationImageSrc={card.nationImageSrc}
                clubImageSrc={card.clubImageSrc}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GridShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="player-org-grid-shell">
      <BlockHeader eyebrow={title} title={title} description={description} />
      {children}
    </section>
  )
}

export function PackInventoryGrid() {
  const inventoryPacks = [
    PACK_THEMES.find((pack) => pack.key === 'elite-pack') ?? PACK_THEMES[14],
    PACK_THEMES.find((pack) => pack.key === 'gold-pack') ?? PACK_THEMES[6],
    PACK_THEMES.find((pack) => pack.key === 'goalkeeper-pack') ?? PACK_THEMES[10],
  ]

  return (
    <GridShell title="PackInventoryGrid" description="Inventory stores unopened packs and keeps CTA back to gameplay loop.">
      <div className="player-org-grid-cards">
        {inventoryPacks.map((pack) => (
          <div className="player-org-grid-card" key={pack.key}>
            <SurfacePanel padding={16}>
              <PackArtwork theme={pack} compact />
              <SectionTitle as="h3">{pack.name}</SectionTitle>
              <CaptionText>PENDING</CaptionText>
              <PackMetaBlock price={pack.price} cardCount={pack.cardCount} oddsTeaser={pack.oddsTeaser} />
            </SurfacePanel>
          </div>
        ))}
      </div>
      <div className="player-org-loader-row">
        <LoadingDot aria-label="Loading inventory" />
      </div>
    </GridShell>
  )
}

export function CardCollectionGrid() {
  return (
    <GridShell title="CardCollectionGrid" description="Collection grid supports multi-select and infinite loading.">
      <div className="player-org-grid-cards">
        {[
          { name: 'K. Mbappé', rarity: 'DIAMOND_RARE' as const, overall: 91, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png', club: 'RMA', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png' },
          { name: 'K. Kvaratskhelia', rarity: 'GOLD_EPIC' as const, overall: 87, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png', club: 'PSG', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png' },
          { name: 'E. Haaland', rarity: 'DIAMOND_COMMON' as const, overall: 90, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/36.png', club: 'MCI', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/10.png' },
        ].map((card, index) => (
          <div className="player-org-grid-card" key={card.name}>
            <div className="player-org-grid-select">
              <Checkbox label="" defaultChecked={index === 0} />
            </div>
            <CardFrame
              rarity={card.rarity}
              overall={card.overall}
              position="ST"
              playerName={card.name.toUpperCase()}
              nationImageSrc={card.nationImageSrc}
              clubCode={card.club}
              clubImageSrc={card.clubImageSrc}
            />
          </div>
        ))}
      </div>
      <div className="player-org-loader-row">
        <LoadingDot aria-label="Loading cards" />
      </div>
    </GridShell>
  )
}

export function MarketPackCatalog() {
  return (
    <GridShell title="MarketPackCatalog" description="Pack catalog should sell efficiently and keep details one click away.">
      <div className="player-org-market-row">
        {PACK_THEMES.map((pack, index) => (
          <div className="player-org-market-card" key={pack.key}>
            <PackArtwork theme={pack} compact />
            <div className="player-org-market-card-top">
              <div>
                <SectionTitle as="h3">{pack.name}</SectionTitle>
                <PriceText>{pack.price.toLocaleString('en-US')}</PriceText>
              </div>
              {index >= 14 ? <HotBadge>Elite</HotBadge> : index === 0 ? <HotBadge>Free</HotBadge> : <HotBadge>Store</HotBadge>}
            </div>
            <PackMetaBlock
              price={pack.price}
              cardCount={pack.cardCount}
              oddsTeaser={pack.oddsTeaser}
            />
            <PackActionCluster />
          </div>
        ))}
      </div>
    </GridShell>
  )
}

export function PackDetailPanel() {
  const pack = PACK_THEMES.find((item) => item.key === 'ultimate-pack') ?? PACK_THEMES[15]

  return (
    <section className="player-org-detail-panel" role="region" aria-labelledby="pack-detail-title">
      <BackButton />
      <div className="player-org-detail-layout">
        <PackArtwork theme={pack} />
        <div className="player-org-shelf">
          <div id="pack-detail-title">
            <LabelText>PackDetailPanel</LabelText>
            <SectionTitle as="h2">{pack.name} Detail</SectionTitle>
            <BodyText>Full pack detail lives in a slide-over and should make buy/open decisions easy.</BodyText>
          </div>
          <PackMetaBlock price={pack.price} cardCount={pack.cardCount} oddsTeaser={pack.oddsTeaser} />
          <PackPurchaseChoice value="open-now" />
          <PackActionCluster />
        </div>
      </div>
    </section>
  )
}

export function CardDetailPanel() {
  return (
    <section className="player-org-detail-panel" role="region" aria-labelledby="card-detail-title">
      <BackButton />
      <div className="player-org-detail-layout">
        <CardFrame
          rarity="DIAMOND_RARE"
          overall={91}
          position="ST"
          playerName="K. MBAPPÉ"
          nationImageSrc="https://cdn.futbin.com/content/fifa24/img/nation/18.png"
          clubCode="RMA"
          clubImageSrc="https://cdn.futbin.com/content/fifa24/img/clubs/243.png"
          imageSrc="https://cdn.sofifa.net/players/231/747/26_120.png"
          stats={{ pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 }}
        />
        <div className="player-org-shelf">
          <div id="card-detail-title">
            <LabelText>CardDetailPanel</LabelText>
            <SectionTitle as="h2">Card Detail View</SectionTitle>
            <BodyText>Card detail should support inspection and selling without breaking the gameplay loop.</BodyText>
          </div>
          <div>
            <StatLabel>Sell Price</StatLabel>
            <PriceText>245,000</PriceText>
          </div>
          <BalanceChangeToast amount={245000} message="Selling this card returns coins directly to your wallet." />
          <PrimaryButton>Sell Card</PrimaryButton>
        </div>
      </div>
    </section>
  )
}

export function BulkSellActionBar() {
  return <BulkSelectBar selectedCount={4} totalValue={186000} />
}

export function EmptyStatePanel() {
  return (
    <section className="player-org-empty-panel">
      <EmptyStateIcon>▣</EmptyStateIcon>
      <SectionTitle as="h2">No Packs In Inventory</SectionTitle>
      <BodyText>Go to Market and buy a new pack to jump back into the gameplay loop.</BodyText>
      <PrimaryButton>Go To Market</PrimaryButton>
    </section>
  )
}
