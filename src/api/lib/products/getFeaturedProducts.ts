import { handles } from '@/db/data/products/product-info'
import { getProducts } from './getProducts'
import { cacheLife, cacheTag } from 'next/cache' // 1. Importer disse

export async function getFeaturedProducts() {
  'use cache' // 2. Aktiver caching av resultatet
  cacheLife('hours') 
  cacheTag('products') // 4. Tag for å kunne revalidere manuelt ved behov

  const response = await getProducts()

  if (!response.success || !response.body || response.body.length === 0) {
    return []
  }

  const featuredProducts = response.body.filter(product =>
    handles.includes(product.handle)
  )

  return featuredProducts
}
