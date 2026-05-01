import type { CSSProperties } from 'react'
import heroImage from '../assets/hero.png'
import {
  AuthFeaturePanel,
  AuthSpotlightTemplate,
  LabelText,
  LoginFormPanel,
} from '../components'
import './styles/auth-pages.css'

export default function LoginPage() {
  return (
    <div
      className="auth-page-root auth-page-login"
      style={{ '--auth-page-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="auth-page-stars" aria-hidden="true" />
      <div className="auth-page-chrome">
        <div className="auth-page-brand">
          <span className="auth-page-logo" aria-hidden="true" />
          <div className="auth-page-brand-copy">
            <LabelText>PackOpener2026</LabelText>
            <span className="auth-page-brand-note">Đăng nhập để quay lại nhịp mở pack của bạn</span>
          </div>
        </div>
        <div className="auth-page-links">
          <a className="auth-page-link" href="/">
            Landing
          </a>
          <a className="auth-page-link auth-page-link-active" href="/login">
            Đăng Nhập
          </a>
          <a className="auth-page-link" href="/register">
            Đăng Ký
          </a>
        </div>
      </div>

      <AuthSpotlightTemplate formPanel={<LoginFormPanel />} visualPanel={<AuthFeaturePanel mode="login" />} />
    </div>
  )
}
