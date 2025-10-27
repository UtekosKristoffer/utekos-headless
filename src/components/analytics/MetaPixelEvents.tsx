// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Henter en spesifikk cookie fra document.cookie
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/**
 * Setter en cookie med 90 dagers utløp (per Meta dokumentasjon)
 */
function setCookie(name: string, value: string, days: number = 90) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  // Per Meta docs: Use Secure and SameSite=Lax
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`
}

/**
 * Bygger event parameters for PageView
 */
function getPageViewParams(pathname: string) {
  const params: Record<string, string> = {
    content_name: pathname,
    content_category: pathname.split('/')[1] || 'home'
  }

  // Legg til content_type basert på pathname
  if (pathname.includes('/produkt') || pathname === '/produkter') {
    params.content_type = 'product'
  } else if (pathname === '/') {
    params.content_type = 'home'
  } else if (pathname.includes('/checkout') || pathname.includes('/kasse')) {
    params.content_type = 'checkout'
  } else if (pathname.includes('/cart') || pathname.includes('/handlekurv')) {
    params.content_type = 'cart'
  }

  return params
}

/**
 * Sender PageView til CAPI for redundant setup (per Meta best practices)
 */
async function sendPageViewToCAPI(pathname: string, eventId: string) {
  try {
    const params = getPageViewParams(pathname)

    const response = await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventData: params,
        eventId: eventId, // For deduplication mot browser pixel
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000)
      })
    })

    if (!response.ok) {
      console.error('MetaPixel: CAPI error', await response.json())
    }
  } catch (error) {
    console.error('MetaPixel: Failed to send to CAPI', error)
  }
}

/**
 * Genererer en unik event ID for deduplication
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPathRef = useRef<string | null>(null)

  // Håndter PageView tracking med parameters og CAPI redundancy
  useEffect(() => {
    const fbq = typeof window !== 'undefined' ? window.fbq : undefined
    if (!fbq) return

    // Send PageView for HVER page load (inkludert initial)
    if (lastPathRef.current !== pathname) {
      const params = getPageViewParams(pathname)
      const eventId = generateEventId()

      // Send via browser pixel MED parameters
      fbq('track', 'PageView', params, { eventID: eventId })

      // Send via CAPI for redundancy (kun i production)
      if (process.env.NODE_ENV === 'production') {
        sendPageViewToCAPI(pathname, eventId)
      }

      console.log('MetaPixel: PageView tracked', { pathname, params, eventId })
    }

    lastPathRef.current = pathname
  }, [pathname])

  // Håndter _fbc og _fbp cookies per Meta dokumentasjon
  useEffect(() => {
    // Håndter _fbc (Facebook Click ID) fra fbclid URL parameter
    const fbclid = searchParams.get('fbclid')
    if (fbclid) {
      const existingFbc = getCookie('_fbc')
      const existingFbclid = existingFbc?.split('.').pop()

      // Kun sett cookie hvis fbclid er ny eller ikke eksisterer
      if (!existingFbc || existingFbclid !== fbclid) {
        // Format per Meta docs: fb.1.creationTime.fbclid
        const creationTime = Date.now()
        const fbcValue = `fb.1.${creationTime}.${fbclid}`
        setCookie('_fbc', fbcValue, 90)

        console.log('MetaPixel: _fbc cookie set', fbcValue)
      }
    }

    // Håndter _fbp (Browser ID) - refresh med 90 dagers utløp
    const fbp = getCookie('_fbp')
    if (fbp) {
      // Per Meta docs: Refresh cookie på hver visit for å forlenge levetid
      setCookie('_fbp', fbp, 90)
    }
  }, [searchParams])

  return null
}
