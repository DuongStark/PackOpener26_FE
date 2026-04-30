# PackOpener2026 — Design System & UI Kit (v1.0)

**Document Owner:** Lead UI/UX Designer  
**Classification:** Internal — Team Use Only  
**Last updated:** 2026-04-29

────────────────────────────────────────────────────────────────

> Tài liệu này là nguồn sự thật duy nhất (Single Source of Truth) cho toàn bộ quyết định thiết kế và triển khai giao diện của dự án PackOpener2026. Mọi thành viên trong team — Designer, Developer, QA — đều có nghĩa vụ tuân thủ các quy chuẩn được ban hành tại đây. Không có ngoại lệ.

---

## Mục lục

- 1. Project Overview & Design Philosophy
  - 1.1 Design Pillars
  - 1.2 Phạm vi tài liệu này
- 2. Design Tokens
  - 2.1 Color System
    - 2.1.1 Core Palette — Background & Surface
    - 2.1.2 Brand & Accent Colors
    - 2.1.3 Rarity Color System
    - 2.1.4 Semantic / Feedback Colors
  - 2.2 Typography
    - 2.2.1 Type Scale
  - 2.3 Spacing & Sizing Tokens
  - 2.4 Shadow & Depth System
  - 2.1.5 Marketing & Utility Colors
- 3. Layout System & Navigation
  - 3.1 Main Screen Architecture
  - 3.2 Background Treatment
  - 3.3 Slide-over Navigation Pattern
  - 3.4 Page-Level Experience Specifications
    - 3.4.1 Landing Page Spec
    - 3.4.2 Auth Page Spec
    - 3.4.3 Admin Page Spec
- 4. Component Library
  - 4.1 Topbar Component
    - 4.1.1 Coin Display Specification
  - 4.2 Player Card Component
    - 4.2.1 Aspect Ratio & Dimensions
    - 4.2.2 Card Anatomy
    - 4.2.3 Player Name Rendering Rule — BẮT BUỘC
  - 4.3 Button System
  - 4.4 Badge & Rarity Chip
  - 4.5 Marketing Pack Badge System
- 5. Interaction & Animation Specifications
  - 5.1 Card 3D Tilt Hover (Desktop Only)
  - 5.2 Coin Counter Animation — BẮT BUỘC
  - 5.3 Pack Opening Sequence
    - 5.3.1 Multiple-Card Pack Opening Flow
  - 5.4 Slide-over Transition Timing
- 6. CSS Variables — Master Sheet
- 7. Backend Feature Mapping & Required UI
- 8. QA & Developer Checklist
- 9. Revision History

---

## 1. Project Overview & Design Philosophy

PackOpener2026 là một web game giả lập mở thẻ cầu thủ (Pack-Opening Simulator) dựa trên dữ liệu FC26. Mục tiêu cốt lõi của sản phẩm là tái tạo cảm giác hồi hộp, kịch tính của việc "đập thẻ" trong game gốc, đồng thời cung cấp trải nghiệm quản lý bộ sưu tập thẻ.

### 1.1 Design Pillars

- Dramatic First: Mọi interaction phải phục vụ cảm xúc kịch tính — ưu tiên hiệu ứng hơn tốc độ tải.
- Zero Ambiguity: Người dùng luôn biết mình đang ở đâu và làm gì. Không được có UI gây nhầm lẫn.
- Sports DNA: Ngôn ngữ thiết kế phải thở ra không khí bóng đá chuyên nghiệp — mạnh mẽ, tốc độ, uy lực.
- Dark & Immersive: Nền tối là bắt buộc. Không có giao diện sáng (Light Mode) trong phiên bản này.

### 1.2 Phạm vi tài liệu này

- Design Tokens (màu, typography, spacing, shadow)
- Layout System & Navigation Patterns
- Component Library (Topbar, Card, Button, Modal, Badge, Coin Display...)
- Interaction & Animation Specifications
- Rarity System & Card Anatomy
- Quy tắc bắt buộc (MUST / MUST NOT) cho Developer

---

## 2. Design Tokens

### 2.1 Color System

Toàn bộ màu sắc được định nghĩa dưới dạng CSS Custom Properties (variables). Không được phép hard-code màu trực tiếp vào component.

#### 2.1.1 Core Palette — Background & Surface

| Token Name       |           Hex Value | CSS Variable          | Mô tả / Dùng cho                |
| ---------------- | ------------------: | --------------------- | ------------------------------- |
| --bg-stadium     |             #0A0F1E | var(--bg-stadium)     | Màu nền gốc (base) toàn trang   |
| --bg-overlay     | rgba(10,20,50,0.72) | var(--bg-overlay)     | Lớp overlay ám Blue lên ảnh sân |
| --surface-base   |             #0D1B2E | var(--surface-base)   | Nền card, panel, drawer         |
| --surface-raised |             #102140 | var(--surface-raised) | Card nổi, input field, dropdown |
| --surface-border |             #1E3A5F | var(--surface-border) | Viền tất cả container           |
| --topbar-bg      |  rgba(8,15,35,0.95) | var(--topbar-bg)      | Topbar — frosted glass effect   |

#### 2.1.2 Brand & Accent Colors

| Token Name          | Hex Value | CSS Variable             | Mô tả / Dùng cho              |
| ------------------- | --------: | ------------------------ | ----------------------------- |
| --accent-blue       |   #1E6FD9 | var(--accent-blue)       | CTA primary, link, focus ring |
| --accent-blue-light |   #2D8CFF | var(--accent-blue-light) | Hover state của blue accent   |
| --coin-gold         |   #D4A017 | var(--coin-gold)         | Màu Coin — gradient start     |
| --coin-gold-light   |   #F5C842 | var(--coin-gold-light)   | Màu Coin — gradient end       |
| --coin-gold-dark    |   #9A7010 | var(--coin-gold-dark)    | Shadow / depth của coin       |

#### 2.1.3 Rarity Color System

| Rarity      | Token            |     Hex | Gradient          | Mô tả               |
| ----------- | ---------------- | ------: | ----------------- | ------------------- |
| Bronze      | --rarity-bronze  | #CD7F32 | #CD7F32 → #8B4513 | Common players      |
| Silver      | --rarity-silver  | #A8A9AD | #A8A9AD → #6B6C70 | Uncommon players    |
| Gold        | --rarity-gold    | #D4A017 | #F5C842 → #D4A017 | Rare players        |
| Special     | --rarity-special | #1A5FA8 | #2D8CFF → #1A5FA8 | SBC / Promo         |
| TOTY / TOTS | --rarity-elite   | #6A0DAD | #C060FF → #6A0DAD | Elite limited cards |

