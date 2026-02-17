import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'

type HeroAnimationRefs = {
  containerRef: RefObject<HTMLElement | null>
  imageContainerRef: RefObject<HTMLElement | null>
  badgeRef: RefObject<HTMLElement | null>
  headlineMainRef: RefObject<HTMLElement | null>
  headlineHighlightBgRef: RefObject<HTMLElement | null>
  bodyRef: RefObject<HTMLElement | null>
  ctaRef: RefObject<HTMLElement | null>
}

export function useHeroAnimation({
  containerRef,
  imageContainerRef,
  badgeRef,
  headlineMainRef,
  headlineHighlightBgRef,
  bodyRef,
  ctaRef
}: HeroAnimationRefs) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const container = containerRef.current

    const ctx = gsap.context(() => {
      gsap.set([headlineMainRef.current, bodyRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50
      })
      gsap.set(badgeRef.current, { autoAlpha: 0, x: -50 })
      gsap.set('.stat-item', { autoAlpha: 0, scale: 0.8 })
      gsap.set(headlineHighlightBgRef.current, { scaleX: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })

      tl.to(badgeRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      })
        .to(
          headlineMainRef.current,
          {
            autoAlpha: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: 'power4.out'
          },
          '-=0.6'
        )
        .to(
          headlineHighlightBgRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'expo.inOut',
            transformOrigin: 'left center'
          },
          '-=0.8'
        )
        .to(
          [bodyRef.current, ctaRef.current],
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8
          },
          '-=0.4'
        )
        .to(
          '.stat-item',
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(2)'
          },
          '-=0.2'
        )

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          imageContainerRef.current,
          { scale: 0.9, opacity: 0, x: 50 },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: 'expo.out',
            delay: 0.5
          }
        )
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          imageContainerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [
    containerRef,
    imageContainerRef,
    badgeRef,
    headlineMainRef,
    headlineHighlightBgRef,
    bodyRef,
    ctaRef
  ])
}
