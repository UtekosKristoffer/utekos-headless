# Snapchat Pixel Events

## Event Source Setup

- Select and manage the events you want to track on your website.

1. Copy Base Code

```ts
<!-- Snap Pixel Code -->
<script type='text/javascript'>
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');

snaptr('init', '3b3c8f0c-51f8-4b21-bf44-cc5e1121588a', {
'user_email': '__INSERT_USER_EMAIL__'
});

snaptr('track', 'PAGE_VIEW');

</script>
<!-- End Snap Pixel Code -->
```

2. Add Base Code To Your Website Paste the code at the bottom of the header
   section just above the </head> tag. When using Next js. there is not a head
   tag so you will need to add it in the "body".

3. Add Events To Your Website Paste the code to the correct areas on each page.

## Add to Cart Event

```ts
snaptr('track', 'ADD_CART', {'price': INSERT_PRICE, 'currency': 'INSERT_CURRENCY', 'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'], 'item_category': 'INSERT_ITEM_CATEGORY', 'number_items': INSERT_NUMBER_ITEMS, 'uuid_c1': 'INSERT_UUID_C1', 'client_deduplication_id': 'INSERT_CLIENT_DEDUPLICATION_ID', 'data_use': 'INSERT_DATA_USE', 'event_tag', 'INSERT_EVENT_TAG', 'user_email': 'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER', 'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number': 'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname': 'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_city': 'INSERT_GEO_CITY', 'geo_country': 'INSERT_GEO_COUNTRY', 'geo_postal_code': 'INSERT_GEO_POSTAL_CODE', 'geo_region': 'INSERT_GEO_REGION'})
```

## Purchase Event

```ts
snaptr('track', 'PURCHASE', {'price': INSERT_PRICE, 'currency': 'INSERT_CURRENCY', 'transaction_id': 'INSERT_TRANSACTION_ID', 'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'], 'item_category': 'INSERT_ITEM_CATEGORY', 'number_items': INSERT_NUMBER_ITEMS, 'uuid_c1': 'INSERT_UUID_C1', 'client_deduplication_id': 'INSERT_CLIENT_DEDUPLICATION_ID', 'customer_status': 'INSERT_CUSTOMER_STATUS', 'payment_info_available': INSERT 1/0, 'user_email': 'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER', 'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number': 'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname': 'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_city': 'INSERT_GEO_CITY', 'geo_country': 'INSERT_GEO_COUNTRY', 'geo_postal_code': 'INSERT_GEO_POSTAL_CODE', 'geo_region': 'INSERT_GEO_REGION'})
```

## Page View Event

```ts
snaptr('track', 'PAGE_VIEW', {'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'], 'item_category': 'INSERT_ITEM_CATEGORY', 'uuid_c1': 'INSERT_UUID_C1', 'client_deduplication_id': 'INSERT_CLIENT_DEDUPLICATION_ID', 'event_tag', 'INSERT_EVENT_TAG', 'user_email': 'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER', 'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number': 'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname': 'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_city': 'INSERT_GEO_CITY', 'geo_country': 'INSERT_GEO_COUNTRY', 'geo_postal_code': 'INSERT_GEO_POSTAL_CODE', 'geo_region': 'INSERT_GEO_REGION'})
```

## View Content Event

```ts
snaptr('track', 'VIEW_CONTENT', {'price': INSERT_PRICE, 'currency': 'INSERT_CURRENCY', 'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'], 'item_category': 'INSERT_ITEM_CATEGORY', 'uuid_c1': 'INSERT_UUID_C1', 'att_status': 'INSERT_ATT_STATUS', 'client_deduplication_id': 'INSERT_CLIENT_DEDUPLICATION_ID', 'event_tag', 'INSERT_EVENT_TAG', 'user_email': 'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER', 'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number': 'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname': 'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_city': 'INSERT_GEO_CITY', 'geo_country': 'INSERT_GEO_COUNTRY', 'geo_postal_code': 'INSERT_GEO_POSTAL_CODE', 'geo_region': 'INSERT_GEO_REGION'})
```

## Initiate Checkout Event

