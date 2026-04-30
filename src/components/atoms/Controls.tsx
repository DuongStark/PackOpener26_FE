import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import type { ReactNode } from 'react'
import './styles/controls.css'

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  hint?: string
  error?: string
  options: Array<{ label: string; value: string }>
}

function buttonClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ')
}

function fieldMessage(error?: string, hint?: string) {
  if (error) {
    return <span className="control-message control-message-error">{error}</span>
  }

  if (hint) {
    return <span className="control-message">{hint}</span>
  }

  return null
}

export function PrimaryButton({ className, ...props }: BaseButtonProps) {
  return <button className={buttonClassName('control-button control-button-primary', className)} {...props} />
}

export function GoldCTAButton({ className, ...props }: BaseButtonProps) {
  return <button className={buttonClassName('control-button control-button-gold', className)} {...props} />
}

export function GhostButton({ className, ...props }: BaseButtonProps) {
  return <button className={buttonClassName('control-button control-button-ghost', className)} {...props} />
}

export function DangerButton({ className, ...props }: BaseButtonProps) {
  return <button className={buttonClassName('control-button control-button-danger', className)} {...props} />
}

export function IconButton({ className, icon = '★', children, ...props }: BaseButtonProps) {
  return (
    <button
      className={buttonClassName('control-button control-button-icon', className)}
      {...props}
    >
      <span aria-hidden="true" className="control-icon-glyph">
        {icon}
      </span>
      {children ? <span className="control-button-label">{children}</span> : null}
    </button>
  )
}

export function BackButton({ className, children = 'Trở về', ...props }: BaseButtonProps) {
  return (
    <button
      className={buttonClassName('control-button control-button-back', className)}
      {...props}
    >
      <span aria-hidden="true" className="control-icon-glyph">
        ←
      </span>
      <span className="control-button-label">{children}</span>
    </button>
  )
}

function FieldWrapper({
  label,
  htmlFor,
  children,
  hint,
  error,
}: {
  label: string
  htmlFor: string
  children: ReactNode
  hint?: string
  error?: string
}) {
  return (
    <label className="control-field" htmlFor={htmlFor}>
      <span className="control-label">{label}</span>
      {children}
      {fieldMessage(error, hint)}
    </label>
  )
}

export function TextInput({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <FieldWrapper label={label} htmlFor={inputId} hint={hint} error={error}>
      <input
        id={inputId}
        className={buttonClassName('control-input', className)}
        type="text"
        {...props}
      />
    </FieldWrapper>
  )
}

export function PasswordInput({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <FieldWrapper label={label} htmlFor={inputId} hint={hint} error={error}>
      <input
        id={inputId}
        className={buttonClassName('control-input', className)}
        type="password"
        {...props}
      />
    </FieldWrapper>
  )
}

export function SearchInput({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <FieldWrapper label={label} htmlFor={inputId} hint={hint} error={error}>
      <span className="control-input-shell">
        <span aria-hidden="true" className="control-input-prefix">
          ⌕
        </span>
        <input
          id={inputId}
          className={buttonClassName('control-input control-input-search', className)}
          type="search"
          {...props}
        />
      </span>
    </FieldWrapper>
  )
}

export function SelectField({
  label,
  hint,
  error,
  className,
  id,
  options,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <FieldWrapper label={label} htmlFor={selectId} hint={hint} error={error}>
      <span className="control-select-shell">
        <select
          id={selectId}
          className={buttonClassName('control-select', className)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="control-select-arrow">
          ▾
        </span>
      </span>
    </FieldWrapper>
  )
}

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  hint?: string
}

export function Checkbox({ label, hint, className, id, ...props }: ChoiceProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label className={buttonClassName('control-choice', className)} htmlFor={inputId}>
      <input id={inputId} className="control-choice-input" type="checkbox" {...props} />
      <span className="control-choice-indicator control-choice-indicator-checkbox" aria-hidden="true" />
      <span className="control-choice-copy">
        <span className="control-label">{label}</span>
        {hint ? <span className="control-message">{hint}</span> : null}
      </span>
    </label>
  )
}

export function Radio({ label, hint, className, id, ...props }: ChoiceProps) {
  const inputId = id ?? `radio-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label className={buttonClassName('control-choice', className)} htmlFor={inputId}>
      <input id={inputId} className="control-choice-input" type="radio" {...props} />
      <span className="control-choice-indicator control-choice-indicator-radio" aria-hidden="true" />
      <span className="control-choice-copy">
        <span className="control-label">{label}</span>
        {hint ? <span className="control-message">{hint}</span> : null}
      </span>
    </label>
  )
}

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  hint?: string
}

export function Toggle({ label, hint, className, id, ...props }: ToggleProps) {
  const inputId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label className={buttonClassName('control-toggle', className)} htmlFor={inputId}>
      <span className="control-choice-copy">
        <span className="control-label">{label}</span>
        {hint ? <span className="control-message">{hint}</span> : null}
      </span>
      <input id={inputId} className="control-toggle-input" type="checkbox" {...props} />
      <span className="control-toggle-track" aria-hidden="true">
        <span className="control-toggle-thumb" />
      </span>
    </label>
  )
}
