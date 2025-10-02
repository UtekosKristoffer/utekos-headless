import { getProducts } from '@/api/lib/products/getProducts'
import type { ShopifyProduct } from '@types'

export async function getAccessoryProducts(): Promise<ShopifyProduct[]> {
  try {
    const response = await getProducts({
      first: 7,
      query: 'tag:"tilbehør"'
    })

    if (response.success && response.body) {
      return response.body
    }

    return []
  } catch (error) {
    console.error('Failed to fetch accessory products:', error)
    // Returner en tom array ved en uventet feil
    return []
  }
}
