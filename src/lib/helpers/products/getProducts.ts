//Path: src/lib/helpers/getProducts.ts

/**
 * @module helpers/getProducts
 * @function getProducts
 * @type {Promise<Product[]>}
 * @imports {storefrontClient} from '@/clients/storefrontApiClient'
 * @imports {productsQuery} from '@/lib/queries/productsQuery'
 * @imports type {Product, ProductsQueryResponse, MetaobjectReference } from '@/types'
 * @description Fetches products by their IDs using the storefront API client.
 * @returns {Promise<Product[]>} The product data or an empty array if not found.
 * @summary This function retrieves the product data from the server.
 */

import storefrontClient from '@/clients/storefrontApiClient'
import productsQuery from '@/lib/queries/productsQuery'
import type { Product, ProductsQueryResponse, MetaobjectReference } from '@/types'

export const getProducts = async (ids: string[]): Promise<Product[]> => {
  const { data, errors } = await storefrontClient.request<{ products: ProductsQueryResponse[] }>(productsQuery, {
    variables: { productIds: ids }
  })

  if (errors || !data?.products) {
    console.error('Error fetching products:', JSON.stringify(errors, null, 2))
    return []
  }

  return data.products.map(product => ({
    availableForSale: product.availableForSale,
    id: product.id,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    handle: product.handle,
    featuredImage: product.featuredImage,
    price: product.selectedOrFirstAvailableVariant.price.amount,
    metaobject: product.selectedOrFirstAvailableVariant.metafield as MetaobjectReference | null
  }))
}

export default getProducts
