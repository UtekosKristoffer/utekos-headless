// Path: src/app/handlehjelp/vask-og-vedlikehold/page.tsx
import type { Metadata } from 'next'
import { ProductCareHeader } from './components/ProductCareHeader'
import { ProductCareGeneralGuide } from '@/app/handlehjelp/vask-og-vedlikehold/components/ProductCareGeneralGuide'
import { ProductCareBody } from './components/ProductCareBody'
import { ProductCareFaq } from '@/app/handlehjelp/vask-og-vedlikehold/components/ProductCareFAQ'

export const metadata: Metadata = {
  title: 'Vedlikehold av Utekos | Slik bevarer du varmen i mange år',
  description:
    'En tydelig vedlikeholdsguide for Utekos Dun, Mikrofiber og Comfyrobe. Riktig vask, tørking og oppbevaring bevarer varmen, formen og kvaliteten – sesong etter sesong.',
  alternates: {
    canonical: '/handlehjelp/vask-og-vedlikehold'
  },
  openGraph: {
    title: 'Vedlikehold av Utekos | Slik bevarer du varmen i mange år',
    description:
      'Slik vasker, tørker og oppbevarer du Utekos-plagget ditt for å bevare varmen og kvaliteten i mange år.',
    url: '/handlehjelp/vask-og-vedlikehold',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-vedlikehold.jpg',
        width: 1200,
        height: 630,
        alt: 'Et Utekos-plagg hengt luftig til tørk i naturlige omgivelser.'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

export default function ProductCarePage() {
  return (
    <article className='bg-overcast text-background'>
      <section className='container mx-auto px-4 py-12 sm:py-16'>
        <ProductCareHeader />
        <ProductCareGeneralGuide />
        <ProductCareBody />
        <ProductCareFaq />
      </section>
    </article>
  )
}
