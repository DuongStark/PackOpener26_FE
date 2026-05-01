# PackOpener2026 — Landing Page Improvement Prompt
> Phiên bản sau khi đã sửa lần 1. Phân tích đối chiếu với các landing page game/simulator tương tự (FIFA Ultimate Team, PACYBITS, Sorare, Gods Unchained, Axie Infinity, NBA Top Shot) để đưa ra prompt cải thiện toàn diện.

---

## ĐÁNH GIÁ HIỆN TRẠNG (sau lần sửa đầu)

### ✅ Đã làm tốt
- Navbar có logo hexagon + glassmorphism khi scroll
- Font heading đã đổi sang Barlow Condensed, "NGỌN LỬA" gradient vàng
- Stats section có icon, layout sạch hơn
- Live ticker "ĐANG MỞ PACK NGAY LÚC NÀY" đã có
- Card rarity row đã thêm Bronze/Silver tiers

### ❌ Vẫn còn yếu — phân tích chi tiết

**Hero Section:**
- Card bên phải vẫn là placeholder/wireframe (đường kẻ xám), không có hình ảnh thật
- Thiếu hoàn toàn particle/star field background như FIFA Pack Opening screen
- Không có float animation hay glow pulse trên hero card
- Hero section quá "trống" — không có depth, không có atmospheric elements
- Layout không balanced: text trái quá dài, card phải quá nhỏ và đứng im

**Stats Section:**
- Các card stat background quá giống nhau — không phân biệt được đâu là số quan trọng nhất
- Số không có countup animation khi scroll vào
- Banner "+1000 coin" không đủ nổi bật — bị chìm vào background

**Card Rarity Row:**
- Cards không có hover effect glow theo rarity color
- Không có shimmer/foil animation trên Gold/Diamond cards  
- Label badge (BRONZE RARE, SILVER COMMON...) font quá nhỏ, màu chưa đủ contrast
- Horizontal scroll trên desktop không cần thiết — nên dùng grid 2 hàng hoặc carousel với controls

**How-to Steps:**
- 4 bước vẫn là plain card, không có connecting line giữa các bước
- Icon trong badge số chỉ là số — thiếu icon thực sự (UserPlus, ShoppingBag...)
- Step cards không có entrance animation khi scroll

**Live Ticker:**
- Text ticker có nhưng styling quá đơn giản — thiếu màu sắc rarity trên từng item
- Chữ "DIAMOND" label bên trái tách rời khỏi ticker items, gây confusion

**Featured Cards (Thẻ Nổi Bật):**
- 3 player cards đứng im hoàn toàn — không có hover effect
- Player photos bị thiếu (placeholder trắng) — visual rất yếu
- Không có backdrop glow theo rarity màu cho từng card
- Section background quá tối, card trông flat

**Tổng thể:**
- Không có CTA section ở cuối trang (trước footer)
- Footer quá minimal — chỉ có text, không có social links hay newsletter
- Không có scroll progress indicator
- Thiếu micro-interactions ở mọi nơi

---

## BENCHMARK — HỌC TỪ CÁC TRANG TƯƠNG TỰ

### FIFA/FC Ultimate Team Pack Opening sites
**Điểm mạnh học được:**
- Cinematic dark background với god rays / light beams tỏa ra từ sau card
- Pack reveal animation với stage 1 (pack closed) → stage 2 (pack glowing) → stage 3 (cards fly out)
- Mỗi rarity có sound effect riêng (quan trọng cho web) và color language nhất quán
- Rating number màu vàng to, bold, luôn top-left của card

### Sorare (fantasy football NFT)
**Điểm mạnh học được:**
- Hero section dùng 3D card tilt với mouse parallax — cảm giác "có thể chạm được"
- Gradient từ deep navy → purple → black tạo chiều sâu rất tốt
- Social proof bằng số thực (total sales, unique players) với animated counter
- CTA section cuối trang rất mạnh: full-width, dark bg, 1 heading lớn + 1 button

