// Path: src/hooks/useSocialProofMarqueeAnimations.ts
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PIXELS_PER_SECOND = 50
const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useSocialProofMarqueeAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null)

  // ── Header & marquee fade-in (scroll-triggered) ──────────────────
  useGSAP(
    () => {
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

        gsap.set(
          targets,
          { autoAlpha: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
        )
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
          scrollTrigger: {
            trigger: header ?? container,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none'
          }
        })

        const addHeaderTween = (
          selector: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars,
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
          { y: 20, autoAlpha: 0, scale: 0.9 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)'
          }
        )
        addHeaderTween(
          '.gsap-sp-title',
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        addHeaderTween(
          '.gsap-sp-subtitle',
          { y: 16, autoAlpha: 0, filter: 'blur(6px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out'
          },
          '-=0.5'
        )

        const track = q('.gsap-sp-track')
        const marquee = q('.gsap-sp-marquee')[0]
        if (track.length) {
          const trackElement = track[0]!

          gsap.fromTo(
            track,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: marquee ?? trackElement,
                start: 'top 95%',
                once: true,
                toggleActions: 'play none none none'
              }
            }
          )
        }

        queueRefresh()
      })

      return () => {
        refreshFrames.forEach(frame => window.cancelAnimationFrame(frame))
        media.revert()
      }
    },
    { scope: containerRef }
  )

  // ── Continuous marquee — seamless infinite loop ──────────────────
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let cleanupListeners: (() => void) | undefined

    // Wait one paint frame so widths are correct (after fonts/images)
    const init = () => {
      cleanupListeners?.()
      cleanupListeners = undefined

      // Half of total track width — exactly where the duplicate set begins.
      // We use `scrollWidth / 2` because the children are duplicated 1:1
      // and each card carries its own right-margin (no flex gap), so the
      // halves are identical width with no off-by-one gap between them.
      const halfWidth = track.scrollWidth / 2
      if (halfWidth <= 0) return

      const duration = halfWidth / PIXELS_PER_SECOND

      // Wrap modifier keeps `x` always inside [-halfWidth, 0] for a perfect
      // seamless loop regardless of how long the user lets it run.
      const wrap = gsap.utils.wrap(-halfWidth, 0)

      gsap.set(track, { x: 0 })

      marqueeTweenRef.current = gsap.to(track, {
        x: `-=${halfWidth}`,
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(wrap)
        }
      })

      const marquee = containerRef.current?.querySelector('.gsap-sp-marquee')
      if (!marquee) return

      const pause = () => marqueeTweenRef.current?.pause()
      const resume = () => marqueeTweenRef.current?.resume()

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

    // Wait two RAFs so layout (incl. images/fonts) is settled
    let raf2: number | null = null
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(init)
    })

    // Recompute on resize so width changes don't break the loop
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        marqueeTweenRef.current?.kill()
        marqueeTweenRef.current = null
        init()
      }, 200)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
      window.removeEventListener('resize', onResize)
      if (resizeTimer) clearTimeout(resizeTimer)
      cleanupListeners?.()
      marqueeTweenRef.current?.kill()
      marqueeTweenRef.current = null
    }
  }, [])

  return { containerRef, trackRef }
}
