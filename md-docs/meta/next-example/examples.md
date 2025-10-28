# Meta (Facebook) Pixel Implementation Examples for Next.js

> **Purpose**: This document provides implementation patterns for Meta Pixel in
> Next.js applications. Primary reference for LLM-assisted code generation.

---

## Table of Contents

1. [Next.js 13/14 Implementation](#nextjs-1314-implementation)
2. [Next.js 14 Alternative Implementation](#nextjs-14-alternative-implementation)
3. [Third-Party Library: @tapstack/facebook-conversion-api-nextjs](#third-party-library-tapstackfacebook-conversion-api-nextjs)
4. [Third-Party Library: react-facebook](#third-party-library-react-facebook)

---

## Next.js 13/14 Implementation

### Implementation Notes

- **Compatibility**: Based on Next.js 13/14
- **Unknown**: Functionality in Next.js 16 is uncertain

### Component Structure

#### FBPixel Component

**File**: `src/components/FBPixel.tsx`

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import * as pixel from '@/components/utils/metaPixel'

interface FBProps {
  eventId?: string
}

const FBPixel = ({ eventId }: FBProps) => {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) return

    pixel.pageview()
  }, [pathname, loaded])

  return (
    <div>
      <Script
        id='fb-pixel'
        src='/scripts/pixel.js'
        strategy='afterInteractive'
        onLoad={() => setLoaded(true)}
        data-pixel-id={eventId ? eventId : pixel.FB_PIXEL_ID}
      />
    </div>
  )
}

export default FBPixel
```

#### Meta Pixel Utility

**File**: `src/components/utils/metaPixel.ts`

```ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

declare global {
  interface Window {
    fbq: Function
  }
}

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: any, options = {}) => {
  window.fbq('track', name, options)
}
```

#### Layout Integration

**File**: `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FBPixel from '@/components/FBPixel'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS 14 + FB Pixel',
  description: 'Base web page with implementation of FB pixel.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      {/**
       * You can pass eventID props to this component or
       * add the event ID as a .env variable.
       */}
      <FBPixel />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Key Differences from Current Implementation

- **Simplification**: Highly simplified approach
- **Component Encapsulation**: All script logic contained in dedicated component
- **Clean Layout**: Keeps `layout.tsx` clean and focused

---

## Next.js 14 Alternative Implementation

### PixelTracker Component

**File**: `src/components/PixelTracker.tsx`

