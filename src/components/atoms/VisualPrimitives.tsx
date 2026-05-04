import { useRef, type CSSProperties, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode, type SyntheticEvent } from 'react'
import './styles/visual-primitives.css'
import { LabelText, PlayerNameText, StatNumber } from './Typography'
import bronzeFrameBase from '../../assets/optimized/bronze.webp'
import silverFrameBase from '../../assets/optimized/silver.webp'
import goldFrameBase from '../../assets/optimized/gold.webp'
import diamondFrameBase from '../../assets/optimized/diamond.webp'
import defaultPlayerImage from '../../assets/default.png'

type LegacyRarity = 'bronze' | 'silver' | 'gold' | 'special' | 'elite'
export type CardRarity =
  | 'BRONZE_COMMON'
  | 'BRONZE_RARE'
  | 'SILVER_COMMON'
  | 'SILVER_RARE'
  | 'GOLD_COMMON'
  | 'GOLD_RARE'
  | 'GOLD_EPIC'
  | 'DIAMOND_COMMON'
  | 'DIAMOND_RARE'
type Rarity = CardRarity | LegacyRarity

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

function useDefaultPlayerImage(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget

  if (image.dataset.fallbackApplied === 'true') {
    return
  }

  image.dataset.fallbackApplied = 'true'
  image.src = defaultPlayerImage
}

function useParallax() {
  return useRef<HTMLDivElement>(null)
}

export function CoinIcon({
  className,
  children = '$',
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={joinClassNames('visual-coin-icon', className)} aria-hidden="true" {...props}>
      {children}
    </span>
  )
}

export function PackIcon({
  className,
  label = 'Pack',
  ...props
}: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return (
    <div className={joinClassNames('visual-pack-icon', className)} {...props}>
      <span className="visual-pack-icon-mark">{label}</span>
    </div>
  )
}

export function FlagIcon({
  className,
  flag = '🇫🇷',
  src,
  alt = 'Nation flag',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { flag?: string; src?: string; alt?: string }) {
  return (
    <span className={joinClassNames('visual-flag-icon', className)} {...props}>
      {src ? <img src={src} alt={alt} referrerPolicy="no-referrer" /> : flag}
    </span>
  )
}

export function ClubBadge({
  className,
  children = 'PSG',
  src,
  alt = 'Club badge',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { src?: string; alt?: string }) {
  return (
    <span className={joinClassNames('visual-club-badge', className)} {...props}>
      {src ? <img src={src} alt={alt} referrerPolicy="no-referrer" /> : children}
    </span>
  )
}

export function Avatar({
  className,
  alt,
  src,
  size = 40,
  initials = 'PO',
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { size?: number; initials?: string }) {
  return (
    <span
      className={joinClassNames('visual-avatar', className)}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.34) }}
    >
      {src ? (
        <img src={src} alt={alt} {...props} />
      ) : (
        <span className="visual-avatar-fallback" aria-label={alt ?? initials}>
          {initials}
        </span>
      )}
    </span>
  )
}

export function SurfacePanel({
  className,
  children,
  raised = false,
  padding = 24,
  ...props
}: HTMLAttributes<HTMLDivElement> & { raised?: boolean; padding?: number; children: ReactNode }) {
  return (
    <section
      className={joinClassNames(
        'visual-surface-panel',
        raised ? 'visual-surface-panel-raised' : undefined,
        className,
      )}
      {...props}
    >
      <div className="visual-surface-panel-content" style={{ padding }}>
        {children}
      </div>
    </section>
  )
}

export function GlowRing({
  className,
  children,
  color,
  ...props
}: HTMLAttributes<HTMLDivElement> & { color?: string; children: ReactNode }) {
  const style = color ? ({ '--glow-ring-color': color } as CSSProperties) : undefined

  return (
    <div className={joinClassNames('visual-glow-ring', className)} style={style} {...props}>
      {children}
    </div>
  )
}

type TiltCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  intensity?: number
  perspective?: number
}

export function TiltCard({
  className,
  children,
  ...props
}: TiltCardProps) {
  const containerRef = useParallax()

  return (
    <div
      ref={containerRef}
      className={joinClassNames('visual-tilt-card', className)}
      {...props}
    >
      {children}
    </div>
  )
}

