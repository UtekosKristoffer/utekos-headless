// Path: src/app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import '@/db/zod/zodConfig'
import { Geist, Geist_Mono } from 'next/font/google'

import { fetchMenu } from '@/lib/helpers/menu'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { getCachedCart } from '@/lib/helpers/cart/getCachedCart'
import Providers from '@/components/providers/Providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  metadataBase: new URL("https://utekos.no"),
  title: {
    default: "Utekos - Premium Friluftsklær",
    template: "%s | Utekos",
  },
  description:
    "Utekos tilbyr premium friluftsklær for alle eventyr. Bygget med Next.js og Shopify for optimal ytelse.",
  keywords: ["friluftsliv", "utekos", "friluftsklær", "outdoor", "premium"],
  authors: [{ name: "Utekos" }],
  creator: "Utekos",
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "<https://utekos.no>",
    siteName: "Utekos",
    images: [
      {
        url: "/og-image.jpg", // Nå vil denne bli til <https://utekos.no/og-image.jpg>
        width: 1200,
        height: 630,
        alt: "Utekos - Premium Friluftsklær",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utekos",
    creator: "@utekos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mainMenu, cartId] = await Promise.all([
    fetchMenu('header-mega-menu'), // ✅ Oppdatert funksjonsnavn
    getCartIdFromCookie()
  ])

  const initialCart = await getCachedCart(cartId)

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
