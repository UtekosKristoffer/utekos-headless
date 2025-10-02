import type { Metadata } from 'next'
import { PersonaGrid } from './GaveGuideClient'
import { TrustSection } from './components/TrustSection'
import { SocialProofSection } from './components/SocialProofSection'
import { GaveGuideHero } from './components/GaveGuideHero'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Gaveguide: Finn den perfekte gaven til dine nærmeste | Utekos',
  description:
    'Gi bort mer enn en gave – gi bort varme, komfort og utallige koselige øyeblikk. Vår gaveguide hjelper deg å finne den perfekte gaven til den som har alt.',
  keywords: [
    'gave til far',
    'gave til mor',
    'julegave',
    'gavetips hytteeier',
    'gave til bobilentusiast',
    'gave til den som har alt'
  ],
  alternates: {
    canonical: '/gaveguide'
  },
  openGraph: {
    title: 'Utekos Gaveguide',
    description: 'En gave de garantert kommer til å elske og bruke. Hele året.',
    url: '/gaveguide',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-gaveguide.webp',
        width: 1200,
        height: 630,
        alt: 'En person som glad pakker opp en Utekos-gave.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function GaveguidePage() {
  return (
    <main className='bg-background'>
      <GaveGuideHero />
      <PersonaGrid />
      <SocialProofSection />
      <TrustSection />
    </main>
  )
}
