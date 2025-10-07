'use client'

import { MotionContent } from './MotionContent'
import { SocialProof } from './SocialProof'
import { HeroImage } from './HeroImage'
export function HeroSection() {
  return (
    <section className='relative container mx-auto px-4 pt-12 pb-2 overflow-hidden'>
      <MotionContent />
      <HeroImage />
      <SocialProof />
    </section>
  )
}
