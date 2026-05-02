import { useMemo, useState } from 'react'
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
} from 'lucide-react'
import heroImage from '../assets/hero.png'
import {
  Avatar,
  HotBadge,
  LabelText,
  PACK_THEMES,
  PackArtwork,
  PackPurchaseChoice,
  PriceText,
} from '../components'
import './styles/market-page.css'

type StoredAuthSession = {
  user?: {
    username?: string
    balance?: number
  }
}

type PurchaseMode = 'open-now' | 'send-inventory'

function readAuthSession(): StoredAuthSession | null {
  const raw = window.localStorage.getItem('packopener.auth') ?? window.sessionStorage.getItem('packopener.auth')

  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredAuthSession
  } catch {
    return null
  }
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

export default function MarketPage() {
  const [visibleCount, setVisibleCount] = useState(12)
  const [selectedKey, setSelectedKey] = useState(PACK_THEMES[PACK_THEMES.length - 1].key)
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('send-inventory')
  const [isLeaving, setIsLeaving] = useState(false)
  const [receipt, setReceipt] = useState('')
  const session = readAuthSession()
  const username = session?.user?.username ?? 'HLV'
  const balance = session?.user?.balance ?? 300
  const initials = username.slice(0, 2).toUpperCase()
  const packs = useMemo(() => PACK_THEMES, [])
  const visiblePacks = packs.slice(0, visibleCount)
  const selectedPack = packs.find((pack) => pack.key === selectedKey) ?? packs[0]
  const canBuy = selectedPack.price <= balance

  const handleCatalogScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const remaining = target.scrollHeight - target.scrollTop - target.clientHeight

    if (remaining < 260) {
      setVisibleCount((count) => Math.min(count + 8, packs.length))
    }
  }

  const handleBuy = () => {
    if (!canBuy) {
      setReceipt(`Không đủ coin để mua ${selectedPack.name}.`)
      return
    }

    const action = purchaseMode === 'open-now' ? 'sẵn sàng mở ngay' : 'đã gửi vào kho pack'
    setReceipt(`${selectedPack.name} ${action}. Số dư mới sẽ được cập nhật khi nối API mua pack.`)
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

        <aside className="market-detail">
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
        </aside>

        <section className="market-purchase-panel">
          <div className="market-purchase-head">
            <LabelText>Purchase Flow</LabelText>
            <PriceText>{selectedPack.price.toLocaleString('en-US')}</PriceText>
          </div>

          <PackPurchaseChoice value={purchaseMode} onChange={setPurchaseMode} />

          <div className="market-odds-panel">
            <div>
              <span>Gold+</span>
              <strong>{selectedPack.price >= 900 ? '68%' : '24%'}</strong>
            </div>
            <div>
              <span>Diamond</span>
              <strong>{selectedPack.price >= 2600 ? '18%' : '4%'}</strong>
            </div>
            <div>
              <span>Duplicate safety</span>
              <strong>{selectedPack.cardCount >= 7 ? 'On' : 'Low'}</strong>
            </div>
          </div>

          <button className="market-buy-button" type="button" onClick={handleBuy}>
            <PackagePlus size={18} />
            {canBuy ? 'Mua pack' : 'Thiếu coin'}
          </button>

          {receipt ? (
            <div className={`market-receipt${canBuy ? '' : ' market-receipt-error'}`} aria-live="polite">
              <ReceiptText size={18} />
              <span>{receipt}</span>
            </div>
          ) : (
            <div className="market-receipt market-receipt-idle">
              <ShieldCheck size={18} />
              <span>Mua xong có thể mở ngay hoặc gửi vào kho pack.</span>
            </div>
          )}
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
              const selected = pack.key === selectedPack.key

              return (
                <article
                  className={`market-pack-card${selected ? ' market-pack-card-selected' : ''}`}
                  key={pack.key}
                >
                  <button type="button" onClick={() => setSelectedKey(pack.key)}>
                    <PackArtwork theme={pack} compact />
                  </button>
                  <div className="market-pack-card-copy">
                    <div className="market-pack-card-title">
                      <div>
                        <h3>{pack.name}</h3>
                        <span>{pack.subtitle}</span>
                      </div>
                      <HotBadge>{marketBadge(index)}</HotBadge>
                    </div>
                    <p>{pack.oddsTeaser}</p>
                    <div className="market-pack-card-meta">
                      <span>{pack.cardCount} cards</span>
                      <span>{pack.tierCode}</span>
                      <PriceText>{pack.price.toLocaleString('en-US')}</PriceText>
                    </div>
                  </div>
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
    </main>
  )
}
