// Path: src/app/inspirasjon/hytteliv/page.tsx

import type { Metadata } from 'next'
import { BenefitsGrid, benefitsData } from './components/BenefitsGrid'
import { CabinHeroSection } from './components/CabinHeroSection'
import { CTASection } from './components/CTASection'
import { PopularCabinAreasGrid, popularAreasData } from './components/PopularCabinAresGrid'
import { UseCasesGrid, useCasesData } from './components/UseCasesGrid'
import { HytteSeasonsSection } from './components/HytteSeasonsSection'
import { SocialProof } from './components/SocialProof'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Hytteliv og Utekos | Din guide til ultimat hyttekomfort',
  description:
    'Oppdag hvordan Utekos forvandler hytteopplevelsen. Fra kjølige morgener på terrassen til sene kvelder under stjernene – sikre deg komforten som skaper minner.',
  keywords: ['hytteliv', 'hyttekos', 'norsk hytte', 'utekos hytte', 'vinterhytte'],
  alternates: {
    canonical: '/inspirasjon/hytteliv'
  },
  openGraph: {
    title: 'Hytteliv og Utekos | Forleng kveldene og øk komforten',
    description:
      'Fra soloppgang på terrassen til sene kvelder ved bålpannen – oppdag hvordan Utekos blir din beste venn på hytten.',
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
        <HytteSeasonsSection />
        <PopularCabinAreasGrid destinations={popularAreasData} />
        <SocialProof />
        <CTASection />
      </article>
    </>
  )
}
