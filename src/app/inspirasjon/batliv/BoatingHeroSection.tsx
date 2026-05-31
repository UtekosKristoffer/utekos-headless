import { Anchor, Sun, Waves } from 'lucide-react'
import { InspirationHeroActions } from '../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../layout/hero/InspirationHero'
import { HeroHighlight } from '../layout/hero/HeroHighlight'
import type { InspirationHeroFeature } from '../layout/hero/types'

const ICON_SURFACE = 'color-mix(in oklch, var(--cloud-dancer) 38%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--background) 12%, transparent)'
const CARD_SHADOW = '0 24px 48px -38px rgba(9, 15, 22, 0.42)'
const DESCRIPTION_COLOR = 'color-mix(in oklch, var(--background) 78%, transparent)'

const boatingHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Soloppgang',
    description: 'Nyt morgenkaffeen i cockpiten',
    icon: Sun,
    iconColor: 'var(--primary)',
    border: 'transparent',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--cloud-dancer) 10%, var(--dazzle-blue)) 10%, color-mix(in oklch, var(--cloud-dancer) 42%, rgba(20, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--primary) 78%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'Hele kvelden',
    description: 'Forleng tiden på dekk etter solnedgang',
    icon: Waves,
    iconColor: 'color-mix(in oklch, var(--background) 72%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 40%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 74%, rgba(255, 255, 255, 0.26)) 0%, color-mix(in oklch, var(--ancient-water) 42%, rgba(16, 24, 30, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--ancient-water) 78%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'Lengre sesong',
    description: 'Nyt båten fra tidlig vår til sen høst',
    icon: Anchor,
    iconColor: 'color-mix(in oklch, var(--background) 74%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 46%, rgba(18, 24, 29, 0.14)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  }
] as const

const BoatingHeroBackground = (
  <>
    <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
      <div
        className='boat-hero-glow-1 absolute left-1/3 top-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)'
        }}
      />
      <div
        className='boat-hero-glow-2 absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--overcast) 72%, transparent) 0%, transparent 70%)'
        }}
      />
    </div>

    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' aria-hidden='true' />
  </>
)

export function BoatingHeroSection() {
  return (
    <InspirationHero
      labelledById='batliv-hero-title'
      surfaceClassName='bg-havdyp'
      background={BoatingHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Båtliv'
          color='var(--dusted-peri)'
          textColor='var(--background)'
          icon={Anchor}
        />
      }
      title={
        <>
          Båtliv uten{' '}
          <HeroHighlight gradient='linear-gradient(90deg,var(--dusted-peri),var(--sweet-lavender),var(--dusted-peri))'>
            å fryse
          </HeroHighlight>
        </>
      }
      titleClassName='max-w-3xl'
      lead='Fra den første kaffen i soloppgang til ankerdrammen under stjernene. Opplev en lengre og mer komfortabel båtsesong med varme som varer.'
      actions={
        <InspirationHeroActions
          primaryLabel='Se produkter for båtfolket'
          secondaryLabel='Utforsk mulighetene'
        />
      }
      features={boatingHeroFeatures}
      featuresHeading='Høydepunkter for båtliv med Utekos'
      featuresHeadingId='batliv-hero-highlights-title'
    />
  )
}
