import '../globals.css'
import '@fontsource-variable/google-sans/full.css'
import { utekosText, utekosTextMedium, utekosTitle } from '@/app/fonts/font.config'
import { Suspense } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import Footer from '@/components/footer/components/Footer'
import Header from '@/components/header/Header'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import { GoogleTagManagerLoader } from '@/components/analytics/GoogleTagManagerLoader'
import { UsercentricsScript } from '@/components/cookie-consent/UsercentricsScript'
import type { Metadata } from 'next'

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GTM_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GTM_RESILIENT_SCRIPT_URL
  || `https://cloud.server.utekos.no/gtm.js?id=${encodeURIComponent(GOOGLE_TAG_MANAGER_ID)}`

const SHOULD_LOAD_GOOGLE_TAG_MANAGER =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

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

  pinterest: {
    richPin: true
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='no' className={`${utekosText.variable} ${utekosTextMedium.variable} ${utekosTitle.variable}`}>
      <body className='bg-background text-foreground antialiased scroll-smooth'>
        <UsercentricsScript />

        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManagerLoader
            gtmId={GOOGLE_TAG_MANAGER_ID}
            scriptUrl={GTM_SCRIPT_URL}
          />
        )}

        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <noscript>
            <iframe
              src={`https://cloud.server.utekos.no/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <OnlineStoreJsonLd />

        <Suspense fallback={null}>
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
            </main>
            <Footer />
          </CartProviderLoader>
        </Suspense>
      </body>
    </html>
  )
}
