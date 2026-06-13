'use client'

import { MomentCard } from '@/components/frontpage/MomentSection/MomentCard'
import { moments } from '@/components/frontpage/MomentSection/utils/moments'

export function MomentCardsGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
      {moments.map((moment, i) => (
        <MomentCard key={moment.id} moment={moment} index={i} />
      ))}
    </div>
  )
}
