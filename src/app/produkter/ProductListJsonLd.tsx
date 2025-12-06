import { getProducts } from '@/api/lib/products/getProducts'
import { cacheLife, cacheTag } from 'next/cache'
import type { ItemList, WithContext } from 'schema-dts'

// Hjelpefunksjon for å håndtere "Connection closed"
async function fetchWithRetry(retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await getProducts()
      if (response.success && response.body && response.body.length > 0) {
        return response.body
      }
      // Hvis vi fikk et tomt svar eller success=false, kast en feil for å trigge retry
      throw new Error(response.error || 'Empty response')
    } catch (error) {
      // Logg advarsel, men ikke krasj enda
      console.warn(`ProductListJsonLd attempt ${i + 1} failed. Retrying...`)

      // Hvis det var siste forsøk, kast feilen videre
      if (i === retries - 1) throw error

      // Vent litt før neste forsøk (gir nettverket tid til å puste)
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
    // Bruk retry-funksjonen i stedet for direkte kall
    const products = await fetchWithRetry()

    if (!products || products.length === 0) {
      // Nå logger vi en error som faktisk synes hvis vi ender opp tomhendt
      console.error('ProductListJsonLd: No products found after retries.')
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    )
  } catch (error) {
    // Dette skal i teorien ikke skje nå som vi har retry,
    // men hvis det skjer, vil vi se det tydelig i loggen.
    console.error('CRITICAL: ProductListJsonLd failed completely:', error)
    return null
  }
}