```ts
snaptr('track', 'START_CHECKOUT', {'price': INSERT_PRICE, 'currency':
'INSERT_CURRENCY', 'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'],
'item_category': 'INSERT_ITEM_CATEGORY', 'number_items': INSERT_NUMBER_ITEMS,
'payment_info_available': INSERT 1/0, 'uuid_c1': 'INSERT_UUID_C1',
'client_deduplication_id': 'INSERT_CLIENT_DEDUPLICATION_ID', 'user_email':
'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER',
'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number':
'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname':
'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_city': 'INSERT_GEO_CITY',
'geo_country': 'INSERT_GEO_COUNTRY', 'geo_postal_code':
'INSERT_GEO_POSTAL_CODE', 'geo_region': 'INSERT_GEO_REGION'})
```

## **CAPI Events**

Event Source Setup Select and manage the events you want to track on your
website. Your Access Token The Access Token is a credential that can be used by
an application to access an API:

Please contact your organization administrator to access your Conversions API
token.

1. Make a POST request to send new events using your access token To send new
   events, make a POST request from this path:

https://tr.snapchat.com/v3/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a/events?access_token=INSERT_ACCESS_TOKEN

2. Send Your Events

## CAPI: ADD TO CART

```ts
"data": [{
	"event_name": "ADD_CART",
	"action_source": "website",
	"event_source_url": "INSERT_YOUR_WEBSITE",
	"event_time": INSERT_EPOCH_TIMESTAMP,

	"user_data": {
	"em": ["INSERT_HASHED_EMAIL_VALUE"],
	"ph": ["INSERT_HASHED_PHONE_NUMBER_VALUE"],
	"user_agent": "INSERT_CLIENT_USER_AGENT",
	"client_ip_address": "INSERT_CLIENT_IP_ADDRESS",
	"sc_click_id": "INSERT_CLICK_ID",
	"sc_cookie1": "INSERT_scID",
	"country": "INSERT_HASHED_COUNTRY",
	"st": "INSERT_HASHED_STATE",
	"zp": "INSERT_HASHED_POSTAL_CODE",
	"fn": ["INSERT_HASHED_FIRST_NAME"],
	"ln": ["INSERT_HASHED_LAST_NAME"],
	"ct": "INSERT_HASHED_CITY",
	"ge": "INSERT_HASHED_GENDER (m/f)",
	"madid": "INSERT_MOBILE_AD_ID"},

	"custom_data": {
	"event_id": "INSERT_EVENT_ID",
	"value": "INSERT_PRICE",
	"currency": "INSERT_CURRENCY_CODE",
	"content_ids": ["INSERT_ITEM_ID"],
	"content_category": ["INSERT_CATEGORY"],
	"number_items": ["INSERT_QUANTITY_1", "INSERT_QUANTITY_2"]}
	}]
```

## CAPI: Page View

```ts
"data": [{
	"event_name": "PAGE_VIEW",
	"action_source": "website",
	"event_source_url": "INSERT_YOUR_WEBSITE",
	"event_time": INSERT_EPOCH_TIMESTAMP,

	"user_data": {
	"em": ["INSERT_HASHED_EMAIL_VALUE"],
	"ph": ["INSERT_HASHED_PHONE_NUMBER_VALUE"],
	"user_agent": "INSERT_CLIENT_USER_AGENT",
	"client_ip_address": "INSERT_CLIENT_IP_ADDRESS",
	"sc_click_id": "INSERT_CLICK_ID",
	"sc_cookie1": "INSERT_scID",
	"country": "INSERT_HASHED_COUNTRY",
	"st": "INSERT_HASHED_STATE",
	"zp": "INSERT_HASHED_POSTAL_CODE",
	"fn": ["INSERT_HASHED_FIRST_NAME"],
	"ln": ["INSERT_HASHED_LAST_NAME"],
	"ct": "INSERT_HASHED_CITY",
	"ge": "INSERT_HASHED_GENDER (m/f)",
	"madid": "INSERT_MOBILE_AD_ID"},

	"custom_data": {
	"event_id": "INSERT_EVENT_ID",
	"content_category": ["INSERT_CATEGORY"],
	"content_ids": ["INSERT_ITEM_ID"],
	"currency": "INSERT_CURRENCY_CODE",
	"value": "INSERT_PRICE"}
	}]
```

## CAPI: Purchase