### NBA Top Shot
**Điểm mạnh học được:**
- "Moments" được highlight với video loop ngắn (3-5s) thay vì static image
- Pack drop countdown timer tạo urgency cực mạnh
- Featured cards có shine effect + rotation 3D khi hover
- Marquee của recent transactions với avatar + tên rút gọn

### Gods Unchained / Immutable
**Điểm mạnh học được:**
- Background particle field với depth (particles gần to, xa nhỏ)
- Card foil effect: holographic rainbow gradient di chuyển theo chuột
- Section transitions dùng diagonal clip-path thay vì đường thẳng ngang

### PACYBITS / FUT24 Pack Opener
**Điểm mạnh học được:**
- Pack opening preview ngay trên hero — người dùng thấy gameplay trước
- Rarity odds hiển thị transparent (build trust)
- "Featured players this week" section update định kỳ — tạo reason to return

---

## PROMPT TOÀN DIỆN CHO LẦN SỬA THỨ 2

```
You are a senior frontend engineer and game UI designer specializing in
sports card game aesthetics (FIFA FC, NBA Top Shot, Sorare). Your task
is to do a comprehensive second-pass upgrade of the PackOpener2026
landing page. The stack is React + Tailwind CSS + Framer Motion.

Reference sites for visual inspiration:
- Sorare.com (card tilt, gradient depth, social proof)
- NBAtopshot.com (shine effects, marquee transactions, featured moments)
- FIFA Ultimate Team pack opening (cinematic atmosphere, rarity language)
- PACYBITS (gameplay preview, rarity odds transparency)

Follow EVERY instruction below. Do not skip any section.
```

---

## SECTION 1 — GLOBAL DESIGN SYSTEM

```
─── 1.1 COLOR TOKENS (add/update tailwind.config.js) ──────────
colors: {
  // Base
  'dark-void':    '#03060D',   // deepest bg
  'dark-deep':    '#070E1A',   // hero bg
  'dark-surface': '#0D1B2A',   // card bg
  'dark-card':    '#111C2D',   // stat cards
  'dark-border':  '#1E3A5F',   // subtle borders

  // Rarity system (MUST be consistent across ALL components)
  'rarity-bronze':  '#CD7F32',
  'rarity-silver':  '#C0C0C0',
  'rarity-gold':    '#FFD700',
  'rarity-epic':    '#F97316',
  'rarity-diamond': '#60A5FA',

  // Rarity glow (for box-shadow, NOT text)
  'glow-bronze':  'rgba(205,127,50,0.5)',
  'glow-silver':  'rgba(192,192,192,0.4)',
  'glow-gold':    'rgba(255,215,0,0.45)',
  'glow-epic':    'rgba(249,115,22,0.5)',
  'glow-diamond': 'rgba(96,165,250,0.55)',
}

─── 1.2 TYPOGRAPHY ────────────────────────────────────────────
Fonts already imported (Barlow Condensed).
Add: Rajdhani for stat numbers (game HUD feel).
  <link href="https://fonts.googleapis.com/css2?
    family=Barlow+Condensed:wght@700&
    family=Rajdhani:wght@600;700&
    display=swap" rel="stylesheet">

Apply:
  - All section headings: font-['Barlow_Condensed'] font-bold
    text-5xl md:text-6xl uppercase tracking-[0.03em]
  - All numbers/stats: font-['Rajdhani'] font-bold
  - Body text: text-white/65 text-base leading-relaxed

─── 1.3 SECTION TRANSITIONS ───────────────────────────────────
Between every section, replace straight horizontal border with
diagonal clip-path transition:

  .section-transition-down {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    margin-bottom: -80px;
  }
  .section-transition-up {
    clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
    margin-top: -80px;
  }

─── 1.4 CUSTOM CURSOR (desktop only) ──────────────────────────
Replace default cursor globally on .hero-section with:
  - 16px golden hexagon SVG cursor
  - Trail of 3 fading dots following cursor movement
  - On hover over card: cursor morphs to crosshair + golden ring

  Implementation in HeroCursor.tsx:
  useEffect(() => {
    const el = document.querySelector('.hero-section')
    if (!el || window.innerWidth < 768) return
    el.style.cursor = 'none'
    // Render custom cursor as absolute-positioned div
    // that follows mousemove with 60fps rAF loop
  }, [])
```

