# USER CODEBASE INSIGHT

## Innsyn kodebase

- Be om mer hvis nødvendig. Vi skriver ikke kode på antagelser.
- Det er det sikre veien til feilmeldinger og unødvendige bugs.
- Respekter `react.19.2` og `next.js 16+` regler.
- Be om docs hvis du er usikker.
- Jeg har har optimaliserte markdown-filer med all relevant dokumentasjon fra
  ulike tredjepartsbibliotek og rammeverk.

## PROVIDERS FILES

### **Providers.tsx**

```tsx
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
  )
}
```

### **CartIdProvider.tsx**

```tsx
// Path: src/components/providers/CartIdProvider.tsx
import { CartIdContext } from '@/lib/context/CartIdContext'

export const CartIdProvider = CartIdContext.Provider
```

## PICKED RELEVANT FILES

### **CartIdContext.ts**

```tsx
// Path: src/lib/context/CartIdContext.ts

import { createContext } from 'react'
export const CartIdContext = createContext<string | null>(null)
```

### CartMutationContext.tsx

```tsx
// Path: src/lib/context/CartMutationContext.ts

import { createActorContext } from '@xstate/react'

import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { CartActions } from '@types'

/**
 * Represents the instantiated XState machine for cart mutations.
 * @see createCartMutationMachine
 */
export type CartMutationMachine = ReturnType<typeof createCartMutationMachine>

/**
 * A dummy implementation of the cart server actions.
 * This is used to initialize the context and will throw an error if called,
 * ensuring that real actions are provided at the application level.
 * @see CartMutationContext.Provider
 */

export const dummyServerActions: CartActions = {
  addCartLine: async () => {
    throw new Error(
      'CartMutationContext: "addCartLine" server action was not provided.'
    )
  },
  updateCartLineQuantity: async () => {
    throw new Error(
      'CartMutationContext: "updateCartLineQuantity" server action was not provided.'
    )
  },
  removeCartLine: async () => {
    throw new Error(
      'CartMutationContext: "removeCartLine" server action was not provided.'
    )
  },
  clearCart: async () => {
    throw new Error(
      'CartMutationContext: "clearCart" server action was not provided.'
    )
  }
}

/**
 * A React Context provider for the cart mutation machine.
 * This allows any client component in the tree to access the running machine actor
 * to send events and subscribe to its state.
 *
 * @example
 * In your layout or page component:
 * <CartMutationContext.Provider logic={createCartMutationMachine(serverActions, revalidateCart)}>
 * <YourApp />
 * </CartMutationContext.Provider>
 *
 * @example
 * In a client component:
 * const actorRef = CartMutationContext.useActorRef();
 * const state = CartMutationContext.useSelector(state => state);
 * actorRef.send({ type: 'ADD_LINE', ... });
 */
export const CartMutationContext = createActorContext<CartMutationMachine>(
  createCartMutationMachine(
    dummyServerActions,
    () => {
      // The placeholder for revalidateCart should also be explicit.
      // It shouldn't do anything, as it will be provided for real.
    },
    // STEG 1: Legg til det manglende tredje argumentet.
    () => {
      // Placeholder for setCartId. It shouldn't do anything.
    }
  )
)
```

### **CartMutationClient.ts**

```tsx
// Path: src/clients/CartMutationClient.tsx
'use client'

import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { Cart, CartActions } from '@types'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

export function CartMutationClient({
  actions,
  children,
  setCartId
}: {
  actions: CartActions
  children: React.ReactNode
  cartId: string | null
  setCartId: (cartId: string) => void
}) {
  const queryClient = useQueryClient()

  const updateCartCache = (newCart: Cart) => {
    if (newCart?.id) {
      queryClient.setQueryData(['cart', newCart.id], newCart)
    }
  }

  const cartMutationMachine = createCartMutationMachine(
    actions,
    updateCartCache,
    setCartId
  )

  return (
    <CartMutationContext.Provider logic={cartMutationMachine}>
      {children}
    </CartMutationContext.Provider>
  )
}
```

## MY MAIN LAYOUT.TSX FILE

### **layout.tsx**

