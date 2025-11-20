'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from './generateEventID'
import { getCookie } from './getCookie'
import { getPageViewParams } from './getPageViewParams'
import { sendPageViewToCAPI } from './sendPageViewToCAPI'

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trackPageView = () => {
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const externalId = getCookie('ute_ext_id')
        const fbc = getCookie('_fbc')
        const fbp = getCookie('_fbp')

        const eventId = generateEventID()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          const params = getPageViewParams(currentPathname, currentSearchParams)
          window.fbq('track', 'PageView', params, { eventID: eventId })
        }

        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(
            currentPathname,
            eventId,
            currentSearchParams,
            externalId,
            fbc,
            fbp
          )
        }
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  useEffect(() => {
    trackPageView()
    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return

    const timeoutId = setTimeout(() => {
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return

      const externalId = getCookie('ute_ext_id')
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')

      const eventId = generateEventID().replace('evt_', 'vc_')

      const priceElement = document.querySelector('[data-product-price]')
      const price =
        priceElement ?
          parseFloat(priceElement.getAttribute('data-product-price') || '0')
        : 0
      const currency =
        document
          .querySelector('[data-product-currency]')
          ?.getAttribute('data-product-currency') || 'NOK'

      const viewContentData = {
        content_ids: [handle],
        content_type: 'product',
        content_name: handle,
        value: price,
        currency: currency
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', viewContentData, {
          eventID: eventId
        })
      }

      if (process.env.NODE_ENV === 'production') {
        fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ViewContent',
            eventData: viewContentData,
            eventId: eventId,
            eventSourceUrl: window.location.href,
            eventTime: Math.floor(Date.now() / 1000),
            userData: {
              external_id: externalId,
              fbc: fbc,
              fbp: fbp
            }
          })
        }).catch(err => console.error('ViewContent CAPI error:', err))
      }
    }, 200)
    return () => clearTimeout(timeoutId)
  }, [pathname])

  if (!pixelId) return null

  const metaPixelBaseCode = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    (function() {
      var COOKIE_NAME = 'ute_ext_id';
      var exId = null;
      try {
        var match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
        exId = match ? decodeURIComponent(match[1]) : null;
        if (!exId) {
          exId = 'ute_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
          var d = new Date();
          d.setTime(d.getTime() + (730 * 24 * 60 * 60 * 1000));
          document.cookie = COOKIE_NAME + '=' + encodeURIComponent(exId) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
        }
      } catch (e) {}

      fbq('init', '${pixelId}', { 
        external_id: exId 
      });
    })();
  `

  return (
    <Script
      id='meta-pixel-base-inline'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
    />
  )
}
