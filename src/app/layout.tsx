// Path: src/app/layout.tsx
import './globals.css'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { geistSans, geistMono } from '@/db/config/font.config'
import { mainMenu } from '@/db/config/menu.config'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { dehydrate } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { QueryClient } from '@tanstack/react-query'
import Script from 'next/script'
import { Suspense } from 'react'
import { MetaPixelEvents } from '@/components/analytics/MetaPixelEvents'

import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/SpecialOfferSection/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'

import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos™ - Forleng de gode stundene ute',
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
        url: '/og-image-produkter.png',
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
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie()
  await queryClient.prefetchQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCachedCart(cartId)
  })

  const dehydratedState = dehydrate(queryClient)
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang='no'>
      <GoogleAnalytics gaId='G-FCES3L0M9M' />
      <GoogleTagManager gtmId='GTM-5TWMJQFP' />
      <body
        className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers dehydratedState={dehydratedState} cartId={cartId}>
          <AnnouncementBanner />
          <Header menu={mainMenu} />
          <main>
            {children}
            <Footer />
          </main>
          <Toaster closeButton />
          <SpeedInsights />
          <Analytics mode='production' />
        </Providers>
        <Suspense fallback={null}>
          <MetaPixelEvents />
        </Suspense>
      </body>
      {pixelId && (
        <Script id='meta-pixel' strategy='afterInteractive'>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </html>
  )
}
