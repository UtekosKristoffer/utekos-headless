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

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isInitialized = useRef(false)

  useEffect(() => {
    if (!pixelId) return

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        const externalId = getOrSetExternalId()
        const fbc = getCookie('_fbc')
        const fbp = getCookie('_fbp')
        const eventId = generateEventID()

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          if (!isInitialized.current) {
            window.fbq('init', pixelId, {
              external_id: externalId,
              fbc: fbc || undefined,
              fbp: fbp || undefined
            })

            isInitialized.current = true
          }

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
    }, 500)

    return () => clearTimeout(timeoutId)
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

      const externalId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')

      const payload = {
        eventName: 'ViewContent',
        eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000),
        action_source: 'website',
        userData: {
          external_id: externalId,
          email_hash: emailHash || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          client_user_agent: navigator.userAgent
        },
        eventData: viewContentData
      }

      fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(e => console.error('VC CAPI failed', e))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  if (!pixelId) return null

  // Base code uten 'init'
  const metaPixelBaseCode = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  `

  return (
    <Script
      id='meta-pixel-base-inline'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
    />
  )
}
