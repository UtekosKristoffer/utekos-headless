import { cn } from '@/lib/utils/className'
import { InspirationHeroFeatureCard } from './InspirationHeroFeatureCard'
import type { InspirationHeroAlign, InspirationHeroFeature } from './types'

interface InspirationHeroFeatureGridProps {
  /** Kort-data. Typisk 3 elementer (grid-cols-3 på sm+). */
  features: readonly InspirationHeroFeature[]
  /** Tekst for den skjermleser-only `<h2>`-en som lista peker på. */
  heading: string
  /** Id på `<h2>`, brukes som `aria-labelledby` på `<ul>`. */
  headingId: string
  /** Justerer tekst i kortene (sentrert hero -> behold venstrejustert tekst). */
  align?: InspirationHeroAlign
  /** Overstyr kolonne-oppsett. Default `grid-cols-1 sm:grid-cols-3`. */
  columnsClassName?: string
  /** Ekstra klasser på wrapper-`<ul>`. */
  className?: string
}

/**
 * Tilgjengelig 3-kolonners grid av høydepunkt-kort.
 *
 * Rendrer en sr-only `<h2>` og en `<ul aria-labelledby>` slik at høydepunktene
 * er semantisk en liste knyttet til en overskrift (godt for SEO/GEO og
 * skjermlesere). Ren Server Component.
 */
export function InspirationHeroFeatureGrid({
  features,
  heading,
  headingId,
  align = 'left',
  columnsClassName = 'grid-cols-1 sm:grid-cols-3',
  className
}: InspirationHeroFeatureGridProps) {
  return (
    <>
      <h2 id={headingId} className='sr-only'>
        {heading}
      </h2>

      <ul
        aria-labelledby={headingId}
        className={cn(
          'grid w-full gap-5',
          columnsClassName,
          align === 'center' && 'text-left',
          className
        )}
      >
        {features.map(feature => (
          <InspirationHeroFeatureCard key={feature.title} feature={feature} />
        ))}
      </ul>
    </>
  )
}
