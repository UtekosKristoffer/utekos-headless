// src/components/analytics/SnapchatPixel/SnapchatPixelEvents.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from '@/components/jsx/CheckoutButton/generateEventID'
import { useConsent } from '@/components/cookie-consent/useConsent'

export function SnapchatPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { consent } = useConsent()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const hasTrackedInitialPageView = useRef(false)

  // Sjekk om vi har consent for marketing
  const canTrack = consent.marketing || consent.profile_marketing

  const trackPageView = useCallback(() => {
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (
          typeof window === 'undefined'
          || typeof window.snaptr !== 'function'
        ) {
          console.warn(
            'Snapchat Pixel: snaptr not available during PageView track attempt'
          )
          return
        }

        // Kun track hvis vi har consent
        if (!canTrack) {
          console.log('Snapchat Pixel: Skipping PageView - no consent')
          return
        }

        const eventId = generateEventID().replace('evt_', 'spv_')
        window.snaptr('track', 'PAGE_VIEW', {
          client_deduplication_id: eventId
        })

        console.log('Snapchat Pixel: PageView tracked', {
          url: window.location.href,
          eventId
        })

        // Send til CAPI
        if (process.env.NODE_ENV === 'production') {
          fetch('/api/snap-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'PAGE_VIEW',
              eventId: eventId,
              eventSourceUrl: window.location.href,
              eventTime: Math.floor(Date.now() / 1000)
            })
          }).catch(err => console.error('Snap PageView CAPI error:', err))
        }

        animationFrameRef.current = null
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }, [canTrack])

  // Track PageView ved rute-endringer og consent-endringer
  useEffect(() => {
    // Track PageView når pixel er klar og vi har consent
    if (
      window._snaptr_loaded
      && canTrack
      && !hasTrackedInitialPageView.current
    ) {
      trackPageView()
      hasTrackedInitialPageView.current = true
    } else if (window._snaptr_loaded && canTrack) {
      trackPageView()
    }

    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [pathname, searchParams, canTrack, trackPageView])

  // ViewContent tracking for produktsider
  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return
    if (!canTrack) return

    const timeoutId = setTimeout(() => {
      if (typeof window.snaptr !== 'function') {
        console.warn('Snapchat Pixel: snaptr not available for ViewContent')
        return
      }

      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return

      const eventId = generateEventID().replace('evt_', 'svc_')

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
        price: price,
        currency: currency,
        item_ids: [handle],
        item_category: 'product',
        client_deduplication_id: eventId
      }

      window.snaptr('track', 'VIEW_CONTENT', viewContentData)

      console.log('Snapchat Pixel: ViewContent tracked', {
        handle,
        data: viewContentData,
        eventId
      })

      // Send til CAPI
      if (process.env.NODE_ENV === 'production') {
        const capiViewContentData = {
          value: price,
          currency: currency,
          content_ids: [handle]
        }
        fetch('/api/snap-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'VIEW_CONTENT',
            eventData: capiViewContentData,
            eventId: eventId,
            eventSourceUrl: window.location.href,
            eventTime: Math.floor(Date.now() / 1000)
          })
        }).catch(err => console.error('Snap ViewContent CAPI error:', err))
      }
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [pathname, canTrack])

  if (!pixelId) {
    return null
  }

  // Initialiser Snapchat Pixel ALLTID (uavhengig av consent)
  // Dette er nødvendig for Test Events og kampanjeoppsett
  const snapPixelBaseCode = `
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
    r.src=n;var u=t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r,u);})(window,document,
    'https://sc-static.net/scevent.min.js');

    snaptr('init', '${pixelId}', {
      'user_email': ''
    });
    
    window._snaptr_loaded = true;
    console.log('Snapchat Pixel initialized with ID:', '${pixelId}');
  `

  return (
    <Script
      id='snap-pixel-base-inline'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: snapPixelBaseCode }}
    />
  )
}
