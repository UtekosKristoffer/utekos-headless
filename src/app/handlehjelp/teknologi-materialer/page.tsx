import type { Metadata } from 'next'
import { jsonLd } from './jsonLd'
import { ProductSpecsView } from './layout/ProductSpecsView'
import { technologyGroups } from './config'
import { ProductSpecPageHeader } from './layout/ProductSpecPageHeader'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
  description:
    'Oppdag materialene og teknologien som gjør Utekos-plaggene unikt varme, lette og slitesterke. Kvalitet i hver fiber for å forlenge de gode stundene utendørs.',
  alternates: {
    canonical: '/handlehjelp/teknologi-materialer'
  },
  openGraph: {
    title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
    description: 'Lær om de unike materialene som sikrer din komfort.',
    url: '/handlehjelp/teknologi-materialer',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-teknologi.jpg', // Bør være et relevant bilde
        width: 1200,
        height: 630,
        alt: 'Nærbilde av materialene brukt i Utekos-produkter.'
      }
    ],
    locale: 'no_NO',
    type: 'article' // 'article' er mer presist for en slik side
  }
}

export default function ProductSpecsPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <ProductSpecPageHeader />
        <ProductSpecsView technologyGroups={technologyGroups} />
      </main>
    </>
  )
}
