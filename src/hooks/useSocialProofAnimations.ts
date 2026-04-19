import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useSocialProofAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.gsap-card')

      if (cards.length === 0) return

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
          x: -100,
          autoAlpha: 0,
          skewX: 10
        },
        {
          x: 0,
          autoAlpha: 1,
          skewX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)'
        }
      )

      tl.fromTo(
        '.gsap-icon',
        { scale: 0, rotation: -90, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)'
        },
        '-=0.6'
      )

      cards.forEach(card => {
        const shine = card.querySelector('.gsap-shine')
        if (shine) {
          gsap.fromTo(
            shine,
            { xPercent: -100, autoAlpha: 0 },
            {
              xPercent: 200,
              autoAlpha: 0.3,
              duration: 2,
              ease: 'power2.inOut',
              repeat: -1,
              repeatDelay: 4 + Math.random() * 4
            }
          )
        }
      })
    },
    { scope: containerRef }
  )

  return containerRef
}
