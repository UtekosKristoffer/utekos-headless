// Path: src/app/layout.tsx
import 'swiper/swiper-bundle.css'
import '@xyflow/react/dist/style.css'
import './globals.css'
import '@/db/zod/zodConfig'
import { geistSans, geistMono } from '@/db/config/font.config'
import { mainMenu } from '@/db/config/menu.config'

import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { dehydrate } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { getAccessoryProducts } from '@/api/lib/products/getAccessoryProducts'
import { getRecommendedProducts } from '@/api/lib/products/getRecommendedProcuts'
import { getQueryClient } from '@/api/lib/getQueryClient'

import WelcomeToast from '@/components/WelcomeToast/WelcomeToast'
import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/layout/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps, Cart } from '@types'
import type { Metadata } from 'next'

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

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['cart', cartId],
      queryFn: () => getCachedCart(cartId)
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', 'recommended'],
      queryFn: getRecommendedProducts
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', 'accessory'],
      queryFn: getAccessoryProducts
    })
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang='no'>
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
          <WelcomeToast />
          <SpeedInsights />
          <Analytics mode='development' />
        </Providers>
      </body>
    </html>
  )
}
