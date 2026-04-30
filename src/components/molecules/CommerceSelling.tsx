import type { HTMLAttributes } from 'react'
import { DangerButton, GhostButton } from '../atoms/Controls'
import { PriceText, StatLabel, StatValue } from '../atoms/DataAtoms'
import { BodyText, CaptionText, LabelText, SectionTitle } from '../atoms/Typography'
import './styles/commerce-selling.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function SellSummaryRow({
  unitPrice,
  quantity,
  className,
}: {
  unitPrice: number
  quantity: number
  className?: string
}) {
  const total = unitPrice * quantity

  return (
    <div className={joinClassNames('commerce-sell-summary-row', className)}>
      <div className="commerce-sell-summary-item">
        <StatLabel>Unit Price</StatLabel>
        <PriceText>{unitPrice.toLocaleString('en-US')}</PriceText>
      </div>
      <div className="commerce-sell-summary-item">
        <StatLabel>Quantity</StatLabel>
        <StatValue>{quantity}</StatValue>
      </div>
      <div className="commerce-sell-summary-item">
        <StatLabel>Total</StatLabel>
        <PriceText>{total.toLocaleString('en-US')}</PriceText>
      </div>
    </div>
  )
}

export function BulkSelectBar({
  selectedCount,
  totalValue,
  onSell,
  onClear,
  className,
}: {
  selectedCount: number
  totalValue: number
  onSell?: () => void
  onClear?: () => void
  className?: string
}) {
  return (
    <div className={joinClassNames('commerce-bulk-select-bar', className)}>
      <div className="commerce-bulk-select-copy">
        <LabelText>Bulk Sell</LabelText>
        <SectionTitle as="h3">{selectedCount} Cards Selected</SectionTitle>
        <CaptionText>Estimated total value: {totalValue.toLocaleString('en-US')} coins</CaptionText>
      </div>
      <div className="commerce-bulk-select-actions">
        <DangerButton type="button" onClick={onSell}>
          Sell Selected
        </DangerButton>
        <GhostButton type="button" onClick={onClear}>
          Clear Selection
        </GhostButton>
      </div>
    </div>
  )
}

export function ConfirmActionPanel({
  title,
  summary,
  currentBalance,
  expectedBalance,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  title: string
  summary: string
  currentBalance: number
  expectedBalance: number
  primaryLabel: string
  secondaryLabel: string
  onPrimary?: () => void
  onSecondary?: () => void
}) {
  return (
    <div className={joinClassNames('commerce-confirm-panel', className)}>
      <div className="commerce-confirm-summary">
        <LabelText>Confirm Action</LabelText>
        <SectionTitle as="h3">{title}</SectionTitle>
        <BodyText>{summary}</BodyText>
      </div>

      <div className="commerce-confirm-balance">
        <div className="commerce-sell-summary-item">
          <StatLabel>Current Balance</StatLabel>
          <PriceText>{currentBalance.toLocaleString('en-US')}</PriceText>
        </div>
        <div className="commerce-sell-summary-item">
          <StatLabel>Expected Balance</StatLabel>
          <PriceText>{expectedBalance.toLocaleString('en-US')}</PriceText>
        </div>
      </div>

      <div className="commerce-confirm-actions">
        <DangerButton type="button" onClick={onPrimary}>
          {primaryLabel}
        </DangerButton>
        <GhostButton type="button" onClick={onSecondary}>
          {secondaryLabel}
        </GhostButton>
      </div>
    </div>
  )
}
