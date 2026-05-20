'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const animatedSelectors =
  '.gsap-image-col, .gsap-content-col, .gsap-item, .gsap-feature'

export function useNewProductLaunchAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const q = gsap.utils.selector(containerRef)
      const animatedElements = q(animatedSelectors)

      const prefersReducedMotion =
        typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        gsap.set(animatedElements, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: 'transform'
        })

        return
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power2.out'
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true
        }
      })

      timeline
        .fromTo(
          '.gsap-image-col',
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.78 }
        )
        .fromTo(
          '.gsap-content-col',
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.78 },
          '-=0.56'
        )
        .fromTo(
          '.gsap-item',
          { y: 14, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.46,
            stagger: 0.07
          },
          '-=0.42'
        )
        .fromTo(
          '.gsap-feature',
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.42,
            stagger: 0.06
          },
          '-=0.28'
        )
    },
    { scope: containerRef }
  )

  return containerRef
}
