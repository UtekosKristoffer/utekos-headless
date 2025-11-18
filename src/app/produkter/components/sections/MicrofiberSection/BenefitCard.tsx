// Path: src/app/produkter/components/sections/MicrofiberSection/BenefitCard.tsx
'use client'

import { Check } from 'lucide-react'

interface Benefit {
  label: string
  description: string
  glowColor: string
}

interface BenefitCardProps {
  benefit: Benefit
  delay: number
}

export function BenefitCard({ benefit, delay }: BenefitCardProps) {
  return (
    <li
      className='animate-fade-in-on-scroll group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:translate-x-1'
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
        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500/50'>
          <Check className='h-5 w-5 text-orange-400' />
        </div>
        <div className='flex-1 text-sm'>
          <span className='font-semibold text-white'>{benefit.label}</span>
          {benefit.description && (
            <span className='text-neutral-300'> {benefit.description}</span>
          )}
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className='absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-lg blur-sm opacity-20'
          style={{ background: benefit.glowColor }}
        />
      </div>
    </li>
  )
}
