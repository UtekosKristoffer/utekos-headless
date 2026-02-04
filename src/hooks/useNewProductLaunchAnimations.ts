import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useNewProductLaunchAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(
        '.gsap-image-col',
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }
      )

      tl.fromTo(
        '.gsap-content-col',
        { x: 30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo(
        '.gsap-item',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )

      tl.fromTo(
        '.gsap-feature',
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        },
        '-=0.4'
      )
    },
    { scope: containerRef }
  )

  return containerRef
}
