import { Sparkles } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import type { InspirationHeroFeature } from '../../layout/hero/types'
import { terraceHeroFeatures } from '../utils/terraceHeroFeatures'

const terraceHeroFeatureCards: readonly InspirationHeroFeature[] = terraceHeroFeatures.map(feature => ({
  ...feature,
  cardClassName: 'border-brandied-apricot bg-brandied-apricot',
  iconClassName: 'border-background/16 bg-cloud-dancer text-background',
  titleClassName: 'text-background',
  descriptionClassName: 'text-background'
}))

const TerraceHeroBackground = (
  <>
    <div className='pointer-events-none absolute inset-0 -z-10 opacity-24' aria-hidden='true'>
      <div
        className='absolute left-[8%] top-[12%] size-152 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 68%)'
        }}
      />
      <div className='absolute bottom-[8%] right-[6%] size-136 rounded-full bg-peach-fuzz blur-3xl' />
    </div>

    <div className='absolute inset-0 -z-10 bg-marsala' aria-hidden='true' />
  </>
)

export function TerraceHeroSection() {
  return (
    <InspirationHero
      labelledById='terrassen-hero-title'
      surfaceClassName='bg-marsala'
      background={TerraceHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Terrassen'
          color='var(--brandied-apricot)'
          textColor='var(--background)'
          icon={Sparkles}
        />
      }
      title={
        <>
          Din terrasse, <HeroHighlight color='var(--foreground)'>hele året</HeroHighlight>
        </>
      }
      titleClassName='max-w-3xl'
      lead='Gjør uteplassen til husets beste rom. Fra den første kaffen i vårsolen til de sene sommerkveldene, nyt øyeblikkene lenger.'
      actions={
        <InspirationHeroActions
          primaryLabel='Oppdag din Utekos'
          secondaryLabel='Se bruksområdene'
          primaryStyle={{
            backgroundColor: 'var(--peach-fuzz)',
            textColor: 'var(--background)',
            className:
              'border-peach-fuzz/70 shadow-[0_18px_38px_-28px_color-mix(in_oklch,var(--background)_58%,transparent)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-peach-fuzz/70 focus-visible:ring-offset-2 focus-visible:ring-offset-marsala'
          }}
          secondaryStyle={{
            backgroundColor: 'var(--cloud-dancer)',
            textColor: 'var(--background)',
            className:
              'border-cloud-dancer/45 shadow-[0_18px_38px_-30px_color-mix(in_oklch,var(--background)_46%,transparent)] hover:bg-brandied-apricot hover:text-background focus-visible:ring-2 focus-visible:ring-brandied-apricot/70 focus-visible:ring-offset-2 focus-visible:ring-offset-marsala'
          }}
        />
      }
      features={terraceHeroFeatureCards}
      featuresHeading='Høydepunkter for terrasseliv med Utekos'
      featuresHeadingId='terrassen-hero-highlights-title'
    />
  )
}
