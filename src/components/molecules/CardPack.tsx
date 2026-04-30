import { useEffect, useId, useRef } from 'react'
import type { HTMLAttributes } from 'react'
import { GhostButton, GoldCTAButton, PrimaryButton } from '../atoms/Controls'
import { PriceText, StatLabel, TableCellNumber } from '../atoms/DataAtoms'
import { RarityChip } from '../atoms/Indicators'
import { ClubBadge, FlagIcon } from '../atoms/VisualPrimitives'
import { BodyText, CaptionText, LabelText, StatNumber } from '../atoms/Typography'
import './styles/card-pack.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
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
