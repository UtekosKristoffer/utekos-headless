import { getProducts } from '@/api/lib/products/getProducts'
import type { ItemList, WithContext } from 'schema-dts'

export async function ProductListJsonLd() {
  const response = await getProducts()
  const products = response.success ? response.body : []

  if (!products || products.length === 0) {
    return null
  }

  const itemListElement = products.map((product, index) => ({
    '@type': 'ListItem' as const,
    'position': index + 1,
    'url': `https://utekos.no/produkter/${product.handle}`,
    'name': product.title
  }))

  const jsonLd: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': itemListElement
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
