import { useEffect } from "react";
import type { CSSProperties } from "react";
import {
  FeaturedCardsCarousel,
  FreeCoinPromoBanner,
  HowItWorksSection,
  LabelText,
  LandingFooter,
  LandingHero,
  SectionTitle,
  PublicMarketingTemplate,
  RarityShowcaseSection,
} from "../components";
import heroImage from "../assets/hero.png";
import "./styles/landing-page.css";

export default function LandingPage() {
  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>(".landing-scroll-block"),
    );

    if (blocks.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    blocks.forEach((block) => observer.observe(block));

    const updateFade = () => {
      const viewportHeight = window.innerHeight;

      blocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const distanceFromCenter = Math.abs(
          rect.top + rect.height * 0.5 - viewportHeight * 0.5,
        );
        const fade = Math.min(distanceFromCenter / (viewportHeight * 0.75), 1);
        const opacity = 1 - fade * 0.34;
        block.style.setProperty(
          "--scroll-opacity",
          String(Math.max(0.44, opacity)),
        );
      });
    };

    updateFade();
    window.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  return (
    <div
      style={
        { "--landing-hero-image-page": `url(${heroImage})` } as CSSProperties
      }
    >
      <PublicMarketingTemplate
        hero={
          <div className="landing-page-shell">
            <div className="landing-topbar">
              <div className="landing-topbar-brand">
                <LabelText>PackOpener2026</LabelText>
                
              </div>
              <nav className="landing-topbar-nav">
                <a href="#rarity" className="landing-topbar-nav-link">Tầng Thẻ</a>
                <a href="#how-it-works" className="landing-topbar-nav-link">Cách Chơi</a>
                <a href="#featured-cards" className="landing-topbar-nav-link">Thẻ Nổi Bật</a>
              </nav>
              <div className="landing-topbar-actions">
                
                <a className="landing-topbar-link" href="/login">
                  Đăng Nhập
                </a>
                <a
                  className="landing-topbar-link landing-topbar-link-primary"
                  href="/register"
                >
                  Đăng Ký
                </a>
              </div>
            </div>
            <div className="landing-scroll-block is-visible landing-page-hero-block">
              <div
                className="landing-page-hero-surface"
                style={
                  {
                    "--landing-hero-image": `url(${heroImage})`,
                  } as CSSProperties
                }
              >
                <LandingHero />
              </div>
            </div>
            <div className="landing-scroll-block is-visible landing-stats-band">
              <div className="landing-stats-grid">
                <div className="landing-stats-card">
                  <LabelText>Pack đã mở</LabelText>
                  <SectionTitle as="h3">128K+</SectionTitle>
                </div>
                <div className="landing-stats-card">
                  <LabelText>Thẻ elite</LabelText>
                  <SectionTitle as="h3">2.410</SectionTitle>
                </div>
                <div className="landing-stats-card">
                  <LabelText>Coin khởi đầu</LabelText>
                  <SectionTitle as="h3">1000</SectionTitle>
                </div>
                <div className="landing-stats-card">
                  <LabelText>Người chơi mới</LabelText>
                  <SectionTitle as="h3">+4.2%</SectionTitle>
                </div>
              </div>
            </div>
          </div>
        }
        sections={
          <div className="landing-page-shell">
            <div className="landing-scroll-block is-visible" style={{ marginBottom: "64px" }}>
              <FreeCoinPromoBanner />
            </div>
            <div className="landing-scroll-block landing-page-band landing-page-band-rarity" id="rarity">
              <RarityShowcaseSection />
            </div>
            <div className="landing-scroll-block landing-page-band landing-page-band-how" id="how-it-works">
              <HowItWorksSection />
            </div>
            <div className="landing-scroll-block landing-page-band landing-page-band-featured" id="featured-cards">
              <FeaturedCardsCarousel />
            </div>
          </div>
        }
        footer={
          <div
            className="landing-scroll-block landing-page-band"
            id="landing-footer"
          >
            <LandingFooter />
          </div>
        }
      />
    </div>
  );
}
