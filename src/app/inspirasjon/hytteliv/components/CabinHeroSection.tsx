import { Mountain } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import { cabinHeroFeatures } from '../utils/cabinHeroFeatures'

const CabinHeroBackground = (
  <>
    <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
      <div
        className='animate-pulse-glow absolute left-1/3 top-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 72%, transparent) 0%, transparent 70%)',
          animationDuration: '9s'
        }}
      />
      <div
        className='animate-pulse-glow absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 68%, transparent) 0%, transparent 70%)',
          animationDuration: '11s',
          animationDelay: '3s'
        }}
      />
    </div>

    <div
      className='absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-havdyp/20'
      aria-hidden='true'
    />
  </>
)

export function CabinHeroSection() {
  return (
    <InspirationHero
      labelledById='hytteliv-hero-title'
      surfaceClassName='bg-havdyp'
      background={CabinHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Hytteliv'
          color='var(--ancient-water)'
          textColor='var(--background)'
          icon={Mountain}
        />
      }
      title={
        <>
          Hyttekos, <HeroHighlight color='var(--ancient-water)'>perfeksjonert</HeroHighlight>
        </>
      }
      lead='Fra morgenkaffen på terrassen til kveldene under stjernene. Gjør hytten til et varmt fristed, uansett årstid.'
      actions={<InspirationHeroActions primaryLabel='Finn din Utekos' secondaryLabel='Se bruksområdene' />}
      features={cabinHeroFeatures}
      featuresHeading='Høydepunkter for hytteliv med Utekos'
      featuresHeadingId='hytteliv-hero-highlights-title'
    />
  )
}
