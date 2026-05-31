import { Car, Shirt, Thermometer } from 'lucide-react'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const CARD_SHADOW = '0 22px 44px -34px color-mix(in oklch, var(--background) 52%, transparent)'

/**
 * Høydepunkt-kort for isbading-heroen (theme-stil: solid flate + topp-hairline).
 */
export const iceBathingHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Skift varmt',
    description: 'Trekk armene inn og skift skjermet etter badet',
    icon: Shirt,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 82%, var(--ancient-water))',
    border: 'color-mix(in oklch, var(--ancient-water) 48%, var(--background))',
    marker: 'var(--ancient-water)',
    iconSurface: 'var(--ancient-water)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Varmen tilbake',
    description: 'Tørk huden raskt og hold kulden ute',
    icon: Thermometer,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 80%, var(--dusted-peri))',
    border: 'color-mix(in oklch, var(--dusted-peri) 46%, var(--background))',
    marker: 'var(--dusted-peri)',
    iconSurface: 'var(--dusted-peri)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Turen hjem',
    description: 'Behold roen og varmen helt tilbake til bilen',
    icon: Car,
    surface: 'color-mix(in oklch, var(--cloud-dancer) 84%, var(--overcast))',
    border: 'color-mix(in oklch, var(--overcast) 54%, var(--background))',
    marker: 'var(--overcast)',
    iconSurface: 'var(--overcast)',
    iconColor: 'var(--background)',
    shadow: CARD_SHADOW
  }
] as const