```tsx
// Path: src/app/layout.tsx
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { geistSans, geistMono } from '@/db/config/font.config'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import { dehydrate } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { QueryClient } from '@tanstack/react-query'
import { Suspense, Activity, type ReactNode } from 'react'
import { MetaPixelEvents } from '@/components/analytics/MetaPixelEvents'
import ChatBubble from '@/components/ChatBubble'
import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/SpecialOfferSection/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'
import { OrganizationJsonLd } from './OrganizationJsonLd'

export const metadata: Metadata = {
  ...
}

/**
 * Ny Server Component for å laste dynamiske data (cartId)
 * og sette opp Providers. Dette flytter "await" UT av RootLayout
 * og INN i en Suspense-grense. Dette grunnet cacheComponents: true (next.js 16+) i next.config.ts
 */
async function CartProviderLoader({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie() // <-- Dynamisk kall

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
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang='no'>
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId='GTM-5TWMJQFP' />
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
        <Suspense fallback={null}>
          <MetaPixelEvents />
        </Suspense>
      </body>
    </html>
  )
}
```

### **instrumentation-client.ts**

```ts
// Path: src/app/admin/posthog/instrumentation-client.ts import posthog from
'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
  ui_host: 'https://eu.posthog.com',
  defaults: '2025-05-24'
})
```

### **MetaPixelEvents.tsx**

```tsx
// src/components/analytics/MetaPixelEvents.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script' // Importer next/script

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}
function setCookie(name: string, value: string, days: number = 90) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`
}
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}
function getPageViewParams(
  pathname: string,
  searchParams?: URLSearchParams | null
) {
  const params: Record<string, any> = {
    content_name:
      typeof document !== 'undefined' ? document.title
      : pathname === '/' ? 'Forside'
      : pathname,
    content_category: pathname.split('/')[1] || 'home'
  }
  if (pathname.startsWith('/produkt')) {
    params.content_type = 'product'
  } else if (pathname === '/produkter') {
    params.content_type = 'product_group'
  } else if (pathname === '/') {
    params.content_type = 'home'
  } else if (pathname.includes('/checkout') || pathname.includes('/kasse')) {
    params.content_type = 'checkout'
  } else if (pathname.includes('/cart') || pathname.includes('/handlekurv')) {
    params.content_type = 'cart'
  } else {
    params.content_type = pathname.split('/')[1] || 'page'
  }
  if (searchParams?.get('q')) {
    params.search_string = searchParams.get('q')
  }
  if (searchParams?.get('category')) {
    params.content_category = searchParams.get('category')
  }
  return params
}
async function sendPageViewToCAPI(
  pathname: string,
  eventId: string,
  searchParams?: URLSearchParams | null
) {
  try {
    const params = getPageViewParams(pathname, searchParams)
    const response = await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'PageView',
        eventData: params,
        eventId: eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000)
      })
    })
    if (!response.ok) {
      const error = await response.json()
      console.error('Meta CAPI PageView error:', error)
    } else {
      console.log('📊 Meta CAPI: PageView sent successfully for', pathname)
    }
  } catch (error) {
    console.error('Meta CAPI PageView failed to send:', error)
  }
}

