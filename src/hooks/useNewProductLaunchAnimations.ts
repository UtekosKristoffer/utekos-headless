'use client'

import { useEffect, useRef } from 'react'

const animatedSelectors =
  '.gsap-image-col, .gsap-content-col, .gsap-item, .gsap-feature'

type GsapContext = {
  revert: () => void
}

export function useNewProductLaunchAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: GsapContext | null = null
    let cancelled = false

    const revealStaticContent = () => {
      const container = containerRef.current
      if (!container) return

      container
        .querySelectorAll<HTMLElement>(animatedSelectors)
        .forEach(element => {
          element.style.opacity = '1'
          element.style.transform = 'none'
          element.style.visibility = 'visible'
        })
    }

    const run = async () => {
      const container = containerRef.current
      if (!container) return

      let gsap: (typeof import('gsap'))['default']
      let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']

      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ])

        gsap = gsapModule.default
        ScrollTrigger = scrollTriggerModule.ScrollTrigger
      } catch {
        if (!cancelled) revealStaticContent()
        return
      }

      if (cancelled || !containerRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(container)
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
            trigger: container,
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
      }, container)
    }

    void run()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return containerRef
}
