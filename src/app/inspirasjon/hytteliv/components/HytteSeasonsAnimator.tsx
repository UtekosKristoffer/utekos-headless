'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function HytteSeasonsAnimator({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = root.querySelectorAll<HTMLElement>('[data-season]')

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-animating', entry.isIntersecting)
        }
      },
      { threshold: 0.35 }
    )

    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
