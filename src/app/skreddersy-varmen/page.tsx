// Path: src/app/skreddersy-varmen/page.tsx

import { Suspense } from 'react'
import { TechDownSlider } from './utekos-orginal/components/TechDownSlider'
import { SectionThreeInOne } from './utekos-orginal/components/SectionThreeInOne'
import { SectionSocialProof } from './utekos-orginal/components/SectionSocialProof'
import { HeroAndEmpathy } from './components/HeroEmpathy'
import { LandingPurchaseFallback } from './components/LandingPurchaseFallback'
import { LandingPurchaseSection } from './components/LandingPurchaseSection'
import { ProductDetailsAccordion } from './utekos-orginal/components/ProductDetailsAccordion'
import { StickyMobileAction } from './utekos-orginal/components/StickyMobileAction'
import { PreFooterNavigation } from './utekos-orginal/components/PreFooterNavigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skreddersy varmen ute | Utekos 3-i-1 komfortplagg',
  description:
    'Velg Utekos for terrasse, hytte, båt og bobil. Se 3-i-1-funksjon, fuktbeskyttelse, størrelser, levering og retur.',
  category: 'Yttertøy',
  authors: [{ name: 'Utekos fagredaksjon', url: 'https://utekos.no/om-oss' }],
  creator: 'Utekos fagredaksjon',
  publisher: 'Utekos',
  alternates: {
    canonical: 'https://utekos.no/skreddersy-varmen'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    title: 'Skreddersy varmen ute | Utekos 3-i-1 komfortplagg',
    description:
      'Kjøpsnær guide til Utekos for terrasse, hytte, båt og bobil. Se 3-i-1-funksjon, fuktbeskyttelse, størrelser, levering og retur.',
    url: 'https://utekos.no/skreddersy-varmen',
    siteName: 'Utekos',
    images: [
      {
        url: 'https://utekos.no/empathy-bonfire.png',
        width: 1200,
        height: 630,
        alt: 'Utekos ved bålpanne - skreddersy varmen ute'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skreddersy varmen ute | Utekos',
    description:
      'Se hvordan Utekos gir justerbar varme for terrasse, hytte, båt og bobil.',
    images: ['https://utekos.no/empathy-bonfire.png']
  }
}

export default function LandingPage() {
  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-start overflow-x-clip bg-maritime-darkest'>
      <StickyMobileAction />
      <HeroAndEmpathy />
      <SectionThreeInOne />
      <TechDownSlider />
      <SectionSocialProof />
      <div
        id='purchase-section'
        className='w-full scroll-mt-[70px] xl:scroll-mt-[86px]'
      >
        <Suspense fallback={<LandingPurchaseFallback />}>
          <LandingPurchaseSection />
        </Suspense>
      </div>

      <ProductDetailsAccordion />

      <PreFooterNavigation />
    </section>
  )
}
