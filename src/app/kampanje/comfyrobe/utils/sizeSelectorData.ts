import { type LucideIcon, Move, Maximize, ScanFace } from 'lucide-react'

export type SizeOptionKey = 'S' | 'L'

export interface SizeProfile {
  id: SizeOptionKey
  fullName: string
  label: string
  tagline: string
  heightRange: string
  idealFor: string[]
  icon: LucideIcon
  imageSrc?: string // Nytt felt for silhuett-bilde
  visualScale: number
  benefits: {
    title: string
    desc: string
  }[]
}

export const SIZE_DATA: Record<SizeOptionKey, SizeProfile> = {
  S: {
    id: 'S',
    fullName: 'Small',
    label: 'Active / Compact',
    tagline: 'Frihet i bevegelse',
    heightRange: '150 - 170 cm',
    idealFor: [
      'Voksne (opp til 170cm)',
      'Aktive livsstiler',
      'Lettvekts-pakking'
    ],
    icon: Move,
    // imageSrc: '/images/silhouette-active.png', // Klar for bilde når du har det
    visualScale: 0.9,
    benefits: [
      {
        title: 'Active Fit™',
        desc: 'Kortere snitt optimalisert for bevegelse. Gå, løp eller rigg utstyr uten at stoffet kommer i veien.'
      },
      {
        title: 'Flash Heat',
        desc: 'Mindre innvendig volum betyr at kroppsvarmen din fyller kåpen og isolerer deg raskere.'
      }
    ]
  },
  L: {
    id: 'L',
    fullName: 'Large',
    label: 'Max / Privacy',
    tagline: 'Ditt private fristed',
    heightRange: '175 - 200 cm+',
    idealFor: ['Alle over 175cm', 'Isbadere som skifter', 'Maksimal hygge'],
    icon: Maximize,
    // imageSrc: '/images/silhouette-max.png', // Klar for bilde når du har det
    visualScale: 1.1,
    benefits: [
      {
        title: 'Mobile Changing Room',
        desc: 'Ekstra vidde lar deg trekke armene inn og skifte våttøy helt privat, varmt og uforstyrret.'
      },
      {
        title: 'Full Body Shield',
        desc: 'Maksimert lengde gir beskyttelse helt ned til leggene for den ultimate "sovepose-følelsen".'
      }
    ]
  }
}
