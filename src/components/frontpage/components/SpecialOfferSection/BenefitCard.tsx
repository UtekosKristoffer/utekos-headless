// Path: src/components/ComfyrobeSection/BenefitCard.tsx
'use client'

import { Check } from 'lucide-react'

interface Benefit {
  label: string
  description: string
  glowColor: string
  tone: 'water' | 'mauve' | 'overcast'
}

interface BenefitCardProps {
  benefit: Benefit
  delay: number
}

const toneStyles = {
  water: 'bg-ancient-water',
  mauve: 'bg-bleached-mauve',
  overcast: 'bg-overcast'
} as const

export function BenefitCard({ benefit, delay }: BenefitCardProps) {
  const backgroundClass = toneStyles[benefit.tone] ?? toneStyles.overcast

  return (
    <li
      className={`animate-fade-in-on-scroll group relative overflow-hidden rounded-lg border border-havdyp/12 ${backgroundClass} p-4 transition-all duration-300 hover:translate-x-1 hover:border-havdyp/25`}
      style={{ '--animation-delay': `${delay}s` } as React.CSSProperties}
    >
      {/* Aurora gradient effect */}
      <div
        className='absolute -inset-x-2 -inset-y-8 opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-25'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${benefit.glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-center gap-3'>
        <div className='flex size-8 flex-shrink-0 items-center justify-center rounded-md border border-havdyp bg-havdyp transition-all duration-300 group-hover:scale-110 group-hover:border-havdyp/80'>
          <Check className='size-5 text-foreground' />
        </div>
        <div className='flex-1 text-sm'>
          <span className='font-semibold text-background'>{benefit.label}</span>
          {benefit.description && <span className='text-havdyp/75'> {benefit.description}</span>}
        </div>
      </div>
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: benefit.glowColor }}
        />
      </div>
    </li>
  )
}
