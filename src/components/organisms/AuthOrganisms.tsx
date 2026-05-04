import { useState } from 'react'
import type { FormEvent } from 'react'
import { Coins, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { AuthFormFooter, FormField, PasswordField, RewardPill } from '..'
import { loginWithPassword, persistAuthSession, registerWithPassword } from '../../services/authApi'
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

type AuthMode = 'login' | 'register'
type AuthSubmitResult = {
  ok: boolean
  message: string
}

async function submitLogin(payload: { email: string; password: string; remember: boolean }): Promise<AuthSubmitResult> {
  const session = await loginWithPassword({ email: payload.email, password: payload.password })
  persistAuthSession(session, payload.remember)
  window.setTimeout(() => {
    window.history.pushState({}, '', '/home')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, 450)

  return {
    ok: true,
    message: `Đăng nhập thành công. Chào mừng ${session.user.username} quay lại.`,
  }
}

async function submitRegister(payload: { email: string; username: string; password: string }): Promise<AuthSubmitResult> {
  const session = await registerWithPassword(payload)
  persistAuthSession(session, true)
  window.setTimeout(() => {
    window.history.pushState({}, '', '/home')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, 450)

  return {
    ok: true,
    message: `Tạo tài khoản thành công. ${session.user.username} đã sẵn sàng mở pack.`,
  }
}

function getPasswordStrength(password: string) {
  const checks = [
    password.length >= 6,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password) || password.length >= 10,
  ]
  const score = Math.max(1, checks.filter(Boolean).length)
  const labels = ['Yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh']

  return {
    score,
    label: labels[score],
  }
}

function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) {
    return null
  }

  const strength = getPasswordStrength(password)

  return (
    <div className={`auth-password-strength auth-password-strength-${strength.score}`} aria-live="polite">
      <div className="auth-password-strength-meta">
        <span>Độ mạnh mật khẩu</span>
        <strong>{strength.label}</strong>
      </div>
      <div className="auth-password-strength-track" aria-hidden="true">
        {[1, 2, 3, 4].map((level) => (
          <span key={level} className={level <= strength.score ? 'active' : undefined} />
        ))}
      </div>
    </div>
  )
}

const featureCopy = {
  login: {
    eyebrow: 'Sẵn Sàng Mở Pack',
    title: 'Quay Lại Sân Chơi Và Tiếp Tục Săn Thẻ Hiếm',
    body: 'Đăng nhập để kiểm tra coin, mở pack đang chờ và tiếp tục xây dream team của bạn.',
    reward: 'Vòng mở pack gần nhất luôn sẵn sàng khi bạn quay lại.',
    packLabel: 'Live',
    card: {
      rarity: 'DIAMOND_RARE' as const,
      overall: 91,
      position: 'ST',
      playerName: 'K. MBAPPÉ',
      nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png',
      clubCode: 'RMA',
      clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png',
      imageSrc: 'https://cdn.sofifa.net/players/231/747/26_120.png',
      stats: { pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 },
    },
  },
  register: {
    eyebrow: 'Tân Binh Nhận Quà',
    title: 'Tạo Tài Khoản Và Bắt Đầu Với 300 Coin',
    body: 'Vào game nhanh, nhận coin khởi đầu và mở những pack đầu tiên với trải nghiệm rõ ràng.',
    reward: '300 coin được cộng cho tài khoản mới khi luồng API được nối.',
    packLabel: '+300',
    card: {
      rarity: 'GOLD_EPIC' as const,
      overall: 87,
      position: 'LW',
      playerName: 'K. KVARATSKHELIA',
      nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png',
      clubCode: 'PSG',
      clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png',
      imageSrc: 'https://cdn.sofifa.net/players/247/635/26_120.png',
      stats: { pac: 86, sho: 80, pas: 83, dri: 88, def: 58, phy: 78 },
    },
  },
}

