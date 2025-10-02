import { getProducts } from '@/api/lib/products/getProducts'
import type { ShopifyProduct } from '@types'

export async function getAccessoryProducts(): Promise<ShopifyProduct[]> {
  try {
    const response = await getProducts({
      first: 5,
      query: 'tag:"tilbehør"'
    })

    // Sjekk for suksess og returner kun 'body', som er arrayen
    if (response.success && response.body) {
      return response.body
    }

    // Returner en tom array hvis kallet ikke var en suksess
    return []
  } catch (error) {
    console.error('Failed to fetch accessory products:', error)
    // Returner en tom array ved en uventet feil
    return []
  }
}