---

## SECTION 2 — HERO SECTION (most critical)

```
─── 2.1 BACKGROUND ATMOSPHERE ─────────────────────────────────
Layer order (bottom to top):

Layer 0 — base color:
  background: radial-gradient(
    ellipse 120% 80% at 60% 100%,
    #0f2744 0%,
    #070e1a 50%,
    #030609 100%
  )

Layer 1 — star field (create StarField.tsx component):
  Generate 120 random dots in a <canvas> or SVG:
  - 80% small (1px), white, opacity 0.3–0.6
  - 15% medium (1.5px), white, opacity 0.5–0.8
  - 5% large (2px), with subtle twinkle keyframe animation
  - Parallax: stars move at 0.2x speed on mousemove

Layer 2 — god rays / light beams behind hero card:
  <div> with:
  background: conic-gradient(
    from 220deg at 65% 50%,
    transparent 0deg,
    rgba(96,165,250,0.04) 15deg,
    transparent 30deg,
    rgba(96,165,250,0.03) 45deg,
    transparent 60deg
  )
  animation: rotate 30s linear infinite
  mix-blend-mode: screen

Layer 3 — bottom fog/vignette:
  Absolute bottom-0, h-48, w-full
  background: linear-gradient(to top, #030609 0%, transparent 100%)

─── 2.2 HERO CARD — REPLACE PLACEHOLDER ───────────────────────
Current state: wireframe/outline card with NO image — MUST FIX.

OPTION A (if real card image available):
  Use the Diamond card image already on the site (the blue shatter one
  from the original version). Import and place it.

OPTION B (generate with CSS — PREFERRED if no asset):
  Build HeroDiamondCard.tsx as a pure CSS/SVG card:

  Outer shell:
    width: 280px, height: 390px
    border-radius: 16px
    background: linear-gradient(145deg, #1e3a5f, #0a1628, #1a2a4a)
    border: 1.5px solid rgba(96,165,250,0.4)
    box-shadow: 0 0 60px rgba(96,165,250,0.3),
                0 0 120px rgba(96,165,250,0.15),
                inset 0 1px 0 rgba(255,255,255,0.1)

  Inner crystal SVG (center of card):
    Large polygon "crystal" shape with:
    - Multiple facets using different opacity blues
    - White highlight on top facet (opacity 0.6)
    - Animated rotating inner light: keyframe rotates a
      conic-gradient overlay 360deg over 8s

  Foil shimmer overlay:
    position absolute, inset 0, border-radius inherit
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255,255,255,0.12) 50%,
      transparent 60%
    )
    background-size: 200% 100%
    animation: foil-sweep 3s linear infinite

  Rating badge top-left:
    '96' in Rajdhani font, 36px, white
    Position position, z-index 2

─── 2.3 CARD ANIMATIONS ────────────────────────────────────────
Float:
  @keyframes hero-float {
    0%, 100% { transform: translateY(0px) rotate(-1deg) }
    50%       { transform: translateY(-20px) rotate(1deg) }
  }
  animation: hero-float 5s ease-in-out infinite

Glow pulse:
  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 40px rgba(96,165,250,0.3),
                  0 0 80px rgba(96,165,250,0.1)
    }
    50% {
      box-shadow: 0 0 70px rgba(96,165,250,0.55),
                  0 0 140px rgba(96,165,250,0.25)
    }
  }
  animation: glow-pulse 3s ease-in-out infinite

Mouse parallax (implement useParallax hook):
  On mousemove over hero section:
  - Card: rotateX(-dy*15deg) rotateY(dx*15deg) — lerp ease 0.07
  - Star field: translateX(dx*-15px) translateY(dy*-10px)
  - God rays div: translateX(dx*-5px) — very subtle
  - Card shine: radial-gradient follows mouse position exactly

─── 2.4 HEADING ANIMATION ──────────────────────────────────────
Use Framer Motion for mount animation:

  const words = ['MỞ GÓI', '·', 'SĂN THẺ', '·', 'NGỌN LỬA']
  // stagger each word: delay index * 0.12s
  // initial: { y: 40, opacity: 0 }
  // animate: { y: 0, opacity: 1 }
  // transition: { type: 'spring', stiffness: 100, damping: 15 }

"NGỌN LỬA":
  Keep current gold gradient.
  Add: text-shadow: 0 0 40px rgba(255,215,0,0.4) — subtle golden glow

─── 2.5 HERO LAYOUT BALANCE ────────────────────────────────────
Current: 50/50 split feels unbalanced because card is small.
Fix: Change to 55% text / 45% card on desktop.
Card container: flex items-center justify-center
  padding-right: 2rem
  Add subtle dark radial bg behind just the card area:
    background: radial-gradient(ellipse 60% 80% at center,
      rgba(15,39,68,0.8) 0%, transparent 70%)

Add floating mini-badges around the card (absolute positioned):
  Top-right: '+96 OVR' pill — gold bg, dark text, subtle float anim
  Bottom-left: 'DIAMOND' rarity pill — blue bg, white text
  These add life to the otherwise static right column
```