#### 2.1.4 Semantic / Feedback Colors

| Token              |     Hex | CSS Variable            | Dùng cho                      |
| ------------------ | ------: | ----------------------- | ----------------------------- |
| --feedback-success | #22C55E | var(--feedback-success) | Giao dịch thành công, confirm |
| --feedback-warning | #F59E0B | var(--feedback-warning) | Coin thấp, cảnh báo           |
| --feedback-error   | #EF4444 | var(--feedback-error)   | Lỗi, không đủ coin            |
| --feedback-info    | #3B82F6 | var(--feedback-info)    | Tooltip, hướng dẫn            |

#### 2.1.5 Marketing & Utility Colors

| Token                 |     Hex | CSS Variable              | Dùng cho                                  |
| --------------------- | ------: | ------------------------- | ----------------------------------------- |
| --badge-hot           | #FF6B35 | var(--badge-hot)          | Badge pack `Hot`                          |
| --badge-best-value    | #D4A017 | var(--badge-best-value)   | Badge pack `Best Value`                   |
| --badge-limited       | #7C3AED | var(--badge-limited)      | Badge pack `Limited`                      |
| --metric-highlight    | #22D3EE | var(--metric-highlight)   | Overview metric, leaderboard accent       |
| --table-header-bg     | #0F2037 | var(--table-header-bg)    | Nền header của admin table                |
| --table-row-hover     | #132845 | var(--table-row-hover)    | Hover state của admin row                 |
| --selection-highlight | #16345A | var(--selection-highlight) | List item hoặc card đang được multi-select |

---

### 2.2 Typography

Hệ thống typography của PackOpener2026 sử dụng hai font riêng biệt, mỗi font phục vụ một mục đích cụ thể và không được hoán đổi cho nhau.

| Font Family | Dùng cho                      | Load từ      | Ghi chú bắt buộc                                                               |
| ----------- | ----------------------------- | ------------ | ------------------------------------------------------------------------------ |
| Oswald      | Số liệu stats, OVR, Coin, giá | Google Fonts | PHONG CÁCH: condensed, uppercase. Tất cả số hiển thị trên UI PHẢI dùng Oswald. |
| Rajdhani    | Tên cầu thủ, label, nav       | Google Fonts | Condensed sans-serif phong cách thể thao. Dùng weight 600-700 cho tên cầu thủ. |
| Inter       | Body text, mô tả, tooltip     | Google Fonts | Chỉ dùng cho văn bản dài. Không dùng cho số liệu.                              |

#### 2.2.1 Type Scale

| Token          |    Size | Weight | Font     | Dùng cho                        |
| -------------- | ------: | -----: | -------- | ------------------------------- |
| --text-ovr     | 48–64px |    700 | Oswald   | OVR rating lớn trên thẻ cầu thủ |
| --text-stat    | 18–22px |    500 | Oswald   | Số liệu 6 chỉ số trên thẻ       |
| --text-coin    | 20–28px |    600 | Oswald   | Số dư coin trên Topbar          |
| --text-name    | 14–18px |    700 | Rajdhani | Tên cầu thủ trên thẻ            |
| --text-label   | 11–13px |    600 | Rajdhani | Stat label (PAC, SHO, PAS...)   |
| --text-body    | 14–16px |    400 | Inter    | Body text, mô tả, tooltip       |
| --text-caption | 11–12px |    400 | Inter    | Caption, timestamp, metadata    |

> NOTE: Tên cầu thủ dài PHẢI được xử lý bằng CSS transform: scaleX() — KHÔNG được dùng text-overflow: ellipsis, word-break, hoặc xuống dòng. Xem chi tiết tại Section 4.2.

### 2.3 Spacing & Sizing Tokens

| Token           | Value | CSS Variable         | Mô tả                          |
| --------------- | ----: | -------------------- | ------------------------------ |
| --space-xs      |   4px | var(--space-xs)      | Gap nhỏ nhất giữa icons        |
| --space-sm      |   8px | var(--space-sm)      | Padding nhỏ, khoảng cách label |
| --space-md      |  16px | var(--space-md)      | Đơn vị spacing cơ bản          |
| --space-lg      |  24px | var(--space-lg)      | Padding card, section gap      |
| --space-xl      |  40px | var(--space-xl)      | Padding màn hình slide-over    |
| --radius-card   |  10px | var(--radius-card)   | Border-radius thẻ cầu thủ      |
| --radius-panel  |  16px | var(--radius-panel)  | Border-radius panel, drawer    |
| --radius-button |   8px | var(--radius-button) | Border-radius button           |
| --topbar-height |  56px | var(--topbar-height) | Chiều cao topbar cố định       |

### 2.4 Shadow & Depth System

| Token               | CSS Value                                                   | Dùng cho                      |
| ------------------- | ----------------------------------------------------------- | ----------------------------- |
| --shadow-card       | 0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,111,217,0.15) | Thẻ cầu thủ ở trạng thái idle |
| --shadow-card-hover | 0 16px 48px rgba(0,0,0,0.7), 0 0 24px rgba(45,140,255,0.3)  | Thẻ khi hover / tilt          |
| --shadow-panel      | 0 8px 40px rgba(0,0,0,0.6)                                  | Slide-over panels             |
| --shadow-topbar     | 0 2px 16px rgba(0,0,0,0.5)                                  | Topbar (luôn on top)          |
| --shadow-coin       | 0 0 12px rgba(212,160,23,0.6)                               | Số coin khi animate           |

---

## 3. Layout System & Navigation

### 3.1 Main Screen Architecture

PackOpener2026 sử dụng kiến trúc Single-Screen, No-Scroll. Toàn bộ ứng dụng phải vừa khít trong viewport chiều cao màn hình — không có scrollbar dọc ở màn hình gốc.

| Layer            |             Height | Đặc tính                                                                                         |
| ---------------- | -----------------: | ------------------------------------------------------------------------------------------------ |
| Topbar           |       56px (fixed) | position: fixed; top: 0; z-index: 1000. Luôn hiển thị, không bị che. Chứa Coin Display + Avatar. |
| Main Canvas      | calc(100vh - 56px) | overflow: hidden. Khu vực nội dung chính. Nền là ảnh sân vận động với blur và overlay.           |
| Slide-over Layer |       100vh (full) | position: fixed; top: 0; z-index: 500. Trượt từ phải vào và phủ toàn bộ màn hình.                |
| Modal Layer      |    Auto (centered) | position: fixed; z-index: 800. Xuất hiện trên tất cả layers. Backdrop blur + dim.                |

