// Path: src/app/magasinet/components/MagazineCategoryBadge.tsx

import { BusFront, House, Lightbulb, Sparkles, Sun, Waves } from 'lucide-react'
import type { MagazineCategory } from '../types'

type MagazineCategoryBadgeProps = {
  category: MagazineCategory
}

const categoryIconMap = {
  'Tips og råd': Lightbulb,
  'Om Utekos': Sparkles,
  'Hytteliv': House,
  'Terrasseliv': Sun,
  'Bobilliv': BusFront,
  'Båtliv': Waves
} satisfies Record<MagazineCategory, React.ComponentType<{ className?: string }>>

export function MagazineCategoryBadge({ category }: MagazineCategoryBadgeProps) {
  const Icon = categoryIconMap[category]

  return (
    <span className='inline-flex w-fit items-center gap-2 rounded-full bg-ancient-water px-3 py-1 text-xs font-semibold tracking-normal text-maritime-darkest ring-1 ring-maritime-darkest/10'>
      <Icon className='size-3.5 shrink-0' aria-hidden='true' />
      <span>{category}</span>
    </span>
  )
}
