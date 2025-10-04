// Path: src/app/layout.tsx
import 'swiper/swiper-bundle.css'
import '@xyflow/react/dist/style.css'
import './globals.css'
import '@/db/zod/zodConfig'
import { geistSans, geistMono } from '@/db/config/font.config'
import { mainMenu } from '@/db/config/menu.config'

import { dehydrate } from '@tanstack/react-query'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { getAccessoryProducts } from '@/api/lib/products/getAccessoryProducts'
import { getRecommendedProducts } from '@/api/lib/products/getRecommendedProcuts'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/layout/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps, Cart } from '@types'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from 'sonner'
import WelcomeToast from '@/components/WelcomeToast/WelcomeToast'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos - Varme og komfort for gode stunder ute',
    template: '%s | Utekos'
  },
  description:
    'Forleng kveldene på hytten, i bobilen eller på terrassen. Utekos lager komfortplagg av høy kvalitet, designet for å holde deg varm slik at du kan nyte de gode øyeblikkene lenger.',
  keywords: [
    'utekos',
    'utekos dun',
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
    title: 'Utekos - Varme og komfort for gode stunder ute',
    description:
      'Forleng kveldene på hytten, i bobilen eller på terrassen. Komfortplagg av høy kvalitet som holder deg varm.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Personer som koser seg utendørs med varme komfortplagg fra Utekos.'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ditt_twitter_navn',
    creator: '@ditt_twitter_navn',
    title: 'Utekos - Forleng de gode stundene ute',
    description:
      'Ikke la kjølige kvelder stoppe kosen. Våre komfortplagg er skapt for det norske utelivet på hytten, i bobilen eller båten.'
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
    google: 'G2CuMG6i_BKaNpqVN9N_SS2rvFxXWUOwydpZH0hp2NM'
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const queryClient = getQueryClient()
  const cartId = await getCartIdFromCookie()

  // Parallel fetch med priority på cart
  const [cartData] = await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['cart', cartId],
      queryFn: () => getCachedCart(cartId),
      staleTime: 1000 * 60 * 5
    }),
    // Lower priority fetches
    queryClient.prefetchQuery({
      queryKey: ['products', 'recommended'],
      queryFn: getRecommendedProducts,
      staleTime: 1000 * 60 * 10
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', 'accessory'],
      queryFn: getAccessoryProducts,
      staleTime: 1000 * 60 * 10
    })
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang='no'>
      <head>
        {/* Preconnect to critical domains */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='dns-prefetch' href='https://cdn.vercel-insights.com' />
        <link rel='dns-prefetch' href='https://vitals.vercel-insights.com' />

        {/* Preload critical fonts */}
        <link
          rel='preload'
          href='/fonts/geist-sans.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </head>
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add resource hints script */}
        <Script id='resource-hints' strategy='afterInteractive'>
          {`
            // Preload cart components on idle
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.as = 'script';
                link.href = '/_next/static/chunks/components_cart_CartBody_CartBody.js';
                document.head.appendChild(link);
              });
            }
          `}
        </Script>

        <Providers dehydratedState={dehydratedState} cartId={cartId}>
          <AnnouncementBanner />
          <Header menu={mainMenu} />
          <main>
            {children}
            <Footer />
          </main>
          <Toaster closeButton position='bottom-right' duration={3000} />
          <WelcomeToast />
          <SpeedInsights />
          {process.env.NODE_ENV === 'production' && (
            <Analytics mode='production' />
          )}
        </Providers>
      </body>
    </html>
  )
}