export function AuthFeaturePanel({ mode = 'login' }: { mode?: AuthMode }) {
  const copy = featureCopy[mode]

  return (
    <section className={`auth-organisms-feature-panel auth-organisms-feature-panel-${mode}`}>
      <CaptionText>{copy.eyebrow}</CaptionText>
      <SectionTitle as="h2">{copy.title}</SectionTitle>
      <BodyText>
        {copy.body}
      </BodyText>
      <RewardPill
        badge={<NewBadge>{mode === 'register' ? '+300' : 'Live'}</NewBadge>}
        supportingText={copy.reward}
      />
      <div className="auth-organisms-mini-stats" aria-label="Điểm nổi bật">
        <span>
          <Sparkles size={17} />
          Pack hiếm
        </span>
        <span>
          <Coins size={17} />
          Coin rõ ràng
        </span>
        <span>
          <Trophy size={17} />
          Dream team
        </span>
      </div>
      <div className="auth-organisms-visual">
        <PackIcon label={copy.packLabel} />
        <div className="auth-organisms-card-offset">
          <CardFrame glow={mode === 'login'} {...copy.card} />
        </div>
      </div>
      <div className="auth-organisms-trust-strip">
        <ShieldCheck size={18} />
        <span>Thông tin đăng nhập được kiểm tra rõ ràng trước khi tiếp tục.</span>
      </div>
    </section>
  )
}

export function LoginFormPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    setSubmitMessage('')
    setSubmitStatus('')

    if (!email || !email.includes('@') || !password) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitLogin({ email: email.trim(), password, remember })
      setSubmitStatus(result.ok ? 'success' : 'error')
      setSubmitMessage(result.message)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Đăng nhập thất bại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-organisms-form-panel auth-organisms-form-panel-login">
      <LabelText>Đăng Nhập</LabelText>
      <SectionTitle as="h2">Quay Lại Để Tiếp Tục Mở Pack</SectionTitle>
      <BodyText>Nhập email và mật khẩu để trở lại kho pack, coin và đội hình của bạn.</BodyText>
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
          labelAccessory={<a href="/forgot-password">Quên mật khẩu?</a>}
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
          submitTone="blue"
        >
          <label className="auth-remember-choice">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Ghi nhớ trong 30 ngày</span>
          </label>
        </AuthFormFooter>
        {submitMessage ? (
          <p className={`auth-organisms-submit-note auth-organisms-submit-note-${submitStatus}`}>
            {submitMessage}
          </p>
        ) : null}
      </form>
    </section>
  )
}

export function RegisterFormPanel() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

  const emailError =
    emailTouched && email.trim().length === 0
      ? 'Vui lòng nhập email.'
      : emailTouched && !email.includes('@')
        ? 'Email chưa đúng định dạng.'
        : undefined
  const usernameError =
    usernameTouched && username.trim().length < 6
      ? 'Tên người chơi phải có ít nhất 6 ký tự.'
      : usernameTouched && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(username.trim())
        ? 'Tên người chơi 6-20 ký tự, gồm chữ và số.'
      : undefined
  const passwordError =
    passwordTouched && password.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự.' : undefined
  const confirmPasswordError =
    confirmPasswordTouched && confirmPassword.length === 0
      ? 'Vui lòng xác nhận mật khẩu.'
      : confirmPasswordTouched && confirmPassword !== password
        ? 'Mật khẩu xác nhận chưa khớp.'
        : undefined
  const passwordsMatch = password.length > 0 && confirmPassword === password

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setUsernameTouched(true)
    setPasswordTouched(true)
    setConfirmPasswordTouched(true)
    setSubmitMessage('')
    setSubmitStatus('')

    if (
      !email ||
      !email.includes('@') ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(username.trim()) ||
      password.length < 6 ||
      confirmPassword !== password
    ) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitRegister({ email: email.trim(), username: username.trim(), password })
      setSubmitStatus(result.ok ? 'success' : 'error')
      setSubmitMessage(result.message)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Đăng ký thất bại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-organisms-form-panel auth-organisms-form-panel-register">
      <LabelText>Đăng Ký</LabelText>
      <SectionTitle as="h2">Tạo Tài Khoản Và Nhận Ngay Thưởng Khởi Đầu</SectionTitle>
      <RewardPill
        badge={<NewBadge>300</NewBadge>}
        supportingText="Ưu đãi 300 coin luôn được giữ nổi bật trong form."
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
        <PasswordStrengthMeter password={password} />
        <PasswordField
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={() => setConfirmPasswordTouched(true)}
          error={confirmPasswordError}
          success={passwordsMatch}
          placeholder="••••••••"
        />
        <AuthFormFooter
          submitLabel={isSubmitting ? 'Đang Tạo...' : 'Tạo Tài Khoản'}
          secondaryPrefix="Đã có tài khoản?"
          secondaryLabel="Đăng Nhập"
          secondaryHref="/login"
          disabled={isSubmitting}
          submitTone="gold"
        />
        {submitMessage ? (
          <p className={`auth-organisms-submit-note auth-organisms-submit-note-${submitStatus}`}>
            {submitMessage}
          </p>
        ) : null}
      </form>
    </section>
  )
}
