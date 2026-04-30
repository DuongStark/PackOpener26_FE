import type { ReactNode } from 'react'
import { GhostButton, PrimaryButton } from '../atoms/Controls'
import { StatLabel, StatValue, TimestampText } from '../atoms/DataAtoms'
import { MetricDelta, NewBadge } from '../atoms/Indicators'
import { EmptyStateIcon } from '../atoms/DataAtoms'
import { BodyText, LabelText } from '../atoms/Typography'
import { SearchBar, SortControl } from './SearchFilters'
import './styles/table-admin.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  onCreate,
  className,
}: {
  searchValue: string
  onSearchChange: (value: string) => void
  sortValue: string
  onSortChange: (value: string) => void
  onCreate?: () => void
  className?: string
}) {
  return (
    <div className={joinClassNames('table-admin-toolbar', className)}>
      <div className="table-admin-toolbar-main">
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder="Search cards, packs, users..." />
      </div>
      <div className="table-admin-toolbar-controls">
        <SortControl
          value={sortValue}
          onChange={onSortChange}
          options={[
            { label: 'Newest First', value: 'newest' },
            { label: 'Updated Recently', value: 'updated' },
            { label: 'Highest Value', value: 'value' },
          ]}
        />
        <PrimaryButton type="button" onClick={onCreate}>
          Create Entity
        </PrimaryButton>
      </div>
    </div>
  )
}

export function TableRowActions({
  onView,
  onEdit,
  onDelete,
  className,
}: {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}) {
  return (
    <div className={joinClassNames('table-admin-row-actions', className)}>
      <GhostButton type="button" onClick={onView}>
        View
      </GhostButton>
      <GhostButton type="button" onClick={onEdit}>
        Edit
      </GhostButton>
      <GhostButton type="button" onClick={onDelete}>
        Delete
      </GhostButton>
    </div>
  )
}

export function MetricCard({
  label,
  value,
  delta,
  helperText,
  highlighted = false,
  className,
}: {
  label: string
  value: string
  delta?: { tone: 'positive' | 'negative' | 'neutral'; value: string }
  helperText?: string
  highlighted?: boolean
  className?: string
}) {
  return (
    <div
      className={joinClassNames(
        'table-admin-metric-card',
        highlighted ? 'table-admin-metric-card-highlight' : undefined,
        className,
      )}
    >
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
      {delta ? <MetricDelta tone={delta.tone} value={delta.value} /> : null}
      {helperText ? <span className="table-admin-metric-helper">{helperText}</span> : null}
    </div>
  )
}

export function ActivityListItem({
  title,
  description,
  timestamp,
  badge,
  icon,
  className,
}: {
  title: string
  description: string
  timestamp: string
  badge?: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <div className={joinClassNames('table-admin-activity-item', className)}>
      <div className="table-admin-activity-icon">
        {icon ?? <EmptyStateIcon>▦</EmptyStateIcon>}
      </div>
      <div className="table-admin-activity-copy">
        <LabelText>{title}</LabelText>
        <BodyText>{description}</BodyText>
        <TimestampText>{timestamp}</TimestampText>
      </div>
      {badge ?? <NewBadge>Live</NewBadge>}
    </div>
  )
}
