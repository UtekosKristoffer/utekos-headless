import type { ReactNode } from 'react'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'
import { InspirationHeroSection } from './InspirationHeroSection'
import { InspirationHeroHeading } from './InspirationHeroHeading'
import { InspirationHeroFeatureGrid } from './InspirationHeroFeatureGrid'
import type { InspirationHeroAlign, InspirationHeroFeature } from './types'

interface InspirationHeroProps {
  /** Id på `<h1>`. Brukes som `aria-labelledby` på seksjonen. */
  labelledById: string
  /** Tittel-innhold (bruk `<HeroHighlight>` for fremheving). */
  title: ReactNode
  /** Lead-tekst under tittelen. */
  lead: ReactNode
  /** Høydepunkt-kort. */
  features: readonly InspirationHeroFeature[]
  /** sr-only `<h2>`-tekst for høydepunkt-lista. */
  featuresHeading: string
  /** Id på sr-only `<h2>`. */
  featuresHeadingId: string

  /** Breadcrumb-node (typisk `<InspirationHeroBreadcrumb />`). */
  breadcrumb?: ReactNode
  /** Handlingsknapper (typisk `<InspirationHeroActions />` eller egendefinert). */
  actions?: ReactNode

  /** Semantisk rot-element. Default `section`. */
  as?: 'section' | 'article'
  /** Justering. Default `left`. */
  align?: InspirationHeroAlign
  /** Minstehøyde. Default `standard` (70vh). */
  minHeight?: 'standard' | 'tall'
  /** Bakgrunns-/flate-klasser (eks. `bg-havdyp`). */
  surfaceClassName?: string
  /** Bespoke dekorlag bak innholdet. */
  background?: ReactNode
  /** Ekstra klasser på container-en (eks. `sm:py-24`). */
  containerClassName?: string

  /** Basisfarge på tittelen. */
  titleColor?: string
  /** Ekstra klasser på `<h1>`. */
  titleClassName?: string
  /** Ekstra klasser på lead-`<p>`. */
  leadClassName?: string
}

/**
 * Batteri-inkludert composer for inspirasjons-heroer.
 *
 * Orkestrerer den kanoniske `AnimatedBlock`-koreografien
 * (breadcrumb 0.1s, heading 0.2s, actions 0.4s, features 0.5s) rundt de
 * granulære primitivene. Hver logiske blokk får én IntersectionObserver.
 *
 * For maks kontroll kan du i stedet komponere primitivene direkte
 * (`InspirationHeroSection` + `InspirationHeroHeading` + `InspirationHeroFeatureGrid`).
 *
 * @example
 * <InspirationHero
 *   labelledById='bobil-hero-title'
 *   surfaceClassName='bg-havdyp text-cloud-dancer'
 *   background={<BobilHeroBackground />}
 *   breadcrumb={<InspirationHeroBreadcrumb label='Bobil og camping' color='var(--bleached-mauve)' textColor='var(--maritime-darkest)' icon={MapPin} />}
 *   title={<>Bobilliv uten <HeroHighlight color='var(--bleached-mauve)'>kompromisser</HeroHighlight></>}
 *   lead='Fra den første morgenkaffen …'
 *   actions={<InspirationHeroActions primaryLabel='Se produktene' secondaryLabel='Utforsk mulighetene' />}
 *   features={bobilHeroFeatures}
 *   featuresHeading='Høydepunkter for bobil og camping med Utekos'
 *   featuresHeadingId='bobil-hero-highlights-title'
 * />
 */
export function InspirationHero({
  labelledById,
  title,
  lead,
  features,
  featuresHeading,
  featuresHeadingId,
  breadcrumb,
  actions,
  as,
  align = 'left',
  minHeight,
  surfaceClassName,
  background,
  containerClassName,
  titleColor,
  titleClassName,
  leadClassName
}: InspirationHeroProps) {
  const centered = align === 'center'

  return (
    <InspirationHeroSection
      labelledBy={labelledById}
      align={align}
      {...(as !== undefined ? { as } : {})}
      {...(minHeight !== undefined ? { minHeight } : {})}
      {...(surfaceClassName !== undefined ? { surfaceClassName } : {})}
      {...(background !== undefined ? { background } : {})}
      {...(containerClassName !== undefined ? { containerClassName } : {})}
    >
      <header>
        {breadcrumb ?
          <AnimatedBlock
            className={cn('will-animate-fade-in-up', centered && 'flex justify-center')}
            delay='0.1s'
          >
            {breadcrumb}
          </AnimatedBlock>
        : null}

        <AnimatedBlock className='will-animate-fade-in-up' delay='0.2s'>
          <InspirationHeroHeading
            id={labelledById}
            title={title}
            lead={lead}
            align={align}
            {...(titleColor !== undefined ? { titleColor } : {})}
            {...(titleClassName !== undefined ? { titleClassName } : {})}
            {...(leadClassName !== undefined ? { leadClassName } : {})}
          />
        </AnimatedBlock>

        {actions ?
          <AnimatedBlock
            className={cn('will-animate-fade-in-up mt-8 flex flex-wrap gap-4', centered && 'justify-center')}
            delay='0.4s'
          >
            {actions}
          </AnimatedBlock>
        : null}
      </header>

      <AnimatedBlock className='will-animate-fade-in-up mt-12' delay='0.5s'>
        <InspirationHeroFeatureGrid
          features={features}
          heading={featuresHeading}
          headingId={featuresHeadingId}
          align={align}
        />
      </AnimatedBlock>
    </InspirationHeroSection>
  )
}
