import { useState } from 'react'
import {
  AuthFormFooter,
  BalanceChangeToast,
  BulkSelectBar,
  CoinDisplay,
  ConfirmActionPanel,
  FilterChipGroup,
  FilterDropdown,
  FormField,
  MetricCard,
  PackActionCluster,
  PackMetaBlock,
  PackPurchaseChoice,
  PasswordField,
  PlayerMetaGroup,
  PlayerNameBar,
  PlayerStatItem,
  ResultCountBar,
  RewardPill,
  SearchBar,
  SellSummaryRow,
  SortControl,
  ActivityListItem,
  TableRowActions,
  TableToolbar,
} from '../components/molecules'
import { BodyText, CaptionText, HeadingDisplay, LabelText, NewBadge, SectionTitle, SurfacePanel } from '../components/atoms'
import '../pages/styles/molecules-page.css'

export default function MoleculesPage() {
  const [email, setEmail] = useState('demo@packopener26.gg')
  const [username, setUsername] = useState('duongstark')
  const [password, setPassword] = useState('12345')
  const [balance, setBalance] = useState(128400)
  const [purchaseChoice, setPurchaseChoice] = useState<'open-now' | 'send-inventory'>('open-now')
  const [searchQuery, setSearchQuery] = useState('messi')
  const [selectedRarities, setSelectedRarities] = useState<string[]>(['elite', 'special'])
  const [sortValue, setSortValue] = useState('ovr')
  const [statusFilter, setStatusFilter] = useState('all')
  const [adminSearch, setAdminSearch] = useState('elite pack')
  const [adminSort, setAdminSort] = useState('newest')

  const toggleRarity = (value: string) => {
    setSelectedRarities((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedRarities([])
    setSortValue('ovr')
    setStatusFilter('all')
  }

  return (
    <main className="molecules-page">
      <section className="hero-panel molecules-hero">
        <CaptionText className="eyebrow">PackOpener2026 Molecules</CaptionText>
        <HeadingDisplay>Auth Building Blocks</HeadingDisplay>
        <BodyText className="hero-copy">
          Page này dành riêng cho preview molecules tại
          {' '}
          <code>/molecules</code>
          , tách khỏi khu atoms để kiểm tra flow form rõ ràng hơn.
        </BodyText>
        <div className="molecules-link-row">
          <a className="molecules-nav-link" href="/atoms">
            Atoms
          </a>
          <a className="molecules-nav-link" href="/">
            Landing
          </a>
        </div>
      </section>

      <section className="molecules-grid">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>FormField</LabelText>
          <SectionTitle as="h2">Register Form</SectionTitle>
          <form className="auth-form">
            <FormField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              hint="Dùng email hợp lệ để nhận 300 coins khi đăng ký."
              placeholder="you@example.com"
            />
            <FormField
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              hint="6-20 ký tự, chỉ gồm chữ và số."
              placeholder="yourusername"
            />
            <PasswordField
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={password.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự.' : undefined}
              hint={password.length >= 6 ? 'Tối thiểu 6 ký tự.' : undefined}
              placeholder="••••••••"
            />
            <AuthFormFooter
              submitLabel="Create Account"
              secondaryPrefix="Already have an account?"
              secondaryLabel="Sign In"
              secondaryHref="#login"
            />
          </form>
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>PasswordField</LabelText>
          <SectionTitle as="h2">States Preview</SectionTitle>
          <FormField
            label="Email"
            type="email"
            defaultValue="manager@club.gg"
            hint="Ví dụ field hợp lệ có hint."
          />
          <FormField
            label="Username"
            defaultValue="ab"
            error="Username phải dài từ 6 đến 20 ký tự."
          />
          <PasswordField
            label="Admin Password"
            defaultValue="UltraSecret123"
            hint="Toggle Show/Hide nằm ngay trong field."
          />
          <AuthFormFooter
            submitLabel="Continue"
            secondaryPrefix="Need a new account?"
            secondaryLabel="Register"
            secondaryHref="#register"
            disabled
          >
            <BodyText className="molecules-note">
              `AuthFormFooter` gom CTA submit và link phụ vào cùng một block để tái sử dụng cho login/register.
            </BodyText>
          </AuthFormFooter>
        </SurfacePanel>
      </section>

      <section className="molecules-grid molecules-grid-economy">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>Economy / Progress</LabelText>
          <SectionTitle as="h2">CoinDisplay</SectionTitle>
          <CoinDisplay balance={balance} />
          <BodyText className="molecules-note">
            Counter dùng `easeOutExpo`, duration 600ms hoặc 1200ms tùy biên độ thay đổi.
          </BodyText>
          <div className="molecules-button-row">
            <button className="molecules-nav-link" type="button" onClick={() => setBalance((value) => value + 850)}>
              +850 Coins
            </button>
            <button className="molecules-nav-link" type="button" onClick={() => setBalance((value) => value - 2400)}>
              -2,400 Coins
            </button>
          </div>
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>RewardPill</LabelText>
          <SectionTitle as="h2">Progress Feedback</SectionTitle>
          <RewardPill
            badge={<NewBadge>+300</NewBadge>}
            supportingText="Free starter coins credited after registration."
          />
          <BalanceChangeToast
            amount={120000}
            message="Elite Pack purchased successfully. New balance updated."
          />
          <BalanceChangeToast
            amount={-24500}
            message="Sold duplicate cards and returned coins to your wallet."
          />
        </SurfacePanel>
      </section>

      <section className="molecules-grid molecules-grid-economy">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>Card / Pack</LabelText>
          <SectionTitle as="h2">Player Card Bits</SectionTitle>
          <PlayerMetaGroup position="RW" nation="🇦🇷" club="MIA" />
          <PlayerNameBar name="LIONEL ANDRES MESSI CUCCITTINI" />
          <div className="molecules-button-row">
            <PlayerStatItem label="PAC" value={91} />
            <PlayerStatItem label="DRI" value={95} />
            <PlayerStatItem label="SHO" value={89} />
          </div>
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>Pack Purchase Flow</LabelText>
          <SectionTitle as="h2">Pack Detail Actions</SectionTitle>
          <PackMetaBlock
            price={120000}
            cardCount={3}
            oddsTeaser="Guaranteed 1 Gold+ player with boosted Special chance."
          />
          <PackPurchaseChoice value={purchaseChoice} onChange={setPurchaseChoice} />
          <PackActionCluster />
        </SurfacePanel>
      </section>

      <section className="molecules-grid molecules-grid-economy">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>Search / Filter / Sort</LabelText>
          <SectionTitle as="h2">Toolbar Controls</SectionTitle>
          <div className="search-filters-bar">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search player, club, nation..."
            />
            <FilterDropdown
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Pending', value: 'pending' },
                { label: 'Opened', value: 'opened' },
              ]}
            />
            <SortControl
              value={sortValue}
              onChange={setSortValue}
              options={[
                { label: 'Highest OVR', value: 'ovr' },
                { label: 'Newest', value: 'newest' },
                { label: 'Sell Price', value: 'sell-price' },
              ]}
            />
          </div>
          <FilterChipGroup
            options={[
              { label: 'Elite', value: 'elite' },
              { label: 'Special', value: 'special' },
              { label: 'Gold', value: 'gold' },
              { label: 'Silver', value: 'silver' },
            ]}
            selected={selectedRarities}
            onToggle={toggleRarity}
          />
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>ResultCountBar</LabelText>
          <SectionTitle as="h2">Applied Filters</SectionTitle>
          <ResultCountBar
            count={18}
            title="Cards Found"
            helper="Search, filter và sort thay đổi dataset hiện tại."
            onClear={clearFilters}
            activeFilters={[
              ...selectedRarities.map((value) => (
                <NewBadge key={value}>{value}</NewBadge>
              )),
              statusFilter !== 'all' ? <NewBadge key={statusFilter}>{statusFilter}</NewBadge> : null,
              searchQuery ? <NewBadge key={searchQuery}>{searchQuery}</NewBadge> : null,
            ].filter(Boolean)}
          />
        </SurfacePanel>
      </section>

      <section className="molecules-grid molecules-grid-economy">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>Commerce / Selling</LabelText>
          <SectionTitle as="h2">Bulk Sell Flow</SectionTitle>
          <SellSummaryRow unitPrice={24500} quantity={3} />
          <BulkSelectBar selectedCount={3} totalValue={73500} />
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>ConfirmActionPanel</LabelText>
          <SectionTitle as="h2">Danger Confirmation</SectionTitle>
          <ConfirmActionPanel
            title="Confirm Card Sale"
            summary="You are about to sell 3 selected cards. This action updates inventory and returns coins to your balance."
            currentBalance={128400}
            expectedBalance={201900}
            primaryLabel="Confirm Sale"
            secondaryLabel="Cancel"
          />
        </SurfacePanel>
      </section>

      <section className="molecules-grid molecules-grid-economy">
        <SurfacePanel className="molecules-auth-card" raised>
          <LabelText>Table / Admin</LabelText>
          <SectionTitle as="h2">Toolbar & Metrics</SectionTitle>
          <TableToolbar
            searchValue={adminSearch}
            onSearchChange={setAdminSearch}
            sortValue={adminSort}
            onSortChange={setAdminSort}
          />
          <div className="data-preview-grid">
            <MetricCard
              label="Total Packs Sold"
              value="18,420"
              delta={{ tone: 'positive', value: '+8.2%' }}
              helperText="Compared to last 7 days"
              highlighted
            />
            <MetricCard
              label="Active Users"
              value="2,148"
              delta={{ tone: 'neutral', value: 'No change' }}
              helperText="Stable over last 24 hours"
            />
            <MetricCard
              label="Coin Sink"
              value="12.8M"
              delta={{ tone: 'negative', value: '-3.4%' }}
              helperText="Lower spend this morning"
            />
          </div>
          <TableRowActions />
        </SurfacePanel>

        <SurfacePanel className="molecules-auth-preview">
          <LabelText>Recent Activity</LabelText>
          <SectionTitle as="h2">ActivityListItem</SectionTitle>
          <ActivityListItem
            title="Pack Updated"
            description="Elite Pack odds were adjusted and published to production."
            timestamp="Apr 30, 2026 · 11:42"
            badge={<NewBadge>Updated</NewBadge>}
          />
          <ActivityListItem
            title="User Deleted"
            description="Flagged test account was removed from the admin dashboard."
            timestamp="Apr 30, 2026 · 10:08"
            badge={<NewBadge>Admin</NewBadge>}
          />
        </SurfacePanel>
      </section>
    </main>
  )
}
