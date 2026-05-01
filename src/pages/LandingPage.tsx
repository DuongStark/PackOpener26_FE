import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, ShoppingBag, Package, DollarSign, MessageCircle } from "lucide-react";
import {
  CardFrame,
  PACK_THEMES,
  PackArtwork,
  PublicMarketingTemplate,
  RarityShowcaseSection,
} from "../components";

import "./styles/landing-page.css";

const HexagonLogo = () => (
  <svg className="landing-topbar-logo" viewBox="0 0 36 36" fill="none">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
    <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" fill="url(#logoGradient)" />
    <path d="M18 8L26 13V23L18 28L10 23V13L18 8Z" fill="#070d1d" />
  </svg>
);

const StatsIcons = {
  packs: () => (
    <svg className="landing-stats-icon" viewBox="0 0 24 24">
      <path d="M16.5 2.75h-9a2.25 2.25 0 0 0-2.25 2.25v15a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25Z" />
      <path d="M9 2.75h6a2.25 2.25 0 0 1 2.25 2.25V5h-10.5V5A2.25 2.25 0 0 1 9 2.75Z" />
    </svg>
  ),
  elite: () => (
    <svg className="landing-stats-icon" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
  coin: () => (
    <svg className="landing-stats-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M9 9h6M9 15h6" />
    </svg>
  ),
  users: () => (
    <svg className="landing-stats-icon" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const starFieldData = [
  { id: 1, size: 1, opacity: 0.5, isTwinkle: false, top: 5, left: 8 },
  { id: 2, size: 1.5, opacity: 0.7, isTwinkle: true, top: 12, left: 15 },
  { id: 3, size: 1, opacity: 0.4, isTwinkle: false, top: 8, left: 25 },
  { id: 4, size: 2, opacity: 0.6, isTwinkle: true, top: 18, left: 32 },
  { id: 5, size: 1, opacity: 0.3, isTwinkle: false, top: 3, left: 42 },
  { id: 6, size: 1.5, opacity: 0.8, isTwinkle: false, top: 22, left: 48 },
  { id: 7, size: 1, opacity: 0.5, isTwinkle: true, top: 10, left: 55 },
  { id: 8, size: 1, opacity: 0.4, isTwinkle: false, top: 25, left: 62 },
  { id: 9, size: 1.5, opacity: 0.6, isTwinkle: false, top: 15, left: 70 },
  { id: 10, size: 2, opacity: 0.7, isTwinkle: true, top: 30, left: 78 },
  { id: 11, size: 1, opacity: 0.3, isTwinkle: false, top: 8, left: 85 },
  { id: 12, size: 1, opacity: 0.5, isTwinkle: false, top: 35, left: 92 },
  { id: 13, size: 1.5, opacity: 0.6, isTwinkle: true, top: 20, left: 5 },
  { id: 14, size: 1, opacity: 0.4, isTwinkle: false, top: 40, left: 18 },
  { id: 15, size: 2, opacity: 0.8, isTwinkle: true, top: 45, left: 28 },
  { id: 16, size: 1, opacity: 0.3, isTwinkle: false, top: 28, left: 38 },
  { id: 17, size: 1.5, opacity: 0.7, isTwinkle: false, top: 50, left: 45 },
  { id: 18, size: 1, opacity: 0.5, isTwinkle: true, top: 38, left: 52 },
  { id: 19, size: 1, opacity: 0.4, isTwinkle: false, top: 55, left: 60 },
  { id: 20, size: 1.5, opacity: 0.6, isTwinkle: false, top: 42, left: 68 },
  { id: 21, size: 2, opacity: 0.7, isTwinkle: true, top: 60, left: 75 },
  { id: 22, size: 1, opacity: 0.3, isTwinkle: false, top: 32, left: 82 },
  { id: 23, size: 1, opacity: 0.5, isTwinkle: false, top: 65, left: 88 },
  { id: 24, size: 1.5, opacity: 0.6, isTwinkle: true, top: 48, left: 3 },
  { id: 25, size: 1, opacity: 0.4, isTwinkle: false, top: 70, left: 12 },
  { id: 26, size: 2, opacity: 0.8, isTwinkle: false, top: 75, left: 22 },
  { id: 27, size: 1, opacity: 0.3, isTwinkle: false, top: 52, left: 35 },
  { id: 28, size: 1.5, opacity: 0.7, isTwinkle: true, top: 80, left: 42 },
  { id: 29, size: 1, opacity: 0.5, isTwinkle: false, top: 58, left: 50 },
  { id: 30, size: 1, opacity: 0.4, isTwinkle: false, top: 85, left: 58 },
  { id: 31, size: 1.5, opacity: 0.6, isTwinkle: true, top: 62, left: 65 },
  { id: 32, size: 2, opacity: 0.7, isTwinkle: false, top: 90, left: 72 },
  { id: 33, size: 1, opacity: 0.3, isTwinkle: false, top: 68, left: 80 },
  { id: 34, size: 1, opacity: 0.5, isTwinkle: false, top: 95, left: 90 },
  { id: 35, size: 1.5, opacity: 0.6, isTwinkle: true, top: 72, left: 2 },
  { id: 36, size: 1, opacity: 0.4, isTwinkle: false, top: 78, left: 10 },
  { id: 37, size: 2, opacity: 0.8, isTwinkle: false, top: 82, left: 20 },
  { id: 38, size: 1, opacity: 0.3, isTwinkle: false, top: 88, left: 30 },
  { id: 39, size: 1.5, opacity: 0.7, isTwinkle: true, top: 92, left: 40 },
  { id: 40, size: 1, opacity: 0.5, isTwinkle: false, top: 75, left: 95 },
  { id: 41, size: 1, opacity: 0.4, isTwinkle: false, top: 5, left: 50 },
  { id: 42, size: 1.5, opacity: 0.6, isTwinkle: false, top: 15, left: 60 },
  { id: 43, size: 2, opacity: 0.7, isTwinkle: true, top: 25, left: 75 },
  { id: 44, size: 1, opacity: 0.3, isTwinkle: false, top: 35, left: 88 },
  { id: 45, size: 1, opacity: 0.5, isTwinkle: false, top: 45, left: 5 },
  { id: 46, size: 1.5, opacity: 0.6, isTwinkle: false, top: 55, left: 15 },
  { id: 47, size: 2, opacity: 0.8, isTwinkle: true, top: 65, left: 25 },
  { id: 48, size: 1, opacity: 0.4, isTwinkle: false, top: 12, left: 35 },
  { id: 49, size: 1, opacity: 0.3, isTwinkle: false, top: 22, left: 45 },
  { id: 50, size: 1.5, opacity: 0.7, isTwinkle: true, top: 32, left: 55 },
];

const heroWords = ['Mở pack', '·', 'Săn thẻ', '·', 'Chinh phục giấc mơ'];

function StarField() {
  return (
    <div className="hero-star-field">
      {starFieldData.map((star) => (
        <div
          key={star.id}
          className={`hero-star ${star.isTwinkle ? 'twinkle' : ''}`}
          style={{
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        />
      ))}
    </div>
  );
}

function LandingTopbar({ scrolled }: { scrolled: boolean }) {
  return (
    <div className={`landing-topbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="landing-topbar">
        <div className="landing-topbar-brand">
          <HexagonLogo />
          <span className="landing-topbar-brand-text">PackOpener2026</span>
        </div>
        <nav className="landing-topbar-nav">
          <a href="#rarity" className="landing-topbar-nav-link">Hệ Thống Độ Hiếm</a>
          <a href="#how-it-works" className="landing-topbar-nav-link">Cách Chơi</a>
          <a href="#featured-packs" className="landing-topbar-nav-link">Pack Nổi Bật</a>
        </nav>
        <div className="landing-topbar-actions">
          <a href="/login" className="landing-topbar-link landing-topbar-link-secondary">Đăng Nhập</a>
          <a href="/register" className="landing-topbar-link landing-topbar-link-primary">Đăng Ký</a>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);

  useEffect(() => {
    const timers = heroWords.map((_, i) =>
      window.setTimeout(() => {
        setVisibleWords(prev => [...prev, i]);
      }, i * 120)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <section className="hero-section">
      <StarField />
      <div className="hero-god-rays" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-heading">
            {heroWords.map((word, i) => (
              <span
                key={i}
                className={`hero-heading-word ${visibleWords.includes(i) ? 'visible' : ''} ${word === 'Chinh phục giấc mơ' ? 'highlight' : ''}`}
              >
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            Đăng ký ngay để nhận 300 coin miễn phí. Mở pack, săn thẻ hiếm & xây dựng đội hình dream team của bạn!
          </p>
          <div className="hero-badges">
            <span className="rarity-badge rarity-badge-diamond">◆ Diamond</span>
            <span className="rarity-badge rarity-badge-gold-epic">★ Gold Epic</span>
            <span className="rarity-badge rarity-badge-gold-rare">★ Gold Rare</span>
          </div>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => window.location.href = "/register"}>
              Đăng Ký Miễn Phí
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary" onClick={() => window.location.href = "/login"}>
              Đăng Nhập
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-cards-cluster">
            <div className="hero-card-secondary left">
              <CardFrame
                rarity="GOLD_EPIC"
                overall={87}
                position="LW"
                playerName="K. KVARATSKHELIA"
                nationImageSrc="https://cdn.futbin.com/content/fifa24/img/nation/20.png"
                clubCode="PSG"
                clubImageSrc="https://cdn.futbin.com/content/fifa24/img/clubs/73.png"
                imageSrc="https://cdn.sofifa.net/players/247/635/26_120.png"
                stats={{ pac: 86, sho: 80, pas: 83, dri: 88, def: 58, phy: 78 }}
              />
            </div>
            <div className="hero-card-primary">
              <CardFrame
                rarity="DIAMOND_RARE"
                overall={91}
                position="ST"
                playerName="K. MBAPPÉ"
                nationImageSrc="https://cdn.futbin.com/content/fifa24/img/nation/18.png"
                clubCode="RMA"
                clubImageSrc="https://cdn.futbin.com/content/fifa24/img/clubs/243.png"
                glow={true}
                imageSrc="https://cdn.sofifa.net/players/231/747/26_120.png"
                stats={{ pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 }}
              />
            </div>
            <div className="hero-card-secondary right">
              <CardFrame
                rarity="DIAMOND_COMMON"
                overall={90}
                position="ST"
                playerName="E. HAALAND"
                nationImageSrc="https://cdn.futbin.com/content/fifa24/img/nation/36.png"
                clubCode="MCI"
                clubImageSrc="https://cdn.futbin.com/content/fifa24/img/clubs/10.png"
                imageSrc="https://cdn.sofifa.net/players/239/085/26_120.png"
                stats={{ pac: 86, sho: 91, pas: 70, dri: 80, def: 45, phy: 88 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <div className="landing-stats-band">
      <div className="landing-stats-grid">
        <div className="landing-stats-card featured">
          <StatsIcons.packs />
          <span className="landing-stats-number">16</span>
          <span className="landing-stats-label">Loại pack</span>
        </div>
        <div className="landing-stats-card">
          <StatsIcons.elite />
          <span className="landing-stats-number">18,000+</span>
          <span className="landing-stats-label">Thẻ cầu thủ</span>
        </div>
        <div className="landing-stats-card">
          <StatsIcons.coin />
          <span className="landing-stats-number">300</span>
          <span className="landing-stats-label">Coin khởi đầu</span>
        </div>
        <div className="landing-stats-card">
          <StatsIcons.users />
          <span className="landing-stats-number">+4.2%</span>
          <span className="landing-stats-label">Người chơi mới</span>
        </div>
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="promo-banner">
      <div className="promo-banner-content">
        <span className="promo-banner-label">THƯỞNG KHỞI ĐẦU</span>
        <h3 className="promo-banner-title">Đăng Ký Là Có Ngay 300 Coin Để Mở Gói Đầu Tiên</h3>
      </div>
      <div className="promo-banner-coin">
        <svg className="promo-banner-coin-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#0D1B2A" />
          <circle cx="12" cy="12" r="8" fill="url(#coinGrad)" />
          <defs>
            <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFC933" />
            </linearGradient>
          </defs>
          <text x="12" y="16" textAnchor="middle" fill="#0D1B2A" fontSize="10" fontWeight="bold">$</text>
        </svg>
        <span className="promo-banner-coin-text">+300</span>
        <div className="promo-banner-coin-sub">
          <span>COIN</span>
          <span>MIỄN PHÍ</span>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { num: '01', title: 'Đăng Ký', desc: 'Tạo tài khoản miễn phí', icon: UserPlus },
  { num: '02', title: 'Mua Gói', desc: 'Chọn pack phù hợp', icon: ShoppingBag },
  { num: '03', title: 'Mở Thẻ', desc: 'Trải nghiệm phấn khích', icon: Package },
  { num: '04', title: 'Bán Thẻ', desc: 'Thu lời về coin', icon: DollarSign },
];

function HowToSteps() {
  return (
    <div className="steps-container">
      <div className="steps-connector" />
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          className="step-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <step.icon className="step-icon" size={20} />
          <div className="step-number">{step.num}</div>
          <span className="step-title">{step.title}</span>
          <span className="step-desc">{step.desc}</span>
        </motion.div>
      ))}
    </div>
  );
}

const fakePulls = [
  { user: 'Nguyễn V.A.', player: 'MBAPPE', rating: 97, rarity: 'diamond' },
  { user: 'Trần M.H.', player: 'HAALAND', rating: 94, rarity: 'epic' },
  { user: 'Lê Q.B.', player: 'KVARATSKHELIA', rating: 87, rarity: 'epic' },
  { user: 'Phạm T.K.', player: 'MBAPPÉ', rating: 91, rarity: 'diamond' },
  { user: 'Hoàng D.N.', player: 'HAALAND', rating: 90, rarity: 'diamond' },
  { user: 'Vũ H.L.', player: 'KVARATSKHELIA', rating: 87, rarity: 'epic' },
];

const faqs = [
  {
    question: "Trò chơi này có hoàn toàn miễn phí không?",
    answer: "Có, PackOpener2026 hoàn toàn miễn phí. Bạn sẽ nhận 300 coin lúc tạo tài khoản mới. Bạn có thể kiếm thêm coin bằng cách điểm danh hàng ngày hoặc bán những thẻ không cần thiết lên Thị trường chuyển nhượng."
  },
  {
    question: "Làm sao để kiếm được thẻ bài hiếm (Diamond, Icon)?",
    answer: "Tỉ lệ rớt thẻ phụ thuộc vào loại gói (Pack) bạn mua trong cửa hàng. Các gói đắt tiền sẽ có tỉ lệ bảo hiểm thẻ hiếm cao hơn. Ngoài ra, thỉnh thoảng sẽ có sự kiện tăng tỉ lệ đặc biệt."
  },
  {
    question: "Tôi có thể trao đổi thẻ với người chơi khác không?",
    answer: "Hiện tại Marketplace cho phép bạn bán thẻ để lấy Coin. Chức năng Trao đổi trực tiếp (Trade) giữa 2 người chơi đang trong quá trình phát triển và sẽ sớm ra mắt."
  },
  {
    question: "Tỉ lệ mở thẻ (Drop rate) có minh bạch không?",
    answer: "Hoàn toàn minh bạch! Tỉ lệ rơi của mỗi cấp độ thẻ (Bronze, Silver, Gold, Diamond) đều được công khai ngay trong phần Chi tiết gói trước khi bạn bấm mua."
  },
];

function SocialProofMarquee() {
  const items = [...fakePulls, ...fakePulls];

  return (
    <section className="social-proof-section">
      <div className="social-proof-header">
        <span className="social-proof-dot" />
        <span className="social-proof-label">ĐANG MỞ PACK NGAY LÚC NÀY</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {items.map((item, i) => (
            <div key={i} className="marquee-item">
              <span className={`marquee-rarity-dot ${item.rarity}`} />
              <span className="marquee-user">{item.user}</span>
              <span className="marquee-action">vừa kéo</span>
              <span className={`marquee-player ${item.rarity}`}>{item.player} {item.rating} ★</span>
              <span className={`marquee-rarity-tag ${item.rarity}`}>{item.rarity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const featuredPackKeys = ['starter-pack', 'silver-plus', 'ultimate-pack'] as const;

function FeaturedPacksShowcase() {
  const packs = featuredPackKeys
    .map((key) => PACK_THEMES.find((pack) => pack.key === key))
    .filter((pack): pack is (typeof PACK_THEMES)[number] => Boolean(pack));

  return (
    <div className="landing-pack-showcase">
      {packs.map((pack) => (
        <article className="landing-pack-card" key={pack.key}>
          <PackArtwork theme={pack} compact />
          <div className="landing-pack-card-copy">
            <span className="landing-pack-card-subtitle">{pack.subtitle}</span>
            <h3>{pack.name}</h3>
            <p>{pack.oddsTeaser}</p>
          </div>
          <div className="landing-pack-card-meta">
            <span>{pack.cardCount} thẻ</span>
            <strong>{pack.price === 0 ? 'Free' : `${pack.price.toLocaleString('en-US')} coin`}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-section-content">
        <p className="cta-label">SẴN SÀNG CHƯA</p>
        <h2 className="cta-heading">
          BẮT ĐẦU<br />
          <span className="cta-heading-highlight">NGAY HÔM NAY</span>
        </h2>
        <p className="cta-sub">Đăng ký miễn phí. Nhận 300 coin. Không cần thẻ tín dụng.</p>
        <div className="cta-buttons">
          <button className="cta-btn-primary" onClick={() => window.location.href = "/register"}>
            ĐĂNG KÝ MIỄN PHÍ →
          </button>
          <button className="cta-btn-secondary">XEM DEMO</button>
        </div>
        <div className="cta-trust">
          <span className="cta-trust-item">✓ Miễn phí mãi mãi</span>
          <span className="cta-trust-item">✓ 300 coin khởi đầu</span>
          <span className="cta-trust-item">✓ Không quảng cáo</span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="landing-faq-section">
      <div className="landing-faq-header">
        <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
        <p className="section-desc">Giải đáp những thắc mắc phổ biến nhất của người chơi</p>
      </div>
      <div className="landing-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={faq.question}
              className={`landing-faq-item ${isOpen ? 'active' : ''}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="landing-faq-question">
                <h3>{faq.question}</h3>
                <span className="landing-faq-icon">{isOpen ? '−' : '+'}</span>
              </div>
              <div className="landing-faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="landing-page-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <HexagonLogo />
            <span className="footer-logo-text">PackOpener2026</span>
          </div>
          <p className="footer-tagline">Trải nghiệm mở pack FC26 đỉnh nhất Việt Nam</p>
          <div className="footer-social">
            <a href="#" className="footer-social-link"><MessageCircle size={18} /></a>
            <a href="#" className="footer-social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
            <a href="#" className="footer-social-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
          </div>
        </div>

        <div className="footer-links">
          <h4 className="footer-links-title">KHÁM PHÁ</h4>
          <a href="#rarity" className="footer-link">Hệ Thống Độ Hiếm</a>
          <a href="#how-it-works" className="footer-link">Cách Chơi</a>
          <a href="#featured-packs" className="footer-link">Pack Nổi Bật</a>
          <a href="#" className="footer-link">Bảng Xếp Hạng</a>
        </div>

        <div className="footer-links">
          <h4 className="footer-links-title">HỖ TRỢ</h4>
          <a href="#" className="footer-link">FAQ</a>
          <a href="#" className="footer-link">Discord Server</a>
          <a href="#" className="footer-link">Liên Hệ</a>
          <a href="#" className="footer-link">Terms & Privacy</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 PackOpener2026. Fan-made project. Không liên kết với EA Sports.
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(".landing-scroll-block");
    if (blocks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
    );

    blocks.forEach(block => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page-wrapper">
      <div className="page-fantasy-stars" />
      <LandingTopbar scrolled={scrolled} />
      <HeroSection />

      <StatsSection />

      <PublicMarketingTemplate
        sections={
          <div className="landing-page-shell">
            <PromoBanner />

            <div className="landing-scroll-block landing-page-band landing-page-band-rarity" id="rarity">
              <h2 className="section-title">Hệ Thống Độ Hiếm</h2>
              <p className="section-desc">Độ hiếm đa dạng lên đến 9 loại cho trải nghiệm mở thẻ thêm đặc sắc.</p>
              <RarityShowcaseSection />
            </div>

            <div className="landing-scroll-block landing-page-band landing-page-band-how" id="how-it-works">
              <h2 className="section-title">Cách Chơi</h2>
              <p className="section-desc">4 bước để bắt đầu hành trình</p>
              <HowToSteps />
            </div>

            <SocialProofMarquee />

            <div className="landing-scroll-block landing-page-band landing-page-band-featured" id="featured-packs">
              <h2 className="section-title">Pack Nổi Bật</h2>
              <p className="section-desc">Chọn gói phù hợp với coin khởi đầu, mục tiêu nâng cấp và nhịp săn thẻ của bạn.</p>
              <FeaturedPacksShowcase />
            </div>

            <div className="landing-scroll-block landing-page-band landing-page-band-faq" id="faq">
              <FAQSection />
            </div>

            <CTASection />

            <div className="landing-scroll-block landing-page-band" id="landing-footer">
              <LandingFooter />
            </div>
          </div>
        }
      />
    </div>
  );
}
