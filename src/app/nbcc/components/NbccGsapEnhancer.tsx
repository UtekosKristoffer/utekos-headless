'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function NbccGsapEnhancer() {
  useGSAP(() => {
    const root = document.querySelector<HTMLElement>('[data-nbcc-page]')
    if (!root) return

    const animatedItems = gsap.utils.toArray<HTMLElement>(
      '[data-nbcc-animate]',
      root
    )
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      gsap.set(animatedItems, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'willChange'
      })
      return
    }

    animatedItems.forEach(item => {
      item.style.willChange = 'transform, opacity'
    })

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-nbcc-hero]', {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08
      })
      .from(
        '[data-nbcc-hero-media]',
        {
          opacity: 0,
          scale: 1.04,
          duration: 1.1
        },
        0
      )

    ScrollTrigger.batch('[data-nbcc-reveal]', {
      start: 'top 82%',
      once: true,
      onEnter: elements => {
        gsap.from(elements, {
          opacity: 0,
          y: 34,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          onComplete: () => {
            elements.forEach(element => {
              if (element instanceof HTMLElement) {
                element.style.willChange = 'auto'
              }
            })
          }
        })
      }
    })

    gsap.to('[data-nbcc-product-image]', {
      y: -8,
      duration: 1.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.12
    })
  })

  return null
}
