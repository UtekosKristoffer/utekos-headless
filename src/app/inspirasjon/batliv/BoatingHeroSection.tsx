import { Anchor, Sun, Waves } from 'lucide-react'
import { InspirationHeroActions } from '../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../layout/hero/InspirationHero'
import { HeroHighlight } from '../layout/hero/HeroHighlight'
import type { InspirationHeroFeature } from '../layout/hero/types'

// Felles korttreatment: rolige, solide flater som harmonerer med
// header-secondary og resten av seksjonen (havdyp + dusted-peri-aksenten).
// Ingen gradienter, glød eller skinn – kun trygge, autoritære farger.
const CARD_SHADOW = '0 24px 48px -38px rgba(9, 15, 22, 0.42)'
const CARD_BORDER = 'color-mix(in oklch, var(--cloud-dancer) 12%, transparent)'
const ICON_SURFACE = 'color-mix(in oklch, var(--cloud-dancer) 14%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--cloud-dancer) 22%, transparent)'

const boatingHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Soloppgang',
    description: 'Nyt morgenkaffeen i cockpiten',
    icon: Sun,
    iconColor: 'var(--foreground)',
    surface: 'var(--header-secondary)',
    border: CARD_BORDER,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW
  },
  {
    title: 'Hele kvelden',
    description: 'Forleng tiden på dekk etter solnedgang',
    icon: Waves,
    iconColor: 'var(--foreground)',
    surface: 'var(--havdyp-hover)',
    border: CARD_BORDER,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW
  },
  {
    title: 'Lengre sesong',
    description: 'Nyt båten fra tidlig vår til sen høst',
    icon: Anchor,
    iconColor: 'var(--foreground)',
    surface: 'color-mix(in oklch, var(--dusted-peri) 36%, var(--havdyp) 64%)',
    border: CARD_BORDER,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW
  }
] as const

const BoatingHeroBackground = (
  <>
    {/* Én rolig, kjølig glød ute til høyre – vekk fra den venstrestilte teksten,
        så kontrasten holder seg høy (WCAG). Ingen varme/gule toner. */}
    <div
      className='pointer-events-none absolute -right-24 top-1/3 -z-10 size-[460px] rounded-full opacity-25 blur-3xl'
      aria-hidden='true'
      style={{
        background:
          'radial-gradient(circle, color-mix(in oklch, var(--dusted-peri) 55%, transparent) 0%, transparent 70%)'
      }}
    />
    {/* Jevn nedtoning mot bunnen for en samlet, dyp og rolig flate. */}
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
          Båtliv uten <HeroHighlight color='var(--dusted-peri-light)'>å fryse</HeroHighlight>
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
