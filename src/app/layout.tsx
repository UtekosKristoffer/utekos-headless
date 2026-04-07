import './globals.css'
import { geistSans } from '@/db/config/font.config'
import { Suspense, type ReactNode } from 'react'
import { mainMenu } from '@/db/config/menu.config'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/footer/components/Footer'
import Header from '@/components/header/Header'
import AnnouncementBanner from '@/components/frontpage/components/SpecialOfferSection/AnnouncementBanner'
import { ChatBotAgent } from '@/components/chat/ChatBotAgent/source-code'
import { OnlineStoreJsonLd } from './OnlineStoreJsonLd'
import { CartProviderLoader } from '@/components/providers/CartProviderLoader'
import {
  BrandArmorScript,
  BRAND_ARMOR_COMPANY_ID
} from '@/components/analytics/BrandArmorScript'
import { CookieConsentBanner } from '@/components/CookieBanner'
import { ClickTracker } from '@/components/analytics/ClickTracker'
import type { Metadata } from 'next'
import Script from 'next/script'

const GOOGLE_TAG_MANAGER_ID =
  process.env.NEXT_GOOGLE_GTM_ID || 'GTM-5TWMJQFP'

const GTM_SCRIPT_ORIGIN = (
  process.env.NEXT_PUBLIC_SGTM_ENDPOINT || 'https://sgtm.utekos.no'
).replace(/\/$/, '')

const SHOULD_LOAD_GOOGLE_TAG_MANAGER =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview'

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

export default function RootLayot({ children }: { children: ReactNode }) {
  return (
    <html lang='no'>
      <head>
        {SHOULD_LOAD_GOOGLE_TAG_MANAGER && GOOGLE_TAG_MANAGER_ID && (
          <Script id='gtm-bootstrap' strategy='beforeInteractive'>
            {GTM_BOOTSTRAP_SCRIPT}
          </Script>
        )}
      </head>
      <body
        className={`bg-background text-foreground ${geistSans.className} antialiased`}
      >
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
          <CartProviderLoader>
            <AnnouncementBanner />
            <Header menu={mainMenu} />
            <main>
              {children}
              <BrandArmorScript companyId={BRAND_ARMOR_COMPANY_ID} />
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
