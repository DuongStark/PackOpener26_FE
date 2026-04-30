# PackOpener2026 — Product Structure & Atomic Design Breakdown (v1.0)

**Document Owner:** Frontend Product Designer  
**Status:** Draft for implementation  
**Date:** 2026-04-29  
**References:** `PackOpener2026_DesignSystem_v1.0.md`

---

## 1. Mục tiêu tài liệu

Tài liệu này chuyển hóa Design System hiện tại thành cấu trúc sản phẩm có thể thiết kế và triển khai được ngay cho frontend.  
Trọng tâm là:

- Xác định đầy đủ các màn hình cho `guest`, `player`, `admin`
- Chuẩn hóa luồng chính của game mở thẻ
- Phân rã giao diện theo `Atom / Molecule / Organism / Template / Page`
- Ghi rõ các phần hiện có thể dùng `mock data` trước khi map backend đầy đủ

Tài liệu này **không thay thế** Design System gốc. Nó là lớp phân tích sản phẩm và UI architecture nằm phía trên Design System.

---

## 2. Tóm tắt sản phẩm

PackOpener2026 là một web game mở pack thẻ cầu thủ. Vòng lặp gameplay cốt lõi:

`Đăng ký -> Nhận coin -> Mua pack -> Mở pack -> Nhận card -> Xem card -> Bán card -> Có thêm coin -> Mua tiếp`

### 2.1 Vai trò người dùng

- `Guest`: chỉ xem landing page, CTA đăng ký, CTA đăng nhập
- `Player`: mua pack, mở pack, xem pack sở hữu, xem card sở hữu, bán card
- `Admin`: CRUD `pack`, CRUD `card`, CRUD `user`, xem overview

### 2.2 Mục tiêu version 1

- Giao diện hoàn chỉnh, đủ đẹp để public
- Luồng chơi hoạt động trọn vẹn
- Ưu tiên desktop trước
- Có thể triển khai production lên Vercel
- Chấp nhận dùng mock data ở các vùng backend chưa chốt

### 2.3 Nguyên tắc UX kế thừa từ Design System

- Dark, dramatic, sports-first
- Trọng tâm là cảm giác hồi hộp lúc mở pack
- Home và Market phải dẫn người chơi tới hành động `mua pack` thật nhanh
- Inventory và Card phải hỗ trợ loop quay lại gameplay, không phải chỉ để trưng bày
- Các overlay, modal, slide-over phải nhất quán với hệ điều hướng đã định nghĩa

---

## 3. Cấu trúc sản phẩm tổng thể

### 3.1 Sitemap

#### Public / Guest

- `Landing Page`
- `Login Page`
- `Register Page`

#### Player App

- `Home`
- `Market`
- `Inventory`
- `Cards`
- `Open Pack`
- `Pack Detail View`
- `Card Detail View`

#### Admin App

- `Admin Overview`
- `Admin Cards`
- `Admin Packs`
- `Admin Users`

### 3.2 Navigation logic

- Guest dùng điều hướng web thông thường giữa landing, login, register
- Player dùng `topbar cố định + màn chính + slide-over / modal`
- Các màn `Pack Detail`, `Card Detail`, `Open Pack` nên ưu tiên mở bằng `slide-over` hoặc `full-screen overlay`
- Admin dùng layout dashboard riêng, thiên về bảng dữ liệu, filter, sort, CRUD

---

## 4. Các luồng cốt lõi

### 4.1 Luồng acquisition

`Landing -> Register -> Nhận 1000 coin -> Login -> Home`

### 4.2 Luồng gameplay chính

`Home hoặc Market -> Chọn pack -> Xem pack detail -> Buy pack -> Chọn Open now / Send to inventory -> Open Pack -> Reveal card(s) -> Card result -> Inventory / Cards -> Sell -> Coin tăng`

### 4.3 Luồng collection

`Home -> Cards -> Filter / Sort / Select multi -> Sell selected -> Confirm modal -> Coin update`

