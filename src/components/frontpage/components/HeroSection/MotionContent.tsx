'use client'

import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { MotionContentView } from '@/components/frontpage/MotionContentView'

export function MotionContent() {
  const containerRef = useHeroAnimation()

  return <MotionContentView ref={containerRef} />
}
