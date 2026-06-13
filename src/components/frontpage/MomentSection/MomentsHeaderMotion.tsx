'use client'

import { useEffect } from 'react'
import { createGsapDevTools } from '@/lib/gsap/createGsapDevTools'
import { loadScrollTrigger } from '@/lib/gsap/loadScrollTrigger'

const HEADER_ID = 'moments-header'

function setVisible(root: HTMLElement) {
  const words = root.querySelectorAll<HTMLElement>('[data-cinematic-word]')
  const paths = root.querySelectorAll<SVGPathElement>(
    '[data-organic-circle-path]'
  )

  words.forEach(word => {
    word.style.opacity = '1'
    word.style.transform = ''
    word.style.filter = ''
    word.style.willChange = ''
  })

  paths.forEach(path => {
    path.style.strokeDasharray = ''
    path.style.strokeDashoffset = ''
  })
}

export function MomentsHeaderMotion() {
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
          const words = gsap.utils.toArray<HTMLElement>('[data-cinematic-word]')
          const paths = gsap.utils.toArray<SVGPathElement>(
            '[data-organic-circle-path]'
          )

          if (!words.length) {
            return
          }

          gsap.set(words, {
            autoAlpha: 0,
            filter: 'blur(10px)',
            scale: 1.08,
            y: 20,
            willChange: 'transform, opacity, filter'
          })

          paths.forEach(path => {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length
            })
          })

          const timeline = gsap.timeline({
            id: HEADER_ID,
            scrollTrigger: {
              trigger: root,
              start: 'top 86%',
              once: true,
              toggleActions: 'play none none none'
            }
          })

          timeline.to(words, {
            autoAlpha: 1,
            filter: 'blur(0px)',
            scale: 1,
            y: 0,
            duration: 0.95,
            ease: 'power2.out',
            stagger: 0.045,
            clearProps: 'willChange'
          })

          paths.forEach(path => {
            const delayElement = path.closest('[data-gsap-delay]')
            const delay =
              delayElement instanceof HTMLElement ?
                Number(delayElement.dataset.gsapDelay ?? 0)
              : 0

            timeline.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: 'power3.out'
              },
              delay + 0.2
            )
          })

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
      { rootMargin: '240px 0px' }
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
