import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils/className'
import type { InspirationHeroAlign } from './types'

interface InspirationHeroHeadingProps {
  /** Id på `<h1>` (matcher `labelledBy` på seksjonen). */
  id: string
  /**
   * Tittel-innhold. Send gjerne `<HeroHighlight>` inni for fremheving, eks:
   * `Bobilliv uten <HeroHighlight color="var(--bleached-mauve)">kompromisser</HeroHighlight>`.
   */
  title: ReactNode
  /** Lead-tekst under tittelen. */
  lead: ReactNode
  /** Justering. Sentrert variant sentrerer tekst og setter `mx-auto`. */
  align?: InspirationHeroAlign
  /** Basisfarge på tittelen (CSS `color`). Default brand `text-foreground`. */
  titleColor?: string
  /** Farge på lead-teksten (CSS `color`). Default brand `text-foreground`. */
  leadColor?: string
  /** Ekstra klasser på `<h1>` (eks. `max-w-4xl`, `drop-shadow-sm`). */
  titleClassName?: string
  /** Ekstra klasser på lead-`<p>`. */
  leadClassName?: string
}

/**
 * Hero-overskrift: `<hgroup>` med `<h1 class="text-title">` og en lead-`<p>`
 * (`utekos-section-lead`). Ren Server Component.
 */
export function InspirationHeroHeading({
  id,
  title,
  lead,
  align = 'left',
  titleColor,
  leadColor,
  titleClassName,
  leadClassName
}: InspirationHeroHeadingProps) {
  const titleStyle: CSSProperties | undefined = titleColor ? { color: titleColor } : undefined
  const leadStyle: CSSProperties | undefined = leadColor ? { color: leadColor } : undefined

  return (
    <hgroup>
      <h1
        id={id}
        className={cn(
          'text-title text-foreground max-md:text-balance md:text-nowrap',
          align === 'center' ? 'mx-auto text-center' : 'mx-0 text-left',
          titleClassName
        )}
        style={titleStyle}
      >
        {title}
      </h1>

      <p
        className={cn(
          'mt-10 max-w-2xl utekos-section-lead text-foreground sm:mt-12',
          align === 'center' ? 'mx-auto text-center' : 'text-left',
          leadClassName
        )}
        style={leadStyle}
      >
        {lead}
      </p>
    </hgroup>
  )
}
