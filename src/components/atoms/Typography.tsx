import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import './styles/typography.css'

type TypographyProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

function cx(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

const Typography = forwardRef<HTMLElement, TypographyProps<ElementType>>(function Typography({
  as,
  children,
  className,
  ...props
}, ref) {
  const Component = as ?? 'p'

  return (
    <Component className={className} ref={ref} {...props}>
      {children}
    </Component>
  )
})

export function HeadingDisplay<T extends ElementType = 'h1'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'h1'} className={cx('text-heading-display', props.className)} {...props} />
}

export function SectionTitle<T extends ElementType = 'h2'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'h2'} className={cx('text-section-title', props.className)} {...props} />
}

export function BodyText<T extends ElementType = 'p'>(props: TypographyProps<T>) {
  return <Typography as={props.as ?? 'p'} className={cx('text-body', props.className)} {...props} />
}

export function CaptionText<T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'span'} className={cx('text-caption', props.className)} {...props} />
}

export function StatNumber<T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'span'} className={cx('text-stat-number', props.className)} {...props} />
}

export function CoinNumber<T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'span'} className={cx('text-coin-number', props.className)} {...props} />
}

export function PlayerNameText<T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'span'} className={cx('text-player-name', props.className)} {...props} />
}

export function LabelText<T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) {
  return <Typography as={props.as ?? 'span'} className={cx('text-label', props.className)} {...props} />
}
