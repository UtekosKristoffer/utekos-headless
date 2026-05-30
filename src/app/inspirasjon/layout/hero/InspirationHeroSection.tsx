import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/className'
import type { InspirationHeroAlign } from './types'

interface InspirationHeroSectionProps {
  children: ReactNode
  /** Id-en til hero-tittelen (`<h1>`), brukes som `aria-labelledby`. */
  labelledBy: string
  /** Semantisk rot-element. Default `section`. */
  as?: 'section' | 'article'
  /** Horisontal justering av innholdet. Default `left`. */
  align?: InspirationHeroAlign
  /** Minstehøyde. `standard` = 70vh, `tall` = 85vh. Default `standard`. */
  minHeight?: 'standard' | 'tall'
  /** Bakgrunns-/flate-klasser for seksjonen (eks. `bg-havdyp`). */
  surfaceClassName?: string
  /** Bespoke dekorlag (glød, gradienter, bilde) som ligger bak innholdet. */
  background?: ReactNode
  /** Ekstra klasser på den ytre seksjonen. */
  className?: string
  /** Ekstra klasser på container-en (padding/bredde). */
  containerClassName?: string
  /** Maksbredde-klasse på innholdskolonnen. Default `max-w-5xl`. */
  maxWidthClassName?: string
}

/**
 * Seksjons-skall for alle inspirasjons-heroer.
 *
 * Ansvar: ytre `<section>`/`<article>`, minstehøyde, sentrering, dekorlag-slot
 * og standard container (`container mx-auto px-4 py-16`) med en innholdskolonne.
 * Ren Server Component – ingen klient-kode.
 */
export function InspirationHeroSection({
  children,
  labelledBy,
  as: Tag = 'section',
  align = 'left',
  minHeight = 'standard',
  surfaceClassName,
  background,
  className,
  containerClassName,
  maxWidthClassName = 'max-w-5xl'
}: InspirationHeroSectionProps) {
  return (
    <Tag
      aria-labelledby={labelledBy}
      className={cn(
        'relative isolate flex overflow-hidden',
        minHeight === 'tall' ? 'min-h-[85vh]' : 'min-h-[70vh]',
        align === 'center' ? 'flex-col justify-center' : 'items-center',
        surfaceClassName,
        className
      )}
    >
      {background}

      <div
        className={cn(
          'container relative z-10 mx-auto px-4 py-16',
          containerClassName
        )}
      >
        <div className={cn(maxWidthClassName, align === 'center' && 'mx-auto text-center')}>
          {children}
        </div>
      </div>
    </Tag>
  )
}
