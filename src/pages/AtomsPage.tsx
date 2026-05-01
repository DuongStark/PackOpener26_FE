import { useState } from 'react'
import {
  BackButton,
  Avatar,
  BodyText,
  CaptionText,
  CardFrame,
  Checkbox,
  ClubBadge,
  CoinIcon,
  CoinNumber,
  DangerButton,
  Divider,
  EmptyStateIcon,
  FlagIcon,
  GhostButton,
  GlowRing,
  GoldCTAButton,
  HeadingDisplay,
  HotBadge,
  IconButton,
  LabelText,
  LoadingDot,
  MetricDelta,
  NewBadge,
  PackIcon,
  PasswordInput,
  PlayerNameText,
  PrimaryButton,
  PriceText,
  Radio,
  RarityChip,
  SearchInput,
  SectionTitle,
  SelectField,
  SkeletonBlock,
  StatLabel,
  StatNumber,
  StatValue,
  StatusBadge,
  SurfacePanel,
  TableCellNumber,
  TableCellText,
  TextInput,
  TimestampText,
  Toggle,
} from '../components/atoms'
import '../App.css'

export default function AtomsPage() {
  const [search, setSearch] = useState('')
  const [packType, setPackType] = useState('elite')
  const [newsletter, setNewsletter] = useState(true)
  const [selectedView, setSelectedView] = useState('market')

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <CaptionText className="eyebrow">PackOpener2026 Typography System</CaptionText>
        <HeadingDisplay>Atomic Text Styles</HeadingDisplay>
        <BodyText className="hero-copy">
          Tất cả màu trong giao diện này đều lấy từ token trong
          {' '}
          <code>src/styles/global.css</code>
          . Từ đây về sau component chỉ được tham chiếu CSS variables thay vì tự tạo màu mới.
        </BodyText>
      </section>

      <section className="atoms-grid" aria-label="Typography atoms preview">
        <article className="atom-card atom-card-wide">
          <LabelText>HeadingDisplay</LabelText>
          <HeadingDisplay as="h2">Ultimate Team Pack Rush</HeadingDisplay>
          <CaptionText>Dùng cho hero headline và key campaign moments.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>SectionTitle</LabelText>
          <SectionTitle>Featured Packs</SectionTitle>
          <CaptionText>Tiêu đề section và panel title.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>BodyText</LabelText>
          <BodyText>
            Open premium packs, collect star players, then sell duplicates to stay in the gameplay loop.
          </BodyText>
          <CaptionText>Nội dung mô tả, tooltip, empty state copy.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>CaptionText</LabelText>
          <CaptionText>LAST OPENED 2 MINUTES AGO</CaptionText>
          <CaptionText>Metadata và supporting copy.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>StatNumber</LabelText>
          <div className="stat-row">
            <div>
              <StatNumber>91</StatNumber>
              <CaptionText>PAC</CaptionText>
            </div>
            <div>
              <StatNumber>88</StatNumber>
              <CaptionText>SHO</CaptionText>
            </div>
            <div>
              <StatNumber>84</StatNumber>
              <CaptionText>PAS</CaptionText>
            </div>
          </div>
        </article>

        <article className="atom-card">
          <LabelText>CoinNumber</LabelText>
          <CoinNumber>128,400</CoinNumber>
          <CaptionText>Số coin topbar, giá pack, sell result.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>PlayerNameText</LabelText>
          <div className="player-name-frame">
            <PlayerNameText>KHVICHA KVARATSKHELIA</PlayerNameText>
          </div>
          <CaptionText>Tên dài phải fit một dòng, không ellipsis.</CaptionText>
        </article>

        <article className="atom-card">
          <LabelText>LabelText</LabelText>
          <div className="label-row">
            <LabelText>PAC</LabelText>
            <LabelText>OVR</LabelText>
            <LabelText>LIMITED</LabelText>
          </div>
          <CaptionText>Nav label, stat label, small UI tags.</CaptionText>
        </article>

        <article className="atom-card atom-card-wide">
          <LabelText>Buttons</LabelText>
          <div className="controls-preview-row">
            <PrimaryButton>Mua Pack</PrimaryButton>
            <GoldCTAButton>120,000 Coins</GoldCTAButton>
            <GhostButton>Xem Chi Tiết</GhostButton>
            <DangerButton>Bán Thẻ</DangerButton>
          </div>
          <div className="controls-preview-row">
            <IconButton icon="★">Wishlist</IconButton>
            <BackButton />
            <PrimaryButton disabled>Không đủ coin</PrimaryButton>
          </div>
        </article>

        <article className="atom-card atom-card-wide">
          <LabelText>Inputs & Selections</LabelText>
          <div className="controls-form-grid">
            <TextInput
              label="Username"
              placeholder="Nhập tên người chơi"
              hint="6-20 ký tự, chỉ gồm chữ và số"
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              error="Mật khẩu phải có ít nhất 6 ký tự"
              defaultValue="123"
            />
            <SearchInput
              label="Search Cards"
              placeholder="Tìm theo tên cầu thủ"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <SelectField
              label="Pack Type"
              value={packType}
              onChange={(event) => setPackType(event.target.value)}
              options={[
                { label: 'Elite Pack', value: 'elite' },
                { label: 'Gold Pack', value: 'gold' },
                { label: 'Starter Pack', value: 'starter' },
              ]}
            />
          </div>
          <div className="controls-choice-grid">
            <Checkbox label="Chỉ hiện pack đang bán" hint="Ẩn pack đã ngưng phát hành" defaultChecked />
            <Radio
              label="Market View"
              hint="Layout ưu tiên hành động mua nhanh"
              name="view-mode"
              value="market"
              checked={selectedView === 'market'}
              onChange={() => setSelectedView('market')}
            />
            <Radio
              label="Collection View"
              hint="Layout ưu tiên duyệt card đã sở hữu"
              name="view-mode"
              value="collection"
              checked={selectedView === 'collection'}
              onChange={() => setSelectedView('collection')}
            />
            <Toggle
              label="Nhận thông báo event"
              hint="Bật để nhận alert về pack Limited"
              checked={newsletter}
              onChange={() => setNewsletter((value) => !value)}
            />
          </div>
        </article>

        <article className="atom-card atom-card-wide">
          <LabelText>Indicators</LabelText>
          <div className="indicator-preview-group">
            <RarityChip rarity="bronze">Bronze</RarityChip>
            <RarityChip rarity="silver">Silver</RarityChip>
            <RarityChip rarity="gold">Gold</RarityChip>
            <RarityChip rarity="special">Special</RarityChip>
            <RarityChip rarity="elite">TOTY</RarityChip>
          </div>
          <div className="indicator-preview-group">
            <StatusBadge status="pending">Pending</StatusBadge>
            <StatusBadge status="opened">Opened</StatusBadge>
            <StatusBadge status="sold">Sold</StatusBadge>
            <StatusBadge status="error">Error</StatusBadge>
            <NewBadge />
            <HotBadge />
          </div>
          <div className="indicator-preview-group">
            <MetricDelta tone="positive" value="+12.5%" />
            <MetricDelta tone="negative" value="-340 Coins" />
            <MetricDelta tone="neutral" value="No change" />
          </div>
          <Divider />
          <div className="indicator-preview-grid">
            <div className="indicator-stack">
              <LabelText>LoadingDot</LabelText>
              <LoadingDot aria-label="Loading" />
            </div>
            <div className="indicator-stack">
              <LabelText>SkeletonBlock</LabelText>
              <div className="skeleton-preview">
                <SkeletonBlock style={{ height: 18, width: '42%' }} />
                <SkeletonBlock style={{ height: 52, width: '100%' }} />
                <SkeletonBlock style={{ height: 14, width: '78%' }} />
              </div>
            </div>
          </div>
        </article>

        <article className="atom-card atom-card-wide">
          <LabelText>Visual Primitives</LabelText>
          <div className="visual-preview-row">
            <div className="visual-primitive-stack">
              <LabelText>CoinIcon</LabelText>
              <GlowRing color="rgba(212, 160, 23, 0.28)">
                <CoinIcon />
              </GlowRing>
            </div>
            <div className="visual-primitive-stack">
              <LabelText>PackIcon</LabelText>
              <PackIcon label="Elite" />
            </div>
            <div className="visual-primitive-stack">
              <LabelText>Avatar</LabelText>
              <Avatar initials="DS" size={44} />
            </div>
            <div className="visual-primitive-stack">
              <LabelText>Flag / Club</LabelText>
              <div className="visual-inline-pair">
                <FlagIcon src="https://cdn.futbin.com/content/fifa24/img/nation/18.png" alt="France flag" />
                <ClubBadge src="https://cdn.futbin.com/content/fifa24/img/clubs/243.png" alt="Real Madrid badge">RMA</ClubBadge>
              </div>
            </div>
          </div>

          <div className="visual-preview-grid">
            <div className="visual-primitive-stack">
              <LabelText>SurfacePanel</LabelText>
              <SurfacePanel raised>
                <SectionTitle as="h3">Premium Surface</SectionTitle>
                <BodyText>
                  Panel nền chuẩn cho drawer, pack detail và activity block.
                </BodyText>
              </SurfacePanel>
            </div>

            <div className="visual-primitive-stack">
              <LabelText>GlowRing</LabelText>
              <GlowRing color="rgba(34, 211, 238, 0.3)">
                <SurfacePanel padding={16}>
                  <CaptionText>Elite Spotlight</CaptionText>
                  <CoinNumber>245,000</CoinNumber>
                </SurfacePanel>
              </GlowRing>
            </div>
          </div>

          <div className="visual-primitive-stack">
            <LabelText>CardFrame</LabelText>
            <div className="card-frame-preview">
              <GlowRing color="rgba(192, 96, 255, 0.26)">
                <CardFrame
                  rarity="DIAMOND_RARE"
                  overall={91}
                  position="ST"
                  playerName="K. MBAPPÉ"
                  nationImageSrc="https://cdn.futbin.com/content/fifa24/img/nation/18.png"
                  clubCode="RMA"
                  clubImageSrc="https://cdn.futbin.com/content/fifa24/img/clubs/243.png"
                  imageSrc="https://cdn.sofifa.net/players/231/747/26_120.png"
                  stats={{ pac: 97, sho: 90, pas: 81, dri: 92, def: 37, phy: 76 }}
                />
              </GlowRing>
            </div>
          </div>
        </article>

        <article className="atom-card atom-card-wide">
          <LabelText>Data Atoms</LabelText>

          <div className="data-preview-grid">
            <div className="data-preview-card">
              <StatLabel>Total Packs Opened</StatLabel>
              <StatValue>12,480</StatValue>
              <TimestampText dateTime="2026-04-30T11:40:00+07:00">
                Updated 2 minutes ago
              </TimestampText>
            </div>

            <div className="data-preview-card">
              <StatLabel>Elite Pack Price</StatLabel>
              <PriceText>120,000</PriceText>
              <BodyText>Giá phải format hàng nghìn và đi theo visual coin.</BodyText>
            </div>

            <div className="data-preview-card">
              <StatLabel>EmptyStateIcon</StatLabel>
              <div className="data-empty-preview">
                <EmptyStateIcon>▣</EmptyStateIcon>
                <BodyText>No packs available. Go to Market.</BodyText>
              </div>
            </div>
          </div>

          <div className="data-table-preview">
            <div className="data-table-preview-head">
              <StatLabel>Player</StatLabel>
              <StatLabel>Rarity</StatLabel>
              <StatLabel>Sell Price</StatLabel>
              <StatLabel>Obtained</StatLabel>
            </div>
            <div className="data-table-preview-row">
              <TableCellText>Kylian Mbappe</TableCellText>
              <TableCellText>Elite</TableCellText>
              <TableCellNumber>325,000</TableCellNumber>
              <TimestampText dateTime="2026-04-29T22:15:00+07:00">
                Apr 29, 2026
              </TimestampText>
            </div>
            <div className="data-table-preview-row">
              <TableCellText>Very Long Administrative Card Name Example</TableCellText>
              <TableCellText>Special</TableCellText>
              <TableCellNumber>48,500</TableCellNumber>
              <TimestampText dateTime="2026-04-27T16:20:00+07:00">
                Apr 27, 2026
              </TimestampText>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
