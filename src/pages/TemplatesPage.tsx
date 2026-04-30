import {
  AdminCrudTable,
  AdminCrudTemplate,
  AdminDashboardTemplate,
  AdminEntityEditorDrawer,
  AdminOverviewMetrics,
  AdminRecentActivity,
  AdminTopNav,
  AuthFeaturePanel,
  BackButton,
  BodyText,
  BulkSellActionBar,
  CardDetailPanel,
  CaptionText,
  CardCollectionGrid,
  CollectionManagementTemplate,
  DetailOverlayTemplate,
  EmptyStatePanel,
  FeaturedCardsCarousel,
  FeaturedPackShelf,
  FreeCoinPromoBanner,
  HeadingDisplay,
  HowItWorksSection,
  LandingFooter,
  LandingHero,
  LoginFormPanel,
  MarketCatalogTemplate,
  MarketPackCatalog,
  PackOpeningStage,
  PackOpeningTemplate,
  PackResultSummary,
  PackShakeSequence,
  PackDetailPanel,
  PlayerAppShellTemplate,
  PublicMarketingTemplate,
  QuickNavPanel,
  RarityShowcaseSection,
  RevealCueSequence,
  RegisterFormPanel,
  Topbar,
  AuthSpotlightTemplate,
  PrimaryButton,
  SearchBar,
  SortControl,
  ResultCountBar,
  NewBadge,
  GhostButton,
} from '../components'
import './styles/templates-page.css'

export default function TemplatesPage() {
  return (
    <main className="templates-page">
      <section className="hero-panel">
        <CaptionText className="eyebrow">PackOpener2026 Templates</CaptionText>
        <HeadingDisplay>Template Layout Previews</HeadingDisplay>
        <BodyText className="hero-copy">
          Page này preview ba template lớn để kiểm tra layout shell trước khi dựng page thật.
        </BodyText>
        <div className="templates-nav">
          <a href="/">Landing</a>
          <a href="/atoms">Atoms</a>
          <a href="/molecules">Molecules</a>
          <a href="/organisms">Organisms</a>
        </div>
      </section>

      <section className="templates-block">
        <CaptionText>PublicMarketingTemplate</CaptionText>
        <PublicMarketingTemplate
          hero={<LandingHero />}
          sections={
            <>
              <FreeCoinPromoBanner />
              <RarityShowcaseSection />
              <HowItWorksSection />
              <FeaturedCardsCarousel />
            </>
          }
          footer={<LandingFooter />}
        />
      </section>

      <section className="templates-block">
        <CaptionText>AuthSpotlightTemplate</CaptionText>
        <AuthSpotlightTemplate formPanel={<LoginFormPanel />} visualPanel={<AuthFeaturePanel />} />
        <AuthSpotlightTemplate formPanel={<RegisterFormPanel />} visualPanel={<AuthFeaturePanel />} />
      </section>

      <section className="templates-block">
        <CaptionText>PlayerAppShellTemplate</CaptionText>
        <PlayerAppShellTemplate
          topbar={<Topbar />}
          mainCanvas={
            <>
              <QuickNavPanel />
              <FeaturedPackShelf />
              <CardCollectionGrid />
              <BulkSellActionBar />
              <EmptyStatePanel />
            </>
          }
          slideOver={<PackDetailPanel />}
          modalLayer={<div style={{ width: 'min(100%, 560px)' }}><EmptyStatePanel /></div>}
        />
      </section>

      <section className="templates-block">
        <CaptionText>CollectionManagementTemplate</CaptionText>
        <CollectionManagementTemplate
          pageHeader={<FeaturedPackShelf />}
          controls={
            <>
              <SearchBar value="messi" onChange={() => undefined} placeholder="Search cards..." />
              <SortControl
                value="ovr"
                onChange={() => undefined}
                options={[
                  { label: 'Highest OVR', value: 'ovr' },
                  { label: 'Newest', value: 'newest' },
                ]}
              />
            </>
          }
          contentGrid={<CardCollectionGrid />}
          emptyState={<EmptyStatePanel />}
          selectionActionBar={<BulkSellActionBar />}
        />
      </section>

      <section className="templates-block">
        <CaptionText>MarketCatalogTemplate</CaptionText>
        <MarketCatalogTemplate
          featuredBanner={<FreeCoinPromoBanner />}
          filterRow={
            <ResultCountBar
              count={12}
              title="Market Packs"
              helper="Browse active packs and open detail overlay on demand."
              activeFilters={[<NewBadge key="elite">Elite</NewBadge>]}
            />
          }
          packCatalogGrid={<MarketPackCatalog />}
          detailOverlay={<PackDetailPanel />}
        />
      </section>

      <section className="templates-block">
        <CaptionText>PackOpeningTemplate</CaptionText>
        <PackOpeningTemplate
          cinematicStage={
            <>
              <PackOpeningStage />
              <PackShakeSequence />
            </>
          }
          revealSequence={
            <>
              <RevealCueSequence />
              <PackResultSummary />
            </>
          }
          resultSummary={<PackResultSummary />}
          nextActions={
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <GhostButton>View Cards</GhostButton>
              <GhostButton>Sell Later</GhostButton>
              <GhostButton>Open Another Pack</GhostButton>
            </div>
          }
        />
      </section>

      <section className="templates-block">
        <CaptionText>DetailOverlayTemplate</CaptionText>
        <DetailOverlayTemplate
          backButton={<BackButton />}
          detailBody={<CardDetailPanel />}
          stickyActionFooter={<GhostButton>Sticky Footer Action</GhostButton>}
        />
      </section>

      <section className="templates-block">
        <CaptionText>AdminDashboardTemplate</CaptionText>
        <AdminDashboardTemplate
          nav={<AdminTopNav />}
          metrics={<AdminOverviewMetrics />}
          activityPanels={<AdminRecentActivity />}
        />
      </section>

      <section className="templates-block">
        <CaptionText>AdminCrudTemplate</CaptionText>
        <AdminCrudTemplate
          title={
            <div>
              <CaptionText>AdminCrudTemplate</CaptionText>
              <HeadingDisplay>Admin Packs</HeadingDisplay>
            </div>
          }
          toolbar={<AdminCrudTable />}
          table={<AdminCrudTable />}
          listNavigation={
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <GhostButton>Previous</GhostButton>
              <PrimaryButton>Load More</PrimaryButton>
            </div>
          }
          createEditDrawer={<AdminEntityEditorDrawer />}
        />
      </section>
    </main>
  )
}
