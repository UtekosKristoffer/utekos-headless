// Path: src/hooks/useSocialProofMarqueeAnimations.ts

import { useEffect, useRef } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadGsap } from '@/lib/gsap/loadGsap'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

type GsapTweenVars = NonNullable<
  Parameters<Awaited<ReturnType<typeof loadGsap>>['to']>[1]
>

interface MarqueeTween {
  pause: () => void
  resume: () => void
  kill: () => void
}

const PIXELS_PER_SECOND = 50
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useSocialProofMarqueeAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cleanup: (() => void) | null = null
    let cancelled = false
    const desktopMedia = window.matchMedia(DESKTOP_QUERY)

    const mountDesktopReveal = async () => {
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

        const header = q('.gsap-sp-header')[0]
        const headerTl = gsap.timeline({
          id: 'skreddersy-social-proof-header',
          scrollTrigger: {
            trigger: header ?? container,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none'
          }
        })

        const addHeaderTween = (
          selector: string,
          fromVars: GsapTweenVars,
          toVars: GsapTweenVars,
          position?: string
        ) => {
          const targets = q(selector)
          if (!targets.length) return

          if (position) {
            headerTl.fromTo(targets, fromVars, toVars, position)
            return
          }

          headerTl.fromTo(targets, fromVars, toVars)
        }

        addHeaderTween(
          '.gsap-sp-rating-pill',
          {
            y: 20,
            autoAlpha: 0,
            scale: 0.9,
            willChange: 'transform, opacity'
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            clearProps: 'willChange'
          }
        )

        addHeaderTween(
          '.gsap-sp-title',
          { y: 32, autoAlpha: 0, willChange: 'transform, opacity' },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.4'
        )

        addHeaderTween(
          '.gsap-sp-subtitle',
          {
            y: 16,
            autoAlpha: 0,
            willChange: 'transform, opacity'
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'willChange'
          },
          '-=0.5'
        )

        const track = q('.gsap-sp-track')
        const marquee = q('.gsap-sp-marquee')[0]
        if (track.length) {
          const trackElement = track[0]!

          const trackTl = gsap.timeline({
            id: 'skreddersy-social-proof-track',
            scrollTrigger: {
              trigger: marquee ?? trackElement,
              start: 'top 95%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          trackTl.fromTo(
            track,
            { autoAlpha: 0, y: 20, willChange: 'transform, opacity' },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              clearProps: 'willChange'
            }
          )
        }

        void createGsapDevTools({
          animation: headerTl,
          id: 'skreddersy-social-proof-header'
        })

        queueRefresh()

        return () => {
          refreshFrames.forEach(frame => window.cancelAnimationFrame(frame))
        }
      }, containerRef.current)

      cleanup = () => {
        context.revert()
        cleanup = null
      }
    }

    const unmountDesktopReveal = () => {
      cleanup?.()
    }

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        void mountDesktopReveal()
        return
      }

      unmountDesktopReveal()
    }

    if (desktopMedia.matches) {
      void mountDesktopReveal()
    }

    desktopMedia.addEventListener('change', handleDesktopChange)

    return () => {
      cancelled = true
      desktopMedia.removeEventListener('change', handleDesktopChange)
      unmountDesktopReveal()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let cancelled = false
    let raf1: number | null = null
    let raf2: number | null = null
    let resizeTimer: number | null = null
    let cleanupListeners: (() => void) | null = null
    let cleanupResize: (() => void) | null = null
    let marqueeTween: MarqueeTween | null = null
    let observer: IntersectionObserver | null = null

    const mountMarquee = async () => {
      const gsap = await loadGsap()
      if (cancelled || !trackRef.current) {
        return
      }

      const init = () => {
        cleanupListeners?.()
        cleanupListeners = null

        const activeTrack = trackRef.current
        if (!activeTrack) {
          return
        }

        const halfWidth = activeTrack.scrollWidth / 2
        if (halfWidth <= 0) return

        const duration = halfWidth / PIXELS_PER_SECOND
        const wrap = gsap.utils.wrap(-halfWidth, 0)

        gsap.set(activeTrack, { x: 0 })

        marqueeTween?.kill()
        marqueeTween = gsap.to(activeTrack, {
          x: `-=${halfWidth}`,
          duration,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(wrap)
          }
        })

        const marquee =
          containerRef.current?.querySelector<HTMLElement>('.gsap-sp-marquee')
        if (!marquee) return

        const pause = () => marqueeTween?.pause()
        const resume = () => marqueeTween?.resume()

        marquee.addEventListener('mouseenter', pause)
        marquee.addEventListener('mouseleave', resume)
        marquee.addEventListener('touchstart', pause, { passive: true })
        marquee.addEventListener('touchend', resume, { passive: true })
        marquee.addEventListener('focusin', pause)
        marquee.addEventListener('focusout', resume)

        cleanupListeners = () => {
          marquee.removeEventListener('mouseenter', pause)
          marquee.removeEventListener('mouseleave', resume)
          marquee.removeEventListener('touchstart', pause)
          marquee.removeEventListener('touchend', resume)
          marquee.removeEventListener('focusin', pause)
          marquee.removeEventListener('focusout', resume)
        }
      }

      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(init)
      })

      const onResize = () => {
        if (resizeTimer) window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(() => {
          marqueeTween?.kill()
          marqueeTween = null
          init()
        }, 200)
      }

      window.addEventListener('resize', onResize, { passive: true })

      cleanupResize = () => {
        window.removeEventListener('resize', onResize)
      }
    }

    observer = new IntersectionObserver(
      entries => {
        const shouldStart = entries.some(entry => entry.isIntersecting)
        if (!shouldStart) return

        observer?.disconnect()
        observer = null
        void mountMarquee()
      },
      {
        root: null,
        rootMargin: '400px 0px',
        threshold: 0
      }
    )

    observer.observe(container)

    return () => {
      cancelled = true
      observer?.disconnect()
      cleanupResize?.()

      if (raf1 !== null) window.cancelAnimationFrame(raf1)
      if (raf2 !== null) window.cancelAnimationFrame(raf2)
      if (resizeTimer) window.clearTimeout(resizeTimer)

      cleanupListeners?.()
      marqueeTween?.kill()
      marqueeTween = null
    }
  }, [])

  return { containerRef, trackRef }
}
