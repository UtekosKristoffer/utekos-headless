import { Coffee, Mountain, Star } from 'lucide-react'
import type { InspirationHeroFeature } from '../../layout/hero/types'

const CARD_SHADOW = '0 22px 44px -34px color-mix(in oklch, var(--background) 52%, transparent)'
const CARD_BORDER = 'color-mix(in oklch, var(--cloud-dancer) 12%, transparent)'
const ICON_SURFACE = 'color-mix(in oklch, var(--cloud-dancer) 14%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--cloud-dancer) 22%, transparent)'

/**
 * Høydepunkt-kort for hyttelivs-heroen (theme-stil: solid flate + topp-hairline).
 */
export const cabinHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffen ute i frisk fjellluft',
    icon: Coffee,
    surface: 'var(--color-havdyp)',
    border: CARD_BORDER,
    marker: 'color-mix(in oklch, var(--cloud-dancer) 28%, transparent)',
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--foreground)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    icon: Mountain,
    surface: 'var(--color-mountain-view)',
    border: CARD_BORDER,
    marker: 'color-mix(in oklch, var(--cloud-dancer) 28%, transparent)',
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--foreground)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    icon: Star,
    surface: 'var(--color-blackberry)',
    border: CARD_BORDER,
    marker: 'color-mix(in oklch, var(--cloud-dancer) 28%, transparent)',
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--foreground)',
    shadow: CARD_SHADOW
  }
] as const
