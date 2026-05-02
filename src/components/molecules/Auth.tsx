import { useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { GoldCTAButton, PrimaryButton } from '../atoms/Controls'
import './styles/auth.css'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
  labelAccessory?: ReactNode
  success?: boolean
}

export function FormField({
  id,
  label,
  hint,
  error,
  labelAccessory,
  success,
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
      <span className="auth-form-label-row">
        <span className="auth-form-label">{label}</span>
        {labelAccessory ? <span className="auth-form-label-accessory">{labelAccessory}</span> : null}
      </span>
      <input
        id={inputId}
        className={['auth-form-input', className].filter(Boolean).join(' ')}
        type={type}
        aria-invalid={hasError || undefined}
        aria-describedby={hint || error ? messageId : undefined}
        {...props}
      />
      {success ? (
        <span className="auth-form-success-icon auth-form-success-icon-static" aria-label="Hợp lệ">
          <CheckCircle2 size={18} strokeWidth={2.4} />
        </span>
      ) : null}
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
  labelAccessory,
  success,
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
      <span className="auth-form-label-row">
        <span className="auth-form-label">{label}</span>
        {labelAccessory ? <span className="auth-form-label-accessory">{labelAccessory}</span> : null}
      </span>
      <span className="auth-form-input-shell">
        <input
          id={inputId}
          className={[
            'auth-form-input',
            'auth-form-input-password',
            success ? 'auth-form-input-success' : undefined,
            className,
          ].filter(Boolean).join(' ')}
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
          {visible ? <EyeOff size={18} strokeWidth={2.2} /> : <Eye size={18} strokeWidth={2.2} />}
        </button>
        {success ? (
          <span className="auth-form-success-icon" aria-label="Mật khẩu khớp">
            <CheckCircle2 size={18} strokeWidth={2.4} />
          </span>
        ) : null}
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
  submitTone?: 'blue' | 'gold'
  children?: ReactNode
}

export function AuthFormFooter({
  submitLabel,
  secondaryLabel,
  secondaryHref,
  secondaryPrefix,
  disabled,
  submitTone = 'blue',
  children,
}: AuthFormFooterProps) {
  const SubmitButton = submitTone === 'gold' ? GoldCTAButton : PrimaryButton

  return (
    <div className="auth-form-footer">
      <SubmitButton type="submit" disabled={disabled}>
        {submitLabel}
      </SubmitButton>
      {children}
      <p className="auth-form-link">
        {secondaryPrefix ? `${secondaryPrefix} ` : null}
        <a href={secondaryHref}>{secondaryLabel}</a>
      </p>
    </div>
  )
}