// fbq type finnes globalt fra types/fbq.d.ts, trenger ikke declare her

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

        const eventId = generateEventId()
        const currentPathname = window.location.pathname
        const currentSearchParams = new URLSearchParams(window.location.search)
        const params = getPageViewParams(currentPathname, currentSearchParams)

        window.fbq('track', 'PageView', params, { eventID: eventId })

        console.log('📊 Meta Pixel: PageView tracked (Debounced + RAF)', {
          pathname: currentPathname,
          search: currentSearchParams.toString(),
          params,
          eventId
        })

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
    // Avhengigheter som før, men fjerner isPixelReady
  }, [pathname, searchParams])

  // Cookie useEffect (uendret)...
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
      // Sjekk for fbq her er fortsatt lurt før man tracker
      if (typeof window.fbq !== 'function') {
        console.warn('Meta Pixel: fbq not available for ViewContent')
        return
      }
      const handle = pathname.split('/produkter/')[1]?.split('?')[0]
      if (!handle) return
      const eventId = generateEventId().replace('evt_', 'vc_')
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
      console.log('📦 Meta Pixel: ViewContent tracked', {
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
    // IKKE kall fbq('track', 'PageView') her, la useEffect håndtere det for eventID
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

## ROUTES FILES

- Har flere, kun et eksempel (reelt eksempel)

### route.ts

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

## CONFIG FILES

### **package.json**

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "analyze": "cross-env ANALYZE=true next build",
    "clean": "rm -rf .next",
    "sync": "f() { git add . && git commit -m \"$1\" && git push; }; f"
  },
  "dependencies": {
    "@ai-sdk/huggingface": "latest",
    "@ai-sdk/openai": "^2.0.52",
    "@ai-sdk/react": "latest",
    "@dagrejs/dagre": "^1.1.5",
    "@google-cloud/local-auth": "^3.0.1",
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^5.2.1",
    "@huggingface/inference": "^4.11.1",
    "@next/third-parties": "^16.0.0",
    "@radix-ui/react-accessible-icon": "^1.1.7",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@radix-ui/react-visually-hidden": "^1.2.3",
    "@react-email/components": "^0.5.6",
    "@react-email/render": "1.3.2",
    "@shopify/graphql-client": "^1.4.1",
    "@tanstack/react-query": "^5.85.5",
    "@tanstack/react-virtual": "^3.13.12",
    "@types/js-cookie": "^3.0.6",
    "@vercel/analytics": "^1.5.0",
    "@vercel/kv": "^3.0.0",
    "@vercel/speed-insights": "^1.2.0",
    "@xstate/react": "^6.0.0",
    "@xstate/store": "^3.9.2",
    "ai": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "embla-carousel-auto-height": "^8.6.0",
    "embla-carousel-autoplay": "^8.6.0",
    "embla-carousel-fade": "^8.6.0",
    "embla-carousel-react": "^8.6.0",
    "googleapis": "^163.0.0",
    "graphql": "^16.11.0",
    "graphql-request": "^7.2.0",
    "lucide-react": "^0.540.0",
    "next": "^16.0.0",
    "next-themes": "^0.4.6",
    "posthog-js": "^1.282.0",
    "radix-ui": "^1.4.3",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.62.0",
    "react-intersection-observer": "^9.16.0",
    "redis": "^5.9.0",
    "resend": "^6.1.2",
    "schema-dts": "^1.1.5",
    "server-only": "^0.0.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.3.1",
    "typescript-eslint": "^8.42.0",
    "vaul": "^1.1.2",
    "xstate": "^5.20.2",
    "yup": "^1.7.0",
    "zod": "^4.1.1",
    "zod-validation-error": "^4.0.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@next/bundle-analyzer": "^15.5.4",
    "@tailwindcss/postcss": "^4",
    "@tanstack/react-query-devtools": "^5.85.9",
    "@types/dagre": "^0.7.53",
    "@types/google-libphonenumber": "^7.4.30",
    "@types/node": "^20",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@typescript-eslint/eslint-plugin": "^8.42.0",
    "@typescript-eslint/parser": "^8.42.0",
    "babel-plugin-react-compiler": "^19.1.0-rc.3",
    "cross-env": "^10.1.0",
    "dotenv": "^17.2.1",
    "eslint": "^9.18.0",
    "eslint-config-next": "^15.5.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.4",
    "graphql-tag": "^2.12.6",
    "jiti": "^2.5.1",
    "prettier": "^3.6.2",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.7",
    "typescript": "^5.9.2"
  }
}
```

## TypeScript

#### MERK:

**Strenge typekrav:**

- `Ingen any`-typer tillatt
- `verbatimModuleSyntax: true`
- `moduleDetection: "force"`
- `noUncheckedSideEffectImports: true`
- `exactOptionalPropertyTypes: true`
- `noUncheckedIndexedAccess: true`

### tsconfig.json

- Denne blir ofte oversett og bidrar til svært mye unøvendige rettelser og fører
  til tap av tid.
- Sørg for å forholde deg til `exactOptionalPropertyTypes: true`

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["dom", "dom.iterable", "es2024"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noUncheckedSideEffectImports": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@types": ["./types/index.ts"],
      "@types/*": ["./types/*"],
      "@public/*": ["./public/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "eslint.config.mts",
    "**/*.graphql",
    "src/lib/queries/graphql.d.ts",
    ".next/types/**/*.ts",
    "src/lib/errors",
    "types/**/*.d.ts",
    "src/api/types/event",
    "src/api/types/state",
    "src/components/WelcomeToast",
    "src/db/config",
    "src/components/ProductCard/ProductCarousel.tsx",
    ".next/dev/types/**/*.ts",
    "src/components/cookie-consent"
  ],
  "exclude": ["node_modules", ".github/**/*", "alpha/**/*"]
}
```

