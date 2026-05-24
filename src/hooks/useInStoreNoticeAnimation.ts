import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useInStoreNoticeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoBoxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = containerRef.current
      const logoBox = logoBoxRef.current
      const content = contentRef.current

      if (!root || !logoBox || !content) return

      const highlights = gsap.utils.toArray<HTMLElement>(
        '.gsap-highlight',
        root
      )
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) {
        gsap.set([logoBox, content, ...highlights], {
          autoAlpha: 1,
          clearProps: 'transform'
        })

        return
      }

      gsap.set(logoBox, { y: 18, scale: 0.98, autoAlpha: 0 })
      gsap.set(content, { y: 18, autoAlpha: 0 })
      gsap.set(highlights, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: 'left center'
      })

      const timeline = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to(logoBox, { y: 0, scale: 1, autoAlpha: 1, duration: 0.64 })
        .to(content, { y: 0, autoAlpha: 1, duration: 0.72 }, '-=0.36')
        .to(
          highlights,
          { scaleX: 1, autoAlpha: 1, duration: 0.56, stagger: 0.05 },
          '-=0.36'
        )

      const playReveal = () => {
        if (timeline.progress() === 0) timeline.play()
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top 82%',
        once: true,
        onEnter: playReveal
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (root.getBoundingClientRect().top < window.innerHeight * 0.9) {
          playReveal()
        }
      })
    },
    { scope: containerRef }
  )

  return { containerRef, logoBoxRef, contentRef }
}