---

## SECTION 3 — STATS SECTION

```
─── 3.1 COUNTUP ANIMATION ──────────────────────────────────────
npm install react-countup

Wrap stats section in IntersectionObserver:
  const [hasPlayed, setHasPlayed] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHasPlayed(true) },
      { threshold: 0.4 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

Each stat:
  <CountUp
    end={128000} suffix="K+" duration={2.5}
    startOnMount={false} start={hasPlayed}
    formattingFn={(n) => n >= 1000 ? `${Math.round(n/1000)}K+` : n}
  />

─── 3.2 STAT CARD VISUAL HIERARCHY ────────────────────────────
Make the most important stat (PACK ĐÃ MỞ) stand out:
  - 1st card: border-rarity-gold/30, scale-[1.02] vs others
  - Add tiny gold star icon top-right corner of featured card
  - Number: text-rarity-gold for the hero stat only

All cards hover:
  hover:border-white/20 hover:-translate-y-1
  transition: all 0.2s ease
  cursor: default

─── 3.3 REWARD BANNER ─────────────────────────────────────────
Current "+1000" button looks like a UI badge, not a reward.
Replace with more impactful design:

Left side — keep text as is.
Right side — replace pill button with:
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-14 h-14 rounded-full bg-rarity-gold/20
        border border-rarity-gold/40 flex items-center justify-center">
        <span className="font-['Rajdhani'] text-xl font-bold
          text-rarity-gold">+1K</span>
      </div>
      <div className="absolute inset-0 rounded-full
        animate-ping bg-rarity-gold/20" />  {/* ping ring */}
    </div>
    <span className="text-white/50 text-sm">COIN<br/>MIỄN PHÍ</span>
  </div>

Banner shimmer sweep:
  ::after pseudo — translateX -200% → 200% over 4s, repeat 1x then pause 6s
  Use animation-delay and animation-iteration-count tricks
```

---

## SECTION 4 — CARD RARITY ROW