type HeroCardProps = Omit<CardFrameProps, 'glow'> & {
  showGlow?: boolean
}

export function HeroCard(props: HeroCardProps) {
  return <CardFrame {...props} />
}

type CardFrameProps = HTMLAttributes<HTMLDivElement> & {
  rarity?: Rarity
  overall?: number
  position?: string
  playerName?: string
  nationFlag?: string
  nationImageSrc?: string
  clubCode?: string
  clubImageSrc?: string
  glow?: boolean
  imageSrc?: string
  stats?: { pac: number; sho: number; pas: number; dri: number; def: number; phy: number }
}

type CardTheme = {
  tier: 'bronze' | 'silver' | 'gold' | 'diamond'
  finish: 'common' | 'rare' | 'epic'
  topBar: string
  shellBackground: string
  borderColor: string
  edgeHighlight: string
  artGlow: string
  statGlow: string
  shadowColor: string
  accentColor: string
  ornamentOpacity: number
}

const familyBaseAssets = {
  bronze: bronzeFrameBase,
  silver: silverFrameBase,
  gold: goldFrameBase,
  diamond: diamondFrameBase,
} as const

const rarityAliases: Record<LegacyRarity, CardRarity> = {
  bronze: 'BRONZE_RARE',
  silver: 'SILVER_RARE',
  gold: 'GOLD_RARE',
  special: 'GOLD_EPIC',
  elite: 'DIAMOND_RARE',
}

