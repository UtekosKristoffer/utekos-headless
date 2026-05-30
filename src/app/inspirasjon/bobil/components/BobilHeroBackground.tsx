// Path: src/app/inspirasjon/bobil/components/BobilHeroBackground.tsx

import { AnimatedBlock } from '@/components/AnimatedBlock'

export function BobilHeroBackground() {
  return (
    <AnimatedBlock className='will-animate-fade-in-up' delay='0.1s'>
      <div className='absolute inset-0 -z-10 opacity-25' aria-hidden='true'>
        <div
          className='absolute left-1/3 top-1/4 size-[600px] rounded-full blur-[100px]'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--bleached-mauve) 68%, transparent) 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute bottom-1/4 right-1/3 size-[600px] rounded-full blur-[100px]'
          style={{
            background:
              'radial-gradient(circle, color-mix(in oklch, var(--havdyp) 72%, transparent) 0%, transparent 70%)'
          }}
        />
      </div>
    </AnimatedBlock>
  )
}
