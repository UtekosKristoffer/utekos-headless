'use client'

import { useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function useNewProductLaunchAnimations(): RefObject<HTMLElement | null> {
  const containerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current

    if (!container || typeof window === 'undefined') {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      container.dataset.launchMotion = 'ready'
      return
    }

    container.dataset.launchMotion = 'armed'

    let hasTriggered = false
    let animationFrameOne = 0
    let animationFrameTwo = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasTriggered) {
          return
        }

        hasTriggered = true
        observer.unobserve(entry.target)

        animationFrameOne = window.requestAnimationFrame(() => {
          animationFrameTwo = window.requestAnimationFrame(() => {
            container.dataset.launchMotion = 'ready'
          })
        })
      },
      {
        root: null,
        rootMargin: '0px 0px 26% 0px',
        threshold: 0.01
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()

      if (animationFrameOne) {
        window.cancelAnimationFrame(animationFrameOne)
      }

      if (animationFrameTwo) {
        window.cancelAnimationFrame(animationFrameTwo)
      }

      delete container.dataset.launchMotion
    }
  }, [])

  return containerRef
}
