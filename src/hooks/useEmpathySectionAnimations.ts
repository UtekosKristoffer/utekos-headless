// Path: src/hooks/useEmpathySectionAnimations.ts
import { useEffect, useRef } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

type GsapTweenVars = NonNullable<
  Parameters<Awaited<ReturnType<typeof loadScrollTrigger>>['gsap']['to']>[1]
>

const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useEmpathySectionAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let cancelled = false

    const mountAnimation = async () => {
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
        const revealSelectors = [
          '.gsap-empathy-eyebrow',
          '.gsap-empathy-eyebrow-bar',
          '.gsap-empathy-word',
          '.gsap-empathy-para1',
          '.gsap-empathy-quote-bar',
          '.gsap-empathy-quote',
          '.gsap-empathy-para2',
          '.gsap-empathy-cta-text',
          '.gsap-empathy-cta-arrow',
          '.gsap-empathy-image-wrap',
          '.gsap-empathy-image-overlay'
        ]

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
          const targets = revealSelectors.flatMap(selector => q(selector))
          if (!targets.length) return

          gsap.set(targets, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            yPercent: 0,
            scale: 1,
            rotation: 0,
            filter: 'blur(0px)'
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
          // Master timeline tied to viewport entry
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

          // 1. Eyebrow — slide from LEFT + underline grow
          addFromTo(
            '.gsap-empathy-eyebrow',
            { x: -36, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
          )
          addFromTo(
            '.gsap-empathy-eyebrow-bar',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.5'
          )

          // 2. H2 — curtain-up reveal
          addFromTo(
            '.gsap-empathy-word',
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.85,
              stagger: 0.05,
              ease: 'power4.out'
            },
            '-=0.5'
          )

          // 3. First paragraph body — fade in
          addFromTo(
            '.gsap-empathy-para1',
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            },
            '-=0.7'
          )

          // 4. Quote — slide from RIGHT + accent bar grow from TOP
          addFromTo(
            '.gsap-empathy-quote-bar',
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          )
          addFromTo(
            '.gsap-empathy-quote',
            { x: 50, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.6'
          )

          // 5. Second paragraph — blur-to-focus
          addFromTo(
            '.gsap-empathy-para2',
            { autoAlpha: 0, y: 14, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power3.out'
            },
            '-=0.4'
          )

          // 6. CTA — arrow slide-in
          addFromTo(
            '.gsap-empathy-cta-text',
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5 },
            '-=0.3'
          )
          addFromTo(
            '.gsap-empathy-cta-arrow',
            { x: -16, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.5'
          )

          // 7. Image column — fade + scale-down + scroll-linked parallax
          const imageWrap = q('.gsap-empathy-image-wrap')
          if (imageWrap.length) {
            gsap.fromTo(
              imageWrap,
              { autoAlpha: 0, scale: 1.04 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: container,
                  start: 'top 92%',
                  once: true,
                  toggleActions: 'play none none none'
                }
              }
            )
          }

          // Image overlay quote
          addFromTo(
            '.gsap-empathy-image-overlay',
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
            '-=1.2'
          )

          void createGsapDevTools({
            animation: tl,
            id: 'skreddersy-empathy'
          })

          queueRefresh()

          const image = q('.gsap-empathy-image')
          if (!image.length) return

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

    void mountAnimation()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return containerRef
}
