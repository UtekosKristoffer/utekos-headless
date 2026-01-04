import { getProducts } from '@/api/lib/products/getProducts'
import { cacheLife, cacheTag } from 'next/cache'
import type { ItemList, WithContext, ListItem } from 'schema-dts'

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

    const itemListElement: ListItem[] = limitedProducts.map(
      (product, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `https://utekos.no/produkter/${product.handle}`,
        // https://utekos.no/og-kate-linn-kikkert-master.png'
        'name': product.title,
        ...(product.featuredImage?.url ?
          { image: product.featuredImage.url }
        : {})
      })
    )

    const jsonLd: WithContext<ItemList> = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Alle produkter fra Utekos', // NYTT: Navn på selve listen
      'description': 'Skreddersy varmen',
      'url': 'https://utekos.no/produkter', // NYTT: URL til listen
      'itemListElement': itemListElement
    }

    return (
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          // Oppdatert escaping for å matche de andre filene (enkel backslash før u)
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
