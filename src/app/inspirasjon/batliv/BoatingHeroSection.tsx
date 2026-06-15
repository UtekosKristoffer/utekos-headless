import { Anchor } from 'lucide-react'
import { InspirationHeroActions } from '../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../layout/hero/InspirationHero'
import { HeroHighlight } from '../layout/hero/HeroHighlight'
import { boatingHeroFeatures } from './boatingHeroFeatures'

const BoatingHeroBackground = (
  <>
    <div
      className='pointer-events-none absolute -right-24 top-1/3 -z-10 size-115 rounded-full opacity-25 blur-3xl'
      aria-hidden='true'
      style={{
        background:
          'radial-gradient(circle, color-mix(in oklch, var(--very-peri) 55%, transparent) 0%, transparent 70%)'
      }}
    />
    <div
      className='pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-transparent to-background/55'
      aria-hidden='true'
    />
  </>
)

export function BoatingHeroSection() {
  return (
    <InspirationHero
      labelledById='batliv-hero-title'
      surfaceClassName='bg-background'
      background={BoatingHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Båtliv'
          color='var(--very-peri)'
          textColor='var(--cloud-dancer)'
          icon={Anchor}
        />
      }
      title={
        <>
          Båtliv uten <HeroHighlight color='var(--dusted-peri-light)'>å fryse</HeroHighlight>
        </>
      }
      titleClassName='max-w-3xl'
      lead='Fra den første kaffen i soloppgang til ankerdrammen under stjernene. Opplev en lengre og mer komfortabel båtsesong med varme som varer.'
      actions={
        <InspirationHeroActions
          primaryLabel='Se produkter for båtfolket'
          secondaryLabel='Utforsk mulighetene'
          primaryStyle={{
            backgroundColor: 'var(--primary)',
            textColor: 'var(--background)',
            className:
              'border-primary/35 shadow-[0_18px_38px_-28px_color-mix(in_oklch,var(--demitasse)_72%,transparent)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          }}
          secondaryStyle={{
            backgroundColor: 'var(--blueberry)',
            textColor: 'var(--foreground)',
            className:
              'border-cloud-dancer/35 shadow-[0_18px_38px_-30px_color-mix(in_oklch,var(--background)_48%,transparent)] hover:bg-cloud-dancer/90 focus-visible:ring-2 focus-visible:ring-cloud-dancer/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          }}
        />
      }
      features={boatingHeroFeatures}
      featuresHeading='Høydepunkter for båtliv med Utekos'
      featuresHeadingId='batliv-hero-highlights-title'
    />
  )
}
