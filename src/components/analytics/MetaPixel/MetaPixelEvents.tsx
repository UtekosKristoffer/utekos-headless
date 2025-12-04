// Path: src/components/analytics/MetaPixel/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { sendPageViewToCAPI } from '@/components/analytics/MetaPixel/sendPageViewToCAPI'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie' // Sørg for at denne er robust, se kommentar under
import { getOrSetExternalId } from '@/components/analytics/MetaPixel/getOrSetExternalId'

function PixelLogic() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  // Vi bruker en ref for å spore om init er kjørt i denne sesjonen/visningen
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!pixelId) return

    // Vi venter littegrann for å sikre at cookies satt av mellomvare/proxy er tilgjengelige
    // og at hydrering er ferdig.
    const handlePageView = () => {
      const currentUrl = window.location.href

      // 1. Hent Advanced Matching parametere fra cookies
      // Disse settes i proxy.ts eller server-side logikk
      const externalId = getOrSetExternalId()
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const userHash = getCookie('ute_user_hash') // Hashed e-post/tlf fra proxy

      // 2. Generer en unik Event ID for deduplisering (Viktig!)
      // Denne må være lik for både Pixel og CAPI
      const eventId = generateEventID()

      // 3. Initialiser Pixel KUN hvis det ikke er gjort før
      if (!isInitialized.current && window.fbq) {
        // Advanced Matching Configuration
        const advancedMatchingData = {
          external_id: externalId || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          // 'em' eller 'ph' forventes her hvis hashet, men Meta støtter ofte
          // automatisk deteksjon. Hvis ute_user_hash er email, map den til 'em'.
          // For best practice bør vi vite om det er em eller ph, men sender som em
          // hvis vi antar det er e-post, eller legger i en generisk beholder hvis Meta støtter det.
          // I henhold til docs: em: 'hashed_email'
          em: userHash || undefined
        }

        // Init kalles med Advanced Matching data
        window.fbq('init', pixelId, advancedMatchingData)

        isInitialized.current = true

        if (process.env.NODE_ENV === 'development') {
          console.log('[Meta Pixel] Initialized with:', advancedMatchingData)
        }
      }

      // 4. Send PageView til Browser Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView', {}, { eventID: eventId })
      }

      // 5. Send PageView til Server (CAPI)
      // Vi sender med samme parametere for å sikre matching på serversiden også
      sendPageViewToCAPI(pathname, eventId, searchParams, externalId, fbc, fbp)
    }

    // Kjøres ved mount og ved endring av path/search
    // requestAnimationFrame sikrer at vi ikke blokkerer rendering
    requestAnimationFrame(handlePageView)
  }, [pathname, searchParams, pixelId])

  return null
}

export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  if (!pixelId) {
    console.warn('[Meta Pixel] Pixel ID mangler i miljøvariabler.')
    return null
  }

  /*
    BASE CODE:
    Ingen fbq('init') og fbq('track') her.
    Dette forhindrer at pageview fyres automatisk før vi har kontroll på dataene (Advanced Matching).
    Alt styres nå av useEffect-en over.
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
      {/* Vi wrapper logikken i Suspense fordi useSearchParams brukes. 
        Dette er krav i Next.js 16 for å unngå de-opt av hele siden til client-side rendering.
      */}
      <Suspense fallback={null}>
        <PixelLogic />
      </Suspense>
    </>
  )
}
