'use client'

import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { MotionContentView } from '@/components/frontpage/MotionContentView'

export function MotionContent() {
  const containerRef = useHeroAnimation()
  const titleLetters = 'Utekos®'.split('')

  return <MotionContentView ref={containerRef} titleLetters={titleLetters} />
}
