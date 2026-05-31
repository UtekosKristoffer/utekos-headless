// Path: src/app/inspirasjon/terrassen/page.tsx

import type { Metadata } from 'next'
import { jsonLd } from './data/jsonLd'
import { SocialProof } from './sections/SocialProof'
import { SeasonsSection } from './sections/SeasonsSection'
import { TerraceHeroSection } from './sections/TerraceHeroSection'
import { TerraceIdeasGrid, terraceIdeasData } from './sections/TerraceIdeasGrid'
import { BenefitsGrid, benefitsData } from './sections/BenefitsGrid'
import { UseCasesGrid, useCasesData } from './sections/UseCasesGrid'
import { CTASection } from './sections/CTASection'
import { TerrasseCarousel } from './sections/TerrasseCarousel'

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL('https://utekos.no'),
    title: 'Terrasseliv. Gjør uteplassen til ditt favorittrom',
    description:
      'Oppdag hvordan Utekos forvandler terrassen din. Fra den første vårkaffen til sene høstkvelder – få maksimalt ut av din personlige uteplass, uansett temperatur.',
    keywords: [
      'terrasse',
      'terrasseliv',
      'balkong',
      'utestue',
      'hjemmekos',
      'forlenge kvelden ute',
      'terrassevarmer alternativ',
      'hageinspirasjon'
    ],
    authors: [{ name: 'Utekos', url: 'https://utekos.no' }],
    creator: 'Utekos',
    publisher: 'Utekos',
    alternates: {
      canonical: '/inspirasjon/terrassen',
      languages: {
        'nb-NO': '/inspirasjon/terrassen'
      }
    },
    openGraph: {
      title: 'Terrasseliv & Utekos | Forleng kveldene på din egen uteplass',
      description:
        'Gjør terrassen eller balkongen om til en helårsoase. Med Utekos kan du nyte de friske øyeblikkene lenger, hver eneste dag.',
      url: '/inspirasjon/terrassen',
      siteName: 'Utekos',
      images: [
        {
          url: '/og-image-terrassen.webp',
          width: 1200,
          height: 630,
          alt: 'Et par som koser seg på en moderne terrasse med Utekos-plagg'
        }
      ],
      locale: 'no_NO',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terrasseliv & Utekos | Forleng kveldene på din egen uteplass',
      description:
        'Gjør terrassen eller balkongen om til en helårsoase. Med Utekos kan du nyte de friske øyeblikkene lenger, hver eneste dag.',
      images: ['/og-image-terrassen.webp']
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
    }
  }
}

function JsonLd() {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}

export default function TerraceInspirationPage() {
  return (
    <>
      <JsonLd />

      <main className='bg-background text-cloud-dancer'>
        <TerraceHeroSection />
        <UseCasesGrid useCases={useCasesData} />
        <BenefitsGrid benefits={benefitsData} />
        <TerrasseCarousel />
        <SeasonsSection />
        <TerraceIdeasGrid ideas={terraceIdeasData} />
        <SocialProof />
        <CTASection />
      </main>
    </>
  )
}
