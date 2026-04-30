import type { ReactNode } from 'react'
import './styles/templates.css'

export function PublicMarketingTemplate({
  hero,
  sections,
  footer,
}: {
  hero: ReactNode
  sections: ReactNode
  footer: ReactNode
}) {
  return (
    <main className="template-public-marketing">
      <div className="template-public-marketing-shell">
        <section className="template-public-marketing-hero">{hero}</section>
        <div className="template-public-marketing-sections">{sections}</div>
        {footer}
      </div>
    </main>
  )
}

export function AuthSpotlightTemplate({
  formPanel,
  visualPanel,
}: {
  formPanel: ReactNode
  visualPanel: ReactNode
}) {
  return (
    <main className="template-auth-spotlight">
      <div className="template-auth-spotlight-shell">
        <div className="template-auth-spotlight-form">{formPanel}</div>
        <div className="template-auth-spotlight-visual">{visualPanel}</div>
      </div>
    </main>
  )
}

export function PlayerAppShellTemplate({
  topbar,
  mainCanvas,
  slideOver,
  modalLayer,
}: {
  topbar: ReactNode
  mainCanvas: ReactNode
  slideOver?: ReactNode
  modalLayer?: ReactNode
}) {
  return (
    <main className="template-player-app-shell">
      <div className="template-player-app-shell-root">
        <div className="template-player-app-shell-topbar">{topbar}</div>
        <div className="template-player-app-shell-canvas">
          <div className="template-player-app-shell-content">{mainCanvas}</div>
        </div>
        {slideOver ? <div className="template-player-app-shell-slideover">{slideOver}</div> : null}
        {modalLayer ? <div className="template-player-app-shell-modal">{modalLayer}</div> : null}
      </div>
    </main>
  )
}

export function CollectionManagementTemplate({
  pageHeader,
  controls,
  contentGrid,
  emptyState,
  selectionActionBar,
}: {
  pageHeader: ReactNode
  controls: ReactNode
  contentGrid: ReactNode
  emptyState?: ReactNode
  selectionActionBar?: ReactNode
}) {
  return (
    <section className="template-collection-management">
      <div className="template-collection-management-header">{pageHeader}</div>
      <div className="template-collection-management-controls">{controls}</div>
      <div className="template-collection-management-grid">{contentGrid}</div>
      {emptyState ? <div className="template-collection-management-empty">{emptyState}</div> : null}
      {selectionActionBar ? (
        <div className="template-collection-management-selection">{selectionActionBar}</div>
      ) : null}
    </section>
  )
}

export function MarketCatalogTemplate({
  featuredBanner,
  filterRow,
  packCatalogGrid,
  detailOverlay,
}: {
  featuredBanner: ReactNode
  filterRow: ReactNode
  packCatalogGrid: ReactNode
  detailOverlay?: ReactNode
}) {
  return (
    <section className="template-market-catalog">
      <div className="template-market-catalog-banner">{featuredBanner}</div>
      <div className="template-market-catalog-filters">{filterRow}</div>
      <div className="template-market-catalog-grid">{packCatalogGrid}</div>
      {detailOverlay ? <div className="template-market-catalog-overlay">{detailOverlay}</div> : null}
    </section>
  )
}

export function PackOpeningTemplate({
  cinematicStage,
  revealSequence,
  resultSummary,
  nextActions,
}: {
  cinematicStage: ReactNode
  revealSequence: ReactNode
  resultSummary: ReactNode
  nextActions?: ReactNode
}) {
  return (
    <section className="template-pack-opening">
      <div className="template-pack-opening-stage">{cinematicStage}</div>
      <div className="template-pack-opening-reveal">{revealSequence}</div>
      <div className="template-pack-opening-summary">{resultSummary}</div>
      {nextActions ? <div className="template-pack-opening-actions">{nextActions}</div> : null}
    </section>
  )
}

export function DetailOverlayTemplate({
  backButton,
  detailBody,
  stickyActionFooter,
}: {
  backButton: ReactNode
  detailBody: ReactNode
  stickyActionFooter?: ReactNode
}) {
  return (
    <section className="template-detail-overlay">
      <div className="template-detail-overlay-back">{backButton}</div>
      <div className="template-detail-overlay-body">{detailBody}</div>
      {stickyActionFooter ? (
        <div className="template-detail-overlay-footer">{stickyActionFooter}</div>
      ) : null}
    </section>
  )
}

export function AdminDashboardTemplate({
  nav,
  metrics,
  activityPanels,
}: {
  nav: ReactNode
  metrics: ReactNode
  activityPanels: ReactNode
}) {
  return (
    <section className="template-admin-dashboard">
      <div className="template-admin-dashboard-nav">{nav}</div>
      <div className="template-admin-dashboard-metrics">{metrics}</div>
      <div className="template-admin-dashboard-activity">{activityPanels}</div>
    </section>
  )
}

export function AdminCrudTemplate({
  title,
  toolbar,
  table,
  listNavigation,
  createEditDrawer,
}: {
  title: ReactNode
  toolbar: ReactNode
  table: ReactNode
  listNavigation?: ReactNode
  createEditDrawer?: ReactNode
}) {
  return (
    <section className="template-admin-crud">
      <div className="template-admin-crud-title">{title}</div>
      <div className="template-admin-crud-toolbar">{toolbar}</div>
      <div className="template-admin-crud-table">{table}</div>
      {listNavigation ? <div className="template-admin-crud-list-nav">{listNavigation}</div> : null}
      {createEditDrawer ? <div className="template-admin-crud-drawer">{createEditDrawer}</div> : null}
    </section>
  )
}