### **next.config.ts**

```ts
import type { NextConfig } from 'next'

import nextBundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: [
      'zod',
      '@radix-ui/react-dialog',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'xstate',
      'cmdk',
      'embla-carousel-react',
      'sonner',
      'vaul'
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**'
      }
    ],
    qualities: [75, 80, 90, 100]
  },
  async redirects() {
    return [
      // --- Generelle redirects (fra gammel Shopify-struktur) ---
      {
        source: '/products/:path*',
        destination: '/produkter/:path*',
        permanent: true
      },
      {
        source: '/collections/:path*',
        destination: '/produkter',
        permanent: true
      },

      // --- Spesifikke redirects (fra gammel `pages`-struktur) ---
      // Om Oss
      {
        source: '/pages/hva-er-utekos',
        destination: '/om-oss',
        permanent: true
      },
      // Handlehjelp
      {
        source: '/pages/vask-og-vedlikehold',
        destination: '/handlehjelp/vask-og-vedlikehold',
        permanent: true
      },
      {
        source: '/pages/storrelsesguide',
        destination: '/handlehjelp/storrelsesguide',
        permanent: true
      },
      {
        source: '/pages/teknologi-og-materialer',
        destination: '/handlehjelp/teknologi-materialer',
        permanent: true
      },
      // Inspirasjon
      {
        source: '/pages/hytteliv',
        destination: '/inspirasjon/hytteliv',
        permanent: true
      },
      {
        source: '/pages/batliv',
        destination: '/inspirasjon/batliv',
        permanent: true
      },
      {
        source: '/pages/terrassen',
        destination: '/inspirasjon/terrassen',
        permanent: true
      },
      {
        source: '/pages/bobil',
        destination: '/inspirasjon/bobil',
        permanent: true
      },
      {
        source: '/pages/bobilferie/:path*', // Fanger opp alle undersider
        destination: '/inspirasjon/bobil',
        permanent: true
      },
      {
        source: '/pages/grillkvelden',
        destination: '/inspirasjon/grillkvelden',
        permanent: true
      },
      // Catch-all for gammel inspirasjon-struktur
      {
        source: '/pages/inspirasjon/:path*',
        destination: '/inspirasjon',
        permanent: true
      },
      {
        source: '/pages/fjellinspirasjon/:path*',
        destination: '/inspirasjon',
        permanent: true
      },
      {
        source: '/pages/camping',
        destination: '/inspirasjon',
        permanent: true
      }
    ]
  }
}

export default withBundleAnalyzer(nextConfig)
```

### **vercel.json**

**Merknad:** Antar at jeg bytte fra us til eu her? Har https://eu.i.posthog.com
i min `env.local`

```json
{
  "rewrites": [
    {
      "source": "/relay-MAhe/static/(.*)",
      "destination": "https://us-assets.i.posthog.com/static/$1"
    },
    {
      "source": "/relay-MAhe/(.*)",
      "destination": "https://us.i.posthog.com/$1"
    }
  ],
  "regions": ["arn1"]
}
```

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_XXXXXXXX...osv
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

## DOCS

### Typescript

**exactOptionalPropertyTypes**: true

#

Exact Optional Property Types - `exactOptionalPropertyTypes` With
`exactOptionalPropertyTypes` enabled, TypeScript applies stricter rules around
how it handles properties on type or interfaces which have a `?` prefix.

For example, this `interface` declares that there is a property which can be one
of two strings: ‘dark’ or ‘light’ or it should not be in the object.

```ts
interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride?: 'dark' | 'light'
}
```

Without this flag enabled, there are three values which you can set
colorThemeOverride to be: “dark”, “light” and undefined.

