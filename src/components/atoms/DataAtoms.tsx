import type { HTMLAttributes, TimeHTMLAttributes } from 'react'
import './styles/data-atoms.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function StatLabel({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={joinClassNames('data-stat-label', className)} {...props} />
}

export function StatValue({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={joinClassNames('data-stat-value', className)} {...props} />
}

export function PriceText({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={joinClassNames('data-price-text', className)} {...props}>
      {children}
    </span>
  )
}

export function TimestampText({
  className,
  ...props
}: TimeHTMLAttributes<HTMLTimeElement>) {
  return <time className={joinClassNames('data-timestamp-text', className)} {...props} />
}

export function EmptyStateIcon({
  className,
  children = '◌',
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={joinClassNames('data-empty-state-icon', className)} aria-hidden="true" {...props}>
      {children}
    </span>
  )
}

export function TableCellText({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={joinClassNames('data-table-cell-text', className)} {...props} />
}

export function TableCellNumber({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={joinClassNames('data-table-cell-number', className)} {...props} />
}
