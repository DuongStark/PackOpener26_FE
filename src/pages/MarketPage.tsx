import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, UIEvent } from 'react'
import {
  ArrowLeft,
  CircleDollarSign,
  Gem,
  PackagePlus,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import heroImage from '../assets/hero.png'
import { readPersistedAuthSession } from '../services/authApi'
import { buyPack, fetchMarketPacks, type ApiMarketPack } from '../services/marketApi'
import {
  Avatar,
  HotBadge,
  LabelText,
  PACK_THEMES,
  PackArtwork,
  PackPurchaseChoice,
  PriceText,
} from '../components'
import type { PackTheme } from '../components/molecules/packThemes'
import './styles/market-page.css'

type StoredAuthSession = {
  user?: {
    username?: string
    balance?: number
  }
}

type PurchaseMode = 'open-now' | 'send-inventory'
type MarketPack = PackTheme & {
  apiId?: string
}

function readAuthSession(): StoredAuthSession | null {
  return readPersistedAuthSession()
}

function formatCoin(value: number) {
  return value.toLocaleString('vi-VN')
}

function marketBadge(index: number) {
  if (index === 0) return 'Free'
  if (index === 7) return 'Best Value'
  if (index >= PACK_THEMES.length - 3) return 'Limited'
  if (index % 4 === 0) return 'Hot'
  return 'Store'
}

function normalize(value?: string) {
  return value?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? ''
}

function themeForApiPack(pack: ApiMarketPack, index: number): PackTheme {
  return (
    PACK_THEMES.find((theme) => normalize(theme.name) === normalize(pack.name)) ??
    PACK_THEMES.find((theme) => normalize(pack.name).includes(normalize(theme.name)) || normalize(theme.name).includes(normalize(pack.name))) ??
    PACK_THEMES[index % PACK_THEMES.length]
  )
}

function mapApiPack(pack: ApiMarketPack, index: number): MarketPack {
  const theme = themeForApiPack(pack, index)

  return {
    ...theme,
    apiId: pack.id,
    name: pack.name,
    price: pack.price,
    subtitle: pack.subtitle ?? theme.subtitle,
    cardCount: pack.cardCount ?? theme.cardCount,
    tierCode: pack.tierCode ?? theme.tierCode,
    oddsTeaser: pack.oddsTeaser ?? pack.description ?? theme.oddsTeaser,
  }
}

export default function MarketPage() {
  const [visibleCount, setVisibleCount] = useState(12)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('send-inventory')
  const [isLeaving, setIsLeaving] = useState(false)
  const [receipt, setReceipt] = useState('')
  const [receiptError, setReceiptError] = useState(false)
  const [serverPacks, setServerPacks] = useState<MarketPack[]>([])
  const [serverBalance, setServerBalance] = useState<number | null>(null)
  const [isBuying, setIsBuying] = useState(false)
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = serverBalance ?? session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const packs = useMemo<MarketPack[]>(() => (
    serverPacks.length ? serverPacks : PACK_THEMES
  ), [serverPacks])
  const visiblePacks = packs.slice(0, visibleCount)
  const featuredPack = packs[packs.length - 1]
  const selectedPack = selectedKey ? (packs.find((pack) => pack.key === selectedKey) ?? featuredPack) : featuredPack
  const canBuy = selectedPack.price <= balance

  useEffect(() => {
    let cancelled = false

    fetchMarketPacks().then((data) => {
      if (!cancelled && data.length) {
        setServerPacks(data.map(mapApiPack))
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const handleCatalogScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const remaining = target.scrollHeight - target.scrollTop - target.clientHeight

    if (remaining < 260) {
      setVisibleCount((count) => Math.min(count + 8, packs.length))
    }
  }

  const handleBuy = async () => {
    if (!canBuy) {
      setReceipt(`Không đủ coin để mua ${selectedPack.name}.`)
      setReceiptError(true)
      return
    }

    setIsBuying(true)
    setReceipt('')
    setReceiptError(false)

    try {
      const result = await buyPack(selectedPack.apiId ?? selectedPack.key)
      setServerBalance(result.newBalance)
      const action = purchaseMode === 'open-now' ? 'sẵn sàng mở trong kho' : 'đã gửi vào kho pack'
      setReceipt(`${result.packName} ${action}. Số dư mới: ${result.newBalance.toLocaleString('vi-VN')} coin.`)
      setReceiptError(false)
    } catch (error) {
      setReceipt(error instanceof Error ? error.message : 'Mua pack thất bại.')
      setReceiptError(true)
    } finally {
      setIsBuying(false)
    }
  }

  const handleBack = () => {
    setIsLeaving(true)
    window.setTimeout(() => {
      window.history.pushState({}, '', '/home')
      window.dispatchEvent(new PopStateEvent('popstate'))
    }, 280)
  }

  return (
    <main
      className={`market-root${isLeaving ? ' market-root-leaving' : ''}`}
      style={{ '--market-image': `url(${heroImage})` } as CSSProperties}
    >
      <div className="market-stars" aria-hidden="true" />

      <button className="market-back" type="button" onClick={handleBack}>
        <ArrowLeft size={17} />
        Trở về
      </button>

      <section className="market-shell" aria-label="Market mua pack">
        <header className="market-topbar">
          <div className="market-title">
            <LabelText>Pack Market</LabelText>
            <h1>Mua pack cho {username}</h1>
          </div>

          <div className="market-account">
            <div className="market-coin" aria-label={`${formatCoin(balance)} coin`}>
              <CircleDollarSign size={18} />
              <strong>{formatCoin(balance)}</strong>
            </div>
            <Avatar initials={initials} size={38} />
          </div>
        </header>

        <section className="market-featured">
          <div className="market-featured-copy">
            <HotBadge>Featured Deal</HotBadge>
            <LabelText>Compare Before Buying</LabelText>
            <h2>{featuredPack.name}</h2>
            <p>{featuredPack.subtitle} · {featuredPack.oddsTeaser}</p>
            <div className="market-featured-actions">
              <button type="button" onClick={() => setSelectedKey(featuredPack.key)}>
                <PackagePlus size={18} />
                Mua featured pack
              </button>
              <span>{featuredPack.cardCount} cards · {featuredPack.tierCode} · {featuredPack.shine}</span>
            </div>
          </div>

          <div className="market-featured-pack">
            <PackArtwork theme={featuredPack} />
          </div>

          <div className="market-featured-metrics">
            <div>
              <ShoppingBag size={18} />
              <strong>{featuredPack.cardCount}</strong>
              <span>Cards</span>
            </div>
            <div>
              <Gem size={18} />
              <strong>{featuredPack.tierCode}</strong>
              <span>Tier</span>
            </div>
            <div>
              <Sparkles size={18} />
              <strong>{featuredPack.price.toLocaleString('en-US')}</strong>
              <span>Coins</span>
            </div>
          </div>
        </section>

        <section className="market-catalog">
          <div className="market-toolbar">
            <div className="market-search">
              <Search size={17} />
              <span>Tìm pack, tier hoặc giá</span>
            </div>
            <div className="market-filter-group" aria-label="Bộ lọc market">
              <button type="button" className="active">Tất cả</button>
              <button type="button">Value</button>
              <button type="button">Limited</button>
              <button type="button">Free</button>
            </div>
          </div>

          <div className="market-catalog-list" onScroll={handleCatalogScroll}>
            {visiblePacks.map((pack, index) => {
              const selected = pack.key === selectedKey

              return (
                <article
                  className={`market-pack-card${selected ? ' market-pack-card-selected' : ''}`}
                  key={`${pack.apiId ?? pack.key}-${index}`}
                >
                  <button type="button" onClick={() => setSelectedKey(pack.key)} aria-label={`Chọn ${pack.name}`}>
                    <PackArtwork theme={pack} compact />
                    <span className="market-pack-card-badge">
                      <HotBadge>{marketBadge(index)}</HotBadge>
                      <PriceText>{pack.price.toLocaleString('en-US')}</PriceText>
                    </span>
                    <span className="market-pack-card-copy">
                      <span className="market-pack-card-title">
                        <strong>{pack.name}</strong>
                        <span>{pack.subtitle}</span>
                      </span>
                      <span className="market-pack-card-teaser">{pack.oddsTeaser}</span>
                    </span>
                    <span className="market-pack-card-meta">
                      <span>{pack.cardCount} cards</span>
                      <span>{pack.tierCode}</span>
                    </span>
                  </button>
                </article>
              )
            })}

            {visibleCount < packs.length ? (
              <div className="market-loader" aria-live="polite">
                Đang nạp thêm pack market...
              </div>
            ) : (
              <div className="market-loader" aria-live="polite">
                Đã hiển thị toàn bộ catalog.
              </div>
            )}
          </div>
        </section>
      </section>

      {selectedKey ? (
        <section className="market-purchase-overlay" aria-label="Chi tiết mua pack" role="dialog" aria-modal="true">
          <button className="market-purchase-backdrop" type="button" onClick={() => setSelectedKey(null)} aria-label="Đóng chi tiết mua pack" />

          <div className="market-purchase-drawer">
            <button className="market-drawer-close" type="button" onClick={() => setSelectedKey(null)} aria-label="Đóng chi tiết mua pack">
              <X size={18} />
            </button>

            <div className="market-detail">
              <div className="market-detail-copy">
                <LabelText>Selected Pack</LabelText>
                <h2>{selectedPack.name}</h2>
                <p>{selectedPack.subtitle} · {selectedPack.oddsTeaser}</p>
              </div>

              <div className="market-spotlight-pack">
                <PackArtwork theme={selectedPack} />
              </div>

              <div className="market-pack-metrics">
                <div>
                  <ShoppingBag size={18} />
                  <strong>{selectedPack.cardCount}</strong>
                  <span>Cards</span>
                </div>
                <div>
                  <Gem size={18} />
                  <strong>{selectedPack.tierCode}</strong>
                  <span>Tier</span>
                </div>
                <div>
                  <Sparkles size={18} />
                  <strong>{selectedPack.shine}</strong>
                  <span>Shine</span>
                </div>
              </div>
            </div>

            <div className="market-purchase-panel">
              <div className="market-purchase-head">
                <LabelText>Purchase Flow</LabelText>
                <PriceText>{selectedPack.price.toLocaleString('en-US')}</PriceText>
              </div>

              <PackPurchaseChoice value={purchaseMode} onChange={setPurchaseMode} />

              <button className="market-buy-button" type="button" onClick={handleBuy} disabled={isBuying}>
                <PackagePlus size={18} />
                {isBuying ? 'Đang mua...' : canBuy ? 'Mua pack' : 'Thiếu coin'}
              </button>

              {receipt ? (
                <div className={`market-receipt${receiptError ? ' market-receipt-error' : ''}`} aria-live="polite">
                  <ReceiptText size={18} />
                  <span>{receipt}</span>
                </div>
              ) : (
                <div className="market-receipt market-receipt-idle">
                  <ShieldCheck size={18} />
                  <span>Mua xong có thể mở ngay hoặc gửi vào kho pack.</span>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
