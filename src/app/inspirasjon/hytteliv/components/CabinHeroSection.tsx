// Path: src/app/inspirasjon/hytteliv/CabinHeroSection.tsx
import { Mountain } from 'lucide-react'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { cabinHeroFeatures } from '../utils/cabinHeroFeatures'

const CabinHeroBackground = (
  <>
    {/* Subtil glød i bakgrunnen som skaper "kos"-stemningen */}
    <div className='absolute inset-0 -z-10 opacity-30' aria-hidden='true'>
      <div
        className='animate-pulse-glow absolute left-1/3 top-1/4 size-150 blur-3xl'
        style={{
          // Varm Iced Apricot-glød (simulerer peisild/soloppgang)
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--color-iced-apricot) 25%, transparent) 0%, transparent 70%)',
          animationDuration: '9s'
        }}
      />
      <div
        className='animate-pulse-glow absolute right-1/3 bottom-1/4 size-150 blur-3xl'
        style={{
          // Kaldere Very Peri-glød (simulerer skumring/snø)
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--color-very-peri) 20%, transparent) 0%, transparent 70%)',
          animationDuration: '11s',
          animationDelay: '3s'
        }}
      />
    </div>

    {/* Ton-i-ton gradient som sikrer ekstremt god lesbarhet på teksten */}
    <div
      className='absolute inset-0 bg-linear-to-b from-maritime-darkest/80 via-maritime-darkest/90 to-maritime-darkest'
      aria-hidden='true'
    />
  </>
)

export function CabinHeroSection() {
  return (
    <InspirationHero
      labelledById='hytteliv-hero-title'
      minHeight='content'
      surfaceClassName='bg-maritime-darkest text-cloud-dancer'
      containerClassName='pt-16 pb-14 sm:pt-20 sm:pb-16'
      background={CabinHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Hytteliv'
          color='var(--color-very-peri)'
          textColor='var(--color-cloud-dancer)'
          icon={Mountain}
        />
      }
      title={<span className='text-cloud-dancer'>Hyttelivet med Utekos</span>}
      lead='Fra morgenkaffen på terrassen til kveldene under stjernene. Gjør hytten til et varmt fristed, uansett årstid.'
      features={cabinHeroFeatures}
      featuresHeading='Høydepunkter for hytteliv med Utekos'
      featuresHeadingId='hytteliv-hero-highlights-title'
    />
  )
}
