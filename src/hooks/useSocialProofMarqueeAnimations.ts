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
const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useSocialProofMarqueeAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let cancelled = false

    const mountReveal = async () => {
      const { gsap, ScrollTrigger } = await loadScrollTrigger()
      if (cancelled || !containerRef.current) {
        return
      }

      const context = gsap.context(() => {
        const container = containerRef.current
        if (!container) return

        const q = gsap.utils.selector(container)
        const media = gsap.matchMedia()
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

        const setVisible = () => {
          const targets = [
            '.gsap-sp-rating-pill',
            '.gsap-sp-title',
            '.gsap-sp-subtitle',
            '.gsap-sp-track'
          ].flatMap(selector => q(selector))

          if (!targets.length) return

          gsap.set(targets, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            clearProps: 'willChange'
          })
        }

        media.add('(prefers-reduced-motion: reduce)', () => {
          setVisible()
        })

        media.add(TABLET_MOBILE_QUERY, () => {
          setVisible()
          queueRefresh()
        })

        media.add(DESKTOP_QUERY, () => {
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
              filter: 'blur(6px)',
              willChange: 'transform, opacity, filter'
            },
            {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.5'
          )

          const track = q('.gsap-sp-track')
          const marquee = q('.gsap-sp-marquee')[0]
          if (track.length) {
            const trackElement = track[0]!

            gsap.fromTo(
              track,
              { autoAlpha: 0, y: 20, willChange: 'transform, opacity' },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'willChange',
                scrollTrigger: {
                  trigger: marquee ?? trackElement,
                  start: 'top 95%',
                  once: true,
                  toggleActions: 'play none none none'
                }
              }
            )
          }

          void createGsapDevTools({
            animation: headerTl,
            id: 'skreddersy-social-proof-header'
          })

          queueRefresh()
        })

        return () => {
          refreshFrames.forEach(frame => window.cancelAnimationFrame(frame))
          media.revert()
        }
      }, containerRef.current)

      cleanup = () => {
        context.revert()
      }
    }

    void mountReveal()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let cancelled = false
    let raf1: number | null = null
    let raf2: number | null = null
    let resizeTimer: number | null = null
    let cleanupListeners: (() => void) | null = null
    let marqueeTween: MarqueeTween | null = null

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

      cleanup = () => {
        window.removeEventListener('resize', onResize)
      }
    }

    let cleanup: (() => void) | null = null
    void mountMarquee()

    return () => {
      cancelled = true
      cleanup?.()
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
