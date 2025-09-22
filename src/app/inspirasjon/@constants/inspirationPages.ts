import { Caravan, Flame, Home, Sailboat, Sofa } from 'lucide-react'

export const inspirationPages = [
  {
    href: '/inspirasjon/hytteliv' as const,
    label: 'Hytteliv',
    description: 'Komfort på hytten året rundt',
    icon: Home,
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-500'
  },
  {
    href: '/inspirasjon/bobil' as const,
    label: 'Bobil',
    description: 'Forleng campingsesongen',
    icon: Caravan,
    color: 'from-blue-500/20',
    iconColor: 'text-blue-500'
  },
  {
    href: '/inspirasjon/batliv' as const,
    label: 'Båtliv',
    description: 'Varme på vannet',
    icon: Sailboat,
    color: 'from-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    href: '/inspirasjon/terrassen' as const,
    label: 'Terrassen',
    description: 'Hjemme best',
    icon: Sofa,
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    href: '/inspirasjon/grillkvelden' as const,
    label: 'Grillkvelden',
    description: 'Sosiale stunder',
    icon: Flame,
    color: 'from-orange-500/20',
    iconColor: 'text-orange-500'
  }
]
