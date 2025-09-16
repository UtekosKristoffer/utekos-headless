// Path: src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Providers from '@/components/providers/Providers'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { fetchMenu } from '@/lib/helpers/menu/fetchMenu'

import { Geist, Geist_Mono as GeistMono } from 'next/font/google'

import type { RootLayoutProps } from '@/api/types/props'
import type { Cart } from '@/types/cart'

import '@/db/zod/zodConfig'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos - Premium Friluftsklær',
    template: '%s | Utekos'
  },
  description:
    'Utekos tilbyr premium friluftsklær for alle eventyr. Bygget med Next.js og Shopify for optimal ytelse.',
  keywords: ['friluftsliv', 'utekos', 'friluftsklær', 'outdoor', 'premium'],
  authors: [{ name: 'Utekos' }],
  creator: 'Utekos',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    url: '<https://utekos.no>',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image.jpg', // Nå vil denne bli til <https://utekos.no/og-image.jpg>
        width: 1200,
        height: 630,
        alt: 'Utekos - Premium Friluftsklær'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@utekos',
    creator: '@utekos'
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
    google: 'your-google-verification-code'
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [mainMenu, cartId] = await Promise.all([
    fetchMenu('header-mega-menu'),
    getCartIdFromCookie()
  ])

  const initialCart: Cart | null = await getCachedCart(cartId)

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialCart={initialCart} cartId={cartId}>
          <Header menu={mainMenu} />
          <main>{children}</main>
          <Footer />
          <SpeedInsights />
          <Analytics mode='development' />
        </Providers>
      </body>
    </html>
  )
}
