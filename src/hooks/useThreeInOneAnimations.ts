// Path: src/hooks/useThreeInOneAnimations.ts
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useThreeInOneAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

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
          '.gsap-three-eyebrow',
          '.gsap-three-title',
          '.gsap-three-subtitle',
          '.gsap-step-eyebrow',
          '.gsap-step-title',
          '.gsap-step-desc',
          '.gsap-step-icon',
          '.gsap-step-badge'
        ].flatMap(selector => q(selector))

        if (!targets.length) return

        gsap.set(targets, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)'
        })
      }

      const setupIntro = () => {
        const intro = q('.gsap-three-intro')[0]
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: intro ?? container,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none'
          }
        })

        const addIntroTween = (
          selector: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars,
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
          { x: -32, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
        )
        addIntroTween(
          '.gsap-three-title',
          { y: 32, autoAlpha: 0, scale: 0.97 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out'
          },
          '-=0.4'
        )
        addIntroTween(
          '.gsap-three-subtitle',
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
            fromVars: gsap.TweenVars,
            toVars: gsap.TweenVars,
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
            { x: fromX, y: fromY, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out'
            }
          )
          addPanelTween(
            '.gsap-step-title',
            { x: fromX * 0.6, y: fromY, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: 'power3.out'
            },
            '-=0.5'
          )
          addPanelTween(
            '.gsap-step-desc',
            { x: fromX * 0.4, y: fromY * 0.7, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power3.out'
            },
            '-=0.5'
          )
          addPanelTween(
            '.gsap-step-icon',
            { scale: 0.4, rotation: -15, autoAlpha: 0 },
            {
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'back.out(1.7)'
            },
            '-=0.4'
          )
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
        const desktopStory = q('.gsap-three-desktop')[0]
        const desktopPanels = q('.gsap-desktop-step-panel')

        setupIntro()
        setupStepPanels(desktopPanels, true)

        if (!desktopStory || !desktopPanels.length) {
          queueRefresh()
          return
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

  return { containerRef, activeStep }
}
