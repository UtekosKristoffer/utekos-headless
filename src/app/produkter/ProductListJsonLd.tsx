// Path: src/app/produkter/ProductListJsonLd.tsx
import { getProducts } from '@/api/lib/products/getProducts'
import type { CollectionPage, WithContext, ListItem } from 'schema-dts'

export async function ProductListJsonLd() {
  const response = await getProducts()

  if (!response.success || !response.body || response.body.length === 0) {
    return null
  }

  const products = response.body

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Kolleksjon: Komfortplagg for hytteliv & utekos',
    'description':
      'Utforsk hele kolleksjonen av komfortplagg fra Utekos. Våre varme og slitesterke produkter er skapt for å forlenge de gode stundene.',
    'url': 'https://utekos.no/produkter',
    'publisher': {
      '@id': 'https://utekos.no/#organization'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': products.map(
        (product, index): ListItem => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': `https://utekos.no/produkter/${product.handle}`,
          'name': product.title
        })
      )
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  )
}
