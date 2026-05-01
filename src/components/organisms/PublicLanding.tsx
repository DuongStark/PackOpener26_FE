import { CardFrame, GhostButton, GoldCTAButton } from "../atoms";
import bronzeCardImage from "../../assets/optimized/bronze.webp";
import diamondCardImage from "../../assets/optimized/diamond.webp";
import goldCardImage from "../../assets/optimized/gold.webp";
import silverCardImage from "../../assets/optimized/silver.webp";
import {
  BodyText,
  CaptionText,
  LabelText,
  NewBadge,
  RarityChip,
  RewardPill,
  SectionTitle,
} from "..";
import type { ReactNode } from "react";
import "./styles/public-landing.css";

type ShowcaseRarity =
  | "BRONZE_COMMON"
  | "BRONZE_RARE"
  | "SILVER_COMMON"
  | "SILVER_RARE"
  | "GOLD_COMMON"
  | "GOLD_RARE"
  | "GOLD_EPIC"
  | "DIAMOND_COMMON"
  | "DIAMOND_RARE";

const rarityImageMap: Record<ShowcaseRarity, string> = {
  BRONZE_COMMON: bronzeCardImage,
  BRONZE_RARE: bronzeCardImage,
  SILVER_COMMON: silverCardImage,
  SILVER_RARE: silverCardImage,
  GOLD_COMMON: goldCardImage,
  GOLD_RARE: goldCardImage,
  GOLD_EPIC: goldCardImage,
  DIAMOND_COMMON: diamondCardImage,
  DIAMOND_RARE: diamondCardImage,
};

function getRarityFinish(rarity: ShowcaseRarity) {
  if (rarity.endsWith("EPIC")) return "epic";
  if (rarity.endsWith("RARE")) return "rare";
  return "common";
}

function getRarityFamily(rarity: ShowcaseRarity) {
  return rarity.split("_")[0].toLowerCase();
}

function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="public-landing-section">
      <div className="public-landing-section-header">
        <LabelText>{eyebrow}</LabelText>
        <SectionTitle as="h2">{title}</SectionTitle>
        <BodyText>{description}</BodyText>
      </div>
      {children}
    </section>
  );
}

