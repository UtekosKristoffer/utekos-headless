'use client'

import { useSocialProofAnimation } from '@/hooks/useSocialProofAnimation'
import { SocialProofHeaderView } from './SocialProofHeaderView'

export function SocialProofHeader() {
  const { containerRef, titleRef, textRef } = useSocialProofAnimation()

  const descriptionContent = (
    <p className='leading-relaxed'>
      Våre beste produktutviklere er{' '}
      <span className='relative inline-flex items-center justify-center px-1'>
        <span className='gsap-highlight-bg absolute inset-0 -z-10 -skew-x-6 scale-x-0 rounded-md bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 blur-[1px] will-change-transform' />
        <span className='gsap-highlight-bg absolute inset-0 -z-10 -rotate-1 scale-x-0 rounded-lg border border-sky-500/20 bg-sky-500/5 will-change-transform' />
        <strong className='relative z-10 font-semibold text-sky-100/90'>
          kundene våre
        </strong>
      </span>
      . Vi lytter, lærer og designer for å løse reelle behov – slik at du kan
      skape flere og bedre{' '}
      <span className='relative inline-block font-medium text-foreground'>
        minner utendørs
        <span className='gsap-underline absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-400 to-transparent opacity-80' />
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