### 3.2 Background Treatment

- Ảnh sân vận động đặt ở `position: center center; background-size: cover`.
- Áp dụng `filter: blur(8px)` và `scale(1.05)` để tránh viền trắng khi blur.
- Overlay: `background: linear-gradient(135deg, rgba(10,20,50,0.75) 0%, rgba(5,10,30,0.85) 100%)` phủ lên ảnh.
- Kết quả: cảm giác sân vận động xanh thẫm huyền bí, tạo chiều sâu cho UI phía trên.

### 3.3 Slide-over Navigation Pattern

Đây là pattern điều hướng cốt lõi của ứng dụng. Thực thi đúng pattern này là yêu cầu bắt buộc.

#### Trigger (Mở)

- Người dùng tap/click vào tab chức năng (Kho Thẻ, Market, v.v.) ở màn hình chính.
- Màn hình slide-over trượt từ phải sang trái (translateX: 100% → 0) phủ lên toàn màn hình.
- Animation: `transform: translateX(0)` với `transition: transform 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

#### Dismiss (Đóng)

- Nút "← Trở về" đặt ở góc trên bên TRÁI (top: 16px; left: 16px) của slide-over screen.
- Animation ngược lại: `translateX(0) → translateX(100%)` cùng duration và easing.
- KHÔNG có nút Back ở màn hình chính (gốc). KHÔNG dùng browser back button.

#### Back Button Specification

| Property | Value                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Position | `position: absolute; top: 16px; left: 16px; z-index: 10`                                                                      |
| Size     | `min-width: 80px; height: 36px; padding: 0 16px`                                                                              |
| Style    | `background: rgba(255,255,255,0.08); backdrop-filter: blur(8px); border: 1px solid var(--surface-border); border-radius: 8px` |
| Label    | "← Trở về" hoặc "← Back" — luôn có icon mũi tên                                                                               |
| Font     | Rajdhani, 600, 14px, uppercase                                                                                                |

### 3.4 Page-Level Experience Specifications

#### 3.4.1 Landing Page Spec

Landing page là mặt tiền của sản phẩm. Nó phải kích thích hành động đăng ký ngay ở fold đầu, đồng thời truyền tải fantasy mở pack một cách rõ ràng.

| Zone            | Mục tiêu UX                       | Quy chuẩn bắt buộc                                                                   |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| Hero            | Kéo người dùng vào fantasy mở thẻ | Ít nhất 1 card spotlight lớn, 1 CTA `Đăng ký`, 1 CTA phụ `Đăng nhập`, 1 line tặng coin |
| Value Strip     | Truyền tải lợi ích nhanh          | Hiển thị `Free 1000 Coins`, `Open Packs`, `Sell Cards`, `Build Collection`          |
| Rarity Showcase | Giải thích progression            | Mỗi rarity phải có màu, tên, mô tả ngắn, sample card hoặc badge visual              |
| How It Works    | Làm rõ gameplay loop              | Trình bày 3-4 bước: Register -> Buy -> Open -> Sell                                 |
| Featured Cards  | Tạo ham muốn sở hữu               | Hiển thị card OVR cao hoặc card elite với glow / hover                              |
| Final CTA       | Chốt chuyển đổi                   | CTA lớn lặp lại, nhấn mạnh thưởng đăng ký                                            |
| Footer          | Kết thúc gọn gàng                 | Link cơ bản, trạng thái sản phẩm, branding                                           |

- Landing page được phép scroll dọc; đây là ngoại lệ chính thức cho quy tắc `Single-Screen, No-Scroll`.
- Hero phải dùng visual direction đồng bộ với Pack Opening UI: glow, stadium atmosphere, card spotlight.
- CTA primary luôn là `Đăng ký`; CTA secondary là `Đăng nhập`.

#### 3.4.2 Auth Page Spec

Trang `Login` và `Register` phải giữ được cảm giác premium, không được nhìn như form mặc định của dashboard.

| Property       | Spec                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| Layout         | Split layout 2 cột desktop: `form panel` + `visual storytelling panel`                  |
| Form Width     | `400px - 480px` tối đa cho cột form                                                      |
| Visual Panel   | Dùng pack/card artwork, rarity glow, copy ngắn về loop gameplay                         |
| Register Promo | Luôn hiển thị `Free 1000 Coins` trong màn register                                      |
| Input Density  | Form gọn, khoảng cách trường `12px - 16px`, lỗi hiển thị trực tiếp dưới field         |
| Mode Switching | Có link chuyển giữa login/register, không dùng tab nội tuyến                            |
| Auth Actions   | Chỉ 1 CTA chính trong mỗi form để tránh phân tán                                        |

- `Login`: chỉ gồm `email`, `password`.
- `Register`: gồm `email`, `username`, `password`.
- Trạng thái submit loading phải khóa nút, giữ layout ổn định, không làm giật panel.

#### 3.4.3 Admin Page Spec

Admin pages phục vụ CRUD và giám sát hệ thống. Visual phải cùng hệ màu nhưng giảm tính drama, tăng độ rõ ràng và tốc độ thao tác.

| Property         | Spec                                                                |
| ---------------- | ------------------------------------------------------------------- |
| Layout           | Sidebar hoặc top navigation cố định + content area rộng             |
| Density          | Thông tin cô đọng hơn player UI, ưu tiên đọc nhanh                  |
| Primary Surface  | Panel/table dùng `var(--surface-base)` hoặc `var(--surface-raised)` |
| Primary Pattern  | Toolbar + filters + table + drawer/modal CRUD                       |
| Admin Overview   | KPI metrics + recent activity + quick links                         |
| Admin CRUD Pages | Search, filter, sort, row actions, create/edit form                 |
| Motion           | Animation tiết chế, chỉ dùng cho feedback và drawer transitions     |

- Admin không dùng pack-opening drama effects.
- Mọi thao tác `delete`, `disable`, `force update` phải qua confirm modal.
- Các trang admin được phép scroll dọc bình thường.

---

## 4. Component Library

### 4.1 Topbar Component

| Property      | Specification                                                                         |
| ------------- | ------------------------------------------------------------------------------------- |
| Height        | 56px — cứng, không thay đổi theo nội dung                                             |
| Background    | `rgba(8,15,35,0.95) + backdrop-filter: blur(20px) + saturate(180%)`                   |
| Border Bottom | 1px solid `rgba(30,111,217,0.3)`                                                      |
| Layout        | `display: flex; align-items: center; justify-content: space-between; padding: 0 20px` |
| Left Zone     | Logo hoặc tên game (Rajdhani 700, 18px, uppercase, --accent-blue-light)               |
| Right Zone    | Coin Display + Avatar — luôn nằm bên phải                                             |

#### 4.1.1 Coin Display Specification

- Layout: Icon coin (🪙 hoặc SVG) + số tiền cách nhau 6px.
- Font số tiền: Oswald 600, 20px, gradient text từ `#F5C842 → #D4A017`.
- CSS gradient text:

