import { Flame } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import { grillHeroFeatures } from '../utils/grillHeroFeatures'

const GrillHeroBackground = (
  <>
    <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
      <div
        className='animate-pulse-glow absolute left-1/3 top-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--soft-warm) 72%, transparent) 0%, transparent 70%)'
        }}
      />
      <div
        className='animate-pulse-glow absolute right-1/3 bottom-1/4 size-[600px] blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--fair-orchid) 70%, transparent) 0%, transparent 70%)',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />
    </div>

    <div className='absolute inset-0 bg-linear-to-b from-transparent to-background/50' aria-hidden='true' />
  </>
)

export function GrillHeroSection() {
  return (
    <InspirationHero
      labelledById='grillkvelden-hero-title'
      surfaceClassName='bg-background'
      background={GrillHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Grillkvelden'
          color='var(--checkout-button)'
          textColor='var(--black-beauty)'
          icon={Flame}
        />
      }
      title={
        <>
          Grillkvelden som{' '}
          <HeroHighlight gradient='linear-gradient(90deg,color-mix(in oklab,var(--cloud-dancer) 58%,var(--barely-blue) 42%),var(--ancient-water),color-mix(in oklab,var(--cloud-dancer) 100%,var(--ancient-water) 60%))'>
            aldri tar slutt
          </HeroHighlight>
        </>
      }
      titleClassName='max-w-4xl'
      lead='Bli verten for de uforglemmelige kveldene, der de gode samtalene og latteren fortsetter lenge etter at den siste pølsen er grillet.'
      actions={
        <InspirationHeroActions
          primaryLabel='Bli klar for kvelden'
          secondaryLabel='Se øyeblikkene'
          primaryStyle={{
            backgroundColor: 'var(--checkout-button)',
            textColor: 'var(--black-beauty)',
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
      features={grillHeroFeatures}
      featuresHeading='Høydepunkter for grillkvelden med Utekos'
      featuresHeadingId='grillkvelden-hero-highlights-title'
    />
  )
}
