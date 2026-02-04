import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useTrustSectionAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%', // Starter litt tidligere så brukeren ser det skje
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-reveal-line',
        { y: '100%', autoAlpha: 0 },
        {
          y: '0%',
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        }
      )

      tl.fromTo(
        textRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        '-=0.6'
      )

      tl.fromTo(
        card1Ref.current,
        { x: -50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'back.out(1.2)' // Gir en liten "sprett"
        },
        '-=0.4'
      )

      tl.fromTo(
        card2Ref.current,
        { x: -50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'back.out(1.2)'
        },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return { containerRef, headingRef, textRef, card1Ref, card2Ref }
}
