// Path: src/app/handlehjelp/vask-og-vedlikehold/page.tsx
import type { Metadata } from 'next'
import { MaintenanceJsonLd } from './MaintenanceJsonLd' // Ny komponent
import { ProductCareHeader } from './sections/ProductCareHeader'
import { ProductCareBody } from './sections/ProductCareBody'
import { Activity } from 'react'

export const metadata: Metadata = {
  title: 'Vedlikeholdsguide for Utekos | Bevar varmen og kvaliteten',
  description:
    'Ta vare på din Utekos-investering. Vår guide sikrer at du bevarer den unike komforten og varmen, slik at du kan forlenge de gode stundene ute i mange år fremover.',
  alternates: {
    canonical: '/handlehjelp/vask-og-vedlikehold'
  },
  openGraph: {
    title: 'Vedlikeholdsguide for Utekos | Bevar varmen og kvaliteten',
    description:
      'Riktig vedlikehold er nøkkelen til mange år med utekos. Se våre beste råd her.',
    url: '/handlehjelp/vask-og-vedlikehold',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-vedlikehold.jpg',
        width: 1200,
        height: 630,
        alt: 'En person som tar vare på et Utekos-plagg.'
      }
    ],
    locale: 'no_NO',
    type: 'article'
  }
}

export default function ProductCarePage() {
  return (
    <>
      <MaintenanceJsonLd />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <Activity>
          <ProductCareHeader />
        </Activity>
        <Activity>
          <ProductCareBody />
        </Activity>
      </main>
    </>
  )
}
