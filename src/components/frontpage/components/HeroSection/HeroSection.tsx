'use cache'

import { MotionContent } from './MotionContent'
import { SocialProof } from './SocialProof'
import { HeroImage } from './HeroImage'
export async function HeroSection() {
  return (
    <section className='relative isolate overflow-hidden bg-maritime-darkest px-4 pb-6 pt-8 sm:pb-10 sm:pt-12 lg:pt-16'>
      <MotionContent />
      <HeroImage />
      <SocialProof />
    </section>
  )
}
