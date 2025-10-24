// Path: components/analytics/MetaPixelEvents.tsx
'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function MetaPixelEvents() {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const fbq = typeof window !== 'undefined' ? window.fbq : undefined
    if (!fbq) return

    if (lastPathRef.current !== null && lastPathRef.current !== pathname) {
      fbq('track', 'PageView')
    }
    lastPathRef.current = pathname
  }, [pathname])

  return null
}
