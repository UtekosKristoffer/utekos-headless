import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useSocialProofAnimations(
  options: { enabled?: boolean } = { enabled: true }
) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!options.enabled) return

      // Reduced motion check for accessibility
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      const cards = gsap.utils.toArray<HTMLElement>('.gsap-card')
      if (cards.length === 0) return

      if (prefersReducedMotion) {
        // Fast-forward to final state
        gsap.set(cards, { autoAlpha: 1, x: 0, skewX: 0 })
        gsap.set('.gsap-icon', { autoAlpha: 1, scale: 1, rotation: 0 })
        return
      }

      // Optimize rendering
      gsap.set(cards, { willChange: 'transform, opacity' })
      gsap.set('.gsap-icon', { willChange: 'transform, opacity' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        cards,
        {
          x: -40,
          autoAlpha: 0,
          skewX: 5
        },
        {
          x: 0,
          autoAlpha: 1,
          skewX: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out', // Smoother, lighter easing than back.out
          clearProps: 'willChange'
        }
      )

      tl.fromTo(
        '.gsap-icon',
        { scale: 0.8, rotation: -15, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2)',
          clearProps: 'willChange'
        },
        '-=0.5'
      )

      cards.forEach(card => {
        const shine = card.querySelector('.gsap-shine')
        if (shine) {
          gsap.fromTo(
            shine,
            { xPercent: -100, autoAlpha: 0 },
            {
              xPercent: 200,
              autoAlpha: 0.15,
              duration: 2.5,
              ease: 'power2.inOut',
              repeat: -1,
              repeatDelay: 5 + Math.random() * 3
            }
          )
        }
      })
    },
    { scope: containerRef, dependencies: [options.enabled] }
  )

  return containerRef
}
