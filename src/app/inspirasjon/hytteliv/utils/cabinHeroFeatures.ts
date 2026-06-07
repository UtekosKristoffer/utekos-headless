// Path: src/app/inspirasjon/utils/cabinHeroFeatures.ts
import { Coffee, Mountain, Star } from 'lucide-react'
import type { InspirationHeroFeature } from '../../layout/hero/types'

// Skaper en dyp, luksuriøs skygge
const CARD_SHADOW = '0 22px 44px -20px rgba(0,0,0,0.5)'
// Subtil lys kant som gir glassmorphism-effekt
const CARD_BORDER = 'color-mix(in oklch, var(--color-cloud-dancer) 10%, transparent)'
const ICON_SURFACE = 'color-mix(in oklch, var(--color-cloud-dancer) 8%, transparent)'
const ICON_BORDER = 'color-mix(in oklch, var(--color-cloud-dancer) 15%, transparent)'

export const cabinHeroFeatures: readonly InspirationHeroFeature[] = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffen ute i frisk fjellluft',
    icon: Coffee,
    surface: 'var(--color-havdyp)', // Dyp, rolig blåtone
    border: CARD_BORDER,
    marker: 'var(--color-iced-apricot)', // Soloppgangs-farge!
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--color-iced-apricot)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    icon: Mountain,
    surface: 'var(--color-maritime-darkest)', // Mørkeste for kontrast i midten
    border: CARD_BORDER,
    marker: 'var(--color-cloud-dancer)',
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--color-cloud-dancer)',
    shadow: CARD_SHADOW
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    icon: Star,
    surface: 'var(--color-havdyp)',
    border: CARD_BORDER,
    marker: 'var(--color-very-peri)', // Kvelds- og skumringsfarge
    iconSurface: ICON_SURFACE,
    iconBorder: ICON_BORDER,
    iconColor: 'var(--color-very-peri)',
    shadow: CARD_SHADOW
  }
] as const
