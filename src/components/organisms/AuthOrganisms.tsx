import { useState } from 'react'
import { AuthFormFooter, FormField, PasswordField, RewardPill } from '..'
import {
  BodyText,
  CaptionText,
  CardFrame,
  LabelText,
  NewBadge,
  PackIcon,
  SectionTitle,
} from '..'
import './styles/auth-organisms.css'

export function AuthFeaturePanel() {
  return (
    <section className="auth-organisms-feature-panel">
      <CaptionText>Khối Kể Chuyện Trực Quan</CaptionText>
      <SectionTitle as="h2">Vào Game Với Coin Khởi Đầu, Ở Lại Vì Những Pha Nổ Pack</SectionTitle>
      <BodyText>
        PackOpener2026 cho người chơi mới lượng coin khởi đầu đủ để lao ngay vào vòng lặp mua gói, mở thẻ và bán thẻ trùng một cách liền mạch.
      </BodyText>
      <RewardPill
        badge={<NewBadge>+1000</NewBadge>}
        supportingText="Thưởng 1000 coin luôn hiện rõ trong luồng đăng ký."
      />
      <div className="auth-organisms-visual">
        <PackIcon label="Mới" />
        <div className="auth-organisms-card-offset">
          <CardFrame rarity="gold" overall={91} position="CAM" playerName="JAMAL MUSIALA" nationFlag="🇩🇪" clubCode="FCB" />
        </div>
      </div>
    </section>
  )
}

export function LoginFormPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const emailError =
    emailTouched && email.trim().length === 0
      ? 'Vui lòng nhập email.'
      : emailTouched && !email.includes('@')
        ? 'Email chưa đúng định dạng.'
        : undefined
  const passwordError =
    passwordTouched && password.trim().length === 0 ? 'Vui lòng nhập mật khẩu.' : undefined

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    setSubmitMessage('')

    if (!email || !email.includes('@') || !password) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => window.setTimeout(resolve, 700))

    setIsSubmitting(false)
    setSubmitMessage('Thông tin đã hợp lệ. Bước tiếp theo là nối API đăng nhập thật.')
  }

  return (
    <section className="auth-organisms-form-panel">
      <LabelText>Đăng Nhập</LabelText>
      <SectionTitle as="h2">Quay Lại Để Tiếp Tục Mở Pack</SectionTitle>
      <form className="auth-organisms-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          placeholder="ban@example.com"
          error={emailError}
        />
        <PasswordField
          label="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setPasswordTouched(true)}
          placeholder="••••••••"
          error={passwordError}
        />
        <AuthFormFooter
          submitLabel={isSubmitting ? 'Đang Xử Lý...' : 'Đăng Nhập'}
          secondaryPrefix="Chưa có tài khoản?"
          secondaryLabel="Đăng Ký"
          secondaryHref="/register"
          disabled={isSubmitting}
        />
        {submitMessage ? <p className="auth-organisms-submit-note">{submitMessage}</p> : null}
      </form>
    </section>
  )
}

export function RegisterFormPanel() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const emailError =
    emailTouched && email.trim().length === 0
      ? 'Vui lòng nhập email.'
      : emailTouched && !email.includes('@')
        ? 'Email chưa đúng định dạng.'
        : undefined
  const usernameError =
    usernameTouched && username.trim().length < 6
      ? 'Tên người chơi phải có ít nhất 6 ký tự.'
      : undefined
  const passwordError =
    passwordTouched && password.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự.' : undefined

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setUsernameTouched(true)
    setPasswordTouched(true)
    setSubmitMessage('')

    if (!email || !email.includes('@') || username.trim().length < 6 || password.length < 6) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => window.setTimeout(resolve, 800))

    setIsSubmitting(false)
    setSubmitMessage('Tài khoản có thể được tạo. Bước tiếp theo là nối API đăng ký thật.')
  }

  return (
    <section className="auth-organisms-form-panel">
      <LabelText>Đăng Ký</LabelText>
      <SectionTitle as="h2">Tạo Tài Khoản Và Nhận Ngay Thưởng Khởi Đầu</SectionTitle>
      <RewardPill
        badge={<NewBadge>1000</NewBadge>}
        supportingText="Ưu đãi 1000 coin luôn được giữ nổi bật trong form."
      />
      <form className="auth-organisms-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          placeholder="ban@example.com"
          error={emailError}
        />
        <FormField
          label="Tên người chơi"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onBlur={() => setUsernameTouched(true)}
          placeholder="tennguoichoi"
          hint="6-20 ký tự, chỉ gồm chữ và số."
          error={usernameError}
        />
        <PasswordField
          label="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setPasswordTouched(true)}
          error={passwordError}
          hint={password.length >= 6 ? 'Tối thiểu 6 ký tự.' : undefined}
          placeholder="••••••••"
        />
        <AuthFormFooter
          submitLabel={isSubmitting ? 'Đang Tạo...' : 'Tạo Tài Khoản'}
          secondaryPrefix="Đã có tài khoản?"
          secondaryLabel="Đăng Nhập"
          secondaryHref="/login"
          disabled={isSubmitting}
        />
        {submitMessage ? <p className="auth-organisms-submit-note">{submitMessage}</p> : null}
      </form>
    </section>
  )
}
