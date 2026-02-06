import { Move, Maximize, ScanFace } from 'lucide-react'
import type { SizeProfile } from '@types'

export type SizeOptionKey = 'S' | 'L'

export const SIZE_DATA: Record<SizeOptionKey, SizeProfile> = {
  S: {
    id: 'S',
    fullName: 'Small',
    label: 'Small',
    tagline: 'Frihet i bevegelse',
    heightRange: '160 - 170 cm',
    idealFor: ['Høyde opp til 170cm', 'Aktive livsstiler', 'Lettvekts-pakking'],
    icon: Move,
    // imageSrc: '/images/silhouette-active.png',
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
    label: 'Large',
    tagline: 'Ditt private fristed',
    heightRange: '180 - 190 cm+',
    idealFor: ['Alle over 180cm', 'Isbadere som skifter', 'Maksimal hygge'],
    icon: Maximize,
    visualScale: 1.1,
    benefits: [
      {
        title: 'Mobile Changing Room',
        desc: 'Ekstra plass til å skifte tøy helt privat og uforstyrret'
      },
      {
        title: 'Full Body Shield',
        desc: 'Oversized fit gir beskyttelse helt ned til leggene.'
      }
    ]
  }
}
