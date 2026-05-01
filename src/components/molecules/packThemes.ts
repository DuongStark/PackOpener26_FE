export type PackIconName =
  | 'lifeline'
  | 'shield'
  | 'shield-plus'
  | 'star'
  | 'rare-star'
  | 'stack'
  | 'wall'
  | 'glove'
  | 'midfield'
  | 'forward'
  | 'crown'
  | 'ultimate'

export type PackPattern =
  | 'pitch'
  | 'diagonal'
  | 'football'
  | 'plus'
  | 'hex'
  | 'hex-lines'
  | 'stars'
  | 'shards'
  | 'cards'
  | 'net'
  | 'lanes'
  | 'speed'
  | 'elite'
  | 'ultimate'

export type PackMaterial = 'matte' | 'metallic' | 'foil' | 'premium-foil' | 'enamel'
export type PackShine = 'low' | 'medium' | 'medium-high' | 'high' | 'legendary'

export type PackTheme = {
  key: string
  name: string
  subtitle: string
  tierCode: string
  price: number
  cardCount: number
  oddsTeaser: string
  primary: string
  secondary: string
  dark: string
  light: string
  accent: string
  glow: string
  icon: PackIconName
  material: PackMaterial
  pattern: PackPattern
  shine: PackShine
}

export const PACK_THEMES = [
  {
    key: 'free-recovery',
    name: 'FREE RECOVERY',
    subtitle: 'DAILY SUPPORT',
    tierCode: 'FR-01',
    price: 0,
    cardCount: 3,
    oddsTeaser: 'Basic safety pull',
    dark: '#181716',
    primary: '#3a332b',
    secondary: '#8a7154',
    light: '#d7c0a1',
    accent: '#8a7154',
    glow: 'rgba(215, 192, 161, 0.18)',
    icon: 'lifeline',
    material: 'matte',
    pattern: 'pitch',
    shine: 'low',
  },
  {
    key: 'starter-pack',
    name: 'STARTER PACK',
    subtitle: 'FIRST TOUCH SERIES',
    tierCode: 'ST-02',
    price: 40,
    cardCount: 5,
    oddsTeaser: 'Entry chance for Silver+',
    dark: '#2d2217',
    primary: '#8b5b31',
    secondary: '#d59a5f',
    light: '#ffe3bd',
    accent: '#4f7a52',
    glow: 'rgba(213, 154, 95, 0.28)',
    icon: 'shield',
    material: 'metallic',
    pattern: 'pitch',
    shine: 'medium',
  },
  {
    key: 'bronze-pack',
    name: 'BRONZE PACK',
    subtitle: 'COMMON SERIES',
    tierCode: 'BR-03',
    price: 25,
    cardCount: 5,
    oddsTeaser: 'Common collectible base',
    dark: '#251006',
    primary: '#5a2b12',
    secondary: '#b56f37',
    light: '#ffd7a1',
    accent: '#b56f37',
    glow: 'rgba(181, 111, 55, 0.34)',
    icon: 'shield',
    material: 'foil',
    pattern: 'football',
    shine: 'medium',
  },
  {
    key: 'bronze-plus',
    name: 'BRONZE PLUS',
    subtitle: 'UPGRADE SERIES',
    tierCode: 'BP-04',
    price: 60,
    cardCount: 5,
    oddsTeaser: 'Better Bronze and Silver odds',
    dark: '#301307',
    primary: '#7b3b18',
    secondary: '#cf8140',
    light: '#ffe0ad',
    accent: '#ffe0ad',
    glow: 'rgba(207, 129, 64, 0.42)',
    icon: 'shield-plus',
    material: 'foil',
    pattern: 'plus',
    shine: 'medium-high',
  },
  {
    key: 'silver-pack',
    name: 'SILVER PACK',
    subtitle: 'STANDARD SERIES',
    tierCode: 'SV-05',
    price: 120,
    cardCount: 5,
    oddsTeaser: 'Clean Silver tier upgrade',
    dark: '#20252b',
    primary: '#6b7280',
    secondary: '#cbd5e1',
    light: '#f8fafc',
    accent: '#9cc7e8',
    glow: 'rgba(156, 199, 232, 0.34)',
    icon: 'shield',
    material: 'metallic',
    pattern: 'hex',
    shine: 'medium',
  },
  {
    key: 'silver-plus',
    name: 'SILVER PLUS',
    subtitle: 'UPGRADE SERIES',
    tierCode: 'SP-06',
    price: 300,
    cardCount: 5,
    oddsTeaser: 'Silver floor with Gold hints',
    dark: '#1f2933',
    primary: '#8793a0',
    secondary: '#e5e7eb',
    light: '#fff7d6',
    accent: '#f3d078',
    glow: 'rgba(243, 208, 120, 0.32)',
    icon: 'shield-plus',
    material: 'foil',
    pattern: 'hex-lines',
    shine: 'medium-high',
  },
  {
    key: 'gold-pack',
    name: 'GOLD PACK',
    subtitle: 'PREMIUM SERIES',
    tierCode: 'GD-07',
    price: 950,
    cardCount: 5,
    oddsTeaser: 'Premium Gold chase',
    dark: '#3b2504',
    primary: '#9a6412',
    secondary: '#dca72b',
    light: '#fff0a8',
    accent: '#fff0a8',
    glow: 'rgba(220, 167, 43, 0.45)',
    icon: 'star',
    material: 'foil',
    pattern: 'stars',
    shine: 'high',
  },
  {
    key: 'premium-gold',
    name: 'PREMIUM GOLD',
    subtitle: 'VALUE SERIES',
    tierCode: 'PG-08',
    price: 1900,
    cardCount: 7,
    oddsTeaser: 'More cards, rich Gold odds',
    dark: '#2f1b03',
    primary: '#8a560c',
    secondary: '#f0b72f',
    light: '#fff3b8',
    accent: '#ffffff',
    glow: 'rgba(240, 183, 47, 0.55)',
    icon: 'star',
    material: 'premium-foil',
    pattern: 'stars',
    shine: 'high',
  },
  {
    key: 'rare-gold',
    name: 'RARE GOLD',
    subtitle: 'RARE SERIES',
    tierCode: 'RG-09',
    price: 2600,
    cardCount: 4,
    oddsTeaser: 'Focused rare Gold chance',
    dark: '#080706',
    primary: '#15110a',
    secondary: '#d89b1f',
    light: '#ffef9f',
    accent: '#5d3a08',
    glow: 'rgba(216, 155, 31, 0.58)',
    icon: 'rare-star',
    material: 'enamel',
    pattern: 'shards',
    shine: 'high',
  },
  {
    key: 'mixed-value',
    name: 'MIXED VALUE',
    subtitle: 'MULTI-TIER SERIES',
    tierCode: 'MV-10',
    price: 375,
    cardCount: 8,
    oddsTeaser: 'Generous multi-tier pull',
    dark: '#2b211a',
    primary: '#8b5b31',
    secondary: '#9ca3af',
    light: '#f5dfae',
    accent: '#d6a84d',
    glow: 'rgba(214, 168, 77, 0.32)',
    icon: 'stack',
    material: 'metallic',
    pattern: 'cards',
    shine: 'medium',
  },
  {
    key: 'goalkeeper-pack',
    name: 'GOALKEEPER PACK',
    subtitle: 'LAST LINE SERIES',
    tierCode: 'GK-11',
    price: 150,
    cardCount: 3,
    oddsTeaser: 'Specialized GK pool',
    dark: '#061a1d',
    primary: '#0f3a40',
    secondary: '#38bdf8',
    light: '#dff8ff',
    accent: '#f0c27a',
    glow: 'rgba(56, 189, 248, 0.42)',
    icon: 'glove',
    material: 'foil',
    pattern: 'net',
    shine: 'medium',
  },
  {
    key: 'defender-pack',
    name: 'DEFENDER PACK',
    subtitle: 'BACK LINE SERIES',
    tierCode: 'DF-12',
    price: 550,
    cardCount: 5,
    oddsTeaser: 'Defensive roles boosted',
    dark: '#111827',
    primary: '#334155',
    secondary: '#8b5b31',
    light: '#d8e3dc',
    accent: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.26)',
    icon: 'wall',
    material: 'metallic',
    pattern: 'pitch',
    shine: 'medium',
  },
  {
    key: 'midfielder-pack',
    name: 'MIDFIELDER PACK',
    subtitle: 'CONTROL SERIES',
    tierCode: 'MF-13',
    price: 700,
    cardCount: 5,
    oddsTeaser: 'Passing and control pool',
    dark: '#071a12',
    primary: '#14532d',
    secondary: '#a7f3d0',
    light: '#e8fff5',
    accent: '#d6a84d',
    glow: 'rgba(167, 243, 208, 0.3)',
    icon: 'midfield',
    material: 'foil',
    pattern: 'lanes',
    shine: 'medium',
  },
  {
    key: 'forward-pack',
    name: 'FORWARD PACK',
    subtitle: 'ATTACK SERIES',
    tierCode: 'FW-14',
    price: 800,
    cardCount: 5,
    oddsTeaser: 'Pace and shooting boosted',
    dark: '#220707',
    primary: '#991b1b',
    secondary: '#f97316',
    light: '#ffe2a6',
    accent: '#ffd166',
    glow: 'rgba(249, 115, 22, 0.5)',
    icon: 'forward',
    material: 'foil',
    pattern: 'speed',
    shine: 'high',
  },
  {
    key: 'elite-pack',
    name: 'ELITE PACK',
    subtitle: 'HIGH TIER SERIES',
    tierCode: 'EL-15',
    price: 2800,
    cardCount: 5,
    oddsTeaser: 'Gold+ guaranteed, Special boosted',
    dark: '#050505',
    primary: '#3f0d0d',
    secondary: '#991b1b',
    light: '#ffe9a6',
    accent: '#f0b72f',
    glow: 'rgba(240, 183, 47, 0.6)',
    icon: 'crown',
    material: 'enamel',
    pattern: 'elite',
    shine: 'high',
  },
  {
    key: 'ultimate-pack',
    name: 'ULTIMATE PACK',
    subtitle: 'LEGENDARY SERIES',
    tierCode: 'UT-16',
    price: 7500,
    cardCount: 10,
    oddsTeaser: 'Highest tier prestige odds',
    dark: '#030303',
    primary: '#21103a',
    secondary: '#5b21b6',
    light: '#f8fafc',
    accent: '#facc15',
    glow: 'rgba(250, 204, 21, 0.75)',
    icon: 'ultimate',
    material: 'premium-foil',
    pattern: 'ultimate',
    shine: 'legendary',
  },
] satisfies PackTheme[]

export type PackKey = (typeof PACK_THEMES)[number]['key']
