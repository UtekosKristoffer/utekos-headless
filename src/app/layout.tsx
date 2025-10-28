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
import Script from 'next/script'
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
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos™ - Forleng de gode stundene ute',
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
    title: 'Utekos™ - Forleng de gode stundene ute.',
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
// RootLayout er nå IKKE async
export default function RootLayout({ children }: RootLayoutProps) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang='no'>
      {pixelId && (
        <Script id='meta-pixel-base' strategy='afterInteractive'>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            // Initialize with empty object for manual advanced matching
            // Will be populated dynamically when user data is available
            fbq('init', '${pixelId}', {});

            // Set automatic advanced matching
            fbq('set', 'autoConfig', true, '${pixelId}');

            // fbq('track', 'PageView'); // <-- KOMMENTERT UT / FJERNET
          `}
        </Script>
      )}

      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Noscript fallback for Meta Pixel */}
        {pixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height={1}
              width={1}
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${pixelId}&noscript=1`} // <-- Fjernet &ev=PageView
              alt=''
            />
          </noscript>
        )}

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
