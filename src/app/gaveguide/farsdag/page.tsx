import { FarsdagHero } from './sections/FarsdagHero'
import { FarsdagProblemSolution } from './sections/FarsdagProblemSolution'
import { FarsdagBenefits } from './sections/FarsdagBenefits'
import { FarsdagWhyPerfect } from './sections/FarsdagWhyPerfect'
import { FarsdagUrgencyCta } from './sections/FarsdagUrgencyCta'
import { MicrofiberFathersDaySection } from '../../produkter/components/MicrofiberSection/MicrofiberFathersDaySection'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Farsdagsgave: Gaven som varmer til pappaen som har alt | Utekos',
  description:
    'Leter du etter den perfekte farsdagsgaven? Gi bort varme, komfort og mer kvalitetstid ute. Oppdag gaven til pappaen som har alt, perfekt for hytta, bobilen og bålpannen.',
  keywords: [
    'farsdagsgave',
    'gave til far',
    'gavetips til far',
    'farsdag gavetips',
    'gave til pappa',
    'gave til den som har alt',
    'gave til hytteeier',
    'gave til bobilentusiast',
    'praktisk gave til far'
  ],
  alternates: {
    canonical: '/gaveguide/farsdag'
  },
  openGraph: {
    title: 'Årets farsdagsgave: Gaven som varmer',
    description:
      'Til pappaen som har alt. Gi bort komforten til å forlenge de gode stundene på hytta, i bobilen eller ved bålpannen.',
    url: '/gaveguide/farsdag',
    siteName: 'Utekos',
    images: [
      {
        url: '/Farsdag2025-2.png',
        width: 1200,
        height: 630,
        alt: 'En perfekt farsdagsgave.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function FarsdagGaveguidePage() {
  return (
    <main className='flex flex-col items-center'>
      <FarsdagHero />
      <FarsdagProblemSolution />
      <MicrofiberFathersDaySection />
      <FarsdagBenefits />
      <FarsdagWhyPerfect />
      <FarsdagUrgencyCta />
    </main>
  )
}

function ProductCarouselSkeleton() {
  return (
    <div className='w-full max-w-7xl px-6 py-16 lg:px-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <div className='h-96 animate-pulse rounded-lg bg-gray-200'></div>
        <div className='h-96 animate-pulse rounded-lg bg-gray-200'></div>
        <div className='h-96 animate-pulse rounded-lg bg-gray-200'></div>
      </div>
    </div>
  )
}