```
─── 4.1 LAYOUT — CHANGE TO 2-ROW GRID ─────────────────────────
Current horizontal scroll is bad UX on desktop.
Replace with:
  Grid: 4 columns on desktop (Bronze Common, Bronze Rare, Silver Common,
        Silver Rare in row 1), (Gold Common, Gold Rare, Gold Epic,
        Diamond in row 2)

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

On mobile: 2 columns, scroll vertically.

─── 4.2 HOVER EFFECTS PER RARITY ──────────────────────────────
Base transition on ALL cards:
  transition: transform 0.2s ease, box-shadow 0.2s ease
  &:hover { transform: translateY(-8px) scale(1.04) }

Rarity-specific glow on hover:
  .bronze:hover { box-shadow: 0 12px 40px rgba(205,127,50,0.45) }
  .silver:hover { box-shadow: 0 12px 40px rgba(192,192,192,0.4) }
  .gold:hover   { box-shadow: 0 12px 40px rgba(255,215,0,0.45) }
  .epic:hover   { box-shadow: 0 12px 40px rgba(249,115,22,0.5) }
  .diamond:hover{ box-shadow: 0 12px 40px rgba(96,165,250,0.55) }

─── 4.3 SHIMMER ANIMATION (Gold, Epic, Diamond only) ───────────
Add ::after on card element (not image):
  content: ''
  position: absolute; inset: 0; border-radius: inherit
  background: linear-gradient(
    118deg,
    transparent 20%,
    rgba(255,255,255,0.15) 50%,
    transparent 80%
  )
  background-size: 250% 100%
  animation: shimmer 2.8s linear infinite
  pointer-events: none; z-index: 2

  @keyframes shimmer {
    from { background-position: 250% center }
    to   { background-position: -250% center }
  }

─── 4.4 BADGE REDESIGN ─────────────────────────────────────────
Current badges are too small and low contrast. Replace with:

Rarity badge (top of card):
  py-1 px-3 text-xs font-bold tracking-widest uppercase
  Rounded only on top (border-radius: 6px 6px 0 0 if at top edge)
  
Colors:
  BRONZE COMMON: bg-[#3D2010] text-[#CD7F32]
  BRONZE RARE:   bg-[#4D1F05] text-[#F97316]
  SILVER COMMON: bg-[#1E2530] text-[#94A3B8]
  SILVER RARE:   bg-[#1A1F35] text-[#C0C0C0]
  GOLD COMMON:   bg-[#2D2000] text-[#FFD700]
  GOLD RARE:     bg-[#2D1500] text-[#FFA500]
  GOLD EPIC:     bg-[#2D0D00] text-[#F97316]
  DIAMOND:       bg-[#0A1628] text-[#60A5FA]

─── 4.5 SECTION ENTRANCE ANIMATION ────────────────────────────
Each card: Framer Motion whileInView
  initial: { opacity: 0, y: 30 }
  whileInView: { opacity: 1, y: 0 }
  viewport: { once: true, margin: '-80px' }
  transition: { delay: index * 0.07, duration: 0.4 }
```

---

## SECTION 5 — HOW-TO STEPS

```
─── 5.1 CONNECTING LINE ────────────────────────────────────────
Wrap 4 cards in relative container.
Add horizontal line (desktop only, hidden on mobile):
  <div className="hidden md:block absolute top-[44px]
    left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px z-0
    bg-gradient-to-r from-transparent via-rarity-gold/35 to-transparent" />

Line has animated "traveling dot":
  ::after pseudo-element, small circle, gold bg
  animation: travel 3s linear infinite
  @keyframes travel {
    from { left: 0% } to { left: 100% }
  }

─── 5.2 STEP NUMBER CIRCLE ─────────────────────────────────────
Replace plain numbered badge with:
  <div className="relative z-10 w-11 h-11 rounded-full
    border-2 border-rarity-gold/40 bg-dark-void
    flex items-center justify-center mb-4
    group-hover:bg-rarity-gold group-hover:border-rarity-gold
    transition-all duration-200">
    <span className="font-['Rajdhani'] font-bold text-sm
      text-rarity-gold group-hover:text-dark-void">
      0{step.number}
    </span>
  </div>

Wrap card in <motion.div className="group">

─── 5.3 ICONS ABOVE NUMBER ─────────────────────────────────────
import { UserPlus, ShoppingBag, PackageOpen, DollarSign } from 'lucide-react'
Map:
  Step 01 → <UserPlus size={18} className="text-rarity-gold/60 mb-2" />
  Step 02 → <ShoppingBag size={18} className="text-rarity-gold/60 mb-2" />
  Step 03 → <PackageOpen size={18} className="text-rarity-gold/60 mb-2" />
  Step 04 → <DollarSign size={18} className="text-rarity-gold/60 mb-2" />

─── 5.4 CARD STYLING ───────────────────────────────────────────
  bg-dark-surface/60 backdrop-blur-sm
  border border-white/[0.07]
  hover:border-rarity-gold/25
  rounded-xl p-6
  transition-all duration-200

Title: font-['Barlow_Condensed'] text-xl uppercase tracking-wide text-white
Body:  text-sm text-white/55 leading-relaxed mt-2
```