export function LandingHero() {
  return (
    <section className="public-landing-hero">
      <div className="public-landing-hero-copy">
        <div className="public-landing-hero-eyebrow">
          <LabelText>PackOpener2026 · FC26 Simulator</LabelText>
        </div>
        <SectionTitle as="h1">
          Mở Gói · Săn Thẻ · Ngọn Lửa
        </SectionTitle>
        <BodyText className="public-landing-hero-subtitle">
          Đăng ký ngay để nhận 1000 coin miễn phí. Mở pack, săn thẻ hiếm & xây dựng đội hình dream team của bạn!
        </BodyText>
        <div className="public-landing-hero-badges">
          <RarityChip rarity="DIAMOND_RARE">◆ Diamond</RarityChip>
          <RarityChip rarity="GOLD_EPIC">★ Gold Epic</RarityChip>
          <RarityChip rarity="GOLD_RARE">★ Gold Rare</RarityChip>
        </div>
        <div className="public-landing-hero-actions">
          <button 
            className="public-landing-hero-cta-primary"
            onClick={() => (window.location.href = "/register")}
          >
            <span>Đăng Ký Miễn Phí</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button 
            className="public-landing-hero-cta-secondary"
            onClick={() => (window.location.href = "/login")}
          >
            Đăng Nhập
          </button>
        </div>
      </div>

      <div className="public-landing-hero-visual">
        <div className="public-landing-hero-orbit public-landing-hero-orbit-a" />
        <div className="public-landing-hero-orbit public-landing-hero-orbit-b" />
        <div className="public-landing-hero-orbit-c" />
        <div className="public-landing-hero-card-glow" />
        <div className="public-landing-hero-cards">
          <div className="public-landing-hero-card-secondary">
            <img src={goldCardImage} alt="Gold epic card design" />
          </div>
          <div className="public-landing-hero-card-primary">
            <img src={diamondCardImage} alt="Diamond rare card design" />
          </div>
          <div className="public-landing-hero-card-tertiary">
            <img src={goldCardImage} alt="Gold rare card design" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FreeCoinPromoBanner() {
  return (
    <section className="public-landing-banner">
      <div className="public-landing-banner-copy">
        <LabelText>THƯỞNG KHỞI ĐẦU</LabelText>
        <SectionTitle as="h2">
          Đăng Ký Là Có Ngay 1000 Coin Để Mở Gói Đầu Tiên
        </SectionTitle>
      </div>
      <RewardPill
        badge={<NewBadge>+1000</NewBadge>}
        supportingText="Bắt đầu phiên mở pack đầu tiên ngay khi tạo tài khoản."
      />
    </section>
  );
}

export function RarityShowcaseSection() {
  const items = [
    ["BRONZE COMMON", "BRONZE_COMMON" as const, "Khởi đầu bộ sưu tập"],
    ["BRONZE RARE", "BRONZE_RARE" as const, "Bronze có điểm nhấn hiếm"],
    ["SILVER COMMON", "SILVER_COMMON" as const, "Tier silver ổn định hơn"],
    ["SILVER RARE", "SILVER_RARE" as const, "Bắt đầu thấy pull ngon"],
    ["GOLD COMMON", "GOLD_COMMON" as const, "Mốc chuyển tier quan trọng"],
    ["GOLD RARE", "GOLD_RARE" as const, "Fantasy pull cốt lõi"],
    ["GOLD EPIC", "GOLD_EPIC" as const, "High-roll bùng nổ rõ ràng"],
    ["DIAMOND COMMON", "DIAMOND_COMMON" as const, "Top-end reward đã rất mạnh"],
    ["DIAMOND RARE", "DIAMOND_RARE" as const, "Đỉnh rarity hiện tại"],
  ] as const;

  const marqueeItems = [...items, ...items];

  return (
    <SectionShell
      eyebrow="Hệ Tầng Thẻ"
      title="Hiểu Rõ Thang Bậc Thẻ Trước Khi Chốt Pack"
      description="Hệ rarity thật của game phải được nhận ra ngay ở một cái nhìn: cùng layout thẻ, nhưng chất liệu, độ hiếm và cảm giác phần thưởng tăng dần rất rõ."
    >
      <div
        className="public-landing-rarity-marquee"
        aria-label="Rarity showcase"
      >
        <div className="public-landing-rarity-track">
          {marqueeItems.map(([label, rarity, copy], index) => {
            const finish = getRarityFinish(rarity);
            return (
              <article
                className="public-landing-rarity-card"
                data-family={getRarityFamily(rarity)}
                data-finish={finish}
                key={`${label}-${index}`}
              >
                <div className="public-landing-rarity-badge">
                  {finish.toUpperCase()}
                </div>
                <div className="public-landing-rarity-art">
                  <img
                    src={rarityImageMap[rarity]}
                    alt={label}
                    loading="lazy"
                  />
                </div>
                <div className="public-landing-rarity-meta">
                  <RarityChip rarity={rarity}>{label}</RarityChip>
                  <CaptionText>{copy}</CaptionText>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

export function HowItWorksSection() {
  const steps = [
    ["01", "Đăng Ký", "Tạo tài khoản và nhận ngay 1000 coin khởi đầu."],
    [
      "02",
      "Mua Gói",
      "Chọn pack phù hợp với số coin và mục tiêu rarity của bạn.",
    ],
    [
      "03",
      "Mở Thẻ",
      "Tận hưởng sequence mở pack và xem ngay thẻ ngon nhất vừa rơi ra.",
    ],
    [
      "04",
      "Bán Thẻ",
      "Bán thẻ trùng để quay coin về ví và tiếp tục mua gói mới.",
    ],
  ] as const;

  return (
    <SectionShell
      eyebrow="Cách Chơi"
      title="Vòng Lặp Gameplay Gọn, Rõ, Và Gây Nghiện"
      description="Trang landing phải kéo người chơi từ tò mò sang hành động ngay, không để họ phải tự giải mã sản phẩm."
    >
      <div className="public-landing-steps">
        {steps.map(([index, title, copy]) => (
          <div className="public-landing-step" key={index}>
            <span className="public-landing-step-index">{index}</span>
            <SectionTitle as="h3">{title}</SectionTitle>
            <BodyText>{copy}</BodyText>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function FeaturedCardsCarousel() {
  const cards = [
    {
      name: "Jude Bellingham",
      rarity: "DIAMOND_RARE" as const,
      overall: 96,
      position: "CM",
      nation: "🏴",
      club: "RMA",
      league: "La Liga",
      leagueLogo: "https://img.icons8.com/color/96/la-liga.png",
    },
    {
      name: "Erling Haaland",
      rarity: "GOLD_RARE" as const,
      overall: 94,
      position: "ST",
      nation: "🇳🇴",
      club: "MCI",
      league: "Premier League",
      leagueLogo: "https://img.icons8.com/color/96/premier-league.png",
    },
    {
      name: "Vinicius Jr",
      rarity: "GOLD_EPIC" as const,
      overall: 95,
      position: "LW",
      nation: "🇧🇷",
      club: "RMA",
      league: "La Liga",
      leagueLogo: "https://img.icons8.com/color/96/la-liga.png",
    },
  ];

  return (
    <SectionShell
      eyebrow="Thẻ Nổi Bật"
      title="Cho Người Chơi Thấy Rõ Phần Thưởng Xứng Đáng Để Đăng Ký"
      description="Các thẻ spotlight phải đủ sức kích thích để người vào lần đầu muốn đăng ký ngay để bắt đầu săn pack."
    >
      <div className="public-landing-carousel">
        {cards.map((card) => (
          <div className="public-landing-feature-card" key={card.name}>
            <CardFrame
              rarity={card.rarity}
              overall={card.overall}
              position={card.position}
              playerName={card.name.toUpperCase()}
              nationFlag={card.nation}
              clubCode={card.club}
              league={card.league}
              leagueLogo={card.leagueLogo}
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function LandingFooter() {
  return (
    <footer className="public-landing-footer">
      <div>
        <LabelText>PackOpener2026</LabelText>
        <BodyText>
          Trải nghiệm mở pack bóng đá theo phong cách FC26, tập trung vào cảm
          giác hồi hộp và giá trị bộ sưu tập.
        </BodyText>
      </div>
      <div className="public-landing-footer-links">
        <a href="#rarity">Tầng Thẻ</a>
        <a href="#how-it-works">Cách Chơi</a>
        <a href="#featured-cards">Thẻ Nổi Bật</a>
      </div>
    </footer>
  );
}
