import type { Metadata } from 'next'
import { getProduct } from '@/api/lib/products/getProduct'
import { reshapeProductWithMetafields } from '@/hooks/useProductWithMetafields'
import { buildMissingProductMetadata } from './buildMissingProductMetadata'
import { buildProductMetadata } from './buildProductMetadata'

export async function generateProductMetadata(handle: string): Promise<Metadata> {
  'use cache'

  const rawProduct = await getProduct(handle)

  if (!rawProduct) {
    return buildMissingProductMetadata()
  }

  const product = reshapeProductWithMetafields(rawProduct) || rawProduct

  return buildProductMetadata(product, handle)
}
