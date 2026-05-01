import { useState } from 'react'
import type { FormEvent } from 'react'
import { Coins, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
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

type AuthMode = 'login' | 'register'
type AuthSubmitResult = {
  ok: boolean
  message: string
}

async function submitLogin(): Promise<AuthSubmitResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))

  return {
    ok: true,
    message: 'Thông tin đã hợp lệ. Bước tiếp theo là nối API đăng nhập thật.',
  }
}

async function submitRegister(): Promise<AuthSubmitResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 800))

  return {
    ok: true,
    message: 'Tài khoản có thể được tạo. Bước tiếp theo là nối API đăng ký thật.',
  }
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setPasswordTouched(true)
    setSubmitMessage('')

    if (!email || !email.includes('@') || !password) {
      return
    }

    setIsSubmitting(true)

    const result = await submitLogin()

    setIsSubmitting(false)
    setSubmitMessage(result.message)
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailTouched(true)
    setUsernameTouched(true)
    setPasswordTouched(true)
    setSubmitMessage('')

    if (!email || !email.includes('@') || username.trim().length < 6 || password.length < 6) {
      return
    }

    setIsSubmitting(true)

    const result = await submitRegister()

    setIsSubmitting(false)
    setSubmitMessage(result.message)
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
        <AuthFormFooter
          submitLabel={isSubmitting ? 'Đang Tạo...' : 'Tạo Tài Khoản'}
          secondaryPrefix="Đã có tài khoản?"
          secondaryLabel="Đăng Nhập"
          secondaryHref="/login"
          disabled={isSubmitting}
          submitTone="gold"
        />
        {submitMessage ? <p className="auth-organisms-submit-note">{submitMessage}</p> : null}
      </form>
    </section>
  )
}
