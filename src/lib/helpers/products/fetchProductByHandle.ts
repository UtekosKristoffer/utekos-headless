'use server'

import { storefrontClient } from '@/clients/storefrontApiClient'
import { productQuery } from '@/lib/queries/productQuery'
import { normalizeProduct } from '@/lib/helpers/normalizers/normalizeProduct'
import type { ProductsQueryResponse, ShopifyProduct } from '@/types/products'
/**
 * Fetches a single product by its handle (for server-side use).
 * @param handle - The product handle
 * @returns A promise that resolves to the normalized product or null
 */
export const fetchProductByHandle = async (
  handle: string
): Promise<ShopifyProduct | null> => {
  const { data, errors } = await storefrontClient.request<{
    productByHandle: ProductsQueryResponse | null
  }>(productQuery, { variables: { handle } })

  if (errors || !data?.productByHandle) {
    // Vurder å logge feilen her
    return null
  }

  return normalizeProduct(data.productByHandle)
}
