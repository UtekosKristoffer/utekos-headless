// src/components/analytics/SnapchatPixel/SnapchatPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from '@/components/jsx/CheckoutButton/generateEventID'
export function SnapchatPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isInitialLoad = useRef(true)

  const trackPageView = () => {
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

        const eventId = generateEventID().replace('evt_', 'spv_')
        // Merk: Vi kaller kun 'track' her, ikke 'trackSingle'
        window.snaptr('track', 'PAGE_VIEW', {
          client_deduplication_id: eventId
        })
        animationFrameRef.current = null
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
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    trackPageView()

    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return

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
        item_category: 'product'
      }

      const clientViewContentData = {
        ...viewContentData,
        client_deduplication_id: eventId
      }

      window.snaptr('track', 'VIEW_CONTENT', clientViewContentData)
      console.log('Snapchat Pixel: ViewContent tracked', {
        handle,
        data: clientViewContentData,
        eventId
      })

      // Send CAPI Event
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
  }, [pathname])

  if (!pixelId) {
    return null
  }

  const snapPixelBaseCode = `
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
    a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
    r.src=n;var u=t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r,u);})(window,document,
    'https://sc-static.net/scevent.min.js');

    snaptr('init', '${pixelId}', {
      'user_email': '__INSERT_USER_EMAIL__'
    });

    snaptr('track', 'PAGE_VIEW');
  `

  return (
    <>
      <Script
        id='snap-pixel-base-inline'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: snapPixelBaseCode }}
      />
    </>
  )
}
