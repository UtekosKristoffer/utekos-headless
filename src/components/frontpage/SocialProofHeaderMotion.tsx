'use client'

import { useEffect } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

const HEADER_ID = 'social-proof-header'

function setVisible(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(
      '.gsap-heading-char, [data-social-proof-text], .gsap-highlight-bg, .gsap-underline'
    )
    .forEach(element => {
      element.style.opacity = '1'
      element.style.transform = ''
      element.style.willChange = ''
    })
}

export function SocialProofHeaderMotion() {
  useEffect(() => {
    const root = document.getElementById(HEADER_ID)
    if (!root) {
      return
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduceMotion) {
      setVisible(root)
      return
    }

    let cleanup: (() => void) | null = null
    let cancelled = false

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        observer.disconnect()

        const { gsap, ScrollTrigger } = await loadScrollTrigger()
        if (cancelled) {
          return
        }

        const context = gsap.context(() => {
          const chars = gsap.utils.toArray<HTMLElement>('.gsap-heading-char')
          const text = root.querySelector<HTMLElement>(
            '[data-social-proof-text]'
          )
          const highlights =
            gsap.utils.toArray<HTMLElement>('.gsap-highlight-bg')
          const underline = root.querySelector<HTMLElement>('.gsap-underline')

          gsap.set(chars, {
            autoAlpha: 0,
            rotateX: -34,
            yPercent: 100,
            willChange: 'transform, opacity'
          })

          if (text) {
            gsap.set(text, {
              autoAlpha: 0,
              y: 20,
              willChange: 'transform, opacity'
            })
          }

          gsap.set([...highlights, underline].filter(Boolean), {
            scaleX: 0,
            transformOrigin: 'left center',
            willChange: 'transform'
          })

          const timeline = gsap.timeline({
            id: HEADER_ID,
            scrollTrigger: {
              trigger: root,
              start: 'top 84%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          if (chars.length) {
            timeline.to(chars, {
              autoAlpha: 1,
              rotateX: 0,
              yPercent: 0,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.018,
              clearProps: 'willChange'
            })
          }

          if (text) {
            timeline.to(
              text,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                ease: 'power2.out',
                clearProps: 'willChange'
              },
              '-=0.35'
            )
          }

          if (highlights.length) {
            timeline.to(
              highlights,
              {
                scaleX: 1,
                duration: 0.75,
                ease: 'expo.out',
                stagger: 0.08,
                clearProps: 'willChange'
              },
              '-=0.4'
            )
          }

          if (underline) {
            timeline.to(
              underline,
              {
                scaleX: 1,
                duration: 0.75,
                ease: 'expo.out',
                clearProps: 'willChange'
              },
              '-=0.45'
            )
          }

          void createGsapDevTools({
            animation: timeline,
            id: HEADER_ID
          })

          ScrollTrigger.refresh(true)
        }, root)

        cleanup = () => {
          context.revert()
        }
      },
      { rootMargin: '220px 0px' }
    )

    observer.observe(root)

    return () => {
      cancelled = true
      observer.disconnect()
      cleanup?.()
    }
  }, [])

  return null
}
