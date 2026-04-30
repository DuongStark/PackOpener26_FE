import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { CoinNumber, LabelText } from '../atoms/Typography'
import { CoinIcon } from '../atoms/VisualPrimitives'
import { MetricDelta } from '../atoms/Indicators'
import './styles/economy.css'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function CoinDisplay({
  balance,
  className,
}: {
  balance: number
  className?: string
}) {
  const [displayValue, setDisplayValue] = useState(balance)
  const previousValue = useRef(balance)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'increase' | 'decrease' | 'neutral'>('neutral')

  useEffect(() => {
    const fromVal = previousValue.current
    const toVal = balance

    if (fromVal === toVal) {
      setDisplayValue(toVal)
      return
    }

    const duration = Math.abs(toVal - fromVal) > 1000 ? 1200 : 600
    const start = performance.now()

    setIsAnimating(true)
    setDirection(toVal > fromVal ? 'increase' : 'decrease')

    let frameId = 0

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const current = Math.round(fromVal + (toVal - fromVal) * easeOutExpo(progress))
      setDisplayValue(current)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update)
        return
      }

      previousValue.current = toVal
      setDisplayValue(toVal)
      window.setTimeout(() => {
        setIsAnimating(false)
        setDirection('neutral')
      }, 180)
    }

    frameId = window.requestAnimationFrame(update)

    return () => window.cancelAnimationFrame(frameId)
  }, [balance])

  return (
    <div className={joinClassNames('economy-coin-display', className)}>
      <CoinIcon />
      <span
        className={joinClassNames(
          'economy-coin-balance',
          isAnimating ? 'is-animating' : undefined,
          direction === 'decrease' ? 'is-decrease' : undefined,
        )}
      >
        <CoinNumber>{displayValue.toLocaleString('en-US')}</CoinNumber>
      </span>
    </div>
  )
}

export function RewardPill({
  badge,
  supportingText,
  className,
}: {
  badge: ReactNode
  supportingText: string
  className?: string
}) {
  return (
    <div className={joinClassNames('economy-reward-pill', className)}>
      {badge}
      <div className="economy-reward-copy">
        <LabelText>Reward Unlocked</LabelText>
        <span className="economy-reward-support">{supportingText}</span>
      </div>
    </div>
  )
}

export function BalanceChangeToast({
  amount,
  message,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { amount: number; message: string }) {
  const tone = amount > 0 ? 'positive' : amount < 0 ? 'negative' : 'neutral'
  const formatted = `${amount > 0 ? '+' : amount < 0 ? '-' : ''}${Math.abs(amount).toLocaleString('en-US')} Coins`

  return (
    <div
      className={joinClassNames(
        'economy-balance-toast',
        `economy-balance-toast-${tone}`,
        className,
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <CoinIcon />
      <div className="economy-balance-toast-copy">
        <MetricDelta tone={tone} value={formatted} />
        <span className="economy-balance-toast-message">{message}</span>
      </div>
    </div>
  )
}
