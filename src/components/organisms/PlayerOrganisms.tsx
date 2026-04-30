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
  PackActionCluster,
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
    ['Elite Pack', 120000, 'Guaranteed 1 Gold+ player'],
    ['Promo Pack', 180000, 'Increased Special card chance'],
    ['Starter Pack', 30000, 'Cheap entry for first session'],
  ] as const

  return (
    <section className="player-org-shelf">
      <BlockHeader eyebrow="Featured Pack Shelf" title="Highlighted Packs" description="Home and market should drive users to the next buy action quickly." />
      <div className="player-org-pack-row">
        {packs.map(([name, price, teaser]) => (
          <div className="player-org-pack-card" key={name}>
            <div className="player-org-pack-card-top">
              <div>
                <SectionTitle as="h3">{name}</SectionTitle>
                <PriceText>{price.toLocaleString('en-US')}</PriceText>
              </div>
              <HotBadge>Hot</HotBadge>
            </div>
            <PackMetaBlock price={price} cardCount={3} oddsTeaser={teaser} />
            <PackActionCluster />
          </div>
        ))}
      </div>
    </section>
  )
}

export function RareCardLeaderboard() {
  const cards = [
    { rank: '01', name: 'LIONEL MESSI', rarity: 'elite' as const, overall: 97, position: 'RW', nation: '🇦🇷', club: 'MIA' },
    { rank: '02', name: 'KYLIAN MBAPPE', rarity: 'special' as const, overall: 95, position: 'ST', nation: '🇫🇷', club: 'RMA' },
    { rank: '03', name: 'JUDE BELLINGHAM', rarity: 'gold' as const, overall: 94, position: 'CM', nation: '🏴', club: 'RMA' },
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
                nationFlag={card.nation}
                clubCode={card.club}
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
  return (
    <GridShell title="PackInventoryGrid" description="Inventory stores unopened packs and keeps CTA back to gameplay loop.">
      <div className="player-org-grid-cards">
        {['Elite Pack', 'Promo Pack', 'Gold Pack'].map((name) => (
          <div className="player-org-grid-card" key={name}>
            <SurfacePanel padding={16}>
              <SectionTitle as="h3">{name}</SectionTitle>
              <CaptionText>PENDING</CaptionText>
              <PackMetaBlock price={60000} cardCount={3} oddsTeaser="Gold+ guaranteed" />
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
        {['Messi', 'Haaland', 'Musiala'].map((name, index) => (
          <div className="player-org-grid-card" key={name}>
            <div className="player-org-grid-select">
              <Checkbox label="" defaultChecked={index === 0} />
            </div>
            <CardFrame rarity={index === 0 ? 'elite' : index === 1 ? 'gold' : 'special'} overall={95 - index} position="ST" playerName={name.toUpperCase()} nationFlag="🇦🇷" clubCode="FC" />
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
        {['Elite Pack', 'Best Value Pack', 'Limited Pack'].map((name, index) => (
          <div className="player-org-market-card" key={name}>
            <div className="player-org-market-card-top">
              <div>
                <SectionTitle as="h3">{name}</SectionTitle>
                <PriceText>{(index + 1) * 60000}</PriceText>
              </div>
              {index === 2 ? <HotBadge>Limited</HotBadge> : <HotBadge>Best Value</HotBadge>}
            </div>
            <PackMetaBlock
              price={(index + 1) * 60000}
              cardCount={index + 2}
              oddsTeaser="Special flare and higher OVR ceiling"
            />
            <PackActionCluster />
          </div>
        ))}
      </div>
    </GridShell>
  )
}

export function PackDetailPanel() {
  return (
    <section className="player-org-detail-panel" role="region" aria-labelledby="pack-detail-title">
      <BackButton />
      <div className="player-org-detail-layout">
        <CardFrame rarity="special" overall={94} position="PK" playerName="ELITE PACK" nationFlag="🏁" clubCode="PK" />
        <div className="player-org-shelf">
          <div id="pack-detail-title">
            <LabelText>PackDetailPanel</LabelText>
            <SectionTitle as="h2">Elite Pack Detail</SectionTitle>
            <BodyText>Full pack detail lives in a slide-over and should make buy/open decisions easy.</BodyText>
          </div>
          <PackMetaBlock price={120000} cardCount={3} oddsTeaser="Guaranteed 1 Gold+ with boosted Special chance." />
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
        <CardFrame rarity="elite" overall={97} position="RW" playerName="LIONEL MESSI" nationFlag="🇦🇷" clubCode="MIA" />
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