```ts
"data": [{
	"event_name": "PURCHASE",
	"action_source": "website",
	"event_source_url": "INSERT_YOUR_WEBSITE",
	"event_time": INSERT_EPOCH_TIMESTAMP,

	"user_data": {
	"em": ["INSERT_HASHED_EMAIL_VALUE"],
	"ph": ["INSERT_HASHED_PHONE_NUMBER_VALUE"],
	"user_agent": "INSERT_CLIENT_USER_AGENT",
	"client_ip_address": "INSERT_CLIENT_IP_ADDRESS",
	"sc_click_id": "INSERT_CLICK_ID",
	"sc_cookie1": "INSERT_scID",
	"country": "INSERT_HASHED_COUNTRY",
	"st": "INSERT_HASHED_STATE",
	"zp": "INSERT_HASHED_POSTAL_CODE",
	"fn": ["INSERT_HASHED_FIRST_NAME"],
	"ln": ["INSERT_HASHED_LAST_NAME"],
	"ct": "INSERT_HASHED_CITY",
	"ge": "INSERT_HASHED_GENDER (m/f)",
	"madid": "INSERT_MOBILE_AD_ID"},

	"custom_data": {
	"event_id": "INSERT_EVENT_ID",
	"value": "INSERT_PRICE",
	"currency": "INSERT_CURRENCY_CODE",
	"content_ids": ["INSERT_ITEM_ID"],
	"content_category": ["INSERT_CATEGORY"],
	"number_items": ["INSERT_QUANTITY_1", "INSERT_QUANTITY_2"],
	"order_id": "INSERT_ORDER_ID"}
	}]
```

## CAPI: View Content

```ts
"data": [{
	"event_name": "VIEW_CONTENT",
	"action_source": "website",
	"event_source_url": "INSERT_YOUR_WEBSITE",
	"event_time": INSERT_EPOCH_TIMESTAMP,

	"user_data": {
	"em": ["INSERT_HASHED_EMAIL_VALUE"],
	"ph": ["INSERT_HASHED_PHONE_NUMBER_VALUE"],
	"user_agent": "INSERT_CLIENT_USER_AGENT",
	"client_ip_address": "INSERT_CLIENT_IP_ADDRESS",
	"sc_click_id": "INSERT_CLICK_ID",
	"sc_cookie1": "INSERT_scID",
	"country": "INSERT_HASHED_COUNTRY",
	"st": "INSERT_HASHED_STATE",
	"zp": "INSERT_HASHED_POSTAL_CODE",
	"fn": ["INSERT_HASHED_FIRST_NAME"],
	"ln": ["INSERT_HASHED_LAST_NAME"],
	"ct": "INSERT_HASHED_CITY",
	"ge": "INSERT_HASHED_GENDER (m/f)",
	"madid": "INSERT_MOBILE_AD_ID"},

	"custom_data": {
	"event_id": "INSERT_EVENT_ID",
	"value": "INSERT_PRICE",
	"currency": "INSERT_CURRENCY_CODE",
	"content_ids": ["INSERT_ITEM_ID"],
	"content_category": ["INSERT_CATEGORY"]}
	}]
```

## Meta Pixel In This Project

```ts
// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script' // Importer next/script
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
  }, [pathname]) // Fjerner isPixelReady herfra
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
```

## layout.tsx In This Project

