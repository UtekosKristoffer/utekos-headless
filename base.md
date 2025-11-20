// Path: src/components/providers/Providers.tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState } from 'react'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationClient } from '@/clients/CartMutationClient'
import { serverActions } from '@/constants/serverActions'
import { CartIdProvider } from '@/components/providers/CartIdProvider'
import type { DehydratedState } from '@tanstack/react-query'
import { CookieConsentProvider } from '@/components/cookie-consent/CookieConsentProvider'
import CookieConsent from '@/components/cookie-consent/CookieConsent'
import { ConditionalTracking } from '../analytics/ConditionalTracking'

interface ProvidersProps {
  children: React.ReactNode
  cartId: string | null
  dehydratedState: DehydratedState
}

export default function Providers({
  children,
  cartId: initialCartId,
  dehydratedState
}: ProvidersProps) {
  const queryClient = getQueryClient()
  const [cartId, setCartId] = useState<string | null>(initialCartId)

  return (
    <CookieConsentProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <CartIdProvider value={cartId}>
            <CartMutationClient
              actions={serverActions}
              cartId={cartId}
              setCartId={setCartId}
            >
              {children}
            </CartMutationClient>
          </CartIdProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <CookieConsent />
      <ConditionalTracking
        {...(process.env.NEXT_PUBLIC_GTM_ID && {
          googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID
        })}
        {...(process.env.NEXT_PUBLIC_META_PIXEL_ID && {
          metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID && {
          snapPixelId: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_KEY && {
          postHogApiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_HOST && {
          postHogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST
        })}
      />
    </CookieConsentProvider>
  )
}



// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { generateEventID } from './generateEventID'
import { getCookie } from './getCookie'
import { setCookie } from './setCookie'
import { getPageViewParams } from './getPageViewParams'
import { sendPageViewToCAPI } from './sendPageViewToCAPI'
export function MetaPixelEvents() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageViewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const trackPageView = () => {
    if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    pageViewTimeoutRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
          console.warn(
            'Meta Pixel: fbq not available during PageView track attempt'
          )
          return
        }

        const eventId = generateEventID()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)
        const params = getPageViewParams(currentPathname, currentSearchParams)

        window.fbq('track', 'PageView', params, { eventID: eventId })

        if (process.env.NODE_ENV === 'production') {
          sendPageViewToCAPI(currentPathname, eventId, currentSearchParams)
        }
        animationFrameRef.current = null
      })
      pageViewTimeoutRef.current = null
    }, 150)
  }

  useEffect(() => {
    trackPageView()

    return () => {
      if (pageViewTimeoutRef.current) clearTimeout(pageViewTimeoutRef.current)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [pathname, searchParams])

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

  useEffect(() => {
    if (!pathname.startsWith('/produkter/')) return

    const timeoutId = setTimeout(() => {
      if (typeof window.fbq !== 'function') {
        console.warn('Meta Pixel: fbq not available for ViewContent')
        return
      }
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return
      const eventId = generateEventID().replace('evt_', 'vc_')
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
      console.log('Meta Pixel: ViewContent tracked', {
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
  }, [pathname])
  if (!pixelId) {
    return null
  }

  const metaPixelBaseCode = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '${pixelId}');
  `

  return (
    <>
      <Script
        id='meta-pixel-base-inline'
        strategy='afterInteractive' // Viktig for SPA
        dangerouslySetInnerHTML={{ __html: metaPixelBaseCode }}
      />
    </>
  )
}



// Path: src/components/analytics/ConditionalTracking.tsx
'use client'

import { useConsent } from '@/components/cookie-consent/useConsent'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { MetaPixelEvents } from './MetaPixel/MetaPixelEvents'
import { SnapchatPixelEvents } from './Snapchat/SnapchatPixelEvents'
import type { TrackingProps } from '@types'

export function ConditionalTracking({
  googleTagManagerId,
  metaPixelId,
  snapPixelId,
  postHogApiKey,
  postHogHost = 'https://eu.i.posthog.com'
}: TrackingProps) {
  const { consent } = useConsent()

  return (
    <>
      {consent.analytics && googleTagManagerId && (
        <GoogleTagManager gtmId={googleTagManagerId} />
      )}

      {consent.analytics && postHogApiKey && (
        <Script id='posthog-script' strategy='afterInteractive'>
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${postHogApiKey}', {
              api_host: '${postHogHost}',
              opt_in_capturing: true,
              capture_pageview: false 
            })
          `}
        </Script>
      )}

      {(consent.marketing || consent.profile_marketing) && metaPixelId && (
        <MetaPixelEvents />
      )}
      {snapPixelId && <SnapchatPixelEvents />}
    </>
  )
}
