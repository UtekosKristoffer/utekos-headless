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
  // Bruker en mer robust metode for unik ID innenfor sesjonen
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Bygg PageView parametere
 */
function getPageViewParams(
  pathname: string,
  searchParams?: URLSearchParams | null
) {
  const params: Record<string, any> = {
    // Bruk dokumenttittel hvis tilgjengelig, ellers pathname
    content_name:
      typeof document !== 'undefined' ? document.title
      : pathname === '/' ? 'Forside'
      : pathname,
    content_category: pathname.split('/')[1] || 'home'
  }

  // Sett content_type basert på pathname
  if (pathname.startsWith('/produkt')) {
    // Mer robust sjekk
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
    // Mer generell fallback
    params.content_type = pathname.split('/')[1] || 'page'
  }

  // Legg til search params hvis relevant
  if (searchParams?.get('q')) {
    // Bruk 'q' hvis det er standard søkeparameter
    params.search_string = searchParams.get('q')
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
  searchParams?: URLSearchParams | null // Oppdatert type
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
        eventSourceUrl: window.location.href, // Bruk window.location for nøyaktighet
        eventTime: Math.floor(Date.now() / 1000)
        // userData vil bli lagt til på server
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Meta CAPI PageView error:', error)
    } else {
      console.log('📊 Meta CAPI: PageView sent successfully for', pathname)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed to send:', error)
  }
}

export function MetaPixelEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string>('')
  const isInitialLoad = useRef(true)

  useEffect(() => {
    const currentUrl = pathname + (searchParams ? searchParams.toString() : '')

    // Ikke track hvis URL ikke har endret seg siden sist (etter initial load)
    if (!isInitialLoad.current && lastTrackedPath.current === currentUrl) {
      return
    }

    // Oppdater ref *før* timeout starter
    lastTrackedPath.current = currentUrl
    const wasInitialLoad = isInitialLoad.current
    if (isInitialLoad.current) {
      isInitialLoad.current = false
    }

    // --- Gå tilbake til setTimeout ---
    const timeoutId = setTimeout(() => {
      if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        console.warn('Meta Pixel: fbq not available')
        return
      }

      const eventId = generateEventId()
      const params = getPageViewParams(pathname, searchParams)

      // Track via browser pixel
      window.fbq('track', 'PageView', params, { eventID: eventId })

      console.log('📊 Meta Pixel: PageView tracked (Delayed)', {
        // Endret loggmelding
        pathname,
        search: searchParams ? searchParams.toString() : '',
        params,
        eventId,
        isInitial: wasInitialLoad
      })

      // Send til CAPI
      if (process.env.NODE_ENV === 'production') {
        sendPageViewToCAPI(pathname, eventId, searchParams)
      }
    }, 50) // Bruk en kort delay igjen
    // --------------------------------

    // Rydd opp timeout
    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  // Cookie useEffect (uendret)...
  useEffect(() => {
    // Håndter _fbc fra fbclid parameter
    const fbclid = searchParams?.get('fbclid') // Bruk optional chaining
    if (fbclid) {
      const existingFbc = getCookie('_fbc')
      // Sjekk formatet før setting: version.subdomainIndex.creationTime.fbclidValue
      const creationTime = Date.now()
      // Antar subdomainIndex = 1 (vanlig for server-side setting uten pixel på subdomene)
      const fbcValue = `fb.1.${creationTime}.${fbclid}`

      // Sett kun hvis den ikke finnes eller fbclid-delen er annerledes
      if (!existingFbc || existingFbc.split('.').pop() !== fbclid) {
        setCookie('_fbc', fbcValue, 90)
        console.log(
          'Meta Pixel: _fbc cookie set/updated from fbclid:',
          fbcValue
        )
      }
    }

    // Sørg for at _fbp cookie eksisterer og fornyes (hvis den finnes)
    const fbp = getCookie('_fbp')
    if (fbp) {
      // Forny eksisterende _fbp
      setCookie('_fbp', fbp, 90)
    }
    // Ingen 'else' her - hvis _fbp ikke finnes, MÅ Meta Pixel selv sette den.
    // Vi kan ikke generere en gyldig _fbp uten Meta's random number.
  }, [searchParams])

  // ViewContent useEffect (uendret)...
  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return // Mer robust sjekk

    const timeoutId = setTimeout(() => {
      // --- Sjekk for window.fbq ---
      if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        console.warn('Meta Pixel: fbq not available for ViewContent')
        return
      }
      // -----------------------------

      // Ekstraher produkt-handle (ikke slug hvis det er forskjell)
      const handle = pathname.split('/produkter/')[1]?.split('?')[0] // Fjern query params
      if (!handle) return

      const eventId = generateEventId().replace('evt_', 'vc_') // Matcher generateEventId format

      // Hent produkt data for verdi og valuta (ideelt sett fra context/state hvis tilgjengelig)
      // Fallback:
      const priceElement = document.querySelector('[data-product-price]')
      const price =
        priceElement ?
          parseFloat(priceElement.getAttribute('data-product-price') || '0')
        : 0
      const currencyElement = document.querySelector('[data-product-currency]')
      const currency =
        currencyElement ?
          currencyElement.getAttribute('data-product-currency') || 'NOK'
        : 'NOK'

      const viewContentData = {
        content_ids: [handle],
        content_type: 'product',
        content_name: handle, // Eller hent produktnavn hvis tilgjengelig
        value: price, // Prøv å inkludere verdi
        currency: currency // Og valuta
      }

      window.fbq('track', 'ViewContent', viewContentData, { eventID: eventId })

      console.log('📦 Meta Pixel: ViewContent tracked', {
        handle,
        data: viewContentData,
        eventId
      })

      // Send til CAPI også
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ViewContent',
            eventData: viewContentData,
            eventId: eventId,
            eventSourceUrl: window.location.href,
            eventTime: Math.floor(Date.now() / 1000)
            // userData legges til på server
          })
        }).catch(err => console.error('ViewContent CAPI error:', err))
      }
    }, 200) // Delay for å la siden/data laste

    return () => clearTimeout(timeoutId)
  }, [pathname]) // Kun avhengig av pathname for ViewContent

  return null
}