### 4.4 Luồng pack storage

`Home -> Inventory -> Search / Filter pack -> Open pack hoặc Sell pack nếu có rule sell pack`

Lưu ý: nếu gameplay chỉ tập trung vào mở rồi bán card, thì `Inventory` nên ưu tiên là kho `pack chưa mở`, không để chồng chéo vai trò với `Cards`.

### 4.5 Luồng admin

`Admin Login -> Overview -> Cards / Packs / Users -> Search / Filter / Create / Edit / Delete`

---

## 5. Danh sách page và mục tiêu từng page

## 5.1 Landing Page

**Mục tiêu:** thuyết phục guest đăng ký ngay.

**Khối nội dung bắt buộc:**

- Hero visual với card nổi bật và CTA
- Banner `Free 1000 coins when you sign up`
- Showcase rarity tiers
- How it works 3 bước hoặc 4 bước
- Featured cards / spotlight cards
- CTA section cuối trang
- Footer

**Yêu cầu thiết kế:**

- Phải tạo cảm giác premium và kịch tính ngay từ fold đầu
- CTA `Đăng ký` phải mạnh hơn `Đăng nhập`
- Có chuyển động nền, glow, card tilt hoặc reveal nhẹ

**Mock data cần dùng:**

- Spotlight cards
- Rarity descriptions
- Hero statistics như số pack đã mở, số card hiếm, leaderboard teaser

## 5.2 Login Page

**Mục tiêu:** đăng nhập nhanh, rõ ràng, vẫn giữ tính thẩm mỹ.

**Khối nội dung bắt buộc:**

- Auth form
- Brand panel / visual side
- Link sang register
- Error / validation state

**Mock data cần dùng:**

- Không cần mock business data
- Có thể mock testimonial ngắn hoặc highlight feature bên panel phải

## 5.3 Register Page

**Mục tiêu:** tối đa hóa chuyển đổi đăng ký.

**Khối nội dung bắt buộc:**

- Form gồm `email`, `username`, `password`
- Highlight thưởng `1000 coins`
- Link sang login
- Validation message rõ ràng

**Mock data cần dùng:**

- Không cần mock API response ngoài form validation demo

## 5.4 Home

**Mục tiêu:** đưa player vào loop mở pack càng nhanh càng tốt.

**Khối nội dung bắt buộc:**

- Welcome / coin snapshot
- Featured packs
- Rarest owned cards leaderboard teaser
- Shortcut buttons tới `Inventory`, `Cards`, `Market`
- CTA `Buy Pack` nổi bật nhất

**Mock data cần dùng:**

- Featured packs ranking
- Rarest owned cards
- User progression snapshot nếu backend chưa có

## 5.5 Inventory

**Mục tiêu:** quản lý các pack đang sở hữu nhưng chưa mở hoặc đã lưu.

**Khối nội dung bắt buộc:**

- Search
- Filter pack type / rarity / status
- Infinite scroll pack list
- Pack actions: `Open`, `View`, có thể `Sell` nếu sản phẩm cho phép
- Empty state kéo người dùng về `Market`

**Mock data cần dùng:**

- Inventory summary
- Pack status labels nếu backend chưa chốt

## 5.6 Cards

**Mục tiêu:** quản lý toàn bộ card đã sở hữu và bán card hiệu quả.

**Khối nội dung bắt buộc:**

- Search theo tên
- Filter rarity / position / club / nation
- Sort theo `OVR`, `rarity`, `sellPrice`, `newest`
- Infinite scroll card list
- Select nhiều card
- Bulk sell action bar
- Empty state kéo người dùng về `Open Pack` hoặc `Market`

**Mock data cần dùng:**

- Filter option counts
- Bulk sell preview
- Rare card tags nếu backend chưa trả đủ metadata

## 5.7 Market

**Mục tiêu:** bán pack thật hiệu quả.

**Khối nội dung bắt buộc:**

