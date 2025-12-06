import { getProducts } from '@/api/lib/products/getProducts'
import { cacheLife, cacheTag } from 'next/cache'
import type { ItemList, WithContext } from 'schema-dts'

async function fetchWithRetry(retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await getProducts()
      if (response.success && response.body && response.body.length > 0) {
        return response.body
      }
      throw new Error(response.error || 'Empty or failed response')
    } catch (error) {
      if (i === retries - 1) throw error

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  return []
}

export async function ProductListJsonLd() {
  'use cache'
  cacheLife('max')
  cacheTag('product-list', 'products')

  try {
    const products = await fetchWithRetry()

    if (!products || products.length === 0) {
      console.warn('ProductListJsonLd: No products found after retries.')
      return null
    }
    const limitedProducts = products.slice(0, 12)

    const itemListElement = limitedProducts.map((product, index) => ({
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    )
  } catch (error) {
    console.error(
      'Non-critical error: ProductListJsonLd skipped due to fetch failure:',
      error
    )
    return null
  }
}
