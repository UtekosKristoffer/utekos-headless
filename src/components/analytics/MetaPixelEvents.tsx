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
 * Sender PageView til CAPI for redundant setup
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
        eventId: eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000)
      })
    })

    if (!response.ok) {
      console.error('MetaPixel CAPI error:', await response.json())
    }
  } catch (error) {
    console.error('MetaPixel CAPI failed:', error)
  }
}

/**
 * Genererer en unik event ID for deduplication
 */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Venter på at fbq er fullstendig initialisert
 */
function waitForFbq(): Promise<void> {
  return new Promise(resolve => {
    // Hvis fbq allerede eksisterer og er lastet
    if (window.fbq && window.fbq.loaded) {
      resolve()
      return
    }

    // Vent maks 3 sekunder
    const timeout = setTimeout(() => {
      console.warn('MetaPixel: fbq timeout - sending anyway')
      resolve()
    }, 3000)

    // Poll for fbq
    const checkFbq = setInterval(() => {
      if (window.fbq && window.fbq.loaded) {
        clearInterval(checkFbq)
        clearTimeout(timeout)
        resolve()
      }
    }, 100)
  })
}

export function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPathRef = useRef<string>('')

  // Håndter PageView tracking - kjører på HVER pathname change
  useEffect(() => {
    // Debug logging
    console.log('MetaPixel useEffect triggered:', {
      pathname,
      lastPath: lastPathRef.current,
      willSend: lastPathRef.current !== pathname
    })

    // Send PageView kun hvis pathname har endret seg
    if (lastPathRef.current !== pathname) {
      const params = getPageViewParams(pathname)
      const eventId = generateEventId()

      // Vent på at fbq er klar, deretter send
      waitForFbq().then(() => {
        const fbq = window.fbq
        if (!fbq) {
          console.warn('MetaPixel: fbq not available after wait')
          return
        }

        // Send via browser pixel MED parameters
        fbq('track', 'PageView', params, { eventID: eventId })

        console.log('✅ MetaPixel: PageView sent', {
          pathname,
          params,
          eventId,
          timestamp: new Date().toISOString()
        })

        // Send via CAPI for redundancy (kun i production)
        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(pathname, eventId)
        }
      })

      // Oppdater ref ETTER sending
      lastPathRef.current = pathname
    }
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
        const creationTime = Date.now()
        const fbcValue = `fb.1.${creationTime}.${fbclid}`
        setCookie('_fbc', fbcValue, 90)

        console.log('MetaPixel: _fbc cookie set:', fbcValue)
      }
    }

    // Håndter _fbp (Browser ID) - refresh med 90 dagers utløp
    const fbp = getCookie('_fbp')
    if (fbp) {
      setCookie('_fbp', fbp, 90)
    }
  }, [searchParams])

  return null
}
