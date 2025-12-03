'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { sendPageViewToCAPI } from '@/components/analytics/MetaPixel/sendPageViewToCAPI'
import { getOrSetExternalId } from '@/components/analytics/MetaPixel/getOrSetExternalId'

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
    `

  return (
    <Script
      id='meta-pixel-base-inline'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
    />
  )
}