---

## SECTION 6 — LIVE TICKER

```
─── 6.1 REDESIGN TICKER ITEMS ──────────────────────────────────
Current: plain text, inconsistent styling.
Target: each item is a styled pill with rarity color.

Data structure:
  const pulls = [
    { user: 'Nguyễn V.A.', player: 'MBAPPE', rating: 97, rarity: 'diamond' },
    { user: 'Trần M.H.',   player: 'HAALAND', rating: 94, rarity: 'epic' },
    { user: 'Lê Q.B.',     player: 'RONALDO', rating: 95, rarity: 'gold' },
    // ... 8 items total
  ]

Each pill:
  <div className="flex items-center gap-2 px-4 py-2 rounded-full
    bg-dark-surface border border-white/10 shrink-0 mx-2">
    <div className={`w-2 h-2 rounded-full ${rarityDotColor[item.rarity]}`} />
    <span className="text-white/50 text-sm">{item.user}</span>
    <span className="text-white font-semibold text-sm">vừa kéo</span>
    <span className={`font-bold text-sm ${rarityTextColor[item.rarity]}`}>
      {item.player} {item.rating} ★
    </span>
    <span className={`text-xs uppercase tracking-wider ${rarityTextColor[item.rarity]}`}>
      {item.rarity.toUpperCase()}
    </span>
  </div>

rarityDotColor: {
  diamond: 'bg-rarity-diamond',
  epic: 'bg-rarity-epic',
  gold: 'bg-rarity-gold',
  silver: 'bg-rarity-silver',
  bronze: 'bg-rarity-bronze',
}

─── 6.2 MARQUEE ANIMATION ──────────────────────────────────────
Render items twice for seamless loop:
  <div className="flex overflow-hidden">
    <div className="flex animate-marquee">
      {pulls.map(item => <PullItem key={item.id} {...item} />)}
      {pulls.map(item => <PullItem key={item.id+'_dup'} {...item} />)}
    </div>
  </div>

In tailwind.config.js → extend.animation:
  marquee: 'marquee 28s linear infinite'
extend.keyframes:
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }
  }

Hover pause:
  .animate-marquee:hover { animation-play-state: paused }

Section header:
  Remove "DIAMOND" label that's floating separately.
  Replace with centered header pill:
  <div className="flex items-center justify-center gap-2 mb-4">
    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
    <span className="text-xs text-white/50 uppercase tracking-[0.2em]">
      ĐANG MỞ PACK NGAY LÚC NÀY
    </span>
  </div>
```

---

## SECTION 7 — FEATURED PLAYER CARDS

```
─── 7.1 PLAYER PHOTOS ──────────────────────────────────────────
Current: white placeholder silhouettes — looks unfinished.

Option A: Use real FC26 player render PNGs (if licensed/owned)
Option B: Use CC0 football silhouette SVGs with rarity-colored fill

If keeping placeholder style — at minimum:
  Replace white blob with rarity-tinted silhouette:
  Diamond card: silhouette fill #3B82F6 opacity 0.7
  Gold cards: silhouette fill #FFD700 opacity 0.5
  Add subtle noise texture over silhouette

─── 7.2 CARD HOVER EFFECTS ─────────────────────────────────────
Each card wrapper:
  transition: transform 0.3s ease, filter 0.3s ease
  &:hover {
    transform: perspective(800px) rotateY(8deg) translateY(-8px) scale(1.04)
    filter: drop-shadow(0 20px 40px var(--rarity-glow))
  }

Shine overlay follows mouse (reuse parallax hook):
  On mousemove over card: update --shine-x and --shine-y CSS vars
  Overlay: radial-gradient(circle at var(--shine-x) var(--shine-y),
            rgba(255,255,255,0.2) 0%, transparent 50%)

─── 7.3 BACKDROP GLOW ──────────────────────────────────────────
Each card sits in a glow container:
  Diamond: bg: radial-gradient(ellipse at 50% 100%,
    rgba(59,130,246,0.3) 0%, transparent 65%)
  Gold: bg: radial-gradient(ellipse at 50% 100%,
    rgba(161,98,7,0.25) 0%, transparent 65%)

─── 7.4 STAT BARS ──────────────────────────────────────────────
Below PAC SHO PAS DRI DEF PHY values, add a thin progress bar:
  <div className="w-full bg-white/10 rounded-full h-0.5 mt-1">
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{
        width: `${value}%`,
        background: rarityColor,
        transitionDelay: `${index * 0.05}s`
      }}
    />
  </div>
  Animate: width goes from 0 to value when card enters viewport

─── 7.5 SECTION LAYOUT ─────────────────────────────────────────
Current: 3 cards centered with too much empty space.
Fix:
  - Increase card size to ~220px wide
  - Add subtle section bg: radial-gradient from dark-surface
    outward, so cards feel "lit from below"
  - Center card (Bellingham) should be elevated:
    className="translate-y-0 md:-translate-y-4 z-10"
    (center card pops up = podium effect)
  - Left/right cards slightly smaller: scale-[0.94]
```

