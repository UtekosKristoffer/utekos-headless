'use client'

import { useSocialProofAnimation } from '@/hooks/useSocialProofAnimation'
import { SocialProofHeaderView } from './SocialProofHeaderView'

export function SocialProofHeader() {
  const { containerRef, titleRef, textRef } = useSocialProofAnimation()

  return (
    <SocialProofHeaderView
      ref={containerRef}
      titleRef={titleRef}
      textRef={textRef}
      title='Drevet av ekte opplevelser'
      description='Våre beste produktutviklere er kundene våre. Vi lytter, lærer og designer for å løse reelle behov – slik at du kan skape flere og bedre minner utendørs.'
    />
  )
}
