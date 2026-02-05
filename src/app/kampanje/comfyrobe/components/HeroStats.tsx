import React, { forwardRef } from 'react'
import { Droplets, Wind } from 'lucide-react'

export const HeroStats = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className='flex justify-center lg:justify-start gap-8 mt-6 pt-6 border-t border-slate-800/50 w-full'
    >
      <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
        <Droplets className='w-6 h-6 text-sky-400' />
        <span className='font-bold text-sm text-sky-100'>8000mm</span>
      </div>
      <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
        <Wind className='w-6 h-6 text-slate-300' />
        <span className='font-bold text-sm text-slate-200'>Vindtett</span>
      </div>
      <div className='stat-item flex flex-col items-center lg:items-start gap-2 p-2 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm'>
        <div className='w-6 h-6 rounded-full border-2 border-slate-400 bg-slate-700/50' />
        <span className='font-bold text-sm text-slate-200'>SherpaCore™</span>
      </div>
    </div>
  )
})

HeroStats.displayName = 'HeroStats'