Setting the value to undefined will allow most JavaScript runtime checks for the
existence to fail, which is effectively falsy. However, this isn’t quite
accurate; `colorThemeOverride: undefined` is not the same as
`colorThemeOverride` not being defined. For example, "colorThemeOverride" in
settings would have different behavior with undefined as the key compared to not
being defined.

`exactOptionalPropertyTypes` makes TypeScript truly enforce the definition
provided as an optional property:

```ts
const settings = getUserSettings()
settings.colorThemeOverride = 'dark'
settings.colorThemeOverride = 'light'
```

```ts
// But not:
settings.colorThemeOverride = undefined
```

Type 'undefined' is not assignable to type '"dark" | "light"' with
`exactOptionalPropertyTypes: true`. Consider adding 'undefined' to the type of
the target.

## OTHER GOOD TO KNOWS

### Shopify Api Version

```env
SHOPIFY_API_VERSION=2025-10
```

### Constants

```ts
// Path: src/api/constants/index.ts
export const TAGS = {
  products: 'products',
  cart: 'cart'
}

import { ensureStartsWith } from '@/lib/utils/ensureStartsWith'

export const domain =
  process.env.SHOPIFY_STORE_DOMAIN ?
    ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''

export const FREE_SHIPPING_THRESHOLD = 999
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2025-10/graphql.json'

// not used
export const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
// not used
export const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
// not used
export const HIDDEN_PRODUCT_TAG = 'useNext'
```

## Shopify Communication

### **shopify.config.ts**

```ts
// Path: src/db/config/shopify.config.ts

/**
 * Shopify configuration
 * Centralizes all Shopify-related environment variables and URL construction
 */

const SHOPIFY_API_VERSION = '2025-10'
export const shopifyConfig = {
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  apiVersion: process.env.SHOPIFY_API_VERSION || SHOPIFY_API_VERSION,

  get storefrontApiUrl() {
    if (!this.storeDomain) {
      throw new Error('SHOPIFY_STORE_DOMAIN is not defined')
    }

    const domain = this.storeDomain
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')

    return `https://${domain}/api/${this.apiVersion}/graphql.json`
  },

  validate() {
    const errors: string[] = []

    if (!this.storeDomain) {
      errors.push('SHOPIFY_STORE_DOMAIN is not defined')
    }

    if (!this.storefrontAccessToken) {
      errors.push('SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined')
    }

    if (errors.length > 0) {
      throw new Error(`Shopify configuration errors:\n${errors.join('\n')}`)
    }

    return true
  }
}

export const getShopifyEndpoint = () => shopifyConfig.storefrontApiUrl

export const getShopifyToken = () => shopifyConfig.storefrontAccessToken
export const validateShopifyConfig = () => shopifyConfig.validate()
```

### fetchShopify.ts

```ts
// Path: src/api/shopify/request/fetchShopify.ts

import { isGraphQLErrorResponse } from '@/api/graphql/response/isGraphQLErrorResponse'
import { isGraphQLSuccessResponse } from '@/api/graphql/response/isGraphQLSuccessResponse'
import { getShopifyEndpoint, getShopifyToken } from '@/db/config/shopify.config'
import type {
  ExtractVariables,
  ShopifyFetchResult,
  ShopifyOperation
} from '@types'

export async function shopifyFetch<T extends ShopifyOperation<any, any>>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit
  query: string
  variables?: ExtractVariables<T>
}): Promise<ShopifyFetchResult<T['data']>> {
  const endpoint = getShopifyEndpoint()
  const token = getShopifyToken()

  if (!token) {
    throw new Error('Missing Shopify storefront access token.')
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    })

    const body: unknown = await response.json()

    if (isGraphQLSuccessResponse<T['data']>(body)) {
      return {
        success: true,
        body: body.data
      }
    }

    if (isGraphQLErrorResponse(body)) {
      console.error('Shopify API Error:', JSON.stringify(body.errors, null, 2))
      return {
        success: false,
        error: body
      }
    }

    throw new Error('Unknown response structure from Shopify API.')
  } catch (e) {
    console.error('Fetch operation failed:', e)
    throw e
  }
}
```

### **getProducts.ts**

