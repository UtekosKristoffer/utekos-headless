// Path: src/app/produkter/(oversikt)/components/BenefitCard.tsx

'use client'

import { Check } from 'lucide-react'
import type { CSSProperties } from 'react'

type BenefitSurface = 'maritime' | 'plum' | 'peri'

interface Benefit {
  label: string
  description: string
  glowColor: string
  surface?: BenefitSurface
}

interface BenefitCardProps {
  benefit: Benefit
  delay: number
}

const surfaceStyles: Record<
  BenefitSurface,
  {
    background: string
    border: string
  }
> = {
  maritime: {
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--maritime-darkest) 92%, var(--ancient-water) 8%) 0%, color-mix(in oklch, var(--maritime-darkest) 96%, var(--maritime-blue) 4%) 100%)',
    border:
      'color-mix(in oklch, var(--ancient-water) 34%, var(--maritime-darkest) 66%)'
  },
  plum: {
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--chocolate-plum) 82%, var(--maritime-darkest) 18%) 0%, color-mix(in oklch, var(--maritime-darkest) 88%, var(--chocolate-plum) 12%) 100%)',
    border:
      'color-mix(in oklch, var(--primary-button) 36%, var(--chocolate-plum) 64%)'
  },
  peri: {
    background:
      'linear-gradient(145deg, color-mix(in oklch, var(--persian-violet) 36%, var(--maritime-darkest) 64%) 0%, color-mix(in oklch, var(--maritime-darkest) 84%, var(--dusted-peri) 16%) 100%)',
    border:
      'color-mix(in oklch, var(--dusted-peri) 42%, var(--maritime-darkest) 58%)'
  }
}

export function BenefitCard({ benefit, delay }: BenefitCardProps) {
  const surface = surfaceStyles[benefit.surface ?? 'maritime']

  return (
    <li
      className='animate-fade-in-on-scroll group relative overflow-hidden rounded-[1.05rem] border font-utekos-text tracking-tight shadow-[0_18px_44px_-36px_color-mix(in_oklch,var(--maritime-darkest)_82%,transparent)] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
      style={
        {
          '--animation-delay': `${delay}s`,
          '--benefit-accent': benefit.glowColor,
          'borderColor': surface.border,
          'background': surface.background
        } as CSSProperties
      }
    >
      <div
        className='pointer-events-none absolute -inset-x-8 -top-20 h-44 opacity-[0.14] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.22]'
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, transparent 38%, var(--benefit-accent) 100%)'
        }}
      />

      <div className='relative z-10 flex min-h-[3.75rem] items-center gap-3 px-4 py-3.5'>
        <div
          className='flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none'
          style={{
            borderColor:
              'color-mix(in oklch, var(--benefit-accent) 44%, transparent)',
            background:
              'color-mix(in oklch, var(--maritime-darkest) 86%, var(--benefit-accent) 14%)'
          }}
        >
          <Check
            className='size-5'
            style={{ color: 'var(--benefit-accent)' }}
            aria-hidden='true'
          />
        </div>

        <div className='flex-1 text-sm leading-[1.35]'>
          <span className='font-semibold text-cloud-dancer'>
            {benefit.label}
          </span>
          {benefit.description && (
            <span className='text-cloud-dancer/78'> {benefit.description}</span>
          )}
        </div>
      </div>
    </li>
  )
}
