// Path: src/hooks/useEmpathySectionAnimations.ts

import { useEffect, useRef } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

type GsapTweenVars = NonNullable<
  Parameters<Awaited<ReturnType<typeof loadScrollTrigger>>['gsap']['to']>[1]
>

const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useEmpathySectionAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cleanup: (() => void) | null = null
    let cancelled = false
    const desktopMedia = window.matchMedia(DESKTOP_QUERY)

    const mountDesktopAnimation = async () => {
      if (cleanup || !desktopMedia.matches) {
        return
      }

      const { gsap, ScrollTrigger } = await loadScrollTrigger()
      if (cancelled || !containerRef.current || !desktopMedia.matches) {
        return
      }

      const context = gsap.context(() => {
        const container = containerRef.current
        if (!container) return

        const q = gsap.utils.selector(container)
        const refreshFrames: number[] = []

        const queueRefresh = () => {
          const firstFrame = window.requestAnimationFrame(() => {
            const secondFrame = window.requestAnimationFrame(() => {
              ScrollTrigger.refresh(true)
            })
            refreshFrames.push(secondFrame)
          })
          refreshFrames.push(firstFrame)
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none'
          }
        })

        const addFromTo = (
          selector: string,
          fromVars: GsapTweenVars,
          toVars: GsapTweenVars,
          position?: string
        ) => {
          const targets = q(selector)
          if (!targets.length) return

          if (position) {
            tl.fromTo(targets, fromVars, toVars, position)
            return
          }

          tl.fromTo(targets, fromVars, toVars)
        }

        addFromTo(
          '.gsap-empathy-eyebrow',
          { x: -36, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'willChange'
          }
        )

        addFromTo(
          '.gsap-empathy-eyebrow-bar',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            willChange: 'transform'
          },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.5'
        )

        addFromTo(
          '.gsap-empathy-word',
          { yPercent: 110, willChange: 'transform' },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.05,
            ease: 'power4.out',
            clearProps: 'willChange'
          },
          '-=0.5'
        )

        addFromTo(
          '.gsap-empathy-para1',
          { autoAlpha: 0, y: 10, willChange: 'transform, opacity' },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.7'
        )

        addFromTo(
          '.gsap-empathy-quote-bar',
          {
            scaleY: 0,
            transformOrigin: 'top center',
            willChange: 'transform'
          },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.4'
        )

        addFromTo(
          '.gsap-empathy-quote',
          { x: 50, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.6'
        )

        addFromTo(
          '.gsap-empathy-para2',
          { autoAlpha: 0, y: 14, willChange: 'transform, opacity' },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.4'
        )

        addFromTo(
          '.gsap-empathy-cta-text',
          { autoAlpha: 0, willChange: 'opacity' },
          {
            autoAlpha: 1,
            duration: 0.5,
            clearProps: 'willChange'
          },
          '-=0.3'
        )

        addFromTo(
          '.gsap-empathy-cta-arrow',
          { x: -16, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.5'
        )

        const imageWrap = q('.gsap-empathy-image-wrap')
        if (imageWrap.length) {
          gsap.fromTo(
            imageWrap,
            { autoAlpha: 0, scale: 1.04, willChange: 'transform, opacity' },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              clearProps: 'willChange',
              scrollTrigger: {
                trigger: container,
                start: 'top 92%',
                once: true,
                toggleActions: 'play none none none'
              }
            }
          )
        }

        addFromTo(
          '.gsap-empathy-image-overlay',
          { y: 16, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=1.2'
        )

        void createGsapDevTools({
          animation: tl,
          id: 'skreddersy-empathy'
        })

        queueRefresh()

        const image = q('.gsap-empathy-image')
        if (image.length) {
          gsap.to(image, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          })
        }

        return () => {
          refreshFrames.forEach(frame => window.cancelAnimationFrame(frame))
        }
      }, containerRef.current)

      cleanup = () => {
        context.revert()
        cleanup = null
      }
    }

    const unmountDesktopAnimation = () => {
      cleanup?.()
    }

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        void mountDesktopAnimation()
        return
      }

      unmountDesktopAnimation()
    }

    if (desktopMedia.matches) {
      void mountDesktopAnimation()
    }

    desktopMedia.addEventListener('change', handleDesktopChange)

    return () => {
      cancelled = true
      desktopMedia.removeEventListener('change', handleDesktopChange)
      unmountDesktopAnimation()
    }
  }, [])

  return containerRef
}
