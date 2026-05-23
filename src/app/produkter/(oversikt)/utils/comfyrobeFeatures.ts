// Path: src/app/produkter/(oversikt)/utils/comfyrobeFeatures.ts

import { ShieldCheck, ThermometerSnowflake, Move3d } from 'lucide-react'

export const comfyrobeFeatures = [
  {
    icon: ShieldCheck,
    title: 'Total værbeskyttelse',
    description:
      'Med 8000 mm vannsøyle og tapede sømmer holder du deg garantert tørr, mens det vindtette materialet stenger kulden ute.',
    surface: 'weather'
  },
  {
    icon: ThermometerSnowflake,
    title: 'Kompromissløs komfort',
    description:
      'Et tykt fôr av lammeull (Sherpa Fleece) gir umiddelbar varme og en luksuriøs følelse, perfekt etter et bad eller på en kjølig kveld.',
    surface: 'warmth'
  },
  {
    icon: Move3d,
    title: 'Gjennomtenkt frihet',
    description:
      'En romslig, unisex passform med splitter i sidene og en smart toveis YKK-glidelås® gir deg full bevegelsesfrihet til å nyte øyeblikket.',
    surface: 'freedom'
  }
] as const