const cardThemes: Record<CardRarity, CardTheme> = {
  BRONZE_COMMON: {
    tier: 'bronze',
    finish: 'common',
    topBar: 'linear-gradient(135deg, #f0b171, #9b5426)',
    shellBackground:
      'radial-gradient(circle at 50% -8%, rgba(255, 222, 187, 0.22), transparent 36%), linear-gradient(180deg, rgba(96, 49, 25, 0.9), rgba(32, 14, 10, 0.98))',
    borderColor: 'rgba(222, 146, 88, 0.58)',
    edgeHighlight: 'rgba(255, 228, 194, 0.56)',
    artGlow: 'rgba(244, 175, 111, 0.28)',
    statGlow: 'rgba(255, 211, 166, 0.08)',
    shadowColor: 'rgba(77, 34, 18, 0.5)',
    accentColor: '#ffd6ab',
    ornamentOpacity: 0.28,
  },
  BRONZE_RARE: {
    tier: 'bronze',
    finish: 'rare',
    topBar: 'linear-gradient(135deg, #ffd3a3, #bb6d38 44%, #7a371a)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(255, 230, 196, 0.32), transparent 34%), linear-gradient(180deg, rgba(115, 56, 28, 0.94), rgba(40, 16, 10, 0.98))',
    borderColor: 'rgba(248, 191, 135, 0.72)',
    edgeHighlight: 'rgba(255, 245, 229, 0.76)',
    artGlow: 'rgba(255, 190, 119, 0.38)',
    statGlow: 'rgba(255, 230, 197, 0.12)',
    shadowColor: 'rgba(102, 46, 17, 0.56)',
    accentColor: '#fff0dc',
    ornamentOpacity: 0.42,
  },
  SILVER_COMMON: {
    tier: 'silver',
    finish: 'common',
    topBar: 'linear-gradient(135deg, #eef4fb, #98a8ba 58%, #687587)',
    shellBackground:
      'radial-gradient(circle at 50% -8%, rgba(226, 240, 255, 0.2), transparent 36%), linear-gradient(180deg, rgba(61, 74, 94, 0.9), rgba(18, 24, 34, 0.98))',
    borderColor: 'rgba(167, 186, 209, 0.6)',
    edgeHighlight: 'rgba(240, 247, 255, 0.52)',
    artGlow: 'rgba(194, 221, 247, 0.26)',
    statGlow: 'rgba(223, 237, 252, 0.08)',
    shadowColor: 'rgba(24, 31, 41, 0.5)',
    accentColor: '#dcefff',
    ornamentOpacity: 0.26,
  },
  SILVER_RARE: {
    tier: 'silver',
    finish: 'rare',
    topBar: 'linear-gradient(135deg, #ffffff, #c3d4e8 36%, #8696ab 68%, #5c697b)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(240, 248, 255, 0.3), transparent 32%), linear-gradient(180deg, rgba(76, 92, 114, 0.95), rgba(20, 28, 40, 0.98))',
    borderColor: 'rgba(222, 236, 255, 0.74)',
    edgeHighlight: 'rgba(255, 255, 255, 0.82)',
    artGlow: 'rgba(214, 233, 255, 0.38)',
    statGlow: 'rgba(241, 248, 255, 0.12)',
    shadowColor: 'rgba(25, 34, 44, 0.58)',
    accentColor: '#ffffff',
    ornamentOpacity: 0.44,
  },
  GOLD_COMMON: {
    tier: 'gold',
    finish: 'common',
    topBar: 'linear-gradient(135deg, #f7d86a, #b98d1a 56%, #77570d)',
    shellBackground:
      'radial-gradient(circle at 50% -4%, rgba(255, 228, 125, 0.22), transparent 36%), linear-gradient(180deg, rgba(89, 66, 12, 0.92), rgba(28, 22, 9, 0.98))',
    borderColor: 'rgba(237, 192, 69, 0.6)',
    edgeHighlight: 'rgba(255, 235, 165, 0.56)',
    artGlow: 'rgba(255, 212, 93, 0.28)',
    statGlow: 'rgba(255, 239, 183, 0.08)',
    shadowColor: 'rgba(85, 56, 6, 0.54)',
    accentColor: '#ffe697',
    ornamentOpacity: 0.28,
  },
  GOLD_RARE: {
    tier: 'gold',
    finish: 'rare',
    topBar: 'linear-gradient(135deg, #fff1a0, #f5c842 35%, #c28f13 62%, #7f5907)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(255, 238, 154, 0.34), transparent 32%), linear-gradient(180deg, rgba(112, 78, 8, 0.95), rgba(30, 22, 7, 0.98))',
    borderColor: 'rgba(255, 221, 118, 0.76)',
    edgeHighlight: 'rgba(255, 244, 191, 0.82)',
    artGlow: 'rgba(255, 220, 122, 0.42)',
    statGlow: 'rgba(255, 242, 188, 0.12)',
    shadowColor: 'rgba(101, 69, 10, 0.62)',
    accentColor: '#fff8d0',
    ornamentOpacity: 0.48,
  },
  GOLD_EPIC: {
    tier: 'gold',
    finish: 'epic',
    topBar: 'linear-gradient(135deg, #fff5d0, #ffd75a 28%, #ff8c2b 54%, #b64413 78%, #5b1c10)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(255, 228, 139, 0.34), transparent 26%), radial-gradient(circle at 84% 22%, rgba(255, 118, 43, 0.2), transparent 24%), linear-gradient(180deg, rgba(110, 39, 10, 0.96), rgba(35, 12, 13, 0.99))',
    borderColor: 'rgba(255, 203, 110, 0.86)',
    edgeHighlight: 'rgba(255, 246, 203, 0.92)',
    artGlow: 'rgba(255, 182, 80, 0.48)',
    statGlow: 'rgba(255, 243, 207, 0.14)',
    shadowColor: 'rgba(127, 42, 14, 0.66)',
    accentColor: '#fff6d5',
    ornamentOpacity: 0.64,
  },
  DIAMOND_COMMON: {
    tier: 'diamond',
    finish: 'common',
    topBar: 'linear-gradient(135deg, #f5f8ff, #9fe0ff 36%, #5db4ff 62%, #2e5ed1)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(185, 238, 255, 0.26), transparent 34%), linear-gradient(180deg, rgba(20, 57, 104, 0.94), rgba(8, 17, 44, 0.99))',
    borderColor: 'rgba(129, 215, 255, 0.66)',
    edgeHighlight: 'rgba(223, 248, 255, 0.62)',
    artGlow: 'rgba(104, 213, 255, 0.34)',
    statGlow: 'rgba(213, 242, 255, 0.1)',
    shadowColor: 'rgba(8, 25, 74, 0.58)',
    accentColor: '#e5fbff',
    ornamentOpacity: 0.34,
  },
  DIAMOND_RARE: {
    tier: 'diamond',
    finish: 'rare',
    topBar: 'linear-gradient(135deg, #ffffff, #d2fbff 20%, #7ee6ff 42%, #4f98ff 68%, #6447ff 100%)',
    shellBackground:
      'radial-gradient(circle at 50% 0%, rgba(204, 244, 255, 0.42), transparent 28%), radial-gradient(circle at 86% 18%, rgba(106, 126, 255, 0.22), transparent 22%), linear-gradient(180deg, rgba(18, 62, 120, 0.96), rgba(8, 14, 50, 0.99))',
    borderColor: 'rgba(162, 239, 255, 0.86)',
    edgeHighlight: 'rgba(255, 255, 255, 0.92)',
    artGlow: 'rgba(117, 230, 255, 0.48)',
    statGlow: 'rgba(233, 251, 255, 0.14)',
    shadowColor: 'rgba(13, 43, 120, 0.66)',
    accentColor: '#ffffff',
    ornamentOpacity: 0.62,
  },
}

