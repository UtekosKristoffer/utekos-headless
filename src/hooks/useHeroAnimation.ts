import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' }
      })

      tl.set('.gsap-badge-container', { autoAlpha: 1 })

      tl.fromTo(
        '.gsap-badge-bg',
        { width: 0, autoAlpha: 0 },
        { width: '100%', autoAlpha: 1, duration: 1.2, ease: 'power3.inOut' }
      ).fromTo(
        '.gsap-badge-content',
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        '-=0.4'
      )

      tl.fromTo(
        '.gsap-char',
        {
          yPercent: 120,
          rotationX: -50,
          opacity: 0
        },
        {
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power4.out'
        },
        '-=1.0'
      )

      tl.fromTo(
        '.gsap-subtitle',
        { yPercent: 100, filter: 'blur(10px)', autoAlpha: 0 },
        {
          yPercent: 0,
          filter: 'blur(0px)',
          autoAlpha: 1,
          duration: 1.4
        },
        '-=1.2'
      )

      tl.fromTo(
        '.gsap-desc',
        { y: 20, autoAlpha: 0, filter: 'blur(5px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out'
        },
        '-=1.0'
      )

      tl.fromTo(
        '.gsap-highlight',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          transformOrigin: 'left center'
        },
        '-=0.8'
      )

      tl.fromTo(
        '.gsap-chevron',
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
        '-=0.6'
      )
    },
    { scope: containerRef }
  )

  return containerRef
}