```css
background: linear-gradient(90deg, #f5c842, #d4a017);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

- Glow effect khi coin thay đổi: `filter: drop-shadow(0 0 8px rgba(212,160,23,0.8))` trong 600ms.
- Number counter animation: BẮT BUỘC — xem chi tiết Section 5.2.

### 4.2 Player Card Component

#### 4.2.1 Aspect Ratio & Dimensions

Thẻ cầu thủ phải sử dụng đúng tỉ lệ FC26 truyền thống:

```
Aspect Ratio: 2:3 (width : height = 2 : 3)
Ví dụ kích thước:
  Small  (grid view):  120px × 180px
  Medium (pack open):  200px × 300px
  Large  (spotlight):  280px × 420px
CSS: aspect-ratio: 2 / 3; (không hard-code px trừ khi bắt buộc)
```

#### 4.2.2 Card Anatomy (Cấu trúc thẻ)

| Zone       | Height | Nội dung & Rules                                                                               |
| ---------- | -----: | ---------------------------------------------------------------------------------------------- |
| Top Strip  |   ~18% | OVR (Oswald 700, lớn) + Position (Rajdhani 600) + Nation flag + Club badge. Nền là màu rarity. |
| Player Art |   ~45% | Ảnh cầu thủ PNG cutout, căn giữa, không crop. Nền trong suốt hoặc subtle gradient.             |
| Name Bar   |   ~10% | Tên cầu thủ. Rajdhani 700. PHẢI dùng scaleX để fit trong 1 dòng. Xem rule tên.                 |
| Stats Grid |   ~27% | 6 chỉ số (PAC/SHO/PAS/DRI/DEF/PHY). Oswald 500 cho số, Rajdhani 600 cho label.                 |

#### 4.2.3 Player Name Rendering Rule — BẮT BUỘC

> Đầy là quy tắc kỹ thuật KHÔNG thương lượng. Vi phạm quy tắc này sẽ bị yêu cầu fix trước khi merge code.

Vấn đề: Tên cầu thủ có thể rất dài (ví dụ: "DE BRUYNE", "VINICIUS JR."). Thẻ có chiều rộng cố định.

Giải pháp bắt buộc: Sử dụng JavaScript để đo chiều rộng text và áp dụng CSS `transform: scaleX()`.

```js
// JavaScript — áp dụng sau khi card render
function fitPlayerName(nameEl, containerWidth) {
  nameEl.style.transform = "scaleX(1)"; // Reset
  const textWidth = nameEl.scrollWidth;

## Component Implementation Details — Detailed Specs

This section provides concrete implementation-level guidance for components referenced in the Design System so frontend engineers can wire UI to backend payloads safely and accessibly.

### Forms & Inputs

- Tokens:
  - `--input-bg: var(--surface-raised)`
  - `--input-border: var(--surface-border)`
  - `--input-radius: var(--radius-button)`
  - `--input-padding: var(--space-sm)`

- States:
  - Default: border `--input-border`, background `--surface-raised`.
  - Focus: outline `2px solid var(--accent-blue-light)`; use `:focus-visible` for keyboard.
  - Error: border `2px solid var(--feedback-error)` + error message under field.
  - Disabled: opacity 0.6; cursor: not-allowed.

- Accessibility & behavior:
  - Every input must be associated with a `<label for="id">`.
  - Error text uses `role="alert"` and `aria-live="assertive"` where appropriate.
  - Use `aria-invalid="true"` for invalid fields.
  - For server-driven validation, display backend error message under input and map code → friendly text.

### Modals & Slide-overs

- Backdrop: `background: rgba(0,0,0,0.5)` with `backdrop-filter: blur(6px)`.
- Stacking: modal z-index 800; slide-over z-index 700; Toasts z-index 900.
- Focus management:
  - Trap focus inside modal/slide-over; return focus to trigger on close.
  - Close on `Esc` and by clicking the backdrop (configurable for destructive flows).
- ARIA:
  - Modal root: `role="dialog" aria-modal="true" aria-labelledby="titleId"`.
  - Slide-over: `role="region" aria-labelledby` and `aria-hidden` when closed.

### Loaders & Skeletons

- Provide three patterns: global spinner (centered), list/card skeleton (shimmer), and inline loader for small actions.
- Use CSS animation `@keyframes shimmer` with low CPU cost; avoid JS-based spinners that trigger reflow.
- Recommended durations: skeleton shimmer 1200ms loop; action loader 600ms min display (to avoid flicker).

### Pagination & List Controls

- Provide a `Pagination` component with compact and full variants. Expose props: `page`, `limit`, `total`, `onChange`.
- For infinite-scroll lists, provide a `Load more` button fallback for accessibility.

### Infinite Scroll — Required Standard

- Áp dụng cho `pack list`, `card list`, và các grid có dữ liệu dài của player app.
- Trigger bằng `IntersectionObserver` với sentinel nằm cuối list; không dùng scroll event polling làm giải pháp chính.
- Threshold khuyến nghị: preload batch kế tiếp khi người dùng còn cách cuối danh sách khoảng `1.0 - 1.5 viewport heights`.
- Luôn có `Load more` fallback nếu observer fail hoặc người dùng dùng trình duyệt/thiết bị đặc biệt.
- Trong lúc tải batch mới:
  - giữ nguyên vị trí scroll
  - hiển thị skeleton ở cuối danh sách
  - không che list bằng fullscreen loader
- Không được trigger nhiều request song song cho cùng một query state.
- Khi `search / filter / sort` thay đổi:
  - reset pagination
  - clear selection state nếu selection đang phụ thuộc dataset cũ
  - scroll về đầu danh sách hoặc đầu container một cách có chủ đích
- Empty state chỉ hiển thị khi request đầu hoàn thành và tổng kết quả bằng `0`.
- End-of-list state phải có copy rõ ràng, ví dụ: `You've reached the end of your cards`.

### Toast / Notification System

- Types: `success`, `error`, `info`, `warning`.
- Accessibility: wrapper has `role="status" aria-live="polite"` for non-critical and `role="alert" aria-live="assertive"` for critical errors.
- Behavior: auto-dismiss `success/info` after 4s, `error` stays until dismissed (or 8s), stacking max 3.

### Empty states & Error states

- Provide standardized illustrations and copy patterns. Each empty state should include a clear CTA.

### Leaderboard Visual Standard

- Dùng cho `Home` hoặc section spotlight, không dùng như bảng dữ liệu admin.
- Top 3 nên có cấp bậc thị giác khác nhau:
  - Hạng 1 lớn nhất, glow mạnh nhất
  - Hạng 2 và 3 thấp hơn hoặc thu gọn hơn
- Mỗi item tối thiểu hiển thị:
  - card art
  - player name
  - OVR
  - rarity / rank marker
- Nếu là leaderboard của card đang sở hữu, có thể thêm `owner name` nhưng không để lấn át card.
- Không hiển thị quá 10 item trong một khối leaderboard chính trên desktop.

### Empty State Visual Standard

- Empty state phải có 3 phần:
  - illustration hoặc icon có chủ đề bóng đá / pack / card
  - 1 headline ngắn, rõ
  - 1 CTA kéo người dùng quay lại gameplay loop
- Mapping CTA mặc định:
  - `No packs` -> `Go to Market`
  - `No cards` -> `Open a Pack`
  - `No search results` -> `Clear filters`
- Empty state không dùng giọng điệu xin lỗi quá mức; copy phải có tính định hướng hành động.

### Overview Metrics Visual Standard

- Dùng cho `Admin Overview`.
- Mỗi metric card gồm:
  - label
  - primary value
  - optional delta
  - optional helper text
- Tỉ lệ khuyến nghị: grid 4 cột trên desktop lớn, 2 cột trên desktop nhỏ.
- Value dùng Oswald; label dùng Rajdhani hoặc Inter tùy độ ngắn.
- Metric quan trọng có thể dùng accent line hoặc glow mỏng bằng `var(--metric-highlight)`, không dùng animation liên tục.
- Delta tăng dùng `--feedback-success`, delta giảm dùng `--feedback-error`, trung tính dùng `--text-caption` hoặc màu body phụ.

### Confirmation & Danger flows

- Use a confirm modal with clear primary (danger) / secondary (cancel) actions. Example: selling cards — show `unitPrice`, `quantity`, `total`, `expectedNewBalance`.

### Multi-select & Bulk Sell Standard

- Áp dụng cho `Cards` page.
- Multi-select chỉ hoạt động khi người dùng chủ động vào `Select mode` hoặc dùng checkbox/card toggle rõ ràng; không auto-select khi click vào card detail.
- Khi ít nhất 1 card được chọn:
  - hiển thị sticky `Bulk Sell Bar`
  - hiển thị `selected count`
  - hiển thị `estimated total value`
  - có action `Sell Selected` và `Clear Selection`
- Card đang chọn phải có 3 lớp feedback:
  - border highlight
  - check indicator
  - nền/tint nhẹ từ `var(--selection-highlight)`
- Selection được phép giữ qua các batch infinite-scroll trong cùng query state.
- Selection bị reset khi đổi `search`, `filter`, `sort`, hoặc sau khi bulk sell thành công.
- Confirm modal bulk sell bắt buộc hiển thị:
  - số lượng card
  - tổng coin nhận được
  - balance hiện tại
  - balance dự kiến sau giao dịch
- Nếu trong tập chọn có card hiếm cao, modal confirm nên cảnh báo thị giác nhẹ để tránh bán nhầm.

### Admin Data Table UI Standard

- Dùng cho `Admin Cards`, `Admin Packs`, `Admin Users`.
- Table header:
  - sticky khi scroll
  - nền `var(--table-header-bg)`
  - text uppercase nhỏ hoặc semibold rõ ràng
- Row height khuyến nghị: `52px - 64px`.
- Hover row: dùng `var(--table-row-hover)`.
- Cột actions luôn căn phải, giữ cố định về mặt thị giác.
- Toolbar phía trên table gồm:
  - search
  - filter
  - sort
  - CTA create entity
- Row actions tối thiểu: `View`, `Edit`, `Delete`.
- Dữ liệu dài như email, ID, description phải truncate có kiểm soát và có tooltip/expanded view.
- Trạng thái `loading`, `empty`, `error` phải có version riêng của table shell, không để layout nhảy.

### Image & Asset Guidelines

- Preferred formats: `webp` with `png` fallback for avatars; `imageUrl` field from API should accept both.
- Use `loading="lazy"` for offscreen images; preload hero/background images via `<link rel="preload" as="image">`.
- Provide a 1x1 transparent placeholder or SVG fallback when `imageUrl` missing.

### Accessibility Checklist (quick)

- Color contrast: meet WCAG AA for body text, AAA for large headings where practical.
- Keyboard: all interactive items reachable and operable by keyboard.
- Announcements: use `aria-live` regions for dynamic updates (coin counter, open pack result, errors).

---

## 8. QA & Developer Checklist
    nameEl.style.transform = `scaleX(${scale})`;
    nameEl.style.transformOrigin = 'center';
  }
}

