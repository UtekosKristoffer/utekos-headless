// Path: src/app/inspirasjon/terrassen/sections/TerraceHeroSection.tsx

import { Coffee, Leaf, Sparkles } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const ICON_SURFACE = 'color-mix(in oklch, var(--cloud-dancer) 38%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--background) 12%, transparent)'
const CARD_SHADOW = '0 24px 48px -38px color-mix(in oklch, var(--background) 72%, transparent)'
const DESCRIPTION_COLOR = 'color-mix(in oklch, var(--background) 88%, transparent)'

const terraceHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Tidlig vår',
    description: 'Nyt morgenkaffen uker tidligere',
    icon: Coffee,
    iconColor: 'color-mix(in oklch, var(--background) 78%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--ancient-water) 82%, var(--cloud-dancer) 18%) 0%, color-mix(in oklch, var(--ancient-water) 58%, var(--background) 42%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--ancient-water) 74%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'Sen høst',
    description: 'Forleng sesongen',
    icon: Leaf,
    iconColor: 'color-mix(in oklch, var(--mountain-view) 68%, var(--background) 32%)',
    border: 'color-mix(in oklch, var(--mountain-view) 38%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 86%, var(--cloud-dancer) 14%) 0%, color-mix(in oklch, var(--mountain-view) 28%, var(--overcast) 72%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 34%, color-mix(in oklch, var(--mountain-view) 54%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'Hver kveld',
    description: 'Nyt uteplassen når det kjølner',
    icon: Sparkles,
    iconColor: 'color-mix(in oklch, var(--background) 78%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 86%, var(--cloud-dancer) 14%) 0%, color-mix(in oklch, var(--overcast) 52%, var(--background) 48%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--overcast) 78%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  }
] as const

const TerraceHeroBackground = (
  <>
    <div className='pointer-events-none absolute inset-0 -z-10 opacity-24' aria-hidden='true'>
      <div
        className='absolute left-[8%] top-[12%] size-152nded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--ancient-water) 58%, transparent) 0%, transparent 68%)'
        }}
      />
      <div
        className='absolute bottom-[8%] right-[6%] size-136 rounded-full blur-3xl'
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--primary) 34%, transparent) 0%, transparent 70%)'
        }}
      />
    </div>

    <div
      className='absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklch,var(--background)_92%,transparent)_100%)]'
      aria-hidden='true'
    />
  </>
)

export function TerraceHeroSection() {
  return (
    <InspirationHero
      labelledById='terrassen-hero-title'
      surfaceClassName='bg-background'
      containerClassName='sm:py-24'
      background={TerraceHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Terrassen'
          color='var(--mountain-view)'
          textColor='var(--cloud-dancer)'
          icon={Sparkles}
        />
      }
      title={
        <>
          Din terrasse, <HeroHighlight color='var(--primary)'>hele året</HeroHighlight>
        </>
      }
      titleClassName='max-w-3xl'
      lead='Gjør uteplassen til husets beste rom. Fra den første kaffen i vårsolen til de sene sommerkveldene, nyt øyeblikkene lenger.'
      actions={<InspirationHeroActions primaryLabel='Oppdag din Utekos' secondaryLabel='Se bruksområdene' />}
      features={terraceHeroFeatures}
      featuresHeading='Høydepunkter for terrasseliv med Utekos'
      featuresHeadingId='terrassen-hero-highlights-title'
    />
  )
}
