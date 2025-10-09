// Path: components/analytics/MetaPixelEvents.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Definer fbq på vinduet for TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export function MetaPixelEvents() {
  const pathname = usePathname()

  useEffect(() => {
    // Sjekk om fbq er lastet inn før vi prøver å bruke den
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [pathname]) // Utløses hver gang pathname endres

  return null // Denne komponenten rendrer ingenting
}
