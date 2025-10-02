import { getProducts } from '@/api/lib/products/getProducts'
import type { ShopifyProduct } from '@types'

export async function getRecommendedProducts(): Promise<ShopifyProduct[]> {
  try {
    const response = await getProducts({ first: 7 })

    if (response.success && response.body) {
      return response.body
    }

    return []
  } catch (error) {
    console.error('Failed to fetch recommended products:', error)

    return []
  }
}
