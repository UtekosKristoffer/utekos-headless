import { Clock, Flame, Users } from 'lucide-react'
import { InspirationHeroActions } from '../../layout/InspirationHeroActions'
import { InspirationHeroBreadcrumb } from '../../layout/InspirationHeroBreadcrumb'
import { InspirationHero } from '../../layout/hero/InspirationHero'
import { HeroHighlight } from '../../layout/hero/HeroHighlight'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const ICON_SURFACE = 'color-mix(in oklch, var(--cloud-dancer) 38%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--background) 12%, transparent)'
const CARD_SHADOW = '0 24px 48px -38px rgba(9, 15, 22, 0.42)'
const DESCRIPTION_COLOR = 'color-mix(in oklch, var(--background) 78%, transparent)'

const grillHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Ved grillen',
    description: 'Hold varmen mens du steker',
    icon: Flame,
    iconColor: 'var(--background)',
    border: 'color-mix(in oklch, var(--primary) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--primary) 78%, var(--cloud-dancer) 22%) 0%, color-mix(in oklch, var(--primary) 52%, var(--background) 48%) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 32%, color-mix(in oklch, var(--primary) 70%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'Hele kvelden',
    description: 'La samtalen flyte til langt på natt',
    icon: Clock,
    iconColor: 'color-mix(in oklch, var(--background) 70%, var(--bleached-mauve))',
    border: 'color-mix(in oklch, var(--bleached-mauve) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--bleached-mauve) 72%, rgba(255, 255, 255, 0.24)) 0%, color-mix(in oklch, var(--bleached-mauve) 40%, rgba(24, 20, 24, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--bleached-mauve) 76%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  },
  {
    title: 'For gjestene',
    description: 'Alle sitter komfortabelt utendørs',
    icon: Users,
    iconColor: 'color-mix(in oklch, var(--background) 72%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 42%, transparent)',
    surface:
      'linear-gradient(180deg, color-mix(in oklch, var(--overcast) 78%, rgba(255, 255, 255, 0.28)) 0%, color-mix(in oklch, var(--overcast) 44%, rgba(18, 24, 28, 0.16)) 100%)',
    glow: 'radial-gradient(120% 120% at 50% 0%, transparent 30%, color-mix(in oklch, var(--overcast) 82%, transparent) 100%)',
    sheen: true,
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    shadow: CARD_SHADOW,
    descriptionColor: DESCRIPTION_COLOR
  }
] as const

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
            'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 70%, transparent) 0%, transparent 70%)',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />
    </div>

    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background/50' aria-hidden='true' />
  </>
)

export function GrillHeroSection() {
  return (
    <InspirationHero
      labelledById='grillkvelden-hero-title'
      surfaceClassName='bg-havdyp'
      background={GrillHeroBackground}
      breadcrumb={
        <InspirationHeroBreadcrumb
          label='Grillkvelden'
          color='var(--havdyp)'
          textColor='var(--cloud-dancer)'
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
      actions={<InspirationHeroActions primaryLabel='Bli klar for kvelden' secondaryLabel='Se øyeblikkene' />}
      features={grillHeroFeatures}
      featuresHeading='Høydepunkter for grillkvelden med Utekos'
      featuresHeadingId='grillkvelden-hero-highlights-title'
    />
  )
}
