// Path: src/app/inspirasjon/bobil/page.tsx
import type { Metadata } from 'next'
import { BobilHeroSection } from './components/BobilHeroSection'
import { BenefitsGrid, benefitsData } from './components/BenefitsGrid'
import { CTASection } from './components/CTASection'
import { DestinationsGrid } from './components/DestinationsGrid'
import { UseCasesGrid, useCasesData } from './components/UseCasesGrid'
import { destinationsData } from './utils/destinationsData'
import { SeasonsSection } from './components/SeasonsSection'
import { InspirationGallerySection } from './components/InspirationGallerySection'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Bobil og Utekos | Forleng sesongen og øk komforten på turen',
  description:
    'Oppdag hvordan Utekos forvandler bobilopplevelsen. Fra kjølige morgener til sosiale kvelder - sikre deg komforten som lar deg nyte hvert øyeblikk av bobilturen.',
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
    type: 'website'
  }
}

export default function BobilInspirasjonPage() {
  return (
    <article className='flex flex-col bg-background text-foreground'>
      <BobilHeroSection />

      <UseCasesGrid useCases={useCasesData} />

      <BenefitsGrid benefits={benefitsData} />

      <SeasonsSection />

      <DestinationsGrid destinations={destinationsData} />

      <InspirationGallerySection />

      <CTASection />
    </article>
  )
}
