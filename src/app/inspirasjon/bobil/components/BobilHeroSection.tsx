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
      actions={<InspirationHeroActions primaryLabel='Se produktene' secondaryLabel='Utforsk mulighetene' />}
      features={bobilHeroFeatures}
      featuresHeading='Høydepunkter for bobil og camping med Utekos'
      featuresHeadingId='bobil-hero-highlights-title'
    />
  )
}
