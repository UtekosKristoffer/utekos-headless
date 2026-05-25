import { Coffee, Mountain, Star } from 'lucide-react'

export const heroFeatureCards = [
  {
    title: 'Morgenstund',
    description: 'Nyt morgenkaffen ute i frisk fjellluft',
    Icon: Coffee
  },
  {
    title: 'Utsikten',
    description: 'Nyt panoramaet i komfort, hele dagen',
    Icon: Mountain
  },
  {
    title: 'Stjerneklar kveld',
    description: 'Forleng kveldene under natthimmelen',
    Icon: Star
  }
] as const
