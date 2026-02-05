import { type LucideIcon, Zap, Maximize } from 'lucide-react'

export type SizeOptionKey = 'XS/S' | 'L/XL'

export interface SizeProfile {
  id: SizeOptionKey
  label: string
  tagline: string
  heightRange: string
  idealFor: string[]
  icon: LucideIcon
  benefits: {
    title: string
    desc: string
  }[]
  visualScale: number
}

export const SIZE_DATA: Record<SizeOptionKey, SizeProfile> = {
  'XS/S': {
    id: 'XS/S',
    label: 'Kompakt / Junior',
    tagline: 'Smidig presisjon',
    heightRange: '150 - 165 cm',
    idealFor: [
      'Junior (10-15 år)',
      'Petite / Lavere voksne',
      'Konkurransesvømmere'
    ],
    icon: Zap,
    visualScale: 0.85,
    benefits: [
      {
        title: 'Optimalisert Lengde',
        desc: 'Kortere snitt som forhindrer at kåpen subber i bakken. Gir full bevegelsesfrihet.'
      },
      {
        title: 'Konsentrert Varme',
        desc: 'Mindre luftrom å varme opp betyr raskere isolasjonseffekt for mindre kropper.'
      }
    ]
  },
  'L/XL': {
    id: 'L/XL',
    label: 'Romslig / Skifterom',
    tagline: 'Ditt private skifterom',
    heightRange: '180 - 200 cm+',
    idealFor: [
      'Høye Voksne (185+)',
      'Isbadere som skifter',
      'Maksimal Dekning'
    ],
    icon: Maximize,
    visualScale: 1.15,
    benefits: [
      {
        title: 'Mobilt Skifterom',
        desc: 'Ekstra vidde lar deg trekke armene inn og skifte våttøy privat og varmt, uansett hvor du er.'
      },
      {
        title: 'Totalbeskyttelse',
        desc: 'Maksimert lengde gir beskyttelse helt ned til leggene for optimal isolasjon mot vær og vind.'
      }
    ]
  }
}
