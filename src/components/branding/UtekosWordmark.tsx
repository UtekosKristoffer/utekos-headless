import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils/className'

export type UtekosWordmarkProps = {
  className?: string
  color?: string
  size?: number | string
  style?: CSSProperties
}

export function UtekosWordmark({
  className,
  color,
  size,
  style
}: UtekosWordmarkProps) {
  return (
    <span
      className={cn('wordmark', className)}
      style={
        {
          ...(style as CSSProperties),
          '--utekos-wordmark-color': color,
          '--utekos-wordmark-size':
            typeof size === 'number' ? `${size}px` : size
        } as CSSProperties
      }
    >
      Utekos
    </span>
  )
}
