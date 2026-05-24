// Path: src/hooks/useThreeInOneAnimations.ts

import { useEffect, useRef, useState } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadGsap } from '@/lib/gsap/loadGsap'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

type GsapTweenVars = NonNullable<
  Parameters<Awaited<ReturnType<typeof loadGsap>>['to']>[1]
>

const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useThreeInOneAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

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

        const setupIntro = () => {
          const intro = q('.gsap-three-intro')[0]
          const introTl = gsap.timeline({
            id: 'three-in-one-intro',
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
            '.gsap-three-eyebrow',
            { x: -32, autoAlpha: 0, willChange: 'transform, opacity' },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'willChange'
            }
          )

          addIntroTween(
            '.gsap-three-title',
            {
              y: 32,
              autoAlpha: 0,
              scale: 0.97,
              willChange: 'transform, opacity'
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.95,
              ease: 'power3.out',
              clearProps: 'willChange'
            },
            '-=0.4'
          )

          addIntroTween(
            '.gsap-three-subtitle',
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

          void createGsapDevTools({
            animation: introTl,
            id: 'three-in-one-intro'
          })
        }

        const setupStepPanels = (
          panels: HTMLElement[],
          shouldUpdateActiveStep: boolean
        ) => {
          panels.forEach((panel, stepIndex) => {
            const direction =
              stepIndex === 0 ? 'left'
              : stepIndex === 1 ? 'right'
              : 'up'
            const offset = 56

            const fromX =
              direction === 'left' ? -offset
              : direction === 'right' ? offset
              : 0

            const fromY = direction === 'up' ? offset : 0

            const tl = gsap.timeline({
              id: `three-in-one-panel-${stepIndex}`,
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                once: true,
                toggleActions: 'play none none none',
                onEnter: () => {
                  if (shouldUpdateActiveStep) setActiveStep(stepIndex)
                },
                onEnterBack: () => {
                  if (shouldUpdateActiveStep) setActiveStep(stepIndex)
                }
              }
            })

            const addPanelTween = (
              selector: string,
              fromVars: GsapTweenVars,
              toVars: GsapTweenVars,
              position?: string
            ) => {
              const targets = panel.querySelectorAll(selector)
              if (!targets.length) return

              if (position) {
                tl.fromTo(targets, fromVars, toVars, position)
                return
              }

              tl.fromTo(targets, fromVars, toVars)
            }

            addPanelTween(
              '.gsap-step-eyebrow',
              {
                x: fromX,
                y: fromY,
                autoAlpha: 0,
                willChange: 'transform, opacity'
              },
              {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'willChange'
              }
            )

            addPanelTween(
              '.gsap-step-title',
              {
                x: fromX * 0.6,
                y: fromY,
                autoAlpha: 0,
                willChange: 'transform, opacity'
              },
              {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'willChange'
              },
              '-=0.5'
            )

            addPanelTween(
              '.gsap-step-desc',
              {
                x: fromX * 0.4,
                y: fromY * 0.7,
                autoAlpha: 0,
                willChange: 'transform, opacity'
              },
              {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'willChange'
              },
              '-=0.5'
            )

            addPanelTween(
              '.gsap-step-icon',
              {
                scale: 0.4,
                rotation: -15,
                autoAlpha: 0,
                willChange: 'transform, opacity'
              },
              {
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                clearProps: 'willChange'
              },
              '-=0.4'
            )
          })
        }

        const desktopStory = q('.gsap-three-desktop')[0]
        const desktopPanels = q('.gsap-desktop-step-panel')

        setupIntro()
        setupStepPanels(desktopPanels, true)

        if (!desktopStory || !desktopPanels.length) {
          queueRefresh()
          return
        }

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

  return { containerRef, activeStep }
}
