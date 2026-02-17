'use client'

import { useTrustSectionAnimation } from '@/hooks/useTrustSectionAnimation'
import { TrustContentView } from './TrustContentView'
import { InfoCardStackView } from './sections/NewStandardSection/components/InfoCardStackView'
import { AnimatedChat } from '@/components/frontpage/sections/NewStandardSection/components/AnimatedChat'

export function NewStandardSection() {
  const { containerRef, headingRef, textRef, card1Ref, card2Ref } =
    useTrustSectionAnimation()

  return (
    <section className='mx-auto max-w-[95%] pt-12 md:max-w-7xl'>
      <div className='mx-auto'>
        <div className='overflow-hidden rounded-xl border border-neutral-800'>
          <div className='grid lg:grid-cols-2'>
            <TrustContentView
              ref={containerRef}
              headingRef={headingRef}
              textRef={textRef}
              card1Ref={card1Ref}
              card2Ref={card2Ref}
              InfoCardsComponent={InfoCardStackView}
            />

            <div className='relative min-h-[400px]'>
              <AnimatedChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