```tsx
'use client'
import Image from 'next/image'
import Script from 'next/script'

const PixelTracker = () => {
  return (
    <>
      {/* Meta Pixel Script */}
      <Script
        strategy='afterInteractive'
        id='facebook-pixel'
        dangerouslySetInnerHTML={{
          __html: `
                        !function(f,b,e,v,n,t,s) {
                            if(f.fbq) return;
                            n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq) f._fbq=n;
                            n.push=n;
                            n.loaded=!0;
                            n.version='2.0';
                            n.queue=[];
                            t=b.createElement(e);
                            t.async=!0;
                            t.src=v;
                            s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)
                        }(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');

                        fbq('init', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
                        fbq('track', 'PageView');
                    `
        }}
      />
      <noscript>
        <Image
          alt='facebook-pixel'
          height={1}
          width={1}
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}

export default PixelTracker
```

### Layout Integration with Dynamic Import

**File**: `src/app/layout.tsx`

```tsx
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const FacebookPixel = dynamic(import('../components/FacebookPixel'))

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning className={nunito.className}>
      <body className='antialiased dark:bg-slate-900'>
        <FacebookPixel />
        <main className='flex-auto min-w-0 flex flex-col md:px-0'>
          <Header />
          <div className='min-h-screen'>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
```

### Known Issue and Fix

**Problem**: Environment variable not properly interpolated on line 31 of
`FacebookPixel.tsx`

**Incorrect**:

```ts
fbq('init', process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID)
```

**Correct**: Create a variable for the environment value

```ts
fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
```

This ensures proper conversion/replacement of the environment variable.

### Key Differences from Current Implementation

1. **Image Import**: Uses `next/image` for noscript fallback rendering
2. **Component Encapsulation**: All script logic in dedicated component, clean
   `layout.tsx`
3. **Body Placement**: Places `<FacebookPixel />` in `<body>` instead of
   `<html>`
4. **Simplified Approach**: Extremely simplified implementation
5. **Dynamic Import**: Imports `<FacebookPixel />` dynamically to avoid SSR
   issues
6. **Inline Script**: Uses `dangerouslySetInnerHTML` to inject pixel script
7. **Noscript URL Format**:
   - **This approach**:
     `https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`
   - **Current implementation**:
     `https://www.facebook.com/tr?id=${pixelId}&noscript=1`
8. **PageView Tracking**: Does NOT comment out `fbq('track', 'PageView')` in
   script
9. **No React Hooks**: No `useEffect`, `usePathname`, `useRef`, or
   `useSearchParams` usage

---

## Third example: Next.js 14 Implementation

```tsx
// components/FacebookPixel.tsx
'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import * as pixel from '../../lib/fpixel'

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!loaded) return

    pixel.pageview()
  }, [pathname, loaded])

  return (
    <div>
      <Script
        id='fb-pixel'
        src='/scripts/pixel.js'
        strategy='afterInteractive'
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  )
}

export default FacebookPixel
```

```tsx
// src/app/layout.tsx
import { FacebookPixel } from './components'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <FacebookPixel />
      </body>
    </html>
  )
}
```

### Key Differences from Current Implementation

1. **Placement**: Places `<FacebookPixel />` at the end of `<body>` instead of
   in `<html>`
2. **Simplified Approach**: Highly simplified implementation
3. **Component Encapsulation**: All script logic contained in dedicated
   component
4. **Clean Layout**: Keeps `layout.tsx` clean and focused

## Third-Party Library: @tapstack/facebook-conversion-api-nextjs

### Overview

**Package**: `@tapstack/facebook-conversion-api-nextjs`

**Description**: Facebook / Meta Conversion API (CAPI) wrapper for Next.js

### Key Features

- Implements Facebook Conversion API in Next.js
- Built on `@tapstack/facebook-dash-conversion-api` for Graph API interaction
- Published under `@tapstack` scope
- **Compatibility**:
  - Next.js 15 (including canary releases for Partial Prerendering)
  - Backward compatible with Next.js 14
  - Tested with Next.js 14, 15, and latest canary
- Includes API route handler for server-side events
- Client-side functions to trigger events
- Handles duplicate event matching between Pixel and Conversion API
- Optional standard Facebook Pixel events with automatic deduplication
- Supports Next.js API routes on Vercel and AWS Amplify

### Installation

**NPM**:

```bash
npm install @tapstack/facebook-conversion-api-nextjs
# Install peer dependency
npm install @tapstack/facebook-conversion-api
```

### Setup

#### Step 1: Create Next.js API Route

**File**: `pages/api/fb-events.js`

```js
import { fbEventsHandler } from '@tapstack/facebook-conversion-api-nextjs/handlers'

export default fbEventsHandler
```

**Environment Variables** (`.env`):

```env
FB_ACCESS_TOKEN=accessToken
NEXT_PUBLIC_FB_PIXEL_ID=pixelId
NEXT_PUBLIC_FB_DEBUG=true # optional
```

> **Note**: See [official documentation](https://developers.facebook.com/docs)
> for obtaining access token and pixel ID.

#### Step 2: Load Facebook Pixel (Optional)

Only required for standard Pixel Events.

**File**: `pages/_app.js`

```jsx
import {
  FBPixelScript,
  FBPixelProvider
} from '@tapstack/facebook-conversion-api-nextjs/components'

// In your app component
;<>
  <FBPixelScript />
  <FBPixelProvider>
    <Component {...pageProps} />
  </FBPixelProvider>
</>
```

#### Step 3: Send Events

Trigger events (e.g., AddToCart, Purchase):

```js
import { fbEvent } from '@tapstack/facebook-conversion-api-nextjs'

useEffect(() => {
  fbEvent({
    eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout, Purchase, etc.
    eventId: 'eventId', // optional, unique event IDs generated by default
    emails: ['email1', 'email2'], // optional
    phones: ['phone1', 'phone2'], // optional
    firstName: 'firstName', // optional
    lastName: 'lastName', // optional
    country: 'country', // optional
    city: 'city', // optional
    zipCode: 'zipCode', // optional
    products: [
      {
        // optional
        sku: 'product123',
        quantity: 1
      }
    ],
    value: 1000, // optional
    currency: 'USD', // optional
    enableStandardPixel: false // default false (Requires Facebook Pixel, see Step 2)
  })
}, [])
```

For en Next.js 16 nettbutikk med moderne arkitektur vil
`@tapstack/facebook-conversion-api-nextjs` være det mest komplette valget dersom
målet er en helhetlig integrasjon. Dette biblioteket er spesiallaget for vår
bruk: det gir en elegant løsning for både klientside Pixel og serverside
Conversions API, med ferdig innebygd deduplisering. Med Tapstack trenger man
minimalt med egen “limkode” – man konfigurerer Pixel ID og Access Token i
miljøvariabler, oppretter API-ruten med en linje kode, og kan deretter trigge
hendelser med en funksjon. Dette øker sannsynligheten for riktig implementasjon
på første forsøk, og biblioteket tar seg av detaljer som cookie-håndtering,
hashing av user data, osv. Det validerer også godt mot Meta’s verktøy (ifølge
dokumentasjonen) da det følger Facebooks anbefalte praksis.

---

## Third-Party Library: react-facebook

### Overview

**Package**: `react-facebook` (npm)

**Description**: React wrapper for Facebook SDK and Pixel tracking

### Quick Start

#### Option 1: With FacebookProvider (SDK + Pixel)

```jsx
import { FacebookProvider, usePixel } from 'react-facebook'
;<FacebookProvider appId='YOUR_APP_ID' pixel={{ pixelId: 'YOUR_PIXEL_ID' }}>
  <App />
</FacebookProvider>
```

#### Option 2: Pixel Only (No Facebook SDK)

```jsx
<FacebookPixelProvider pixelId='YOUR_PIXEL_ID'>
  <App />
</FacebookPixelProvider>
```

### Event Tracking Example

```jsx
function TrackingComponent() {
  const { track, pageView, trackCustom } = usePixel()

  return (
    <div>
      <button
        onClick={() =>
          track('Purchase', {
            value: 29.99,
            currency: 'USD'
          })
        }
      >
        Track Purchase
      </button>

      <button onClick={() => pageView()}>Track Page View</button>

      <button
        onClick={() =>
          trackCustom('ButtonClick', {
            button: 'hero-cta'
          })
        }
      >
        Track Custom Event
      </button>
    </div>
  )
}
```

Kan finne ut mer om ønskelig.

### Additional Resources

Minner om Meta sitt følgende eksempel på basekode, dog ikke justert for en
next.js 16 app:

- Meta Pixel Base Code Example

```html
<!-- Facebook Pixel Code -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  )
  fbq('init', '{your-pixel-id-goes-here}')
  fbq('track', 'PageView')
</script>
<noscript>
  <img
    height="1"
    width="1"
    style="display:none"
    src="https://www.facebook.com/tr?id={your-pixel-id-goes-here}&ev=PageView&noscript=1"
  />
</noscript>
<!-- End Facebook Pixel Code -->
```
