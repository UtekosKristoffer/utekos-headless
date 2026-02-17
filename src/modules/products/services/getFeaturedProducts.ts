'use cache' // <--- MÅ VÆRE PÅ TOPPEN (File Level Directive)
import 'server-only'

import { handles } from '@/db/data/products/product-info'
import { getProducts } from './getProducts'
import { cacheLife, cacheTag } from 'next/cache'

export async function getFeaturedProducts() {
  cacheLife('hours')
  cacheTag('products')

  const response = await getProducts()

  if (!response.success || !response.body || response.body.length === 0) {
    return []
  }

  const featuredProducts = response.body.filter(product =>
    handles.includes(product.handle)
  )

  return featuredProducts
}
