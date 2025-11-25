'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { setCookie } from '@/components/analytics/MetaPixel/setCookie'
import { sendPageViewToCAPI } from '@/components/analytics/MetaPixel/sendPageViewToCAPI'

function getOrSetExternalId(): string {
  let extId = getCookie('ute_ext_id')
  if (!extId) {
    extId = `user_${Math.random().toString(36).slice(2)}_${Date.now()}`
    setCookie('ute_ext_id', extId, 730)
  }
  return extId
}

async function sendGenericEventToCAPI(
  eventName: string,
  eventId: string,
  eventData: Record<string, unknown>
) {
  if (
    process.env.NODE_ENV !== 'production'
    && !process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE
  ) {
    return
  }

  const externalId = getOrSetExternalId()
  const fbc = getCookie('_fbc')
  const fbp = getCookie('_fbp')
  const emailHash = getCookie('ute_user_hash')
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''

  const payload = {
    eventName,
    eventId,
    eventSourceUrl: window.location.href,
    eventTime: Math.floor(Date.now() / 1000),
    action_source: 'website',
    userData: {
      external_id: externalId,
      email_hash: emailHash || undefined,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      client_user_agent: userAgent
    },
    eventData
  }

  try {
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })
  } catch (e) {
    console.error(`[CAPI] Failed to send ${eventName}:`, e)
  }
}

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!pixelId) return

    const trackPageView = () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)

      pageViewTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          const externalId = getOrSetExternalId()
          const fbc = getCookie('_fbc')
          const fbp = getCookie('_fbp')
          const eventId = generateEventID()

          // Browser Pixel
          if (
            typeof window !== 'undefined'
            && typeof window.fbq === 'function'
          ) {
            window.fbq('init', pixelId, {
              external_id: externalId,
              fbc: fbc || undefined,
              fbp: fbp || undefined
            })
            window.fbq('track', 'PageView', {}, { eventID: eventId })
          }

          sendPageViewToCAPI(
            pathname,
            eventId,
            searchParams,
            externalId,
            fbc,
            fbp
          )
        })
        pageViewTimeoutRef.current = null
      }, 500)
    }

    trackPageView()

    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    }
  }, [pathname, searchParams, pixelId])

  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return

    const timeoutId = setTimeout(() => {
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return

      const eventId = generateEventID().replace('evt_', 'vc_')

      const priceElement = document.querySelector('[data-product-price]')
      const currencyElement = document.querySelector('[data-product-currency]')

      const price =
        priceElement ?
          parseFloat(priceElement.getAttribute('data-product-price') || '0')
        : 0
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
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', viewContentData, {
          eventID: eventId
        })
      }

      sendGenericEventToCAPI('ViewContent', eventId, viewContentData)
    }, 1000)
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
      var cn = 'ute_ext_id';
      var m = document.cookie.match(new RegExp('(^| )' + cn + '=([^;]+)'));
      var eid = m ? decodeURIComponent(m[2]) : null;
      
      if (!eid) {
        eid = 'user_' + Math.random().toString(36).slice(2) + '_' + Date.now();
        var d = new Date();
        d.setTime(d.getTime() + (730 * 24 * 60 * 60 * 1000));
        document.cookie = cn + '=' + eid + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
      }

      var fbp = (document.cookie.match(/(^| )_fbp=([^;]+)/) || [])[2];
      var fbc = (document.cookie.match(/(^| )_fbc=([^;]+)/) || [])[2];
      
      fbq('init', '${pixelId}', { 
        external_id: eid,
        fbp: fbp ? decodeURIComponent(fbp) : undefined,
        fbc: fbc ? decodeURIComponent(fbc) : undefined
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
