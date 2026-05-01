import { useEffect, useId, useRef } from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import {
  BrickWallShield,
  Circle,
  CircleDot,
  Crosshair,
  Crown,
  Gem,
  Goal,
  Hand,
  Layers,
  Plus,
  Shield,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { GhostButton, GoldCTAButton, PrimaryButton } from '../atoms/Controls'
import { PriceText, StatLabel, TableCellNumber } from '../atoms/DataAtoms'
import { RarityChip } from '../atoms/Indicators'
import { ClubBadge, FlagIcon } from '../atoms/VisualPrimitives'
import { BodyText, CaptionText, LabelText, StatNumber } from '../atoms/Typography'
import { PACK_THEMES, type PackIconName, type PackKey, type PackTheme } from './packThemes'
import './styles/card-pack.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

const packThemeByKey = new Map(PACK_THEMES.map((theme) => [theme.key, theme]))

function PackCrestIcon({ icon }: { icon: PackIconName }) {
  if (icon === 'lifeline') {
    return (
      <>
        <Shield />
        <Plus className="card-pack-crest-subicon" />
      </>
    )
  }

  if (icon === 'shield-plus') {
    return (
      <>
        <Shield />
        <Plus className="card-pack-crest-subicon" />
      </>
    )
  }

  if (icon === 'rare-star') {
    return (
      <>
        <Star />
        <Gem className="card-pack-crest-subicon" />
      </>
    )
  }

  if (icon === 'ultimate') {
    return (
      <>
        <Crown />
        <Sparkles className="card-pack-crest-subicon" />
      </>
    )
  }

  const icons = {
    shield: Shield,
    star: Star,
    stack: Layers,
    wall: BrickWallShield,
    glove: Hand,
    midfield: Crosshair,
    forward: Zap,
    crown: Crown,
  } satisfies Record<Exclude<PackIconName, 'lifeline' | 'shield-plus' | 'rare-star' | 'ultimate'>, typeof Shield>

  const Icon = icons[icon]
  return <Icon />
}

function formatPackPrice(price: number) {
  if (price === 0) {
    return 'FREE'
  }

  if (price >= 1000) {
    return `${Number.isInteger(price / 1000) ? price / 1000 : (price / 1000).toFixed(1)}K`
  }

  return price.toString()
}

export function PackArtwork({
  packKey,
  theme,
  compact = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  packKey?: PackKey | string
  theme?: PackTheme
  compact?: boolean
}) {
  const packTheme = theme ?? (packKey ? packThemeByKey.get(packKey) : undefined) ?? PACK_THEMES[0]
  const style = {
    '--pack-dark': packTheme.dark,
    '--pack-primary': packTheme.primary,
    '--pack-secondary': packTheme.secondary,
    '--pack-light': packTheme.light,
    '--pack-accent': packTheme.accent,
    '--pack-glow': packTheme.glow,
  } as CSSProperties

  return (
    <div
      className={joinClassNames(
        'card-pack-artwork',
        `card-pack-material-${packTheme.material}`,
        `card-pack-pattern-${packTheme.pattern}`,
        `card-pack-shine-${packTheme.shine}`,
        compact ? 'card-pack-artwork-compact' : undefined,
        className,
      )}
      style={style}
      aria-label={`${packTheme.name} artwork`}
      {...props}
    >
      <div className="card-pack-crimp card-pack-crimp-top" />
      <div className="card-pack-crimp card-pack-crimp-bottom" />
      <div className="card-pack-side-fold" />
      <div className="card-pack-inner">
        <div className="card-pack-brand-row">
          <span>PACKOPENER 26</span>
          <span>{packTheme.tierCode}</span>
        </div>
        <div className="card-pack-title-panel">
          <strong>{packTheme.name}</strong>
          <span>{packTheme.subtitle}</span>
        </div>
        <div className="card-pack-crest" aria-hidden="true">
          <PackCrestIcon icon={packTheme.icon} />
        </div>
        <div className="card-pack-orbit" aria-hidden="true">
          <Circle />
          <CircleDot />
          <Goal />
        </div>
        <div className="card-pack-bottom-chips">
          <span>{packTheme.cardCount} CARDS</span>
          <span>{formatPackPrice(packTheme.price)}</span>
        </div>
      </div>
      <div className="card-pack-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export function PlayerStatItem({
  label,
  value,
  className,
}: {
  label: string
  value: string | number
  className?: string
}) {
  return (
    <div className={joinClassNames('card-pack-stat-item', className)}>
      <StatNumber>{value}</StatNumber>
      <LabelText>{label}</LabelText>
    </div>
  )
}

export function PlayerMetaGroup({
  position,
  nation,
  club,
  className,
}: {
  position: string
  nation: string
  club: string
  className?: string
}) {
  return (
    <div className={joinClassNames('card-pack-meta-group', className)}>
      <LabelText>{position}</LabelText>
      <FlagIcon flag={nation} />
      <ClubBadge>{club}</ClubBadge>
    </div>
  )
}

export function PlayerNameBar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const nameRef = useRef<HTMLSpanElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const nameEl = nameRef.current
    const frameEl = frameRef.current

    if (!nameEl || !frameEl) {
      return
    }

    nameEl.style.transform = 'scaleX(1)'
    const containerWidth = frameEl.clientWidth
    const textWidth = nameEl.scrollWidth
    const scale = textWidth > containerWidth ? Math.max(0.72, containerWidth / textWidth) : 1
    nameEl.style.transform = `scaleX(${scale})`
  }, [name])

  return (
    <div className={joinClassNames('card-pack-name-bar', className)} ref={frameRef}>
      <span className="text-player-name card-pack-name-fit" ref={nameRef}>
        {name}
      </span>
    </div>
  )
}

