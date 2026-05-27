import '../globals.css'
import { utekosText } from '@/db/config/font.config'
import { Suspense, type ReactNode } from 'react'
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/footer/components/Footer'
import { TrackingRoot } from '@/components/analytics/TrackingRoot'
import Header from '@/components/header/Header'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import { MicrosoftUetTag } from '@/components/analytics/MicrosoftUetTag'
import { GoogleTagManagerLoader } from '@/components/analytics/GoogleTagManagerLoader'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Google_Sans as GoogleSans } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const googleSans = GoogleSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans'
})

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GTM_SCRIPT_ORIGIN = (process.env.NEXT_PUBLIC_SGTM_ENDPOINT || 'https://sgtm.utekos.no').replace(
  /\/$/,
  ''
)

const GTM_FALLBACK_SCRIPT_ORIGIN = (
  process.env.NEXT_PUBLIC_GTM_FALLBACK_ORIGIN || 'https://www.googletagmanager.com'
).replace(/\/$/, '')

const SHOULD_LOAD_GOOGLE_TAG_MANAGER =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

const SHOULD_LOAD_VERCEL_ANALYTICS = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'

export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png'
  },
  metadataBase: new URL('https://utekos.no'),
  title: {
    default: 'Utekos - Skreddersy varmen',
    template: '%s | Utekos'
  },
  description:
    'Utekos er en merkevare som designer funksjonelt yttertøy for kompromissløs komfort og overlegen allsidighet. Perfekt for hytteliv, bobilferie, telttur, i båt og terrasseliv.',

  alternates: {
    canonical: '/'
  },
  applicationName: 'Utekos',
  category: 'Yttertøy',
  manifest: '/manifest.webmanifest',
  authors: [{ name: 'Utekos', url: 'https://utekos.no' }],
  creator: 'Utekos',
  publisher: 'Utekos',
  formatDetection: {
    email: true,
    address: true,
    telephone: true
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
    title: 'Utekos - Skreddersy varmen',
    description:
      'Utekos er en merkevare som designer funksjonelt yttertøy for kompromissløs komfort og overlegen allsidighet. Perfekt for hytteliv, bobilferie, telttur, i båt og terrasseliv.',
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
    other: {
      'facebook-domain-verification': 'e3q80hk1igl2celczeysvf7y1mltrs'
    }
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='no' className={`${googleSans} ${utekosText.variable}`}>
      <body className='bg-background text-cloud-dancer antialiased'>
        <WebVitalsReporter />

        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManagerLoader
            gtmId={GOOGLE_TAG_MANAGER_ID}
            scriptOrigin={GTM_SCRIPT_ORIGIN}
            fallbackOrigin={GTM_FALLBACK_SCRIPT_ORIGIN}
          />
        )}

        <MicrosoftUetTag />

        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <OnlineStoreJsonLd />

        <Suspense fallback={null}>
          <TrackingRoot />
        </Suspense>

        <Suspense fallback={null}>
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
              {SHOULD_LOAD_VERCEL_ANALYTICS && <Analytics mode='production' />}
              <SpeedInsights />
              <ChatBotAgent />
            </main>
            <Footer />
          </CartProviderLoader>
        </Suspense>
      </body>
    </html>
  )
}
