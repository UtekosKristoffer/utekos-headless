// Path: src/app/inspirasjon/båtliv/page.tsx
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'
import { UseCasesGrid, useCasesData } from './UseCasesGrid'
import { BenefitsGrid } from './BenefitsGrid'
import { CTASection } from './CTASection'
import { SocialProof } from './SocialProof'
import {
  PopularDestinations,
  popularDestinationsData
} from './PopularDestinations'
import { BoatSeasonSection } from './BoatSeasonSection'
import { BoatingHeroSection } from './BoatingHeroSection'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Båtliv og Utekos | Forleng sesongen og kveldene på vannet',
  description:
    'Oppdag hvordan Utekos forvandler båtlivet. Fra kjølige morgener i havgapet til sosiale kvelder i gjestehavna – nyt en lengre og mer komfortabel båtsesong.',
  keywords: [
    'båtliv',
    'båtkos',
    'norsk båtsommer',
    'utekos båt',
    'varme i båt',
    'komfort båttur',
    'båtutstyr',
    'seilbåt',
    'bryggekos'
  ],
  alternates: {
    canonical: '/inspirasjon/båtliv'
  },
  openGraph: {
    title: 'Båtliv og Utekos | Forleng den norske båtsommeren',
    description:
      'Ikke la kjølige kvelder og vind forkorte tiden på sjøen. Oppdag hvordan Utekos blir din beste følgesvenn på båtturen.',
    url: '/inspirasjon/båtliv',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-batliv.webp',
        width: 1200,
        height: 630,
        alt: 'Gruppe venner som koser seg i en båt med Utekos-plagg'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Båtliv og Utekos: Din guide til ultimat komfort på sjøen',
  'description':
    'En komplett guide til hvordan Utekos-plagg maksimerer komforten om bord, uansett vær. Tips og inspirasjon for den norske båteieren.',
  'author': {
    '@type': 'Organization',
    'name': 'Utekos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://utekos.no/logo.png'
    }
  },
  'datePublished': '2025-04-10',
  'dateModified': '2025-04-10',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://utekos.no/inspirasjon/båtliv'
  }
}

export default function BoatingInspirationPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <BoatingHeroSection />

        <UseCasesGrid useCases={useCasesData} />

        <BenefitsGrid />

        <BoatSeasonSection />

        <SocialProof />

        <PopularDestinations destinations={popularDestinationsData} />

        <CTASection />
      </main>
    </>
  )
}
