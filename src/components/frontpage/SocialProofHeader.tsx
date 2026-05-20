'use client'

import { useSocialProofAnimation } from '@/hooks/useSocialProofAnimation'
import { SocialProofHeaderView } from './SocialProofHeaderView'

export function SocialProofHeader() {
  const { containerRef, titleRef, textRef } = useSocialProofAnimation()

  const descriptionContent = (
    <p className='leading-relaxed'>
      Våre beste produktutviklere er{' '}
      <span className='relative inline-flex items-center justify-center px-1'>
        <span className='gsap-highlight-bg absolute inset-0 -z-10 -skew-x-6 scale-x-0 rounded-md bg-gradient-to-r from-mountain-view via-comfrey to-mountain-view blur-[1px] will-change-transform' />
        <span className='gsap-highlight-bg absolute inset-0 -z-10 -rotate-1 scale-x-0 rounded-lg border border-comfrey/45 bg-gradient-to-r from-mountain-view via-comfrey to-mountain-view opacity-65 will-change-transform' />
        <strong className='relative z-10 font-semibold text-foreground'>
          kundene våre
        </strong>
      </span>
      . Vi lytter, lærer og designer for å løse reelle behov – slik at du kan
      skape flere og bedre{' '}
      <span className='relative inline-block font-medium text-foreground'>
        minner utendørs
        <span className='gsap-underline absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-mountain-view via-comfrey to-mountain-view opacity-80' />
      </span>
      .
    </p>
  )

  return (
    <SocialProofHeaderView
      ref={containerRef}
      titleRef={titleRef}
      textRef={textRef}
      title='Drevet av ekte opplevelser'
      description={descriptionContent}
    />
  )
}
