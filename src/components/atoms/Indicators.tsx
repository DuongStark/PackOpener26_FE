import type { HTMLAttributes } from 'react'
import './styles/indicators.css'
import type { CardRarity } from './VisualPrimitives'

type LegacyRarity = 'bronze' | 'silver' | 'gold' | 'special' | 'elite'
type Rarity = CardRarity | LegacyRarity
type Status = 'pending' | 'opened' | 'sold' | 'error'
type DeltaTone = 'positive' | 'negative' | 'neutral'

type CommonProps = HTMLAttributes<HTMLSpanElement>

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

const rarityAliases: Record<LegacyRarity, CardRarity> = {
  bronze: 'BRONZE_RARE',
  silver: 'SILVER_RARE',
  gold: 'GOLD_RARE',
  special: 'GOLD_EPIC',
  elite: 'DIAMOND_RARE',
}

function resolveRarity(rarity: Rarity): CardRarity {
  if (rarity in rarityAliases) {
    return rarityAliases[rarity as LegacyRarity]
  }

  return rarity as CardRarity
}

function rarityClassName(rarity: Rarity) {
  return `indicator-chip-${resolveRarity(rarity).toLowerCase().replace(/_/g, '-')}`
}

export function RarityChip({
  rarity,
  children,
  className,
  ...props
}: CommonProps & { rarity: Rarity }) {
  return (
    <span
      className={joinClassNames('indicator-chip', rarityClassName(rarity), className)}
      {...props}
    >
      {children ?? rarity}
    </span>
  )
}

export function StatusBadge({
  status,
  children,
  className,
  ...props
}: CommonProps & { status: Status }) {
  return (
    <span
      className={joinClassNames(
        'indicator-badge',
        'indicator-badge-status',
        `indicator-badge-status-${status}`,
        className,
      )}
      {...props}
    >
      {children ?? status}
    </span>
  )
}

export function NewBadge({ children = 'New', className, ...props }: CommonProps) {
  return (
    <span className={joinClassNames('indicator-badge', 'indicator-badge-new', className)} {...props}>
      {children}
    </span>
  )
}

export function HotBadge({ children = 'Hot', className, ...props }: CommonProps) {
  return (
    <span className={joinClassNames('indicator-badge', 'indicator-badge-hot', className)} {...props}>
      {children}
    </span>
  )
}

export function MetricDelta({
  tone,
  value,
  className,
  ...props
}: CommonProps & { tone: DeltaTone; value: string }) {
  const glyph = tone === 'positive' ? '↑' : tone === 'negative' ? '↓' : '•'

  return (
    <span
      className={joinClassNames('indicator-metric-delta', `indicator-metric-delta-${tone}`, className)}
      {...props}
    >
      <span aria-hidden="true">{glyph}</span>
      <span>{value}</span>
    </span>
  )
}

export function LoadingDot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={joinClassNames('indicator-loading-dot', className)} {...props}>
      <span />
      <span />
      <span />
    </div>
  )
}

export function SkeletonBlock({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={joinClassNames('indicator-skeleton', className)} style={style} {...props} />
}

export function Divider({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={joinClassNames('indicator-divider', className)} {...props} />
}
