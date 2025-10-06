'use server'
import { getProducts } from '@/api/lib/products/getProducts'
import type { ShopifyProduct } from '@types'
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife
} from 'next/cache'
import { TAGS } from '@/api/constants'
export async function getRecommendedProducts(): Promise<ShopifyProduct[]> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')
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
