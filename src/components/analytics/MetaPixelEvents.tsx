// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Henter en spesifikk cookie fra document.cookie.
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/**
 * Setter en cookie.
 * @param name - Navn på cookie
 * @param value - Verdi
 * @param days - Antall dager før utløp
 */
function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  // Bruker root-path, SameSite=Lax og Secure som beste praksis
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax; Secure`
}

export function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPathRef = useRef<string | null>(null)

  // --- Effekt for PageView (Fra din originale kode) ---
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const fbq = typeof window !== 'undefined' ? window.fbq : undefined
    if (!fbq) return

    // Sjekk at dette ikke er den *første* sidevisningen (den håndteres i layout.tsx)
    // OG at stien faktisk har endret seg.
    if (lastPathRef.current !== null && lastPathRef.current !== pathname) {
      fbq('track', 'PageView')
    }
    // Oppdater ref med den nye stien
    lastPathRef.current = pathname
  }, [pathname])

  // --- Effekt for fbc (Click ID) og fbp (Browser ID) Håndtering ---
  useEffect(() => {
    // Denne logikken er viktig for både prod og test, så vi kjører den uansett NODE_ENV.

    // --- Håndter fbc (Click ID) ---
    const fbclid = searchParams.get('fbclid')
    if (fbclid) {
      // Dokumentasjonen krever formatet: fb.1.<creationTime>.<fbclid>
      const creationTime = Date.now()
      const fbcValue = `fb.1.${creationTime}.${fbclid}`
      // Lagre _fbc-cookien med 90 dagers utløp
      setCookie('_fbc', fbcValue, 90)
    }

    // --- Håndter fbp (Browser ID) ---
    // Meta-scriptet i layout.tsx setter denne. Vi leser den og setter den
    // på nytt for å sikre 90 dagers levetid fra *siste* besøk.
    const fbp = getCookie('_fbp')
    if (fbp) {
      setCookie('_fbp', fbp, 90)
    }
    // Avhengig av searchParams for å fange nye fbclid
  }, [searchParams])

  // Denne komponenten rendrer ingenting
  return null
}
