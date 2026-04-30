import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { PrimaryButton } from '../atoms/Controls'
import './styles/auth.css'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export function FormField({
  id,
  label,
  hint,
  error,
  className,
  type = 'text',
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const hasError = Boolean(error)

  return (
    <label className="auth-form-field" htmlFor={inputId}>
      <span className="auth-form-label">{label}</span>
      <input
        id={inputId}
        className={['auth-form-input', className].filter(Boolean).join(' ')}
        type={type}
        aria-invalid={hasError || undefined}
        aria-describedby={hint || error ? messageId : undefined}
        {...props}
      />
      {hint || error ? (
        <span
          className={['auth-form-hint', hasError ? 'auth-form-error' : undefined].filter(Boolean).join(' ')}
          id={messageId}
          role={hasError ? 'alert' : undefined}
          aria-live={hasError ? 'assertive' : undefined}
        >
          {error ?? hint}
        </span>
      ) : null}
    </label>
  )
}

export function PasswordField({
  id,
  label,
  hint,
  error,
  className,
  ...props
}: Omit<FormFieldProps, 'type'>) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const [visible, setVisible] = useState(false)
  const hasError = Boolean(error)

  return (
    <label className="auth-form-field" htmlFor={inputId}>
      <span className="auth-form-label">{label}</span>
      <span className="auth-form-input-shell">
        <input
          id={inputId}
          className={['auth-form-input', 'auth-form-input-password', className].filter(Boolean).join(' ')}
          type={visible ? 'text' : 'password'}
          aria-invalid={hasError || undefined}
          aria-describedby={hint || error ? messageId : undefined}
          {...props}
        />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
          {visible ? 'Ẩn' : 'Hiện'}
        </button>
      </span>
      {hint || error ? (
        <span
          className={['auth-form-hint', hasError ? 'auth-form-error' : undefined].filter(Boolean).join(' ')}
          id={messageId}
          role={hasError ? 'alert' : undefined}
          aria-live={hasError ? 'assertive' : undefined}
        >
          {error ?? hint}
        </span>
      ) : null}
    </label>
  )
}

type AuthFormFooterProps = {
  submitLabel: string
  secondaryLabel: string
  secondaryHref: string
  secondaryPrefix?: string
  disabled?: boolean
  children?: ReactNode
}

export function AuthFormFooter({
  submitLabel,
  secondaryLabel,
  secondaryHref,
  secondaryPrefix,
  disabled,
  children,
}: AuthFormFooterProps) {
  return (
    <div className="auth-form-footer">
      <PrimaryButton type="submit" disabled={disabled}>
        {submitLabel}
      </PrimaryButton>
      <p className="auth-form-link">
        {secondaryPrefix ? `${secondaryPrefix} ` : null}
        <a href={secondaryHref}>{secondaryLabel}</a>
      </p>
      {children}
    </div>
  )
}
