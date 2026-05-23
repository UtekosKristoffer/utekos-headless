import '../globals.css'
import {
  brandSansFontFamily,
  geistMono,
  utekosText
} from '@/db/config/font.config'
import { Suspense, type ReactNode } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/footer/components/Footer'
import { VisitorAnalyticsTracker } from '@/components/analytics/VisitorAnalyticsTracker'
import Header from '@/components/header/Header'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { MetaPixelEvents } from '@/components/analytics/Meta/MetaPixelEvents'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import { MicrosoftUetTag } from '@/components/analytics/MicrosoftUetTag'
import { CookieConsentBanner } from '@/components/CookieBanner'
import { ClickTracker } from '@/components/analytics/ClickTracker'
import type { Metadata } from 'next'
import Script from 'next/script'

const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GTM_SCRIPT_ORIGIN = (
  process.env.NEXT_PUBLIC_SGTM_ENDPOINT || 'https://sgtm.utekos.no'
).replace(/\/$/, '')

const SHOULD_LOAD_GOOGLE_TAG_MANAGER =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

const SHOULD_LOAD_META_PIXEL =
  !!process.env.NEXT_PUBLIC_META_PIXEL_ID
  && (process.env.NODE_ENV === 'production'
    || !!process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE)

const SHOULD_LOAD_VERCEL_ANALYTICS =
  process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'

const GTM_BOOTSTRAP_SCRIPT = `
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='${GTM_SCRIPT_ORIGIN}/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
`

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
  manifest: '/manifest.webmanifest',
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
    title: 'Utekos - Skreddersy varmen',
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
    other: {
      'facebook-domain-verification': 'e3q80hk1igl2celczeysvf7y1mltrs'
    }
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='no'
      className={`${brandSansFontFamily.className} ${brandSansFontFamily.variable} ${utekosText.variable} ${geistMono.variable}`}
    >
      <head>
        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <Script id='gtm-bootstrap' strategy='afterInteractive'>
            {GTM_BOOTSTRAP_SCRIPT}
          </Script>
        )}
        <MicrosoftUetTag />
      </head>
      <body className='bg-background text-foreground antialiased'>
        {SHOULD_LOAD_META_PIXEL && <MetaPixelEvents />}
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
        <Suspense>
          <ClickTracker />
          <VisitorAnalyticsTracker />
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
              {SHOULD_LOAD_VERCEL_ANALYTICS && <Analytics />}
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
