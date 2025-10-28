'use server'
import { getProducts } from '@/api/lib/products/getProducts'
import { TAGS } from '@/api/constants'
import type { ShopifyProduct } from '@types'
import { cacheTag, cacheLife } from 'next/cache'

export async function getAccessoryProducts(): Promise<ShopifyProduct[]> {
  'use cache'
  cacheTag(TAGS.products)
  cacheLife('days')
  try {
    const response = await getProducts({
      first: 10,
      query: 'tag:"tilbehør"'
    })

    if (response.success && response.body) {
      return response.body
    }

    return []
  } catch (error) {
    console.error('Failed to fetch accessory products:', error)
    return []
  }
}