function resolveCardRarity(rarity: Rarity): CardRarity {
  if (rarity in rarityAliases) {
    return rarityAliases[rarity as LegacyRarity]
  }

  return rarity as CardRarity
}

export function CardFrame({
  className,
  rarity = 'GOLD_RARE',
  overall = 92,
  position = 'LW',
  playerName = 'KVARATSKHELIA',
  nationFlag = '🇬🇪',
  nationImageSrc,
  clubCode = 'PSG',
  clubImageSrc,
  glow = false,
  imageSrc,
  stats = { pac: 80, sho: 80, pas: 80, dri: 80, def: 80, phy: 80 }, // Fallback
  ...props
}: CardFrameProps) {
  const resolvedRarity = resolveCardRarity(rarity)
  const theme = cardThemes[resolvedRarity]
  const style = {
    '--card-frame-base-art': `url(${familyBaseAssets[theme.tier]})`,
    '--card-frame-top-bar': theme.topBar,
    '--card-frame-shell': theme.shellBackground,
    '--card-frame-border': theme.borderColor,
    '--card-frame-edge': theme.edgeHighlight,
    '--card-frame-glow': theme.artGlow,
    '--card-frame-stat-glow': theme.statGlow,
    '--card-frame-shadow': theme.shadowColor,
    '--card-frame-accent': theme.accentColor,
    '--card-frame-ornament-opacity': String(theme.ornamentOpacity),
  } as CSSProperties

  const cardElement = (
    <div
      className={joinClassNames(
        'visual-card-frame',
        `visual-card-frame-${theme.tier}`,
        `visual-card-frame-${theme.finish}`,
        className,
      )}
      style={style}
      data-rarity={resolvedRarity}
      {...props}
    >
      <div className="visual-card-frame-bg" />
      <div className="visual-card-frame-content">
        <div className="visual-card-frame-top">
          <StatNumber>{overall}</StatNumber>
          <LabelText>{position}</LabelText>
          <div className="visual-card-frame-meta">
            <FlagIcon flag={nationFlag} src={nationImageSrc} alt={`${playerName} nation`} />
            <ClubBadge src={clubImageSrc} alt={`${clubCode} badge`}>{clubCode}</ClubBadge>
          </div>
        </div>

        <div className="visual-card-frame-art">
          <img 
            src={imageSrc || defaultPlayerImage} 
            alt={playerName} 
            className="visual-card-player-image" 
            referrerPolicy="no-referrer"
            onError={useDefaultPlayerImage}
          />
        </div>

        <div className="visual-card-frame-bottom">
          <div className="visual-card-frame-name">
            <PlayerNameText>{playerName}</PlayerNameText>
          </div>

          <div className="visual-card-frame-stats-grid">
            {[
              [stats.pac, 'PAC'],
              [stats.sho, 'SHO'],
              [stats.pas, 'PAS'],
              [stats.dri, 'DRI'],
              [stats.def, 'DEF'],
              [stats.phy, 'PHY'],
            ].map(([value, label]) => (
              <div className="visual-card-frame-stat" key={label as string}>
                <StatNumber>{value}</StatNumber>
                <LabelText>{label}</LabelText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (glow) {
    return (
      <div
        className={joinClassNames('visual-card-frame-glow', className)}
        style={{ '--card-frame-glow': theme.artGlow } as CSSProperties}
        {...props}
      >
        {cardElement}
      </div>
    )
  }

  return cardElement
}
