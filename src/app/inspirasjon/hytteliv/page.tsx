// Path: src/app/inspirasjon/hytteliv/page.tsx

import type { Metadata } from 'next'
import { BenefitsGrid, benefitsData } from './sections/BenefitsGrid'
import { CabinHeroSection } from './sections/CabinHeroSection'
import { CTASection } from './sections/CTASection'
import {
  PopularCabinAreasGrid,
  popularAreasData
} from './sections/PopularCabinAresGrid'
import { UseCasesGrid, useCasesData } from './sections/UseCasesGrid'
import { SeasonsSection } from './sections/SeasonsSection'
import { SocialProof } from './sections/SocialProof'
import { Activity } from 'react'
import { InspirationJsonLd } from '../InspirationJsonLd'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Hytteliv og Utekos | Din guide til ultimat hyttekomfort',
  description:
    'Oppdag hvordan Utekos forvandler hytteopplevelsen. Fra kjølige morgener på terrassen til sene kvelder under stjernene – sikre deg komforten som skaper minner.',
  keywords: [
    'hytteliv',
    'hyttekos',
    'norsk hytte',
    'utekos hytte',
    'vinterhytte'
  ],
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
      {/* Ny optimalisert JSON-LD komponent */}
      <InspirationJsonLd
        title='Hytteliv og Utekos'
        description='Oppdag hvordan Utekos forvandler hytteopplevelsen. Inspirasjon for alle sesonger.'
        url='https://utekos.no/inspirasjon/hytteliv'
        image='https://utekos.no/og-image-hytte.webp'
        datePublished='2024-01-01' // Sett gjerne en dato for når innholdet var nytt/oppdatert
      />

      <main>
        <Activity>
          <CabinHeroSection />
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
          <PopularCabinAreasGrid destinations={popularAreasData} />
        </Activity>
        <Activity>
          <SocialProof />
        </Activity>
        <Activity>
          <CTASection />
        </Activity>
      </main>
    </>
  )
}
