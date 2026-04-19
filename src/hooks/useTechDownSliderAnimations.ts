// Path: src/hooks/useTechDownSliderAnimations.ts
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useTechDownSliderAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = gsap.matchMedia()

      reduce.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.gsap-tech-eyebrow',
            '.gsap-tech-title',
            '.gsap-tech-subtitle',
            '.gsap-tech-slider',
            '.gsap-tech-card'
          ],
          { autoAlpha: 1, x: 0, y: 0, scale: 1 }
        )
      })

      reduce.add('(prefers-reduced-motion: no-preference)', () => {
        // ─── INTRO HEADER ────────────────────────────────────────
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.gsap-tech-intro',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        introTl
          .fromTo(
            '.gsap-tech-eyebrow',
            { x: -28, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
          )
          .fromTo(
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
          .fromTo(
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
        gsap.fromTo(
          '.gsap-tech-slider',
          { y: 48, autoAlpha: 0, scale: 0.97 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gsap-tech-slider',
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // ─── DRAG HANDLE PROMPT (BJ Fogg prompt — only first time) ─
        gsap.fromTo(
          '.gsap-tech-handle',
          { scale: 1 },
          {
            scale: 1.06,
            duration: 0.65,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3,
            scrollTrigger: {
              trigger: '.gsap-tech-slider',
              start: 'top 60%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )

        // ─── CONTENT CARD ────────────────────────────────────────
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.gsap-tech-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        cardTl
          .fromTo(
            '.gsap-tech-card',
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out'
            }
          )
          .fromTo(
            '.gsap-tech-status-badge',
            { x: -24, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.5'
          )
          .fromTo(
            '.gsap-tech-card-title',
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
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
          .fromTo(
            '.gsap-tech-stat',
            { x: 16, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            '.gsap-tech-progress',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, ease: 'power3.out' },
            '-=0.3'
          )
      })
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
      if (previousRef.current === isDryView) return
      const direction = isDryView ? 1 : -1
      previousRef.current = isDryView

      const targets = [
        selectors.badge,
        selectors.title,
        selectors.desc,
        selectors.stat
      ]

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
