// Path: src/components/BrandComponents/utils/BrandBadge.tsx

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils/className'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface BrandBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string
  asChild?: boolean
  backgroundColor?: string
  textColor?: string
  children?: ReactNode
}

export default function BrandBadge({
  label,
  asChild = false,
  backgroundColor = 'var(--primary-button)',
  textColor = 'var(--maritime-darkest)',
  className = '',
  children,
  style,
  ...rest
}: BrandBadgeProps) {
  const Component = asChild ? Slot : 'span'
  const badgeStyle = {
    ...style,
    '--brand-badge-bg': backgroundColor,
    '--brand-badge-text': textColor
  } as CSSProperties

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[var(--brand-badge-bg)] px-8 py-4 text-[var(--brand-badge-text)] text-lg font-medium leading-[1.35] tracking-[-0.01em] whitespace-nowrap',
        className
      )}
      style={badgeStyle}
      {...rest}
    >
      {children ?? label}
    </Component>
  )
}