- Pack catalog đang mở bán
- Filter / sort pack
- Pack detail quick view
- Buy flow
- Sau khi mua: lựa chọn `Open now` hoặc `Send to inventory`

**Mock data cần dùng:**

- Pack odds chi tiết
- Pack marketing description
- Pack badges như `Best Value`, `Hot`, `Limited`

## 5.8 Open Pack

**Mục tiêu:** tạo khoảnh khắc cảm xúc mạnh nhất của sản phẩm.

**Khối nội dung bắt buộc:**

- Stage animation
- Pack art / shake / flash
- Reveal từng card
- Trường hợp 1 pack ra nhiều card
- Result state với hành động tiếp theo

**Điều chỉnh thêm so với Design System hiện tại:**

- Nếu pack có nhiều card, nên reveal theo nhịp:
  - Phase 1: intro pack
  - Phase 2: reveal từng thuộc tính / rarity cue
  - Phase 3: hiện từng card theo `stagger`
  - Phase 4: result grid tổng hợp
- Card hiếm nhất trong pack nên được spotlight cuối cùng

**Mock data cần dùng:**

- Sequence metadata
- Reveal order
- Sound / animation cue mapping nếu backend không cung cấp

## 5.9 Pack Detail View

**Mục tiêu:** giúp người chơi hiểu gói pack trước khi mua hoặc mở.

**Khối nội dung bắt buộc:**

- Pack image
- Price
- Card count
- Odds by rarity
- CTA mua hoặc mở

## 5.10 Card Detail View

**Mục tiêu:** cho phép xem kỹ một thẻ và bán thẻ.

**Khối nội dung bắt buộc:**

- Card large display
- All stats
- Sell price
- Sell action
- Related / similar cards có thể là optional

**Mock data cần dùng:**

- Similar cards
- Ownership history nếu muốn enrich UI

## 5.11 Admin Overview

**Mục tiêu:** cho admin thấy tình hình game nhanh.

**Khối nội dung bắt buộc:**

- KPI cards
- User count
- Pack sold
- Cards opened
- Coin sink / coin source
- Recent activity

**Mock data cần dùng:**

- Hầu như toàn bộ analytics nếu backend chưa có dashboard API

## 5.12 Admin Cards / Packs / Users

**Mục tiêu:** CRUD nhanh, rõ, ít drama hơn player-facing UI.

**Khối nội dung bắt buộc:**

- Toolbar search/filter/sort
- Data table
- Row actions: view / edit / delete
- Create / edit drawer hoặc modal

**Mock data cần dùng:**

- Table totals
- Advanced filters
- Inline stats

---

## 6. Atomic Design Breakdown

## 6.1 Atoms

Atoms là các đơn vị nhỏ nhất, không chứa logic business phức tạp.

### Typography & Text

- `HeadingDisplay`
- `SectionTitle`
- `BodyText`
- `CaptionText`
- `StatNumber`
- `CoinNumber`
- `PlayerNameText`
- `LabelText`

### Controls

- `PrimaryButton`
- `GoldCTAButton`
- `GhostButton`
- `DangerButton`
- `IconButton`
- `BackButton`
- `TextInput`
- `PasswordInput`
- `SearchInput`
- `SelectField`
- `Checkbox`
- `Radio`
- `Toggle`

### Indicators

- `RarityChip`
- `StatusBadge`
- `NewBadge`
- `HotBadge`
- `MetricDelta`
- `LoadingDot`
- `SkeletonBlock`
- `Divider`

### Visual primitives

- `CoinIcon`
- `PackIcon`
- `CardFrame`
- `Avatar`
- `FlagIcon`
- `ClubBadge`
- `SurfacePanel`
- `GlowRing`

### Data atoms

- `StatLabel`
- `StatValue`
- `PriceText`
- `TimestampText`
- `EmptyStateIcon`
- `TableCellText`
- `TableCellNumber`

---

## 6.2 Molecules

