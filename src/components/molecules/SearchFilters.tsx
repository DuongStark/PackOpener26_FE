import type { ReactNode } from 'react'
import { GhostButton, SearchInput, SelectField } from '../atoms/Controls'
import { LabelText, SectionTitle } from '../atoms/Typography'
import { CaptionText } from '../atoms/Typography'
import './styles/search-filters.css'

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={joinClassNames('search-filters-search', className)}>
      <SearchInput
        label="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

type FilterChipGroupProps = {
  options: Array<{ label: string; value: string }>
  selected: string[]
  onToggle: (value: string) => void
  className?: string
}

export function FilterChipGroup({
  options,
  selected,
  onToggle,
  className,
}: FilterChipGroupProps) {
  return (
    <div className={joinClassNames('search-filters-chip-group', className)}>
      {options.map((option) => {
        const active = selected.includes(option.value)

        return (
          <button
            key={option.value}
            type="button"
            className={joinClassNames(
              'search-filters-chip',
              active ? 'search-filters-chip-active' : undefined,
            )}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function SortControl({
  value,
  onChange,
  options,
  className,
}: {
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
  className?: string
}) {
  return (
    <div className={joinClassNames('search-filters-sort', className)}>
      <SelectField
        label="Sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={options}
      />
    </div>
  )
}

export function FilterDropdown({
  value,
  onChange,
  label,
  options,
  className,
}: {
  value: string
  onChange: (value: string) => void
  label: string
  options: Array<{ label: string; value: string }>
  className?: string
}) {
  return (
    <div className={joinClassNames('search-filters-dropdown', className)}>
      <SelectField
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={options}
      />
    </div>
  )
}

export function ResultCountBar({
  count,
  title,
  activeFilters,
  onClear,
  helper,
  className,
}: {
  count: number
  title: string
  activeFilters: ReactNode[]
  onClear?: () => void
  helper?: string
  className?: string
}) {
  return (
    <div className={joinClassNames('search-filters-result-bar', className)}>
      <div className="search-filters-result-copy">
        <LabelText>{title}</LabelText>
        <SectionTitle as="h3">{count} Results</SectionTitle>
        {helper ? <CaptionText>{helper}</CaptionText> : null}
      </div>

      <div className="search-filters-active-tags">
        {activeFilters}
        {onClear ? (
          <GhostButton type="button" onClick={onClear}>
            Clear Filters
          </GhostButton>
        ) : null}
      </div>
    </div>
  )
}
