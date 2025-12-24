// Path: src/app/layout.tsx
import './globals.css'
import { geistSans } from '@/db/config/font.config'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { Suspense, type ReactNode } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { Activity } from 'react'
import Providers from '@/components/providers/Providers'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { getCachedCart } from '../lib/helpers/cart/getCachedCart'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { KlaviyoObject } from '../components/analytics/Klaviyo/ActiveOnSite'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos® - Skreddersy varmen etter behov.',
    template: '%s | Utekos®'
  },
  description:
    'Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.',

  alternates: {
    canonical: '/'
  },
  applicationName: 'Utekos',
  category: 'Yttertøy',
  keywords: ['Yttertøy', 'Dun', 'Varmedress', 'Komfortplagg', 'Utekos'],
  manifest: '/manifest.json',
  authors: [{ name: 'Utekos', url: 'https://utekos.no' }],
  creator: 'Utekos',
  publisher: 'Utekos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  facebook: {
    appId: '1154247890253046'
  },

  appleWebApp: {
    capable: true,
    title: 'Utekos',
    statusBarStyle: 'default'
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: 'https://utekos.no',
    siteName: 'Utekos',
    title: 'Utekos® - Skreddersy varmen etter behov.',
    description:
      'Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.',
    images: {
      url: 'https://utekos.no/og-kate-linn-kikkert-master.png',
      width: 1200,
      height: 630,
      alt: 'Personer som koser seg utendørs med varme komfortplagg fra Utekos.'
    }
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
      'facebook-domain-verification': 'e3q80hk1igl2celczeysvf7y1mltrs'
    }
  }
}

/**
 * Server Component som laster data før appen vises.
 * Dette sikrer at cartId er tilgjengelig for Pixel/Tracking med en gang.
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
    <html lang='no' className={geistSans.className}>
      <GoogleTagManager gtmId='GTM-5TWMJQFP' />
      <body className='bg-background text-foreground antialiased'>
        <OnlineStoreJsonLd />
        <Suspense>
          <CartProviderLoader>
            <Activity>
              <AnnouncementBanner />
            </Activity>
            <Header menu={mainMenu} />
            <main>
              <KlaviyoObject />
              {children}
              <Analytics mode='production' />
              <ChatBotAgent />
              <Activity>
                <Footer />
              </Activity>
            </main>
          </CartProviderLoader>
        </Suspense>
        <Toaster closeButton />
        <Script
          async
          type='text/javascript'
          src='//static.klaviyo.com/onsite/js//klaviyo.js'
          nonce='true'
        />
      </body>
    </html>
  )
}