```ts
// Path: src/app/layout.tsx
import './globals.css'
import { geistSans, geistMono } from '@/db/config/font.config'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import { dehydrate } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { QueryClient } from '@tanstack/react-query'
import { Suspense, Activity, type ReactNode } from 'react'
import ChatBubble from '@/components/ChatBubble'
import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'
import { OrganizationJsonLd } from './OrganizationJsonLd'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos - Forleng de gode stundene ute',
    template: '%s | Utekos'
  },
  description:
    'Forleng kveldene på hytten, i bobilen eller på terrassen. Utekos lager komfortplagg av høy kvalitet, designet for å holde deg varm slik at du kan nyte de gode øyeblikkene lenger.',
  alternates: {
    canonical: 'https://utekos.no'
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' }
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico'
  },
  manifest: '/manifest.json',
  keywords: [
    'komfortplagg',
    'hytteliv',
    'bobil klær',
    'båtkos',
    'dunkåpe',
    'anorakk',
    'dunjakke',
    'utejakke',
    'ute klær',
    'regnkåpe',
    'varmedress',
    'lang dunjakke',
    'dun klær',
    'varmeplagg',
    'utekos',
    'dun dress',
    'utekos dress',
    'sovepose dress',
    'holde varmen ute',
    'hytteliv',
    'komfortplagg',
    'bobil',
    'terrassevarmer',
    'båtliv',
    'kvalitetsklær',
    'forlenge kvelden',
    'varme klær'
  ],
  authors: [{ name: 'Utekos' }],
  creator: 'Utekos',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no',
    siteName: 'Utekos',
    title: 'Utekos - Forleng de gode stundene ute.',
    description:
      'Kompromissløs komfort, designet for å holde på varmen når øyeblikkene teller.',

    images: [
      {
        url: '/og-image-produkter.png',
        width: 1200,
        height: 630,
        alt: 'Personer som koser seg utendørs med varme komfortplagg fra Utekos.'
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'G2CuMG6i_BKaNpqVN9N_SS2rvFxXWUOwydpZH0hp2NM',
    other: {
      'facebook-domain-verification': 'xrpchgl0yix27kvh9s677ze48vehjc'
    }
  }
}

/**
 * Ny Server Component for å laste dynamiske data (cartId)
 * og sette opp Providers. Dette flytter "await" UT av RootLayout
 * og INN i en Suspense-grense. Dette grunnet cacheComponents: true (next.js 16+) i next.config.ts
 */
async function CartProviderLoader({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie()

  await queryClient.prefetchQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCachedCart(cartId)
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <Providers dehydratedState={dehydratedState} cartId={cartId}>
      {children}
    </Providers>
  )
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='no'>
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd />
        <Suspense>
          <CartProviderLoader>
            <Activity>
              <AnnouncementBanner />
            </Activity>
            <Activity>
              <Header menu={mainMenu} />
            </Activity>
            <main>
              {children}
              <Activity>
                <Footer />
              </Activity>
            </main>
            <Activity>
              <ChatBubble />
            </Activity>
          </CartProviderLoader>
        </Suspense>
        <Toaster closeButton />
        <Analytics mode='production' />
      </body>
    </html>
  )
}
```

## Providers.tsx In This Project

```ts
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
```

## app/api/meta-events/route.ts

```ts
// Path: app/api/meta-events/route.ts
import { NextRequest, NextResponse } from 'next/server'

type ContentItem = { id: string; quantity: number; item_price?: number }
type CustomData = {
  value?: number
  currency?: string
  content_type?: 'product' | 'product_group'
  content_ids?: string[]
  contents?: ContentItem[]
  num_items?: number
  order_id?: string
}
type UserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  ge?: string[]
  db?: string[]
  ct?: string[]
  st?: string[]
  zp?: string[]
  country?: string[]
  client_ip_address?: string | null
  client_user_agent?: string | null
  fbc?: string | null
  fbp?: string | null
  external_id?: string | undefined
}
type Body = {
  eventName:
    | 'ViewContent'
    | 'AddToCart'
    | 'InitiateCheckout'
    | 'Purchase'
    | 'PageView'
    | string
  eventData?: CustomData
  userData?: UserData
  eventId?: string
  eventSourceUrl?: string
  eventTime?: number
}

export async function POST(req: NextRequest) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Meta CAPI environment variables not set')
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  const ua = req.headers.get('user-agent')
  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip =
    xForwardedFor ? (xForwardedFor.split(',')[0]?.trim() ?? null) : null

  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = cookieHeader.split('; ').reduce(
    (acc, current) => {
      const [name, ...value] = current.split('=')
      if (name) acc[name.trim()] = value.join('=')
      return acc
    },
    {} as Record<string, string>
  )
  const fbp = cookies._fbp || null
  const fbc = cookies._fbc || null

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body.eventName || !body.eventId || !body.eventSourceUrl) {
    return NextResponse.json(
      {
        error:
          'Missing required event fields: eventName, eventId, eventSourceUrl'
      },
      { status: 400 }
    )
  }

  const event_name = body.eventName
  const event_time = body.eventTime ?? Math.floor(Date.now() / 1000)

  // --- Bygg UserData ---
  const user_data: UserData = {
    client_ip_address: ip,
    client_user_agent: ua,
    fbp: fbp,
    fbc: fbc,

    ...(body.userData?.em && { em: body.userData.em }),
    ...(body.userData?.ph && { ph: body.userData.ph }),
    ...(body.userData?.fn && { fn: body.userData.fn }),
    ...(body.userData?.ln && { ln: body.userData.ln }),
    ...(body.userData?.ge && { ge: body.userData.ge }),
    ...(body.userData?.db && { db: body.userData.db }),
    ...(body.userData?.ct && { ct: body.userData.ct }),
    ...(body.userData?.st && { st: body.userData.st }),
    ...(body.userData?.zp && { zp: body.userData.zp }),
    ...(body.userData?.country && { country: body.userData.country }),
    ...(body.userData?.external_id && {
      external_id: body.userData.external_id
    })
  }

  const payload: Record<string, any> = {
    data: [
      {
        event_name: event_name,
        event_time: event_time,
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl,
        user_data: user_data,
        custom_data: body.eventData ?? {}
      }
    ]
  }

  try {
    const metaApiUrl = `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

    const res = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    console.log(
      `Meta CAPI Response for ${event_name} (${body.eventId}):`,
      JSON.stringify(json, null, 2)
    )
    if (!res.ok) {
      console.error(
        `Meta CAPI request failed for ${event_name} (${body.eventId}): Status ${res.status}`,
        json
      )
      return NextResponse.json(
        { error: 'Failed to send event to Meta CAPI', details: json },
        { status: res.status }
      )
    }
    return NextResponse.json({ success: true, metaResponse: json })
  } catch (fetchError) {
    console.error(
      `Meta CAPI fetch error for ${event_name} (${body.eventId}):`,
      fetchError
    )
    return NextResponse.json(
      {
        error: 'Failed to connect to Meta CAPI',
        details: (fetchError as Error).message ?? 'Unknown fetch error'
      },
      { status: 503 }
    )
  }
}
```

## Meta CAPI Purchase Route

```ts
// src/app/api/capi/purchase.route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { redisGet, redisDel } from '@/lib/redis'
import type {
  OrderPaid,
  CheckoutAttribution,
  MetaEvent,
  MetaContentItem,
  MetaPurchaseCustomData,
  MetaUserData,
  MetaEventsRequest,
  MetaGraphError,
  MetaEventsSuccess
} from '@types'

