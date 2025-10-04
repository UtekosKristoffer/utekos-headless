'use server'
// Path: src/api/lib/products/getFeaturedProducts.ts
import { handles } from '@/db/data/products/product-info'
import { getProducts } from './getProducts'

export async function getFeaturedProducts() {
  const response = await getProducts()

  if (!response.success || !response.body || response.body.length === 0) {
    return []
  }

  const featuredProducts = response.body.filter(product =>
    handles.includes(product.handle)
  )

  return featuredProducts
}
