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
  backgroundColor = '#E5F596',
  textColor = '#0F0A1A',
  className = '',
  children,
  ...rest
}: BrandBadgeProps) {
  const Component = asChild ? Slot : 'span'
  const badgeStyle = {
    '--brand-badge-bg': backgroundColor,
    '--brand-badge-text': textColor
  } as CSSProperties

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[var(--brand-badge-bg)] px-8 py-4 text-[var(--brand-badge-text)] text-lg font-medium whitespace-nowrap tracking-wide',
        className
      )}
      style={badgeStyle}
      {...rest}
    >
      {children ?? label}
    </Component>
  )
}
