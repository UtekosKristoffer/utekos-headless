// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script' // Importer next/script

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

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const [isPixelInitialized, setIsPixelInitialized] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const handlePixelLoad = () => {
    if (!pixelId) {
      console.warn('Meta Pixel ID not configured.')
      return
    }
    if (typeof window.fbq === 'function') {
      console.log('Meta Pixel: Base script loaded, initializing...')
      window.fbq('init', pixelId, {}) // Initialize Pixel
      setIsPixelInitialized(true) // Marker som initialisert
      // Trigger første PageView manuelt her siden base-scriptet ikke gjør det lenger
      trackPageView()
    } else {
      console.error('Meta Pixel: fbq function not found after script load.')
    }
  }

  // --- Funksjon for å tracke PageView (brukes både ved init og nav) ---
  const trackPageView = () => {
    // Avbryt tidligere forsøk hvis de fortsatt kjører
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
          console.warn('Meta Pixel: fbq not available for PageView tracking')
          return
        }

        const eventId = generateEventId()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)
        const params = getPageViewParams(currentPathname, currentSearchParams)

        window.fbq('track', 'PageView', params, { eventID: eventId })

        console.log('📊 Meta Pixel: PageView tracked (Debounced + RAF)', {
          pathname: currentPathname,
          search: currentSearchParams.toString(),
          params,
          eventId
        })

        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(currentPathname, eventId, currentSearchParams)
        }
        animationFrameRef.current = null
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  // --- useEffect for PageView ved navigering (etter initialisering) ---
  useEffect(() => {
    // Ikke gjør noe FØR pixelen er initialisert
    if (!isPixelInitialized) {
      return
    }

    // Kall PageView-tracking funksjonen (den har innebygd debounce)
    trackPageView()

    // Cleanup for timeout/animation frame ved unmount (selv om den kjøres i trackPageView også)
    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [pathname, searchParams, isPixelInitialized]) // Kjør når URL endres ETTER init

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

  // ViewContent useEffect (uendret, men legg til sjekk for isPixelInitialized)...
  useEffect(() => {
    // Ikke gjør noe FØR pixelen er initialisert
    if (!isPixelInitialized || !pathname.startsWith('/produkter/')) return

    const timeoutId = setTimeout(() => {
      // Sjekk for window.fbq er teknisk sett unødvendig pga isPixelInitialized, men skader ikke
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
  }, [pathname, isPixelInitialized]) // Legg til isPixelInitialized som avhengighet

  // Returner KUN Script-komponenten for å laste base-koden
  return (
    <>
      {pixelId && (
        <Script
          id='meta-pixel-script' // Viktig med ID for inline/event handlers
          src='https://connect.facebook.net/en_US/fbevents.js'
          strategy='afterInteractive' // Laster etter litt hydrering
          onLoad={handlePixelLoad} // Kall init når scriptet er lastet
          onError={e => {
            // Legg til feilhåndtering
            console.error('Meta Pixel: Failed to load base script.', e)
          }}
        />
      )}
    </>
  )
}
