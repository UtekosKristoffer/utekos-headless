// Path: src/app/inspirasjon/hytteliv/page.tsx

import type { Metadata } from 'next'
import { BenefitsGrid, benefitsData } from '@/app/inspirasjon/hytteliv/components/BenefitsGrid'
import { CabinHeroSection } from '@/app/inspirasjon/hytteliv/components/CabinHeroSection'
import { CTASection } from '@/app/inspirasjon/hytteliv/components/CTASection'
import {
  PopularCabinAreasGrid,
  popularAreasData
} from '@/app/inspirasjon/hytteliv/components/PopularCabinAresGrid'
import { UseCasesGrid, useCasesData } from '@/app/inspirasjon/hytteliv/components//UseCasesGrid'
import { SeasonsSection } from '@/app/inspirasjon/hytteliv/components/HytteSeasonsSection'
import { SocialProof } from '@/app/inspirasjon/hytteliv/components/SocialProof'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Guide til optimal hyttekomfort med Utekos',
  description:
    'Oppdag hvordan Utekos forvandler hytteopplevelsen. Fra kjølige morgener på terrassen til sene kvelder under stjernene. Opplev komforten som skaper minner.',
  keywords: ['hytteliv', 'hyttekos', 'norsk hytte', 'utekos hytte', 'vinterhytte'],
  alternates: {
    canonical: '/inspirasjon/hytteliv'
  },
  openGraph: {
    title: 'Guide til optimal hyttekomfort med Utekos',
    description:
      'Oppdag hvordan Utekos forvandler hytteopplevelsen. Fra kjølige morgener på terrassen til sene kvelder under stjernene.',
    url: '/inspirasjon/hytteliv',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-hytte.webp',
        width: 1200,
        height: 630,
        alt: 'Vennegjeng som koser seg utenfor hytten med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function CabinInspirationPage() {
  return (
    <>
      <article className='flex flex-col'>
        <CabinHeroSection />
        <UseCasesGrid useCases={useCasesData} />
        <BenefitsGrid benefits={benefitsData} />
        <SeasonsSection />
        <PopularCabinAreasGrid destinations={popularAreasData} />
        <SocialProof />
        <CTASection />
      </article>
    </>
  )
}
