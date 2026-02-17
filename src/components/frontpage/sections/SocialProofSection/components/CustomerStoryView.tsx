import { Moon, Sun } from 'lucide-react'
import { StoryNodeView } from './StoryNodeView'

export function CustomerStoryView() {
  return (
    <div className='relative mx-auto flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-8 md:w-[80%]'>
      <svg
        aria-hidden='true'
        className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2'
      >
        <defs>
          <linearGradient id='story-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#f87171' stopOpacity='0.8' />
            <stop offset='50%' stopColor='#c084fc' stopOpacity='0.6' />
            <stop offset='100%' stopColor='#60a5fa' stopOpacity='0.8' />
          </linearGradient>
        </defs>
        <line
          x1='0'
          y1='0'
          x2='0'
          y2='100%'
          stroke='url(#story-gradient)'
          strokeWidth='3'
          strokeDasharray='5 5'
          style={{ animation: 'stroke-draw 1s linear infinite' }}
        />
      </svg>

      <StoryNodeView
        icon={Moon}
        label='Før Utekos®:'
        description='Kulden satte en stopper for kosen.'
        iconColor='text-red-400'
        glowColor='#f87171'
      />

      <StoryNodeView
        icon={Sun}
        label='Etter Utekos®:'
        description='Nå varer de beste øyeblikkene lenger.'
        iconColor='text-blue-400'
        glowColor='#60a5fa'
      />

      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f87171 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  )
}
