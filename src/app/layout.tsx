import './globals.css'
import { geistSans } from '@/db/config/font.config'
import { Suspense, type ReactNode } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import { CookieConsentBanner } from '@/components/CookieBanner'
import { ClickTracker } from '@/components/analytics/ClickTracker'
import type { RootLayoutProps } from '@types'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos® - Skreddersy varmen',
    template: '%s | Utekos®'
  },
  description:
    'Opplev kompromissløs komfort og overlegen allsidighet. Gjør som tusenvis av andre livsnytere og løft utendørslivet til et nytt nivå. Juster, form og nyt',

  alternates: {
    canonical: '/'
  },
  applicationName: 'Utekos',
  category: 'Yttertøy',
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
    title: 'Utekos® - Skreddersy varmen',
    description:
      'Kompromissløs komfort. Overlegen allsidighet. Juster, form og nyt.',
    images: {
      url: 'https://utekos.no/og-kate-linn-kikkert-master.png',
      width: 1200,
      height: 630,
      alt: 'To kvinner som koser seg utendørs på terrassen med varme komfortplagg fra Utekos.'
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
      'facebook-domain-verification': 'e3q80hk1igl2celczeysvf7y1mltrs',
      'p:domain_verify': 'b34f9dce9b34f18d3b3c8852ff7a8497'
    }
  }
}

export default function RootLayo({ children }: RootLayoutProps) {
  return (
    <html lang='no'>
      <GoogleTagManager gtmId='GTM-5TWMJQFP' />
      <body
        className={`bg-background text-foreground ${geistSans.className} antialiased`}
      >
        <OnlineStoreJsonLd />
        <Suspense>
          <ClickTracker />
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
              <SpeedInsights />
              <Analytics mode='production' />
              <ChatBotAgent />
            </main>
            <Footer />
            <CookieConsentBanner />
          </CartProviderLoader>
        </Suspense>
      </body>
    </html>
  )
}
