// Path: src/app/inspirasjon/isbading/page.tsx

import type { Metadata } from 'next'
import { Activity } from 'react'
import { IceBathingHeroSection } from './sections/IceBathingHeroSection'
import { BenefitsGrid, benefitsData } from './sections/BenefitsGrid'
import { UseCasesGrid, useCasesData } from './sections/UseCasesGrid'
import { SeasonsSection } from './sections/SeasonsSection'
import { PopularSpotsGrid, popularSpotsData } from './sections/PopularSpotsGrid'
import { SocialProof } from './sections/SocialProof'
import { CTASection } from './sections/CTASection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductSpotlight } from './sections/ProductSpotlight'
import { IceBathingFAQ } from './sections/IceBathingFAQ'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Isbading og Utekos | Varmen du trenger etter kuldesjokket',
  description:
    'Gjør isbadingen til en komfortabel opplevelse. Fra det kalde dykket til den varme omfavnelsen etterpå – Utekos er isbaderens viktigste utstyr.',
  keywords: [
    'isbading',
    'vinterbading',
    'helårsbading',
    'badekåpe isbading',
    'skifteponcho',
    'utekos'
  ],
  alternates: {
    canonical: '/inspirasjon/isbading'
  },
  openGraph: {
    title: 'Comfyrobe™ | Forleng følelsen av mestring',
    description:
      'Slipp å fryse mens du skifter. Oppdag hvordan Utekos gjør overgangen fra iskaldt vann til varm bil lekende lett.',
    url: '/inspirasjon/isbading',
    siteName: 'Utekos',
    images: [
      {
        url: '/comfyrobe/comfy-isbading-1080-master.png',
        width: 1200,
        height: 630,
        alt: 'Isbader som varmer seg i Utekos-plagg etter et bad'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function IceBathingInspirationPage() {
  return (
    <div className='flex flex-col gap-12 pb-20'>
      <Activity>
        <IceBathingHeroSection />
      </Activity>
      <Activity>
        <ProductSpotlight />
      </Activity>
      <Activity>
        <UseCasesGrid useCases={useCasesData} />
      </Activity>
      <Activity>
        <BenefitsGrid benefits={benefitsData} />
      </Activity>
      <Activity>
        <SeasonsSection />
      </Activity>
      <Activity>
        <IceBathingFAQ />
      </Activity>
      <Activity>
        <PopularSpotsGrid destinations={popularSpotsData} />
      </Activity>
      <Activity>
        <SocialProof />
      </Activity>
      <Activity>
        <CTASection />
      </Activity>
      <div className='fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-10 fade-in duration-700'>
        <Button
          className='w-full h-14 rounded-full text-white font-bold shadow-2xl border border-white/10 bg-[#232B38] hover:bg-[#232B38]/90'
          asChild
        >
          <Link href='/produkter/comfyrobe'>Kjøp Comfyrobe™</Link>
        </Button>
      </div>
    </div>
  )
}