---

## SECTION 8 — NEW: CTA SECTION (thêm mới trước footer)

```
Inspired by: Sorare's bottom CTA, NBA Top Shot's "Get started" block.
Insert this section BEFORE the footer.

Layout: Full-width dark section, diagonal top edge (clip-path)

Background:
  background: linear-gradient(135deg, #0D1B2A 0%, #070E1A 50%, #03060D 100%)
  clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%)
  padding-top: 120px

Content (centered):
  <div className="max-w-2xl mx-auto text-center px-6 pb-20">
    {/* Small label */}
    <p className="text-xs text-rarity-gold/70 uppercase tracking-[0.25em]
      font-semibold mb-4">SẴN SÀNG CHƯA</p>

    {/* Big heading */}
    <h2 className="font-['Barlow_Condensed'] text-6xl md:text-7xl
      text-white uppercase leading-tight mb-6">
      BẮT ĐẦU<br/>
      <span className="text-transparent bg-clip-text
        bg-gradient-to-r from-rarity-gold to-rarity-epic">
        NGAY HÔM NAY
      </span>
    </h2>

    {/* Sub */}
    <p className="text-white/50 text-lg mb-10">
      Đăng ký miễn phí. Nhận 1000 coin. Không cần thẻ tín dụng.
    </p>

    {/* CTA Buttons */}
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <button className="px-8 py-4 bg-rarity-gold text-dark-void
        font-['Barlow_Condensed'] text-xl uppercase tracking-wider
        rounded-xl hover:bg-yellow-300 hover:scale-105
        transition-all duration-200 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
        ĐĂNG KÝ MIỄN PHÍ →
      </button>
      <button className="px-8 py-4 border border-white/20 text-white/70
        font-['Barlow_Condensed'] text-xl uppercase tracking-wider
        rounded-xl hover:bg-white/5 hover:border-white/40
        transition-all duration-200">
        XEM DEMO
      </button>
    </div>

    {/* Trust signals below CTA */}
    <div className="flex items-center justify-center gap-6 mt-8">
      <span className="text-white/30 text-sm">✓ Miễn phí mãi mãi</span>
      <span className="text-white/30 text-sm">✓ 1000 coin khởi đầu</span>
      <span className="text-white/30 text-sm">✓ Không quảng cáo</span>
    </div>
  </div>
```

---

## SECTION 9 — FOOTER UPGRADE

