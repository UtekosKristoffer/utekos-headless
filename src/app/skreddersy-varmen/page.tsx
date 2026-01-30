// Path: src/app/skreddersy-varmen/page.tsx

import { Suspense } from 'react'
import { TechDownSlider } from './TechDownSlider'
import { SectionThreeInOne } from './SectionThreeInOne'
import { SectionSocialProof } from './SectionSocialProof'
import { HeroAndEmpathy } from './HeroEmpathy'
import { PurchaseClient } from './PurchaseClient'
import { getProduct } from '@/api/lib/products/getProduct'
import { StickyMobileAction } from './StickyMobileAction'
import { PreFooterNavigation } from './PreFooterNavigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skreddersy varmen | Juster, form og nyt',
  description:
    'Utekos® definerer en ny standard for utendørs velvære, der funksjon møter kompromissløs komfort. Juster, form og nyt.',
  category: 'Yttertøy',
  creator: 'Utekos',
  publisher: 'Utekos',
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    title: 'Skreddersy varmen | Juster, form og nyt',
    description:
      ' Utekos® definerer en ny standard for utendørs velvære, der funksjon møter kompromissløs komfort. Juster, form og nyt.',
    url: 'https://utekos.no/skreddersy-varmen',
    siteName: 'Utekos',
    images: [
      {
        url: 'https://utekos.no/empathy-bonfire.png',
        width: 1200,
        height: 630,
        alt: 'Skreddersy varmen etter behov - Finn din favoritt'
      }
    ]
  }
}

export default async function LandingPage() {
  const [techDown, dun, mikro, buff] = await Promise.all([
    getProduct('utekos-techdown'),
    getProduct('utekos-dun'),
    getProduct('utekos-mikrofiber'),
    getProduct('utekos-buff')
  ])

  const productsMap = {
    'utekos-techdown': techDown,
    'utekos-dun': dun,
    'utekos-mikrofiber': mikro,
    'utekos-buff': buff
  }

  if (!techDown) return <div>Produktet TechDown ble ikke funnet.</div>

  return (
    <section className='flex min-h-screen flex-col items-center justify-start bg-[#1F2421]'>
      <StickyMobileAction />
      <HeroAndEmpathy />
      <SectionThreeInOne />
      <TechDownSlider />
      <SectionSocialProof />
      <Suspense fallback={null}>
        <div id='purchase-section'>
          <PurchaseClient products={productsMap} />
        </div>
      </Suspense>

      <PreFooterNavigation />
    </section>
  )
}
