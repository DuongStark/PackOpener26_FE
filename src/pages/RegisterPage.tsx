import type { CSSProperties } from 'react'
import heroImage from '../assets/hero.png'
import {
  AuthFeaturePanel,
  AuthSpotlightTemplate,
  LabelText,
  RegisterFormPanel,
} from '../components'
import './styles/auth-pages.css'

export default function RegisterPage() {
  return (
    <div
      className="auth-page-root auth-page-register"
      style={{ '--auth-page-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="auth-page-chrome">
        <div className="auth-page-brand">
          <LabelText>PackOpener2026</LabelText>
          <span className="auth-page-brand-note">Tạo tài khoản và nhận ngay 1000 coin khởi đầu</span>
        </div>
        <div className="auth-page-links">
          <a className="auth-page-link" href="/">
            Landing
          </a>
          <a className="auth-page-link" href="/login">
            Đăng Nhập
          </a>
          <a className="auth-page-link auth-page-link-active" href="/register">
            Đăng Ký
          </a>
        </div>
      </div>

      <AuthSpotlightTemplate formPanel={<RegisterFormPanel />} visualPanel={<AuthFeaturePanel />} />
    </div>
  )
}
