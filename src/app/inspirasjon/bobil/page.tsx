// Path: src/app/inspirasjon/bobil/page.tsx
import { jsonLd } from './data/jsonLd'
import type { Metadata } from 'next'
import { BobilHeroSection } from './sections/BobilHeroSection'
import { BenefitsGrid, benefitsData } from './sections/BenefitsGrid'
import { CTASection } from './sections/CTASection'
import { DestinationsGrid } from './sections/DestinationsGrid'
import { UseCasesGrid, useCasesData } from './sections/UseCasesGrid'
import { destinationsData } from './data/destinationsData'
import { SeasonsSection } from './sections/SeasonsSection'
import { InspirationGallerySection } from './sections/InspirationGallerySection'
import { Activity } from 'react'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Bobil og Utekos | Forleng sesongen og øk komforten på turen',
  description:
    'Oppdag hvordan Utekos forvandler bobilopplevelsen. Fra kjølige morgener til sosiale kvelder - sikre deg komforten som lar deg nyte hvert øyeblikk av bobilturen.',
  keywords: [
    'bobil',
    'campingvogn',
    'bobilliv Norge',
    'utekos bobil',
    'varme bobil',
    'komfort camping',
    'bobiltilbehør',
    'vintercamp bobil'
  ],
  alternates: {
    canonical: '/inspirasjon/bobil'
  },
  openGraph: {
    title: 'Bobil og Utekos | Forleng sesongen og øk komforten',
    description:
      'Fra kjølige morgener til sosiale kvelder - oppdag hvordan Utekos blir din beste følgesvenn på bobilturen.',
    url: '/inspirasjon/bobil',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-bobil.webp',
        width: 1200,
        height: 630,
        alt: 'Par som koser seg utenfor bobilen med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

export default function BobilInspirasjonPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <Activity>
          <BobilHeroSection />
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
          <DestinationsGrid destinations={destinationsData} />
        </Activity>
        <Activity>
          <InspirationGallerySection />
        </Activity>
        <Activity>
          <CTASection />
        </Activity>
      </main>
    </>
  )
}
