import { Coffee, Mountain, Star } from 'lucide-react'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const CARD_SHADOW = '0 22px 44px -34px color-mix(in oklch, var(--background) 52%, transparent)'

/**
 * Høydepunkt-kort for hyttelivs-heroen (theme-stil: solid flate + topp-hairline).
 */
export const cabinHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffen ute i frisk fjellluft',
    icon: Coffee,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 84%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 46%, var(--background))',
    marker: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    icon: Mountain,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 80%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 54%, var(--background))',
    marker: 'var(--overcast)',
    iconSurface: 'var(--overcast)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    icon: Star,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 82%, var(--bleached-mauve))',
    border: 'color-mix(in oklch, var(--bleached-mauve) 48%, var(--background))',
    marker: 'var(--bleached-mauve)',
    iconSurface: 'var(--bleached-mauve)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  }
] as const
