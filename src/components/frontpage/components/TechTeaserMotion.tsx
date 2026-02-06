'use client'

import { useEffect, useRef } from 'react'

type Props = { targetId: string }

export default function TechTeaserMotion({ targetId }: Props) {
  const cleanupRef = useRef<null | (() => void)>(null)

  useEffect(() => {
    const root = document.getElementById(targetId)
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false

    const intersectionObserver = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) return
        intersectionObserver.disconnect()
        if (cancelled) return

        const mod = await import('./mountTechTeaser')
        if (cancelled) return

        cleanupRef.current = mod.mountTechTeaser(root)
      },
      { rootMargin: '200px 0px' }
    )

    intersectionObserver.observe(root)

    return () => {
      cancelled = true
      intersectionObserver.disconnect()
      cleanupRef.current?.()
      cleanupRef.current = null
    }
  }, [targetId])

  return null
}
