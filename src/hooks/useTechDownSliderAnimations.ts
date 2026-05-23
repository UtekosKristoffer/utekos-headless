// Path: src/hooks/useTechDownSliderAnimations.ts
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const TABLET_MOBILE_QUERY =
  '(prefers-reduced-motion: no-preference) and (max-width: 1279px)'
const DESKTOP_QUERY =
  '(prefers-reduced-motion: no-preference) and (min-width: 1280px)'

export function useTechDownSliderAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const q = gsap.utils.selector(container)
      const media = gsap.matchMedia(container)
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

        gsap.set(
          targets,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            filter: 'blur(0px)'
          }
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
        // ─── INTRO HEADER ────────────────────────────────────────
        const intro = q('.gsap-tech-intro')[0]
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
          '.gsap-tech-eyebrow',
          { x: -28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
        )
        addIntroTween(
          '.gsap-tech-title',
          { y: 36, autoAlpha: 0, scale: 0.97 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
          },
          '-=0.4'
        )
        addIntroTween(
          '.gsap-tech-subtitle',
          { autoAlpha: 0, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out'
          },
          '-=0.6'
        )

        // ─── SLIDER CARD ─────────────────────────────────────────
        const sliderElement = q('.gsap-tech-slider')[0]
        if (sliderElement) {

          gsap.fromTo(
            sliderElement,
            { y: 48, autoAlpha: 0, scale: 0.97 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sliderElement,
                start: 'top 92%',
                once: true,
                toggleActions: 'play none none none'
              }
            }
          )
        }

        // ─── DRAG HANDLE PROMPT (BJ Fogg prompt — only first time) ─
        const handleElement = q('.gsap-tech-handle')[0]
        if (handleElement && sliderElement) {

          gsap.fromTo(
            handleElement,
            { scale: 1 },
            {
              scale: 1.06,
              duration: 0.65,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 3,
              scrollTrigger: {
                trigger: sliderElement,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
              }
            }
          )
        }

        // ─── CONTENT CARD ────────────────────────────────────────
        const card = q('.gsap-tech-card')
        const cardTrigger = card[0] ?? container
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardTrigger,
            start: 'top 92%',
            once: true,
            toggleActions: 'play none none none'
          }
        })

        const addCardTween = (
          selector: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars,
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
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out'
          }
        )
        addCardTween(
          '.gsap-tech-status-badge',
          { x: -24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        )
        addCardTween(
          '.gsap-tech-card-title',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        addCardTween(
          '.gsap-tech-card-desc',
          { y: 16, autoAlpha: 0, filter: 'blur(4px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out'
          },
          '-=0.4'
        )
        addCardTween(
          '.gsap-tech-stat',
          { x: 16, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        addCardTween(
          '.gsap-tech-progress',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1, ease: 'power3.out' },
          '-=0.3'
        )

        queueRefresh()
      })

      return () => {
        refreshFrames.forEach(frame => window.cancelAnimationFrame(frame))
        media.revert()
      }
    },
    { scope: containerRef }
  )

  return containerRef
}

/**
 * Animate the content swap when slider position changes between dry/wet.
 * Called from the component when isDryView toggles.
 */
export function useTechDownContentSwap(
  isDryView: boolean,
  selectors: { badge: string; title: string; desc: string; stat: string }
) {
  const previousRef = useRef<boolean | null>(null)

  useGSAP(
    () => {
      if (previousRef.current === null) {
        previousRef.current = isDryView
        return
      }

      if (previousRef.current === isDryView) return

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
          filter: 'blur(3px)'
        },
        {
          x: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
          overwrite: 'auto'
        }
      )
    },
    { dependencies: [isDryView] }
  )
}
