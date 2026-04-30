import {
  ActivityListItem,
  BackButton,
  BodyText,
  ConfirmActionPanel,
  FormField,
  GhostButton,
  LabelText,
  MetricCard,
  PasswordField,
  PrimaryButton,
  SectionTitle,
  TableRowActions,
  TableToolbar,
  TimestampText,
} from '..'
import './styles/admin-organisms.css'

export function AdminTopNav() {
  return (
    <header className="admin-org-nav">
      <div className="admin-org-nav-brand">
        <LabelText>AdminTopNav</LabelText>
        <SectionTitle as="h2">PackOpener2026 Admin</SectionTitle>
      </div>
      <div className="admin-org-nav-links">
        <GhostButton>Overview</GhostButton>
        <GhostButton>Cards</GhostButton>
        <GhostButton>Packs</GhostButton>
        <GhostButton>Users</GhostButton>
      </div>
    </header>
  )
}

export function AdminOverviewMetrics() {
  return (
    <section className="admin-org-section">
      <LabelText>AdminOverviewMetrics</LabelText>
      <div className="admin-org-metrics">
        <MetricCard label="Total Users" value="12,480" delta={{ tone: 'positive', value: '+4.2%' }} helperText="Last 7 days" highlighted />
        <MetricCard label="Packs Sold" value="18,420" delta={{ tone: 'positive', value: '+8.2%' }} helperText="Strong market performance" />
        <MetricCard label="Cards Opened" value="54,930" delta={{ tone: 'neutral', value: 'No change' }} helperText="Holding steady" />
        <MetricCard label="Coins Spent" value="12.8M" delta={{ tone: 'negative', value: '-3.4%' }} helperText="Lower spend today" />
      </div>
    </section>
  )
}

export function AdminRecentActivity() {
  return (
    <section className="admin-org-section">
      <LabelText>AdminRecentActivity</LabelText>
      <div className="admin-org-activity">
        <ActivityListItem
          title="Pack Updated"
          description="Elite Pack probability table was adjusted and saved."
          timestamp="Apr 30, 2026 · 14:20"
        />
        <ActivityListItem
          title="User Disabled"
          description="Suspicious account was removed from active circulation."
          timestamp="Apr 30, 2026 · 11:08"
        />
      </div>
    </section>
  )
}

export function AdminCrudTable() {
  return (
    <section className="admin-org-table-shell">
      <LabelText>AdminCrudTable</LabelText>
      <TableToolbar searchValue="elite pack" onSearchChange={() => undefined} sortValue="newest" onSortChange={() => undefined} />
      <div className="admin-org-table">
        <div className="admin-org-table-head">
          <LabelText>Entity</LabelText>
          <LabelText>Status</LabelText>
          <LabelText>Updated</LabelText>
          <LabelText>Actions</LabelText>
        </div>
        {[
          ['Elite Pack', 'Active', 'Apr 30, 2026'],
          ['Promo Card Pool', 'Draft', 'Apr 29, 2026'],
          ['Starter User Bonus', 'Active', 'Apr 28, 2026'],
        ].map(([name, status, updated]) => (
          <div className="admin-org-table-row" key={name}>
            <BodyText>{name}</BodyText>
            <BodyText>{status}</BodyText>
            <TimestampText>{updated}</TimestampText>
            <TableRowActions />
          </div>
        ))}
      </div>
    </section>
  )
}

export function AdminEntityEditorDrawer() {
  return (
    <section className="admin-org-drawer" role="region" aria-labelledby="admin-drawer-title">
      <div className="admin-org-drawer-header">
        <div id="admin-drawer-title">
          <LabelText>AdminEntityEditorDrawer</LabelText>
          <SectionTitle as="h2">Edit Pack Entity</SectionTitle>
        </div>
        <BackButton>Close</BackButton>
      </div>

      <form className="admin-org-drawer-form">
        <FormField label="Pack Name" defaultValue="Elite Pack" />
        <FormField label="Price" defaultValue="120000" />
        <FormField label="Card Count" defaultValue="3" />
        <PasswordField label="Admin PIN" defaultValue="123456" hint="Confirm privileged update before publish." />
        <PrimaryButton>Save Changes</PrimaryButton>
      </form>
    </section>
  )
}

export function AdminDeleteConfirmModal() {
  return (
    <section className="admin-org-modal-overlay">
      <div className="admin-org-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
        <div id="admin-delete-title">
          <LabelText>AdminDeleteConfirmModal</LabelText>
          <SectionTitle as="h2">Delete Pack Entity</SectionTitle>
        </div>
        <BodyText>This action removes the selected entity from admin control flow and should always require explicit confirmation.</BodyText>
        <ConfirmActionPanel
          title="Delete Elite Pack"
          summary="Deleting this entity will remove it from active pack catalog and related admin tables."
          currentBalance={0}
          expectedBalance={0}
          primaryLabel="Confirm Delete"
          secondaryLabel="Cancel"
        />
      </div>
    </section>
  )
}