Molecules là các nhóm atom thực hiện một tác vụ UI đơn lẻ.

### Auth

- `FormField`
  - label + input + hint + error
- `PasswordField`
  - password input + show/hide toggle
- `AuthFormFooter`
  - submit + secondary link

### Economy / Progress

- `CoinDisplay`
  - coin icon + animated balance
- `RewardPill`
  - badge + supporting text
- `BalanceChangeToast`
  - amount delta + message

### Card / Pack

- `PlayerStatItem`
  - stat label + stat number
- `PlayerMetaGroup`
  - position + nation + club
- `PlayerNameBar`
  - scaled name renderer
- `PackMetaBlock`
  - price + card count + odds teaser
- `PackPurchaseChoice`
  - open now / send inventory options
- `PackActionCluster`
  - buy / view / open buttons

### Search / Filter / Sort

- `SearchBar`
- `FilterChipGroup`
- `SortControl`
- `FilterDropdown`
- `ResultCountBar`

### Commerce / Selling

- `SellSummaryRow`
  - unit price + quantity + total
- `BulkSelectBar`
  - selected count + sell CTA + clear CTA
- `ConfirmActionPanel`
  - summary + primary + secondary

### Table / Admin

- `TableToolbar`
- `TableRowActions`
- `MetricCard`
- `ActivityListItem`

---

## 6.3 Organisms

Organisms là các section hoặc khối lớn, đã có ý nghĩa nghiệp vụ rõ ràng.

### Public-facing organisms

- `LandingHero`
  - headline, subcopy, CTA, spotlight cards
- `FreeCoinPromoBanner`
  - free 1000 coin message
- `RarityShowcaseSection`
  - list rarity + visual explanation
- `HowItWorksSection`
  - steps register / buy / open / sell
- `FeaturedCardsCarousel`
  - hiển thị các card kích thích đăng ký
- `LandingFooter`

### Auth organisms

- `AuthFeaturePanel`
  - brand message + visual + gameplay promise
- `LoginFormPanel`
- `RegisterFormPanel`

### Core player organisms

- `Topbar`
  - logo, coin display, avatar, maybe admin switch
- `QuickNavPanel`
  - links tới inventory, cards, market
- `FeaturedPackShelf`
  - pack cards nổi bật
- `RareCardLeaderboard`
  - bảng xếp hạng card hiếm / OVR cao
- `PackInventoryGrid`
  - grid + infinite loader
- `CardCollectionGrid`
  - grid + multi-select + infinite loader
- `MarketPackCatalog`
  - danh sách pack bán
- `PackDetailPanel`
  - full pack detail trong slide-over
- `CardDetailPanel`
  - full card detail trong slide-over
- `BulkSellActionBar`
  - sticky bar khi chọn nhiều thẻ
- `EmptyStatePanel`
  - illustration + CTA

### Pack opening organisms

- `PackOpeningStage`
  - background stage + pack visual
- `PackShakeSequence`
- `RevealCueSequence`
  - hiện dần OVR / position / nation / flare cue
- `CardRevealRail`
  - reveal từng card
- `PackResultSummary`
  - tổng kết kết quả pack

### Admin organisms

- `AdminSidebar` hoặc `AdminTopNav`
- `AdminOverviewMetrics`
- `AdminRecentActivity`
- `AdminCrudTable`
- `AdminEntityEditorDrawer`
- `AdminDeleteConfirmModal`

---

## 6.4 Templates

Templates là khung bố cục dùng chung cho nhiều page.

### `PublicMarketingTemplate`

Dùng cho landing page.  
Bao gồm:

- full viewport hero
- stacked sections
- footer

### `AuthSpotlightTemplate`

Dùng cho login và register.  
Bao gồm:

- split layout trái/phải
- bên form, bên visual storytelling

### `PlayerAppShellTemplate`

Dùng cho toàn bộ app player.  
Bao gồm:

