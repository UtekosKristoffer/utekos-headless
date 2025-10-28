// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

// (Helper functions: getCookie, setCookie, generateEventId, getPageViewParams, sendPageViewToCAPI - remain unchanged)
// ... (lim inn hjelpefunksjonene her) ...
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}
function setCookie(name: string, value: string, days: number = 90) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`
}
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}
function getPageViewParams(
  pathname: string,
  searchParams?: URLSearchParams | null
) {
  const params: Record<string, any> = {
    content_name:
      typeof document !== 'undefined' ? document.title
      : pathname === '/' ? 'Forside'
      : pathname,
    content_category: pathname.split('/')[1] || 'home'
  }
  if (pathname.startsWith('/produkt')) {
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
    params.content_type = pathname.split('/')[1] || 'page'
  }
  if (searchParams?.get('q')) {
    params.search_string = searchParams.get('q')
  }
  if (searchParams?.get('category')) {
    params.content_category = searchParams.get('category')
  }
  return params
}
async function sendPageViewToCAPI(
  pathname: string,
  eventId: string,
  searchParams?: URLSearchParams | null
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
    } else {
      console.log('📊 Meta CAPI: PageView sent successfully for', pathname)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed to send:', error)
  }
}

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const [isPixelReady, setIsPixelReady] = useState(false) // Endret state-navn for klarhet
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const initRetryTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Ref for init retry

  // --- Funksjon for å forsøke initialisering ---
  const tryInitializePixel = () => {
    if (!pixelId) {
      console.warn('Meta Pixel: Pixel ID not configured.')
      return
    }
    if (typeof window.fbq === 'function') {
      console.log('Meta Pixel: fbq found, initializing...')
      window.fbq('init', pixelId, {})
      setIsPixelReady(true) // Marker som klar NÅR init er kalt
      // Trigger første PageView her, siden den nå er klar
      trackPageView()
      if (initRetryTimeoutRef.current) {
        clearTimeout(initRetryTimeoutRef.current) // Avbryt retry hvis vi lyktes
      }
    } else {
      console.warn('Meta Pixel: fbq not found yet, retrying in 100ms...')
      // Prøv igjen om et lite øyeblikk
      if (initRetryTimeoutRef.current) clearTimeout(initRetryTimeoutRef.current) // Forrige retry
      initRetryTimeoutRef.current = setTimeout(tryInitializePixel, 100)
    }
  }

  // --- onLoad handler ---
  const handlePixelLoad = () => {
    console.log('Meta Pixel: Base script loaded according to onLoad.')
    tryInitializePixel() // Start initialiseringsforsøket
  }

  // --- Funksjon for å tracke PageView (med debounce) ---
  const trackPageView = () => {
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        // Ekstra sjekk for fbq her også for sikkerhets skyld
        if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
          console.warn(
            'Meta Pixel: fbq not available during PageView track attempt'
          )
          return
        }

        const eventId = generateEventId()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)
        const params = getPageViewParams(currentPathname, currentSearchParams)

        window.fbq('track', 'PageView', params, { eventID: eventId })

        console.log('📊 Meta Pixel: PageView tracked (Debounced + RAF)', {
          /* ... som før ... */
        })

        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(currentPathname, eventId, currentSearchParams)
        }
        animationFrameRef.current = null
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  // --- useEffect for PageView ved navigering (etter at pixel er KLAR) ---
  useEffect(() => {
    // Ikke gjør noe FØR pixelen er klar
    if (!isPixelReady) return

    // Kall PageView-tracking funksjonen
    trackPageView()

    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [pathname, searchParams, isPixelReady]) // Kjør når URL endres ETTER at pixel er klar

  // Cookie useEffect (uendret)...
  useEffect(() => {
    const fbclid = searchParams?.get('fbclid')
    if (fbclid) {
      const existingFbc = getCookie('_fbc')
      const creationTime = Date.now()
      const fbcValue = `fb.1.${creationTime}.${fbclid}`
      if (!existingFbc || existingFbc.split('.').pop() !== fbclid) {
        setCookie('_fbc', fbcValue, 90)
        console.log(
          'Meta Pixel: _fbc cookie set/updated from fbclid:',
          fbcValue
        )
      }
    }
    const fbp = getCookie('_fbp')
    if (fbp) {
      setCookie('_fbp', fbp, 90)
    }
  }, [searchParams])

  // ViewContent useEffect (uendret, men sjekker isPixelReady)...
  useEffect(() => {
    if (!isPixelReady || !pathname.startsWith('/produkter/')) return // Sjekk isPixelReady

    const timeoutId = setTimeout(() => {
      if (typeof window.fbq !== 'function') {
        console.warn('Meta Pixel: fbq not available for ViewContent')
        return
      }
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return
      const eventId = generateEventId().replace('evt_', 'vc_')
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
        content_name: handle,
        value: price,
        currency: currency
      }
      window.fbq('track', 'ViewContent', viewContentData, { eventID: eventId })
      console.log('📦 Meta Pixel: ViewContent tracked', {
        handle,
        data: viewContentData,
        eventId
      })
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
          })
        }).catch(err => console.error('ViewContent CAPI error:', err))
      }
    }, 200)
    return () => clearTimeout(timeoutId)
  }, [pathname, isPixelReady]) // Legg til isPixelReady

  // Cleanup for init retry timeout ved unmount
  useEffect(() => {
    return () => {
      if (initRetryTimeoutRef.current) {
        clearTimeout(initRetryTimeoutRef.current)
      }
    }
  }, [])

  // Returner Script-komponenten
  return (
    <>
      {pixelId && (
        <Script
          id='meta-pixel-script'
          src='https://connect.facebook.net/en_US/fbevents.js'
          strategy='afterInteractive'
          onLoad={handlePixelLoad} // Bruk robust onLoad
          onError={e => {
            console.error('Meta Pixel: Failed to load base script.', e)
          }}
        />
      )}
    </>
  )
}
