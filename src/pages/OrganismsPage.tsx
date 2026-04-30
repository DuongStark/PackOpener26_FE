import {
  AdminCrudTable,
  AdminDeleteConfirmModal,
  AdminEntityEditorDrawer,
  AdminOverviewMetrics,
  AdminRecentActivity,
  AdminTopNav,
  AuthFeaturePanel,
  BulkSellActionBar,
  BodyText,
  CardCollectionGrid,
  CardDetailPanel,
  CaptionText,
  EmptyStatePanel,
  FeaturedCardsCarousel,
  FeaturedPackShelf,
  FreeCoinPromoBanner,
  HeadingDisplay,
  HowItWorksSection,
  LandingFooter,
  LandingHero,
  LoginFormPanel,
  MarketPackCatalog,
  PackDetailPanel,
  PackOpeningStage,
  PackInventoryGrid,
  PackResultSummary,
  PackShakeSequence,
  QuickNavPanel,
  RareCardLeaderboard,
  RarityShowcaseSection,
  RevealCueSequence,
  RegisterFormPanel,
  Topbar,
  CardRevealRail,
} from '../components'
import './styles/organisms-page.css'

export default function OrganismsPage() {
  return (
    <main className="organisms-page">
      <section className="hero-panel">
        <CaptionText className="eyebrow">PackOpener2026 Organisms</CaptionText>
        <HeadingDisplay>Public Landing Sections</HeadingDisplay>
        <BodyText className="hero-copy">
          Page này preview các organism public-facing cho landing, tách riêng khỏi atoms và molecules để đánh giá layout lớn hơn.
        </BodyText>
        <div className="organisms-nav">
          <a href="/">Landing</a>
          <a href="/atoms">Atoms</a>
          <a href="/molecules">Molecules</a>
          <a href="/templates">Templates</a>
        </div>
      </section>

      <div className="organisms-stack">
        <LandingHero />
        <FreeCoinPromoBanner />
        <RarityShowcaseSection />
        <HowItWorksSection />
        <FeaturedCardsCarousel />
        <div className="auth-organisms-shell">
          <AuthFeaturePanel />
          <LoginFormPanel />
        </div>
        <RegisterFormPanel />
        <Topbar />
        <QuickNavPanel />
        <FeaturedPackShelf />
        <RareCardLeaderboard />
        <PackInventoryGrid />
        <CardCollectionGrid />
        <MarketPackCatalog />
        <PackDetailPanel />
        <CardDetailPanel />
        <PackOpeningStage />
        <PackShakeSequence />
        <RevealCueSequence />
        <CardRevealRail />
        <PackResultSummary />
        <BulkSellActionBar />
        <EmptyStatePanel />
        <AdminTopNav />
        <AdminOverviewMetrics />
        <AdminRecentActivity />
        <AdminCrudTable />
        <AdminEntityEditorDrawer />
        <AdminDeleteConfirmModal />
        <LandingFooter />
      </div>
    </main>
  )
}
