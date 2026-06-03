import { MapPin, Mountain, Sunrise } from 'lucide-react'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const CARD_SHADOW = '0 22px 44px -34px color-mix(in oklch, var(--background) 52%, transparent)'

/**
 * Høydepunkt-kort for bobil-heroen (theme-stil: solid flate + topp-hairline).
 */
export const bobilHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Morgenkaffe',
    description: 'Start dagen i varme utenfor bobilen',
    icon: Sunrise,
    surface: 'color-mix(in oklch, var(--mountain-view) 10%, var(--mountain-view))',
    border: 'color-mix(in oklch, var(--mountain-view) 48%, var(--background))',
    marker: 'var(--mountain-view)',
    iconSurface: 'var(--mountain-view)',
    iconColor: 'var(--mineral-green)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Alle stopp',
    description: 'Nyt utsikten i komfort, hvor som helst',
    icon: Mountain,
    surface: 'color-mix(in oklch, var(--header-secondary) 10%, var(--header-secondary))',
    border: 'color-mix(in oklch, var(--bleached-mauve) 54%, var(--background))',
    marker: 'var(--header-secondary)',
    iconSurface: 'var(--header-secondary)',
    iconColor: 'var(--header-secondary)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Lengre turer',
    description: 'Reis tidligere på året og senere på høsten',
    icon: MapPin,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 10%, var(--dusted-peri))',
    border: 'color-mix(in oklch, var(--havdyp) 48%, var(--background))',
    marker: 'var(--dusted-peri)',
    iconSurface: 'var(--ancient-water)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  }
] as const