```
Current: minimal text + 3 nav links — too bare for a game site.

New footer layout (3 columns):

Column 1 — Brand:
  Logo (hexagon + PACKOPENER2026)
  Tagline: "Trải nghiệm mở pack FC26 đỉnh nhất Việt Nam"
  Social links: Discord, Twitter/X, YouTube (icon buttons)

Column 2 — Links:
  "KHÁM PHÁ"
  - Tăng Thẻ
  - Cách Chơi
  - Thẻ Nổi Bật
  - Bảng Xếp Hạng (new page placeholder)

Column 3 — Legal/Info:
  "HỖ TRỢ"
  - FAQ
  - Discord Server
  - Liên Hệ
  - Terms & Privacy

Bottom bar:
  "© 2026 PackOpener2026. Fan-made project. 
   Không liên kết với EA Sports."
  text-white/25 text-xs

Styling:
  bg-dark-void border-t border-white/[0.05]
  Padding: py-16 px-6
  Grid: grid-cols-1 md:grid-cols-3 gap-12
```

---

## SECTION 10 — PERFORMANCE & ACCESSIBILITY

```
─── 10.1 ANIMATION SAFETY ──────────────────────────────────────
Wrap ALL animation-heavy components:

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // Disable: parallax, marquee auto-scroll, hero float, shimmer
    // Keep: hover scale (subtle), countup (instant display final value)
  }

─── 10.2 WILL-CHANGE ───────────────────────────────────────────
Add to elements that animate every frame:
  Hero card wrapper: will-change: transform
  Marquee container: will-change: transform
  Star field canvas: will-change: transform
  Stat countup numbers: will-change: contents

─── 10.3 MOBILE BREAKPOINTS ────────────────────────────────────
Hero (< 768px):
  - Stack vertically: card ON TOP, text below (visual-first)
  - Card size: 200px × 280px centered
  - Star field: reduce particle count to 40
  - Disable mouse parallax entirely

Card rarity row (< 640px):
  - 2-column grid (not horizontal scroll)
  - Reduce card size proportionally

─── 10.4 LAZY LOADING ──────────────────────────────────────────
  - Card images: loading="lazy"
  - Player card section: lazy mount with Suspense boundary
  - StarField component: dynamic import (no SSR needed)
    const StarField = dynamic(() => import('./StarField'), { ssr: false })

─── 10.5 METRICS TARGET ────────────────────────────────────────
  LCP (hero card visible): < 2.5s
  CLS (no layout shift from fonts): add font-display: optional
  FID: all event listeners passive where possible
  Bundle: Framer Motion tree-shaken (import only used hooks)
```

---

## CHECKLIST TRƯỚC KHI DEPLOY

```
VISUAL
[ ] Hero card có hình thật (không phải wireframe)
[ ] Float + glow pulse animation hoạt động trên hero card
[ ] Mouse parallax: card tilt khi di chuột (desktop only)
[ ] Star field background xuất hiện trong hero
[ ] Countup animation khi scroll vào stats section
[ ] Shimmer chạy trên Gold/Epic/Diamond cards
[ ] Hover glow đúng màu rarity cho từng card
[ ] Ticker items có màu theo rarity (không phải plain text)
[ ] Featured cards có backdrop glow + hover 3D effect
[ ] CTA section cuối trang đã có
[ ] Footer đã upgrade (3 columns, social links)

LAYOUT
[ ] Hero 55%/45% split (không bị trống)
[ ] Card grid 4x2 thay vì horizontal scroll (desktop)
[ ] Step cards có connecting line giữa (desktop)
[ ] Featured cards có podium effect (center card elevated)
[ ] Section transitions dùng diagonal clip-path

TYPOGRAPHY
[ ] Rajdhani đã load cho stat numbers
[ ] Tất cả heading: Barlow Condensed uppercase
[ ] Body text: white/65 (không phải pure white)

PERFORMANCE
[ ] prefers-reduced-motion check implemented
[ ] will-change chỉ trên animated elements
[ ] Mobile: card stack lên trên text trong hero
[ ] Lazy load player cards section
[ ] Không có console errors/warnings
```

---

*Prompt này tổng hợp từ phân tích trực tiếp trên PackOpener2026 v2 + benchmark từ Sorare, NBA Top Shot, FIFA Ultimate Team, PACYBITS, Gods Unchained. Ưu tiên implement theo thứ tự: Hero Card (Section 2) → Featured Cards (Section 7) → CTA Section (Section 8) → Card Rarity Row (Section 4).*
