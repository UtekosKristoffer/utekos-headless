// Path: src/components/analytics/MetaPixel/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { sendPageViewToCAPI } from '@/components/analytics/MetaPixel/sendPageViewToCAPI'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { getOrSetExternalId } from '@/components/analytics/MetaPixel/getOrSetExternalId'

function PixelLogic() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  const lastTrackedPath = useRef<string | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!pixelId) return

    const currentPathString = pathname + (searchParams?.toString() || '')

    if (lastTrackedPath.current === currentPathString) {
      return
    }

    lastTrackedPath.current = currentPathString

    requestAnimationFrame(() => {
      const externalId = getOrSetExternalId()
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const userHash = getCookie('ute_user_hash')
      const eventId = generateEventID()

      if (!isInitialized.current && window.fbq) {
        window.fbq('init', pixelId, {
          external_id: externalId || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          em: userHash || undefined
        })
        isInitialized.current = true
      }

      if (window.fbq) {
        window.fbq('track', 'PageView', {}, { eventID: eventId })
      }

      sendPageViewToCAPI(pathname, eventId, searchParams, externalId, fbc, fbp)
    })
  }, [pathname, searchParams, pixelId])

  return null
}

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  if (!pixelId) return null

  /* VIKTIG: Base Code inneholder INGEN fbq('track', 'PageView') eller fbq('init').
     Dette overlates 100% til PixelLogic-komponenten over.
  */
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
    <>
      <Script
        id='meta-pixel-base'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
      />
      <Suspense fallback={null}>
        <PixelLogic />
      </Suspense>
    </>
  )
}
