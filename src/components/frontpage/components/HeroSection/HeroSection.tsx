'use client'

import { MotionContent } from './MotionContent'
import { SocialProof } from './SocialProof'
import { HeroImage } from './HeroImage'
export function HeroSection() {
  return (
    <section className='relative container mx-auto px-4 pt-12 pb-2 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div
          className='absolute left-1/3 top-0 h-[800px] w-[800px] opacity-10 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 top-1/4 h-[600px] w-[600px] opacity-10 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <MotionContent />
      <HeroImage />
      <SocialProof />
    </section>
  )
}
