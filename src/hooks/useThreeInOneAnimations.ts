// Path: src/hooks/useThreeInOneAnimations.ts
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useThreeInOneAnimations() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useGSAP(
    () => {
      const reduce = gsap.matchMedia()

      reduce.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.gsap-three-eyebrow',
            '.gsap-three-title',
            '.gsap-three-subtitle',
            '.gsap-step-eyebrow',
            '.gsap-step-title',
            '.gsap-step-desc',
            '.gsap-step-icon'
          ],
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0 }
        )
      })

      reduce.add('(prefers-reduced-motion: no-preference)', () => {
        // ─── INTRO HEADER ────────────────────────────────────────
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.gsap-three-intro',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        introTl
          .fromTo(
            '.gsap-three-eyebrow',
            { x: -32, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
          )
          .fromTo(
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
          .fromTo(
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

        // ─── PER-STEP PANELS ─────────────────────────────────────
        // Each panel triggers its own animations + sets activeStep
        const panels = gsap.utils.toArray<HTMLElement>('.gsap-step-panel')

        panels.forEach((panel, index) => {
          // Direction varies per step — left, right, up
          const direction =
            index === 0 ? 'left' : index === 1 ? 'right' : 'up'
          const offset = 56
          const fromX =
            direction === 'left'
              ? -offset
              : direction === 'right'
                ? offset
                : 0
          const fromY = direction === 'up' ? offset : 0

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top 65%',
              end: 'bottom 35%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => setActiveStep(index),
              onEnterBack: () => setActiveStep(index)
            }
          })

          tl.fromTo(
            panel.querySelectorAll('.gsap-step-eyebrow'),
            { x: fromX, y: fromY, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out'
            }
          )
            .fromTo(
              panel.querySelectorAll('.gsap-step-title'),
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
            .fromTo(
              panel.querySelectorAll('.gsap-step-desc'),
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
            .fromTo(
              panel.querySelectorAll('.gsap-step-icon'),
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

        // ─── DESKTOP STEP-NUMBER BADGE (mobile cards) ────────────
        gsap.utils.toArray<HTMLElement>('.gsap-step-badge').forEach(badge => {
          gsap.fromTo(
            badge,
            { scale: 0.6, rotation: -8, autoAlpha: 0 },
            {
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: badge,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })

        // ─── DESKTOP IMAGE PARALLAX ──────────────────────────────
        gsap.utils.toArray<HTMLElement>('.gsap-step-image').forEach(image => {
          gsap.to(image, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: image.closest('.gsap-step-panel') as HTMLElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          })
        })
      })
    },
    { scope: containerRef }
  )

  return { containerRef, activeStep }
}
