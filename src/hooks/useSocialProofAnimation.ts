import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useSocialProofAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-heading-char',
        {
          yPercent: 100,
          rotateX: -90,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out'
        }
      )

      tl.fromTo(
        textRef.current,
        {
          y: 20,
          autoAlpha: 0,
          filter: 'blur(5px)'
        },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.8'
      )

      tl.fromTo(
        '.gsap-highlight-bg',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          transformOrigin: 'left center'
        },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-underline',
        { width: '0%' },
        {
          width: '100%',
          duration: 1,
          ease: 'expo.out'
        },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return { containerRef, titleRef, textRef }
}
