'use client'

import { MomentsHeader } from './MomentsHeader'
import { MomentCard } from '@/components/frontpage/MomentCard'
import { moments } from '@/components/frontpage/utils/moments'

export function MomentsSection() {
  return (
    <section className='relative w-full py-24 md:py-32 overflow-hidden'>
      <div className='absolute inset-0 bg-neutral-950 pointer-events-none -z-10' />

      <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-50' />

      <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <MomentsHeader />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
          {moments.map((moment, i) => (
            <MomentCard key={moment.id} moment={moment} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