- fixed topbar
- main canvas
- slide-over layer
- modal layer

### `CollectionManagementTemplate`

Dùng cho inventory và cards.  
Bao gồm:

- page header
- search/filter/sort bar
- content grid infinite scroll
- empty state
- action bar nổi khi có selection

### `MarketCatalogTemplate`

Dùng cho market.  
Bao gồm:

- featured banner
- filter row
- pack catalog grid
- detail overlay

### `PackOpeningTemplate`

Dùng cho open pack.  
Bao gồm:

- cinematic stage
- reveal sequence
- result summary
- next actions

### `DetailOverlayTemplate`

Dùng cho pack detail và card detail.  
Bao gồm:

- back button trái trên
- detail body
- sticky action footer nếu cần

### `AdminDashboardTemplate`

Dùng cho admin overview.  
Bao gồm:

- nav
- metric cards
- activity panels

### `AdminCrudTemplate`

Dùng cho admin cards, packs, users.  
Bao gồm:

- title
- toolbar
- table
- pagination hoặc infinite list
- create/edit drawer

---

## 6.5 Pages mapping

### Guest pages

#### `Landing Page`

- Template: `PublicMarketingTemplate`
- Organisms:
  - `LandingHero`
  - `FreeCoinPromoBanner`
  - `RarityShowcaseSection`
  - `HowItWorksSection`
  - `FeaturedCardsCarousel`
  - `LandingFooter`

#### `Login Page`

- Template: `AuthSpotlightTemplate`
- Organisms:
  - `AuthFeaturePanel`
  - `LoginFormPanel`

#### `Register Page`

- Template: `AuthSpotlightTemplate`
- Organisms:
  - `AuthFeaturePanel`
  - `RegisterFormPanel`

### Player pages

#### `Home`

- Template: `PlayerAppShellTemplate`
- Organisms:
  - `Topbar`
  - `QuickNavPanel`
  - `FeaturedPackShelf`
  - `RareCardLeaderboard`

#### `Inventory`

- Template: `CollectionManagementTemplate`
- Organisms:
  - `Topbar`
  - `PackInventoryGrid`
  - `EmptyStatePanel`

#### `Cards`

- Template: `CollectionManagementTemplate`
- Organisms:
  - `Topbar`
  - `CardCollectionGrid`
  - `BulkSellActionBar`
  - `EmptyStatePanel`

#### `Market`

- Template: `MarketCatalogTemplate`
- Organisms:
  - `Topbar`
  - `MarketPackCatalog`
  - `PackDetailPanel`

#### `Open Pack`

- Template: `PackOpeningTemplate`
- Organisms:
  - `PackOpeningStage`
  - `PackShakeSequence`
  - `RevealCueSequence`
  - `CardRevealRail`
  - `PackResultSummary`

#### `Pack Detail View`

- Template: `DetailOverlayTemplate`
- Organisms:
  - `PackDetailPanel`

#### `Card Detail View`

- Template: `DetailOverlayTemplate`
- Organisms:
  - `CardDetailPanel`

### Admin pages

#### `Admin Overview`

- Template: `AdminDashboardTemplate`
- Organisms:
  - `AdminOverviewMetrics`
  - `AdminRecentActivity`

#### `Admin Cards`

- Template: `AdminCrudTemplate`
- Organisms:
  - `AdminCrudTable`
  - `AdminEntityEditorDrawer`
  - `AdminDeleteConfirmModal`

#### `Admin Packs`

- Template: `AdminCrudTemplate`
- Organisms:
  - `AdminCrudTable`
  - `AdminEntityEditorDrawer`
  - `AdminDeleteConfirmModal`

#### `Admin Users`

- Template: `AdminCrudTemplate`
- Organisms:
  - `AdminCrudTable`
  - `AdminEntityEditorDrawer`
  - `AdminDeleteConfirmModal`

---

## 7. Dữ liệu mock cần chuẩn bị

