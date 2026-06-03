'use cache'

import { cacheLife, cacheTag } from 'next/cache'
import { MotionContent } from './MotionContent'
import { SocialProof } from './SocialProof'
import { HeroImage } from './HeroImage'
export async function HeroSection() {
  cacheLife('days')
  cacheTag('static-sections', 'home-hero')

  return (
    <article className='mx-auto w-screen isolate overflow-hidden bg-background px-4 pb-6 pt-8 sm:pb-10 sm:pt-12 lg:pt-16'>
      <hgroup>
        <MotionContent />
        <HeroImage />
        <SocialProof />
      </hgroup>
    </article>
  )
}
