import type { Metadata } from 'next'
import { PersonaCards } from './sections/PersonaCards'
import { CompareModelsPageHero } from './sections/CompareModelsPageHero'
import { ComparisonSection } from './sections/ComparisonSection'
import { DeepDiveSection } from './sections/DeepDiveSection'
import { ConclusionSection } from './sections/ConclusionSection'
import { Activity } from 'react'
export const metadata: Metadata = {
  title: 'Sammenlign Utekos™ Modeller | Finn den perfekte for deg',
  description:
    'Utekos Dun™ vs. Utekos Mikrofiber™. Se vår detaljerte guide for å finne ut hvilken modell som er best egnet for ditt bruk – enten det er på hytten, i båten eller med bobilen.',
  keywords: [
    'utekos dun vs mikrofiber',
    'sammenlign utekos',
    'hvilken utekos er best',
    'forskjell utekos modeller'
  ],
  alternates: {
    canonical: '/handlehjelp/sammenlign-modeller'
  },
  openGraph: {
    title: 'Hvilken Utekos er riktig for deg?',
    description: 'En komplett sammenligning som hjelper deg å velge riktig.',
    url: '/handlehjelp/sammenlign-modeller',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-compare.webp',
        width: 1200,
        height: 630,
        alt: 'To Utekos-plagg side om side.'
      }
    ]
  }
}

export default function CompareModelsPage() {
  return (
    <main className='bg-background'>
      <Activity>
        <CompareModelsPageHero />
      </Activity>
      <Activity>
        <PersonaCards />
      </Activity>
      <Activity>
        {' '}
        <ComparisonSection />
      </Activity>
      <Activity>
        <DeepDiveSection />
      </Activity>
      <Activity>
        <ConclusionSection />
      </Activity>
    </main>
  )
}
