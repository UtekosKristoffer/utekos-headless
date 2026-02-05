import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupInitialStates } from './setupInitialStates'
import { createDesktopTimeline } from './createDesktopTimeline'
import { createMobileTimeline } from './createMobileTimeline'

interface UseAnatomyAnimationProps {
  containerRef: RefObject<HTMLElement | null>
  triggerRef: RefObject<HTMLElement | null>
  cardsContainerRef: RefObject<HTMLElement | null>
  setActiveLayer: (layer: number) => void
}

export function useAnatomyAnimation({
  containerRef,
  triggerRef,
  cardsContainerRef,
  setActiveLayer
}: UseAnatomyAnimationProps) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      if (!triggerRef.current || !cardsContainerRef.current) return

      const cards = gsap.utils.toArray<HTMLElement>('.tech-card')
      const texts = gsap.utils.toArray<HTMLElement>('.tech-text-item')

      if (cards.length < 3 || texts.length < 3) return

      mm.add('(min-width: 1024px)', () => {
        setupInitialStates(cards, texts)

        createDesktopTimeline(
          triggerRef.current!,
          cardsContainerRef.current!,
          cards,
          texts,
          setActiveLayer
        )
      })

      mm.add('(max-width: 1023px)', () => {
        createMobileTimeline(triggerRef.current!, cards, texts, setActiveLayer)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, triggerRef, cardsContainerRef, setActiveLayer])
}