Vì backend mapping trong Design System hiện chưa đủ cho toàn bộ UI, các vùng sau nên chủ động mock trước:

### 7.1 Landing

- `featuredCards`
  - `id, name, overall, rarity, imageUrl, position, club, nation`
- `rarityShowcase`
  - `rarity, label, color, shortDescription, sampleOdds`
- `heroStats`
  - `totalCards, totalPacks, topOvr, packTypes`

### 7.2 Home

- `featuredPacks`
  - `id, name, price, cardCount, imageUrl, badge, rarityFocus`
- `rareOwnedLeaderboard`
  - `id, name, overall, rarity, ownerName, imageUrl`
- `userSnapshot`
  - `username, coinBalance, openedPacks, totalCardsOwned`

### 7.3 Inventory

- `userPackInventory`
  - `id, packId, packName, imageUrl, status, purchasedAt, cardCount, packTier`
- `inventoryFilters`
  - `statusOptions, rarityOptions, sortOptions`

### 7.4 Cards

- `ownedCards`
  - `id, name, rarity, overall, position, club, nation, imageUrl, sellPrice, obtainedAt`
- `cardFilterOptions`
  - `rarity, position, club, nation`
- `bulkSellPreview`
  - `selectedCount, totalValue`

### 7.5 Market

- `marketPacks`
  - `id, name, price, cardCount, imageUrl, isActive, odds, badge, description`
- `packQuickPreview`
  - `topPossibleCards, expectedValueHint, raritySpread`

### 7.6 Open Pack

- `openPackSequence`
  - `packId, packName, revealMode, revealOrder, cards[]`
- `cards[]`
  - `cardId, name, rarity, overall, position, club, nation, imageUrl, stats`
- `resultSummary`
  - `bestCardId, totalSellValue, duplicateCount`

### 7.7 Admin

- `overviewMetrics`
  - `totalUsers, activeUsers, totalPacksSold, totalCardsOpened, totalCoinsSpent`
- `recentActivities`
  - `id, type, actor, target, createdAt`
- `entityTables`
  - `cards, packs, users` với paging/filter/sort mock

---

## 8. Bổ sung cần ghi nhận vào Design System sau này

Các mục dưới đây chưa đủ rõ trong Design System gốc, nên lần cập nhật tiếp theo cần ghi lại chính thức:

- Spec cho `landing page`, `auth page`, `admin pages`
- Quy chuẩn `infinite scroll`
- Quy chuẩn `multi-select` và `bulk sell`
- Pack opening flow khi `1 pack -> nhiều card`
- Quy chuẩn visual cho `leaderboard`, `empty state`, `overview metrics`
- Quy chuẩn table UI cho admin
- Quy chuẩn badge marketing của pack như `Hot`, `Best Value`, `Limited`

Lưu ý: hiện tại tài liệu này chỉ ghi nhận bổ sung ở mức product architecture, chưa sửa trực tiếp file Design System gốc.

---

## 9. Định hướng triển khai frontend

Nếu bắt đầu dựng UI từ tài liệu này, thứ tự nên là:

1. Dựng `tokens + app shell + topbar + buttons + inputs`
2. Dựng `player card`, `pack card`, `coin display`
3. Dựng `landing`, `login`, `register`
4. Dựng `market`, `open pack`, `cards`, `inventory`
5. Dựng `admin CRUD templates`
6. Sau cùng mới thay mock data bằng API thật

---

## 10. Kết luận

Kiến trúc phù hợp nhất cho PackOpener2026 là:

- `Guest`: marketing-first, CTA mạnh, kích thích đăng ký
- `Player`: gameplay-first, mở pack là trung tâm
- `Admin`: data-first, CRUD rõ ràng, ít hiệu ứng hơn

Atomic breakdown trong tài liệu này đủ để team chuyển sang wireframe, visual design chi tiết, component architecture và frontend implementation mà không bị thiếu lớp trung gian giữa ý tưởng sản phẩm và Design System.
