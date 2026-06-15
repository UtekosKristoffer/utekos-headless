import { MapPin } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { bobilHeroFeatures } from '../utils/bobilHeroFeatures'

export function BobilHeroSection() {
  return (
    <InspirationHero
      as='article'
      labelledById='bobilHeroBackground'
      surfaceClassName='bg-background'
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Bobil og camping'
          color='var(--havdyp)'
          textColor='var(--foreground)'
          icon={MapPin}
        />
      }
      title={<>Bobilliv uten kompromisser</>}
      titleClassName='max-w-3xl'
      lead='Fra den første morgenkaffen til de sene kveldene rundt bordet. Ta med Utekos og gjør hvert stopp til et øyeblikk du vil huske.'
      actions={
        <InspirationHeroActions
          primaryLabel='Se produktene'
          secondaryLabel='Utforsk mulighetene'
          primaryStyle={{
            backgroundColor: 'var(--primary)',
            textColor: 'var(--cloud-dancer)',
            className:
              'border-primary/24 shadow-[0_18px_38px_-28px_color-mix(in_oklch,var(--background)_86%,transparent)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          }}
          secondaryStyle={{
            backgroundColor: 'var(--mountain-view)',
            textColor: 'var(--foreground)',
            className:
              'border-cloud-dancer/18 shadow-[0_18px_38px_-30px_color-mix(in_oklch,var(--background)_42%,transparent)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-cloud-dancer/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          }}
        />
      }
      features={bobilHeroFeatures}
      featuresHeading='Høydepunkter for bobil og camping med Utekos'
      featuresHeadingId='bobil-hero-highlights-title'
    />
  )
}
