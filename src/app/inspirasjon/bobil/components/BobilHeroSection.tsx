import { MapPin } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import { bobilHeroFeatures } from '../utils/bobilHeroFeatures'
import { BobilHeroBackground } from './BobilHeroBackground'

export function BobilHeroSection() {
  return (
    <InspirationHero
      as='article'
      labelledById='bobil-hero-title'
      surfaceClassName='bg-havdyp text-cloud-dancer'
      background={
        <>
          <BobilHeroBackground />
          <div className='absolute inset-0 bg-havdyp' aria-hidden='true' />
        </>
      }
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Bobil og camping'
          color='var(--color-bleached-mauve)'
          textColor='var(--color-background)'
          icon={MapPin}
        />
      }
      title={
        <>
          Bobilliv uten <HeroHighlight color='var(--color-bleached-mauve)'>kompromisser</HeroHighlight>
        </>
      }
      titleClassName='max-w-3xl'
      lead='Fra den første morgenkaffen til de sene kveldene rundt bordet. Ta med Utekos og gjør hvert stopp til et øyeblikk du vil huske.'
      actions={<InspirationHeroActions primaryLabel='Se produktene' secondaryLabel='Utforsk mulighetene' />}
      features={bobilHeroFeatures}
      featuresHeading='Høydepunkter for bobil og camping med Utekos'
      featuresHeadingId='bobil-hero-highlights-title'
    />
  )
}