```
    nameEl.style.transform = `scaleX(${scale})`;
    nameEl.style.transformOrigin = "center";
  }
}
```

Các rule cấm/cho phép:

- ▶ KHÔNG dùng: `text-overflow: ellipsis`
- ▶ KHÔNG dùng: `white-space: nowrap + overflow: hidden` (trừ kết hợp với scaleX)
- ▶ KHÔNG dùng: `word-break`, `overflow-wrap`
- ▶ KHÔNG dùng: giảm `font-size` để cho vừa
- ▶ PHẢI giữ nguyên chiều cao dòng chữ — chỉ bóp chiều ngang

### 4.3 Button System

| Variant  |                        Background | Text                     | Border            | Dùng cho                       |
| -------- | --------------------------------: | ------------------------ | ----------------- | ------------------------------ |
| Primary  |                           #1E6FD9 | White, Rajdhani 700      | none              | CTA chính: Mua Pack, Xác nhận  |
| Gold CTA | linear-gradient(#F5C842, #D4A017) | Dark #0A0F1E, Oswald 700 | none              | Mua bằng Coin, nổi bật nhất    |
| Ghost    |                       transparent | #2D8CFF, Rajdhani 600    | 1px solid #1E6FD9 | Secondary action, Back button  |
| Danger   |                           #EF4444 | White, Rajdhani 700      | none              | Bán thẻ, xóa, action nguy hiểm |
| Disabled |                           #1C2A3A | #4A5568, Rajdhani 600    | 1px solid #2D3748 | Không đủ điều kiện             |

#### Button States — Transition Rules

- Mọi trạng thái hover/active phải có `transition: all 180ms ease` cho màu và shadow.
- Active state (click): `transform: scale(0.97)` — phản hồi lực nhấn.
- Focus ring: `outline: 2px solid var(--accent-blue-light); outline-offset: 3px`.
- Gold CTA hover: tăng sáng gradient + `box-shadow: 0 4px 20px rgba(212,160,23,0.5)`.

### 4.4 Badge & Rarity Chip

| Badge Type    | Background                              | Text Style                         | Vị trí trên thẻ           |
| ------------- | --------------------------------------- | ---------------------------------- | ------------------------- |
| ICON (Rarity) | Gradient theo rarity system (Sec 2.1.3) | Oswald 700, 10px, white, uppercase | Top-right corner của thẻ  |
| NEW           | #22C55E solid                           | Rajdhani 700, 10px, white          | Top-left, animation pulse |
| DUPLICATED    | rgba(0,0,0,0.6)                         | Rajdhani 600, 10px, #A8A9AD        | Full overlay, mờ thẻ đi   |

### 4.5 Marketing Pack Badge System

Marketing badge dùng để tăng cảm giác giá trị và định hướng hành vi mua pack. Đây là badge ở pack card / pack detail, khác với rarity chip trên player card.

| Badge        | Token / Màu                 | Ý nghĩa UX                             | Khi nào dùng                                   |
| ------------ | --------------------------- | -------------------------------------- | ----------------------------------------------- |
| `Hot`        | `var(--badge-hot)`         | Pack đang được đẩy mạnh, thu hút click | Pack nổi bật theo event, volume bán cao         |
| `Best Value` | `var(--badge-best-value)`  | Tỷ lệ giá trị / giá mua tốt nhất       | Pack có value cao nhất trong danh sách hiện tại |
| `Limited`    | `var(--badge-limited)`     | Pack giới hạn thời gian hoặc số lượng  | Seasonal pack, promo pack, elite pack           |

#### Marketing Badge Rules

- Vị trí ưu tiên: góc trên trái của pack card.
- Kích thước: `height: 22px; padding: 0 10px; border-radius: 999px`.
- Font: Rajdhani 700, `11px`, uppercase, tracking nhẹ.
- Tối đa 1 marketing badge chính trên một pack card để tránh loạn thông tin.
- Nếu vừa có marketing badge vừa có rarity/pack tier badge thì marketing badge ưu tiên bên trái, tier badge bên phải.
- `Limited` có thể kèm countdown nhỏ ở pack detail, nhưng countdown không hiển thị trực tiếp trên grid card nếu gây nhiễu.

---

## 5. Interaction & Animation Specifications

### 5.1 Card 3D Tilt Hover (Desktop Only)

> Hiệu ứng này CHỈ áp dụng trên Desktop (pointer: fine). Thiết bị cảm ứng KHÔNG trigger hiệu ứng này.

Khi chuột di chuyển trên thẻ cầu thủ, thẻ sẽ xoay 3D theo hướng chuột, tạo cảm giác vật lý, chiều sâu.

#### Implementation Specification

| Property           | Value & Giải thích                                                            |
| ------------------ | ----------------------------------------------------------------------------- |
| Max Rotation       | ±15deg trên cả 2 trục X và Y                                                  |
| Perspective        | `perspective: 1000px` trên container cha                                      |
| Transform          | `rotateX(yDeg) rotateY(xDeg) scale3d(1.05, 1.05, 1.05)`                       |
| Transition (enter) | `transition: transform 100ms linear` (theo chuột, mượt)                       |
| Transition (leave) | `transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)` (spring back) |
| Sheen Effect       | Overlay gradient trắng pseudo-element di chuyển theo mouse: `opacity 0→0.15`  |
| Shadow (hover)     | `var(--shadow-card-hover)` — shadow đổ theo hướng nghiêng                     |

#### JavaScript Logic (Tóm tắt)

```js
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `rotateX(${-y * 30}deg) rotateY(${x * 30}deg) scale3d(1.05,1.05,1.05)`;
});
card.addEventListener("mouseleave", () => {


## 7. Backend Feature Mapping & Required UI

Dưới đây là bản tóm tắt các module backend (đã scan từ `src/modules`) và mapping sang screens / components UI. Mục tiêu: đảm bảo Design System bao phủ mọi trường hợp API trả về và flow người dùng.

### Backend modules (tóm tắt)

- `auth`: register, login (Local + JWT)
- `user`: profile (`GET /me`, `PATCH /me`)
- `pack`: danh sách packs, chi tiết pack, odds (`GET /packs`, `GET /packs/:id`, `GET /packs/:id/odds`)
- `user-pack`: mua pack, mở pack, danh sách user-packs (`POST /packs/:id/buy`, `POST /user-packs/:id/open`, `GET /user-packs`)
- `card`: danh sách thẻ, chi tiết thẻ (`GET /cards`, `GET /cards/:id`)
- `inventory`: quản lý thẻ người dùng, bán thẻ, summary (`GET /inventory`, `POST /inventory/sell`, `GET /inventory/summary`)
- `transaction`: lịch sử giao dịch (`GET /transactions`, `GET /transactions/:id`)

### API Response Shapes & UI props (trích từ DTOs / services)

- `GET /packs` — Pack list
  - Response fields: `id, name, price, cardCount, imageUrl, isActive, createdAt`
  - UI usage: `title`, `price` (format with thousand separators), `cardCount`, `thumbnailUrl` (fallback to card placeholder), `disabled` state when `isActive=false`.

- `GET /packs/:id` — Pack detail with odds
  - Response fields: `id, name, price, cardCount, odds: Record<rarity, number>, imageUrl, isActive`
  - UI usage: show `odds` as percentages per rarity; display legend and highlight `cardCount` and price.

- Pack Pool / Odds management (admin)
  - Pack pool DTO (`packPoolDto`) shape: `{ packId, packName, totalWeight, pool: [{ id, cardName, rarity, weight, probability }] }`.
  - Endpoints: `GET /packs/:id/pool` → returns pool details; `POST /packs/:id/pool` (body `addPoolDto` `{ cardId, weight }`) → returns created pool entry with `probability`; `PATCH /packs/:id/pool/:poolId` (body `updateWeightDto` `{ weight }`) updates weight and returns new probability.
  - UI usage: admin pack pool editor must show computed `probability` per pool item and allow weight edits; visualize rarity distribution as chart.

- `POST /packs/:id/buy` — buyPack
  - Service returns: `{ userPackId, packName, price, newBalance, status }` (see `user-pack.service.ts`)
  - UI flows: animate coin counter to `newBalance`, display a toast/receipt with `packName` and `price`, add pending entry in `My Packs` list using `userPackId`.

- `POST /user-packs/:id/open` — openPack
  - DTO `OpenPackResponseDto`: `{ userPackId, openedAt, cards: CardResultDto[] }`
  - `CardResultDto` fields: `cardId, name, rarity, overall, pace?, shooting?, passing?, dribbling?, defending?, position, club?, nation?, imageUrl?`
  - UI flows: pack opening sequence must consume this payload; for each card render `imageUrl`, rarity chip color, `overall`, and stats grid. Backend may return existing open results if called again — support `replay` behavior.

- `GET /user-packs` & `GET /user-packs/:id`
  - List shape: `{ id, packId, packName, status, purchasedAt, openedAt?, cards? }` (cards included only when `includeCards=true` or pack opened)
  - UI: list view with status badges (PENDING / OPENED), `Open` action for pending packs, and `View cards` for opened packs.

- `GET /cards` & `GET /cards/:id`
  - Card canonical fields: `id, name, rarity, overall, position, club, nation, imageUrl, sellPrice, pace, shooting, passing, dribbling, defending, physical`
  - UI: card grid, detail modal, ability to `Sell` (if in inventory) showing `sellPrice`.

- `GET /inventory`, `GET /inventory/summary`, `POST /inventory/sell`
  - `SellCardDto` body: `{ cardId: UUID, quantity: number }` (validated server-side)
  - UI must present confirm modal with unit `sellPrice`, `quantity`, `total`, and expected `newBalance`. On success, animate coin counter and update inventory counts.

- `GET /transactions` & `GET /transactions/:id`
  - Transaction fields: `{ id, userId, type, amount, balanceBefore, balanceAfter, description, createdAt }`
  - UI: show `type` humanized, `amount` formatted (negative in red), and link to detail drawer.

- `POST /auth/register` & `POST /auth/login`
  - Register requires `{ email, password, username }` with validations (see `CreateAuthDto`): password min 6, username 6-20 chars alphanumeric.
  - Login requires `{ email, password }` and returns JWT session; show validation messages matching backend.

Notes / Edge Cases:

- `openPack` is idempotent: if pack already opened the API returns stored results (frontend must render existing results instead of re-running animation logic unless user chooses replay).
- Some card stats are optional — frontend should display placeholders for missing values and avoid crashes.
- Always localize and format numbers/dates; show coin symbol and thousands separators.

---

## 8. QA & Developer Checklist
### 5.2 Coin Counter Animation — BẮT BUỘC

> Số dư Coin PHẢI được animate bằng counter. KHÔNG được phép update innerHTML trực tiếp (số nhảy bụp). Đây là yêu cầu nghiệm thu.

| Property  | Specification                                                                         |
| --------- | ------------------------------------------------------------------------------------- |
| Duration  | 600ms cho delta nhỏ (<1000 coin); 1200ms cho delta lớn (>1000 coin)                   |
| Easing    | easeOutExpo — số chạy nhanh lúc đầu, chậm dần khi về đích                             |
| Direction | Tăng: màu text flash sang `#F5C842` sáng hơn trong 200ms. Giảm: flash sang `#EF4444`. |
| Format    | Số được format với dấu phẩy phân cách hàng nghìn: `1,500` (không phải `1500`)         |
| Glow      | Trong thời gian animate: `filter: drop-shadow(0 0 8px rgba(212,160,23,0.8))`          |

#### Counter Animation — Implementation

```js
function animateCoin(fromVal, toVal, element, duration = 600) {
  const start = performance.now();
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.round(
      fromVal + (toVal - fromVal) * easeOutExpo(progress),
    );
    element.textContent = current.toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### 5.3 Pack Opening Sequence

Đây là khoảnh khắc drama cao nhất của game. Phải đảm bảo đủ các bước theo đúng thứ tự:

| Bước | Tên Phase    |      Duration | Mô tả kỹ thuật                                                           |
| ---: | ------------ | ------------: | ------------------------------------------------------------------------ |
|    1 | Coin Deduct  | 0ms (instant) | Trừ coin ngay lập tức, trigger `animateCoin()` giảm.                     |
|    2 | Pack Shake   |         400ms | Pack ảnh rung lắc (CSS keyframes animation, amplitude ±6px).             |
|    3 | Flash Reveal |         200ms | Màn hình flash trắng (opacity 0→1→0) — khoảnh khắc 'nổ pack'.            |
|    4 | Card Reveal  | 600ms mỗi thẻ | Từng thẻ flip vào (`rotateY 90°→0°`) + fade in. Delay stagger 200ms/thẻ. |
|    5 | Glow Pulse   |        1000ms | Thẻ hiếm (Gold+) có glow pulse theo màu rarity sau khi reveal.           |

### 5.3.1 Multiple-Card Pack Opening Flow

Khi một pack chứa nhiều cầu thủ, flow mở pack phải được mở rộng. Không được reveal tất cả card cùng lúc ngay sau flash nếu điều đó làm mất cảm giác nhịp độ.

| Phase | Tên phase            | Duration gợi ý       | Quy chuẩn                                                                   |
| ----: | -------------------- | -------------------: | ---------------------------------------------------------------------------- |
|     1 | Pack Intro           |                300ms | Hiện pack art, tên pack, số lượng card                                      |
|     2 | Pack Shake + Flash   |           400ms+200ms | Giữ nguyên như pack mở 1 card                                               |
|     3 | Reveal Cue           |       250ms mỗi cue  | Hiện từng cue như rarity flare, OVR shadow, position hint hoặc nation flash |
|     4 | Sequential Card Drop | 500-700ms mỗi card   | Reveal từng card theo thứ tự có chủ đích, stagger rõ                        |
|     5 | Spotlight Best Card  |                800ms | Card hiếm nhất hoặc OVR cao nhất được spotlight cuối cùng                   |
|     6 | Result Grid          |                 0ms  | Sau spotlight, hiển thị toàn bộ card trong pack để người dùng review nhanh  |

#### Multiple-Card Reveal Rules

- Nếu pack có `1` card: dùng flow chuẩn ở Section 5.3.
- Nếu pack có `2-3` card: reveal tuần tự toàn bộ từng card.
- Nếu pack có `4+` card:
  - spotlight `best card` ở cuối
  - các card còn lại có thể reveal nhanh hơn theo wave hoặc rail
- Card cuối cùng nên là:
  - rarity cao nhất, hoặc
  - OVR cao nhất nếu cùng rarity
- Sau sequence phải có action rõ ràng:
  - `View Cards`
  - `Sell Later`
  - `Open Another Pack`
- Nếu API trả lại kết quả pack đã mở trước đó, UI có thể cho `Replay Animation`, nhưng mặc định ưu tiên mở thẳng `Result Grid`.

### 5.4 Slide-over Transition Timing

| Action                  |             Duration | Easing CSS                                   |
| ----------------------- | -------------------: | -------------------------------------------- |
| Mở slide-over (enter)   |                320ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`       |
| Đóng slide-over (leave) |                280ms | `cubic-bezier(0.55, 0, 1, 0.45)`             |
| Modal fade in           |                200ms | `ease-out`                                   |
| Modal fade out          |                150ms | `ease-in`                                    |
| Toast notification      | 300ms in / 200ms out | `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring) |

---

## 6. CSS Variables — Master Sheet

Copy block dưới đây vào file `:root` hoặc `global.css` của project. Đây là nguồn sự thật cho toàn bộ tokens.

```css
:root {
  /* ── BACKGROUNDS ─────────────────────────── */
  --bg-stadium: #0a0f1e;
  --bg-overlay: rgba(10, 20, 50, 0.72);
  --surface-base: #0d1b2e;
  --surface-raised: #102140;
  --surface-border: #1e3a5f;
  --topbar-bg: rgba(8, 15, 35, 0.95);

  /* ── ACCENT ──────────────────────────────── */
  --accent-blue: #1e6fd9;
  --accent-blue-light: #2d8cff;

  /* ── COIN / GOLD ─────────────────────────── */
  --coin-gold: #d4a017;
  --coin-gold-light: #f5c842;
  --coin-gold-dark: #9a7010;

  /* ── RARITY ──────────────────────────────── */
  --rarity-bronze: #cd7f32;
  --rarity-silver: #a8a9ad;
  --rarity-gold: #d4a017;
  --rarity-special: #1a5fa8;
  --rarity-elite: #6a0dad;

  /* ── FEEDBACK ────────────────────────────── */
  --feedback-success: #22c55e;
  --feedback-warning: #f59e0b;
  --feedback-error: #ef4444;
  --feedback-info: #3b82f6;

  /* ── MARKETING / UTILITY ─────────────────── */
  --badge-hot: #ff6b35;
  --badge-best-value: #d4a017;
  --badge-limited: #7c3aed;
  --metric-highlight: #22d3ee;
  --table-header-bg: #0f2037;
  --table-row-hover: #132845;
  --selection-highlight: #16345a;

  /* ── SPACING ─────────────────────────────── */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;

  /* ── RADIUS ──────────────────────────────── */
  --radius-card: 10px;
  --radius-panel: 16px;
  --radius-button: 8px;

  /* ── SIZES ───────────────────────────────── */
  --topbar-height: 56px;

  /* ── SHADOWS ─────────────────────────────── */
  --shadow-card:
    0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(30, 111, 217, 0.15);
  --shadow-card-hover:
    0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(45, 140, 255, 0.3);
  --shadow-panel: 0 8px 40px rgba(0, 0, 0, 0.6);
  --shadow-topbar: 0 2px 16px rgba(0, 0, 0, 0.5);
  --shadow-coin: 0 0 12px rgba(212, 160, 23, 0.6);
}
```

---

## 8. QA & Developer Checklist

Trước khi đưa bất kỳ tính năng nào lên staging, Developer và Designer phải tự kiểm tra theo danh sách dưới đây:

### 7.1 Layout & Navigation

- Màn hình chính KHÔNG có scrollbar dọc ở bất kỳ viewport nào từ 375px trở lên.
- Topbar luôn ở z-index cao nhất, không bị bất kỳ element nào che.
- Slide-over trượt vào/ra đúng hướng (phải → trái → phải) với timing đúng spec.
- Nút 'Trở về' xuất hiện ở góc trên bên TRÁI trong slide-over, KHÔNG có ở màn hình gốc.

### 7.2 Typography

- Tên cầu thủ không bao giờ bị xuống dòng, không bị dấu '...', không bị clip.
- Tất cả số liệu stats và Coin phải dùng font Oswald.
- Tên cầu thủ dùng Rajdhani weight 700.

### 7.3 Coin & Interactions

- Số Coin KHÔNG ĐƯỢC nhảy bụp khi tăng/giảm — phải có counter animation.
- 3D Tilt chỉ hoạt động khi pointer là chuột (không phải touch).
- Pack opening đủ 5 phases theo đúng thứ tự và timing.
- Tất cả màu sắc lấy từ CSS variables — không hard-code hex trực tiếp.

### 7.4 Responsive & Performance

- Kiểm tra trên: Chrome Desktop 1920px, Chrome Desktop 1366px, Mobile 390px (iPhone 14 Pro), Mobile 375px (iPhone SE).
- 3D Tilt tự disable trên mobile:

```css
@media (pointer: coarse) {
  .card {
    transform: none !important;
  }
}
```

- Ảnh nền sân vận động PHẢI được preload để tránh flash trắng khi load.
- Coin counter animation phải chạy đủ mượt: không drop frame (test với Chrome DevTools Performance).

### 7.5 Collection, Marketing & Admin

- Infinite scroll không được gửi duplicate request khi user chạm đáy list nhiều lần liên tiếp.
- `Bulk Sell` phải hiển thị đúng `selected count`, `total value`, và reset selection đúng thời điểm.
- Marketing badge `Hot`, `Best Value`, `Limited` phải thống nhất màu, vị trí và thứ tự ưu tiên.
- Empty states phải luôn có CTA kéo user quay lại gameplay loop.
- Leaderboard không được biến thành data table; phải giữ hierarchy thị giác cho top item.
- Admin overview metrics phải đọc được trong 3 giây đầu tiên, không nhồi quá nhiều số phụ.
- Admin table phải có loading, empty, error, hover, sort, row action states đầy đủ.

---

## 9. Revision History

| Version | Ngày       | Tác giả             | Nội dung thay đổi                                                      |
| ------- | ---------- | ------------------- | ---------------------------------------------------------------------- |
| v1.1    | 2026-04-29 | Lead UI/UX Designer | Bổ sung page specs, infinite scroll, bulk sell, admin tables, marketing badge, multi-card pack opening. |
| v1.0    | 2026-04-28 | Lead UI/UX Designer | Phát hành lần đầu — toàn bộ Design System & UI Kit cho PackOpener2026. |

────────────────────────────────────────────────────────────────

PackOpener2026 Design System v1.0 — Confidential & Internal Use Only — © 2026
