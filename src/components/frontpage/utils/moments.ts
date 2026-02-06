import { Home, Car, Anchor, type LucideIcon } from 'lucide-react'

export interface Moment {
  id: string
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  highlightColor: string
}

export const moments: Moment[] = [
  {
    id: 'cabin',
    icon: Home,
    title: 'På hytten',
    description:
      'Fra iskald ankomst til umiddelbar varme. Utekos er den perfekte hytteuniformen for de kjølige kveldene på terrassen og den ferske morgenkaffen ute.',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-transparent',
    highlightColor: 'text-blue-200'
  },
  {
    id: 'camper',
    icon: Car,
    title: 'I bobilen',
    description:
      'Lett å pakke, genial i bruk. Bytt ut store pledd og ekstra jakker med ett plagg som gjør hvert eneste stopp til en varm og komfortabel opplevelse.',
    gradient: 'from-pink-500/20 via-rose-500/20 to-transparent',
    highlightColor: 'text-pink-200'
  },
  {
    id: 'boat',
    icon: Anchor,
    title: 'I båten',
    description:
      'Nyt solnedgangen fra dekk uten å la den kalde sjøbrisen ødelegge øyeblikket. Den beskytter mot trekk og lar deg forlenge båtkvelden i ren komfort.',
    gradient: 'from-emerald-500/20 via-green-500/20 to-transparent',
    highlightColor: 'text-emerald-200'
  }
]
