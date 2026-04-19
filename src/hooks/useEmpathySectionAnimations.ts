// Path: src/hooks/useEmpathySectionAnimations.ts
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function useEmpathySectionAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = gsap.matchMedia()

      reduce.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gsap-empathy-anim', { autoAlpha: 1, x: 0, y: 0, scale: 1 })
      })

      reduce.add('(prefers-reduced-motion: no-preference)', () => {
        // Master timeline tied to viewport entry
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        })

        // 1. Eyebrow — slide from LEFT + underline grow
        tl.fromTo(
          '.gsap-empathy-eyebrow',
          { x: -36, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
        ).fromTo(
          '.gsap-empathy-eyebrow-bar',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.5'
        )

        // 2. H2 — word-by-word "curtain-up" reveal
        tl.fromTo(
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

        // 3. Drop-cap D — scale + rotate
        tl.fromTo(
          '.gsap-empathy-dropcap',
          {
            scale: 0.4,
            rotation: -8,
            autoAlpha: 0,
            transformOrigin: 'left bottom'
          },
          {
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'back.out(1.6)'
          },
          '-=0.4'
        )

        // 4. First paragraph body — letter-spacing release
        tl.fromTo(
          '.gsap-empathy-para1',
          { autoAlpha: 0, letterSpacing: '0.06em' },
          {
            autoAlpha: 1,
            letterSpacing: '0em',
            duration: 1,
            ease: 'power2.out'
          },
          '-=0.7'
        )

        // 5. Quote — slide from RIGHT + accent bar grow from TOP
        tl.fromTo(
          '.gsap-empathy-quote-bar',
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        ).fromTo(
          '.gsap-empathy-quote',
          { x: 50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )

        // 6. Second paragraph — blur-to-focus
        tl.fromTo(
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

        // 7. CTA — underline grow + arrow slide-in
        tl.fromTo(
          '.gsap-empathy-cta-text',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          '-=0.3'
        )
          .fromTo(
            '.gsap-empathy-cta-underline',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8, ease: 'power3.out' },
            '<'
          )
          .fromTo(
            '.gsap-empathy-cta-arrow',
            { x: -16, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.5'
          )

        // 8. Image column — fade + scale-down + scroll-linked parallax
        gsap.fromTo(
          '.gsap-empathy-image-wrap',
          { autoAlpha: 0, scale: 1.04 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        gsap.to('.gsap-empathy-image', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        })

        // Image overlay quote
        tl.fromTo(
          '.gsap-empathy-image-overlay',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          '-=1.2'
        )
      })
    },
    { scope: containerRef }
  )

  return containerRef
}
