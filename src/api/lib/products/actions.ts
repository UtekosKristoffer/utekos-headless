// Path: src/api/lib/products/actions.ts
'use server' // <--- DETTE ER ENESTE STED 'use server' SKAL VÆRE

import { getProducts } from './getProducts'
import { getProduct } from './getProduct'
import type { GetProductsParams } from '@types'

// Wrapper for getProducts
export async function getProductsAction(params: GetProductsParams = {}) {
  return await getProducts(params)
}

// Wrapper for getProduct
export async function getProductAction(handle: string) {
  return await getProduct(handle)
}