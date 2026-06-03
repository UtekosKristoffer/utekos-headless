import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils/className'

interface HeroHighlightProps {
  children: ReactNode
  /** Solid fremhevingsfarge (CSS `color`). Ignoreres når `gradient` er satt. */
  color?: string
  /**
   * Gradient for clip-text-effekt (CSS `background` på en
   * `bg-clip-text text-transparent`-span). Eks:
   * `'linear-gradient(90deg, var(--dusted-peri), var(--sweet-lavender))'`.
   */
  gradient?: string
  /** `block` gir linjeskift på små skjermer (eks. isbading). */
  display?: 'inline' | 'block'
  className?: string
}

/**
 * Inline fremhevings-`<span>` for bruk inne i en hero-`<h1>`.
 *
 * Tre moduser, alle dekket av dagens hero-sider:
 * - Solid farge: `<HeroHighlight color="var(--bleached-mauve)">…</HeroHighlight>`
 * - Gradient clip-text: `<HeroHighlight gradient="linear-gradient(…)">…</HeroHighlight>`
 * - Block (linjeskift): `<HeroHighlight color="…" display="block">…</HeroHighlight>`
 */
export function HeroHighlight({
  children,
  color,
  gradient,
  display = 'inline',
  className
}: HeroHighlightProps) {
  const style: CSSProperties =
    gradient ?
      { backgroundImage: gradient }
    : color ? { color }
    : {}

  return (
    <span
      className={cn(
        display === 'block' ? 'block md:inline' : 'inline',
        gradient && 'bg-clip-text text-transparent',
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