/* ----------------------------- Helper Functions ----------------------------- */

function verifyHmac(req: NextRequest, raw: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? ''
  if (!secret) return false
  const header = req.headers.get('x-shopify-hmac-sha256') ?? ''
  const digest = crypto
    .createHmac('sha256', secret)
    .update(raw, 'utf8')
    .digest('base64')
  if (header.length !== digest.length) return false
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(header))
}

function toNumberSafe(s: string | undefined): number | undefined {
  if (typeof s !== 'string') return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

function hash(input: string): string {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex')
}

function normalizeAndHash(
  input: string | undefined | null
): string | undefined {
  if (!input) return undefined
  const normalized = input.trim().toLowerCase()
  return normalized ? hash(normalized) : undefined
}

function normalizePhone(input: string | undefined | null): string | undefined {
  if (!input) return undefined
  const normalized = input.replace(/[^0-9]/g, '')
  return normalized ? hash(normalized) : undefined
}

/* ----------------------------- Route ----------------------------- */

export async function POST(req: NextRequest) {
  // 1) HMAC validation on raw body
  const raw = await req.text()
  if (!verifyHmac(req, raw)) {
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  // 2) Parse order
  let order: OrderPaid
  try {
    order = JSON.parse(raw) as OrderPaid
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 3) Retrieve attribution from Redis
  const token = order.token ?? undefined
  const attrib =
    token ? await redisGet<CheckoutAttribution>(`checkout:${token}`) : null

  // 4) Build custom_data (Enriched)
  const priceSet = order.total_price_set ?? order.current_total_price_set
  const value = toNumberSafe(priceSet?.shop_money.amount) ?? 0
  const currency = priceSet?.shop_money.currency_code ?? order.currency

  const contents: MetaContentItem[] = order.line_items.map(li => {
    const item: MetaContentItem = {
      id: (li.variant_id ?? li.product_id)?.toString() ?? 'unknown'
    }
    if (li.quantity) item.quantity = li.quantity
    const price = toNumberSafe(li.price_set.shop_money.amount)
    if (typeof price === 'number') item.item_price = price
    return item
  })

  const custom_data: MetaPurchaseCustomData = { value, currency }
  if (contents.length) custom_data.contents = contents
  custom_data.content_type = 'product'
  custom_data.order_id = order.admin_graphql_api_id
  if (contents.length) custom_data.content_ids = contents.map(c => c.id)

  // Enrichment: Add shipping, tax, coupon, num_items
  const shippingAmount = toNumberSafe(
    order.total_shipping_price_set?.shop_money.amount
  )
  if (typeof shippingAmount === 'number') custom_data.shipping = shippingAmount

  const taxAmount = toNumberSafe(order.total_tax_set?.shop_money.amount)
  if (typeof taxAmount === 'number') custom_data.tax = taxAmount

  if (Array.isArray(order.discount_codes) && order.discount_codes.length > 0) {
    const codes = order.discount_codes
      .map(dc => dc?.code)
      .filter(Boolean) as string[]
    if (codes.length > 0) custom_data.coupon = codes.join(',')
  }

  const totalQty = order.line_items.reduce(
    (sum, li) => sum + (li.quantity ?? 0),
    0
  )
  if (totalQty > 0) custom_data.num_items = totalQty

  // 5) Build user_data (Enriched for max EMQ)
  const user_data: MetaUserData = {}

  // From Redis (set on client)
  if (attrib?.userData.fbp) user_data.fbp = attrib.userData.fbp
  if (attrib?.userData.fbc) user_data.fbc = attrib.userData.fbc
  if (attrib?.userData.client_user_agent)
    user_data.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData.client_ip_address)
    user_data.client_ip_address = attrib.userData.client_ip_address

  // From Order Payload
  const phone = order.phone ?? order.customer?.phone
  const phoneString = typeof phone === 'string' ? phone.toString() : phone
  const normalizedPhone = normalizePhone(phoneString)
  if (normalizedPhone !== undefined) {
    user_data.ph = [normalizedPhone]
  }

  const email = order.email ?? order.customer?.email
  const normalizedEmail = normalizeAndHash(email)
  if (normalizedEmail !== undefined) {
    user_data.em = [normalizedEmail]
  }

  const customerId = order.customer?.admin_graphql_api_id
  if (customerId) {
    user_data.external_id = customerId
  }
  const customer = order.customer
  if (customer) {
    const firstName = normalizeAndHash(customer.first_name)
    if (firstName !== undefined) user_data.fn = [firstName]

    const lastName = normalizeAndHash(customer.last_name)
    if (lastName !== undefined) user_data.ln = [lastName]

    const addr = customer.default_address
    if (addr) {
      const city = normalizeAndHash(addr.city)
      if (city !== undefined) user_data.ct = [city]

      const state = normalizeAndHash(addr.province_code)
      if (state !== undefined) user_data.st = [state]

      const zip = normalizeAndHash(addr.zip)
      if (zip !== undefined) user_data.zp = [zip]

      const country = normalizeAndHash(addr.country_code)
      if (country !== undefined) user_data.country = [country]
    }
  }

  // 6) Build event
  const event_time = Math.floor(
    new Date(order.processed_at ?? order.created_at).getTime() / 1000
  )
  const webhookGid =
    order.admin_graphql_api_id
    ?? (order.id != null ? `gid://shopify/Order/${order.id}` : undefined)
  const eventId = webhookGid ? `shopify_order_${webhookGid}` : undefined

  const event_url =
    attrib?.checkoutUrl
    ?? (order as any)?.order_status_url
    ?? (order.token ? `https://utekos.no/checkouts/${order.token}` : undefined)

  const event: MetaEvent = {
    event_name: 'Purchase',
    event_time,
    action_source: 'website',
    user_data,
    custom_data,
    ...(eventId ? { event_id: eventId } : {}),
    ...(event_url ? { event_source_url: event_url } : {})
  }
  const payload: MetaEventsRequest = { data: [event] }
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    if (token) await redisDel(`checkout:${token}`)
    return NextResponse.json({ error: 'Missing CAPI config' }, { status: 500 })
  }

  console.log(
    '--- CAPI PAYLOAD SENT (OPTIMIZED) ---',
    JSON.stringify(payload, null, 2)
  )

  const res = await fetch(
    `https://graph.facebook.com/v24.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )

  const result = (await res.json()) as MetaEventsSuccess | MetaGraphError

  if (token) await redisDel(`checkout:${token}`)

  if (!res.ok) {
    console.error(
      '--- META CAPI ERROR RESPONSE ---',
      JSON.stringify(result, null, 2)
    )
    return NextResponse.json(
      { error: 'Meta CAPI error', details: result },
      { status: res.status }
    )
  }

  console.log(
    '--- META CAPI SUCCESS RESPONSE ---',
    JSON.stringify(result, null, 2)
  )
  return NextResponse.json({ ok: true, result })
}
```

## Utekos SnapPixel
ID: 3b3c8f0c-51f8-4b21-bf44-cc5e1121588a
SNAPCHAT_PIXEL_API_KEY=eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXXXXXXXXXXXXXXXXXX.....OSV