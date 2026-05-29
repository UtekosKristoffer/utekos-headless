// Path: src/hooks/useTechDownSliderAnimations.ts
import { useEffect, useRef } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadGsap } from '@/lib/gsap/loadGsap'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

type GsapTweenVars = NonNullable<
  Parameters<Awaited<ReturnType<typeof loadGsap>>['to']>[1]
>

const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useTechDownSliderAnimations() {
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
            '.gsap-tech-eyebrow',
            '.gsap-tech-title',
            '.gsap-tech-subtitle',
            '.gsap-tech-slider',
            '.gsap-tech-card',
            '.gsap-tech-status-badge',
            '.gsap-tech-card-title',
            '.gsap-tech-card-desc',
            '.gsap-tech-stat',
            '.gsap-tech-progress'
          ].flatMap(selector => q(selector))

          if (!targets.length) return

          gsap.set(targets, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
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
          const intro = q('.gsap-tech-intro')[0]
          const introTl = gsap.timeline({
            id: 'techdown-slider-intro',
            scrollTrigger: {
              trigger: intro ?? container,
              start: 'top 92%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          const addIntroTween = (
            selector: string,
            fromVars: GsapTweenVars,
            toVars: GsapTweenVars,
            position?: string
          ) => {
            const targets = q(selector)
            if (!targets.length) return

            if (position) {
              introTl.fromTo(targets, fromVars, toVars, position)
              return
            }

            introTl.fromTo(targets, fromVars, toVars)
          }

          addIntroTween(
            '.gsap-tech-eyebrow',
            { x: -28, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'willChange'
            }
          )
          addIntroTween(
            '.gsap-tech-title',
            {
              y: 36,
              autoAlpha: 0,
              scale: 0.97,
              willChange: 'transform, opacity'
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )
          addIntroTween(
            '.gsap-tech-subtitle',
            {
              autoAlpha: 0,
              filter: 'blur(8px)',
              willChange: 'opacity, filter'
            },
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.6'
          )

          const sliderElement = q('.gsap-tech-slider')[0]
          if (sliderElement) {
            const sliderTl = gsap.timeline({
              id: 'techdown-slider-reveal',
              scrollTrigger: {
                trigger: sliderElement,
                start: 'top 92%',
                once: true,
                toggleActions: 'play none none none'
              }
            })

            sliderTl.fromTo(
              sliderElement,
              {
                y: 48,
                autoAlpha: 0,
                scale: 0.97,
                willChange: 'transform, opacity'
              },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 1.1,
                ease: 'power3.out',
                clearProps: 'willChange'
              }
            )
          }

          const handleElement = q('.gsap-tech-handle')[0]
          if (handleElement && sliderElement) {
            const handleTl = gsap.timeline({
              id: 'techdown-slider-handle',
              scrollTrigger: {
                trigger: sliderElement,
                start: 'top 80%',
                once: true,
                toggleActions: 'play none none none'
              }
            })

            handleTl.fromTo(
              handleElement,
              { scale: 1 },
              {
                scale: 1.06,
                duration: 0.65,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 3
              }
            )
          }

          const card = q('.gsap-tech-card')
          const cardTrigger = card[0] ?? container
          const cardTl = gsap.timeline({
            id: 'techdown-slider-card',
            scrollTrigger: {
              trigger: cardTrigger,
              start: 'top 92%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          const addCardTween = (
            selector: string,
            fromVars: GsapTweenVars,
            toVars: GsapTweenVars,
            position?: string
          ) => {
            const targets = q(selector)
            if (!targets.length) return

            if (position) {
              cardTl.fromTo(targets, fromVars, toVars, position)
              return
            }

            cardTl.fromTo(targets, fromVars, toVars)
          }

          addCardTween(
            '.gsap-tech-card',
            { y: 32, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              clearProps: 'willChange'
            }
          )
          addCardTween(
            '.gsap-tech-status-badge',
            { x: -24, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.5'
          )
          addCardTween(
            '.gsap-tech-card-title',
            { y: 20, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )
          addCardTween(
            '.gsap-tech-card-desc',
            {
              y: 16,
              autoAlpha: 0,
              filter: 'blur(4px)',
              willChange: 'transform, opacity, filter'
            },
            {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )
          addCardTween(
            '.gsap-tech-stat',
            { x: 16, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )
          addCardTween(
            '.gsap-tech-progress',
            {
              scaleX: 0,
              transformOrigin: 'left center',
              willChange: 'transform'
            },
            {
              scaleX: 1,
              duration: 1,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.3'
          )

          void createGsapDevTools({
            animation: introTl,
            id: 'techdown-slider-intro'
          })
          void createGsapDevTools({
            animation: cardTl,
            id: 'techdown-slider-card'
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

    void mountAnimation()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return containerRef
}

export function useTechDownContentSwap(
  isDryView: boolean,
  selectors: { badge: string; title: string; desc: string; stat: string }
) {
  const previousRef = useRef<boolean | null>(null)

  useEffect(() => {
    let cancelled = false

    const runSwap = async () => {
      if (previousRef.current === null) {
        previousRef.current = isDryView
        return
      }

      if (previousRef.current === isDryView) return

      const gsap = await loadGsap()
      if (cancelled) {
        return
      }

      const direction = isDryView ? 1 : -1
      previousRef.current = isDryView

      const targets = [
        selectors.badge,
        selectors.title,
        selectors.desc,
        selectors.stat
      ].flatMap(selector => gsap.utils.toArray<HTMLElement>(selector))

      if (!targets.length) return

      gsap.fromTo(
        targets,
        {
          x: direction * 18,
          autoAlpha: 0,
          filter: 'blur(3px)',
          willChange: 'transform, opacity, filter'
        },
        {
          x: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
          overwrite: 'auto',
          clearProps: 'willChange'
        }
      )
    }

    void runSwap()

    return () => {
      cancelled = true
    }
  }, [
    isDryView,
    selectors.badge,
    selectors.desc,
    selectors.stat,
    selectors.title
  ])
}
