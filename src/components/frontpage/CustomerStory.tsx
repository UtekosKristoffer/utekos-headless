import { Moon, Sun, type LucideIcon } from 'lucide-react'
import type { SVGProps } from 'react'
interface StoryNodeProps {
  icon: LucideIcon
  label: string
  description: string
  iconColor: string
  glowColor: string
}

function StoryNode({
  icon: Icon,
  label,
  description,
  iconColor,
  glowColor
}: StoryNodeProps) {
  return (
    <div className='group relative w-full mx-auto overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600'>
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-16 blur-2xl transition-opacity duration-300 group-hover:opacity-40 opacity-30'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-start gap-4'>
        <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-500'>
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
        <div className='flex-1'>
          <p className='mb-2 text-lg font-semibold text-foreground'>{label}</p>
          <p className='leading-relaxed text-muted-foreground'>{description}</p>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: glowColor }}
        />
      </div>
    </div>
  )
}

const nodeData = {
  for: {
    icon: Moon,
    label: 'Før Utekos:',
    description: 'Kulden satte en stopper for kosen.',
    iconColor: 'text-red-400',
    glowColor: '#f87171'
  },
  etter: {
    icon: Sun, // Representerer varme og en "ny dag" for utekvelder
    label: 'Etter Utekos:',
    description: 'Nå varer de beste øyeblikkene lenger.',
    iconColor: 'text-blue-400',
    glowColor: '#60a5fa'
  }
}
export function CustomerStory() {
  return (
    <div className='relative flex h-full min-h-[400px] mx-auto w-full md:w-[80%] flex-col items-center justify-center gap-8'>
      {/* SVG for å tegne den animerte linjen */}
      <svg
        aria-hidden='true'
        className='absolute top-0 left-1/2 h-full w-px -translate-x-1/2'
      >
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
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
          stroke='url(#gradient)'
          strokeWidth='3'
          strokeDasharray='5 5'
          style={{ animation: 'stroke-draw 1s linear infinite' }}
        />
      </svg>

      {/* Noder */}
      <StoryNode {...nodeData.for} />
      <StoryNode {...nodeData.etter} />

      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f87171 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute left-1/2 bottom-0 h-[300px] w-[300px] -translate-x-1/2 opacity-20 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  )
}
