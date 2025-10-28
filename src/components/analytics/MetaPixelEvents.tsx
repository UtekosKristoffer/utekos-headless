// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Henter en spesifikk cookie
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/**
 * Setter en cookie med 90 dagers utløp
 */
function setCookie(name: string, value: string, days: number = 90) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`
}

/**
 * Generer konsistent event ID
 */
function generateEventId(): string {
  return `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Bygg PageView parametere
 */
function getPageViewParams(pathname: string, searchParams?: URLSearchParams) {
  const params: Record<string, any> = {
    content_name: pathname === '/' ? 'Forside' : pathname,
    content_category: pathname.split('/')[1] || 'home'
  }

  // Sett content_type basert på pathname
  if (pathname.includes('/produkt')) {
    params.content_type = 'product'
  } else if (pathname === '/produkter') {
    params.content_type = 'product_group'
  } else if (pathname === '/') {
    params.content_type = 'home'
  } else if (pathname.includes('/checkout') || pathname.includes('/kasse')) {
    params.content_type = 'checkout'
  } else if (pathname.includes('/cart') || pathname.includes('/handlekurv')) {
    params.content_type = 'cart'
  } else {
    params.content_type = 'other'
  }

  // Legg til search params hvis relevant
  if (searchParams?.get('search')) {
    params.search_string = searchParams.get('search')
  }
  if (searchParams?.get('category')) {
    params.content_category = searchParams.get('category')
  }

  return params
}

/**
 * Send PageView til Meta CAPI
 */
async function sendPageViewToCAPI(
  pathname: string,
  eventId: string,
  searchParams?: URLSearchParams
) {
  try {
    const params = getPageViewParams(pathname, searchParams)

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
      const error = await response.json()
      console.error('Meta CAPI PageView error:', error)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed:', error)
  }
}

export function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string>('')
  const isInitialMount = useRef(true)

  // Track PageView på pathname endringer
  useEffect(() => {
    // Sjekk om vi faktisk har en ny side å tracke
    if (lastTrackedPath.current === pathname) {
      return
    }

    // Vent litt for å sikre at fbq er klar
    const timeoutId = setTimeout(
      () => {
        if (typeof window === 'undefined' || !window.fbq) {
          console.warn('Meta Pixel: fbq not available')
          return
        }

        const eventId = generateEventId()
        const params = getPageViewParams(pathname, searchParams)

        // Track via browser pixel med parametere OG event ID
        window.fbq('track', 'PageView', params, { eventID: eventId })

        console.log('📊 Meta Pixel: PageView tracked', {
          pathname,
          params,
          eventId,
          isInitial: isInitialMount.current
        })

        // Send til CAPI for redundant setup
        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(pathname, eventId, searchParams)
        }

        // Oppdater refs
        lastTrackedPath.current = pathname
        isInitialMount.current = false
      },
      isInitialMount.current ? 100 : 50
    ) // Litt lengre delay på initial mount

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  // Håndter Meta cookies (_fbc og _fbp)
  useEffect(() => {
    // Håndter _fbc fra fbclid parameter
    const fbclid = searchParams.get('fbclid')
    if (fbclid) {
      const existingFbc = getCookie('_fbc')

      if (!existingFbc || !existingFbc.includes(fbclid)) {
        const timestamp = Date.now()
        const fbcValue = `fb.1.${timestamp}.${fbclid}`
        setCookie('_fbc', fbcValue, 90)
        console.log('Meta Pixel: _fbc cookie set from fbclid')
      }
    }

    // Sørg for at _fbp cookie eksisterer og fornyes
    const fbp = getCookie('_fbp')
    if (fbp) {
      // Forny eksisterende _fbp
      setCookie('_fbp', fbp, 90)
    } else if (window.fbq) {
      // La Meta generere _fbp hvis den ikke finnes
      // Meta vil automatisk sette denne når pixel kjører
      console.log('Meta Pixel: Letting Meta set _fbp cookie')
    }
  }, [searchParams])

  // Track ViewContent for produktsider
  useEffect(() => {
    if (!pathname.includes('/produkter/')) return

    const timeoutId = setTimeout(() => {
      if (!window.fbq) return

      // Ekstraher produkt-ID fra URL
      const productSlug = pathname.split('/produkter/')[1]
      if (!productSlug) return

      const eventId = generateEventId().replace('pv_', 'vc_')

      window.fbq(
        'track',
        'ViewContent',
        {
          content_ids: [productSlug],
          content_type: 'product',
          content_name: productSlug
        },
        { eventID: eventId }
      )

      console.log('📦 Meta Pixel: ViewContent tracked', {
        productSlug,
        eventId
      })

      // Send til CAPI også
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ViewContent',
            eventData: {
              content_ids: [productSlug],
              content_type: 'product',
              content_name: productSlug
            },
            eventId: eventId,
            eventSourceUrl: window.location.href,
            eventTime: Math.floor(Date.now() / 1000)
          })
        }).catch(err => console.error('ViewContent CAPI error:', err))
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
