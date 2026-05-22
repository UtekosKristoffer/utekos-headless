'use cache'

import { MotionContent } from './MotionContent'
import { SocialProof } from './SocialProof'
import { HeroImage } from './HeroImage'
export async function HeroSection() {
  return (
    <section className='relative isolate overflow-hidden bg-maritime-darkest px-4 pb-10 pt-8 sm:pt-12 lg:pt-16'>
      <MotionContent />
      <HeroImage />
      <SocialProof />
    </section>
  )
}