export function PackMetaBlock({
  price,
  cardCount,
  oddsTeaser,
  className,
}: {
  price: number
  cardCount: number
  oddsTeaser: string
  className?: string
}) {
  return (
    <div className={joinClassNames('card-pack-meta-block', className)}>
      <div className="card-pack-meta-row">
        <div className="card-pack-meta-copy">
          <StatLabel>Price</StatLabel>
          <PriceText>{price.toLocaleString('en-US')}</PriceText>
        </div>
        <div className="card-pack-meta-copy">
          <StatLabel>Cards Inside</StatLabel>
          <TableCellNumber>{cardCount}</TableCellNumber>
        </div>
      </div>

      <div className="card-pack-odds">
        <CaptionText>Odds Teaser</CaptionText>
        <RarityChip rarity="gold">Gold+</RarityChip>
        <BodyText>{oddsTeaser}</BodyText>
      </div>
    </div>
  )
}

type PackPurchaseChoiceProps = {
  value?: 'open-now' | 'send-inventory'
  onChange?: (value: 'open-now' | 'send-inventory') => void
  className?: string
}

export function PackPurchaseChoice({
  value = 'open-now',
  onChange,
  className,
}: PackPurchaseChoiceProps) {
  const groupName = useId()
  const options = [
    {
      value: 'open-now' as const,
      title: 'Open Now',
      supporting: 'Vào ngay sequence mở pack sau khi thanh toán.',
    },
    {
      value: 'send-inventory' as const,
      title: 'Send to Inventory',
      supporting: 'Lưu pack vào kho để mở sau.',
    },
  ]

  return (
    <div className={joinClassNames('card-pack-purchase-choice', className)}>
      {options.map((option) => (
        <label className="card-pack-choice" key={option.value}>
          <input
            className="card-pack-choice-input"
            type="radio"
            name={groupName}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
          <span className="card-pack-choice-indicator" aria-hidden="true" />
          <span className="card-pack-choice-copy">
            <LabelText>{option.title}</LabelText>
            <BodyText>{option.supporting}</BodyText>
          </span>
        </label>
      ))}
    </div>
  )
}

export function PackActionCluster({
  onBuy,
  onView,
  onOpen,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  onBuy?: () => void
  onView?: () => void
  onOpen?: () => void
}) {
  return (
    <div className={joinClassNames('card-pack-action-cluster', className)}>
      <GoldCTAButton type="button" onClick={onBuy}>
        Buy Pack
      </GoldCTAButton>
      <GhostButton type="button" onClick={onView}>
        View Detail
      </GhostButton>
      <PrimaryButton type="button" onClick={onOpen}>
        Open Pack
      </PrimaryButton>
    </div>
  )
}
