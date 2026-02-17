// Path: src/modules/products/actions/index.ts
'use server'

import { getProducts } from '../services/getProducts'
import { getProduct } from '../services/getProduct'
import type { GetProductsParams } from '@types'

export async function getProductsAction(params: GetProductsParams = {}) {
  return await getProducts(params)
}

export async function getProductAction(handle: string) {
  return await getProduct(handle)
}
