import { Caravan, Flame, Home, Sailboat, Sofa } from 'lucide-react'

export const inspirationPages = [
  {
    href: '/inspirasjon/hytteliv' as const,
    label: 'Hytteliv',
    description: 'Komfort på hytten året rundt',
    icon: Home,
    color: 'var(--ancient-water)',
    midColor: 'var(--country-air)',
    iconColor: 'text-ancient-water'
  },
  {
    href: '/inspirasjon/bobil' as const,
    label: 'Bobil og camping',
    description: 'Forleng campingsesongen',
    icon: Caravan,
    color: 'var(--bleached-mauve)',
    midColor: 'var(--raindrops-on-roses)',
    iconColor: 'text-bleached-mauve'
  },
  {
    href: '/inspirasjon/batliv' as const,
    label: 'Båtliv',
    description: 'Varme på vannet',
    icon: Sailboat,
    color: 'var(--dusted-peri)',
    midColor: 'var(--sweet-lavender)',
    iconColor: 'text-dusted-peri'
  },
  {
    href: '/inspirasjon/terrassen' as const,
    label: 'Terrassen',
    description: 'Hjemme best',
    icon: Sofa,
    color: 'var(--mountain-view)',
    midColor: 'var(--camping-green)',
    iconColor: 'text-mountain-view'
  },
  {
    href: '/inspirasjon/grillkvelden' as const,
    label: 'Grillkvelden',
    description: 'Sosiale stunder',
    icon: Flame,
    color: 'var(--maritime-blue)',
    midColor: 'var(--skipper-blue)',
    iconColor: 'text-maritime-blue'
  }
]
