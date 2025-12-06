'use server'

import { getProducts } from './getProducts'
import type { GetProductsParams } from '@types' // Sjekk at stien stemmer med din @types alias eller fil

export async function getProductsAction(params: GetProductsParams = {}) {
  return await getProducts(params)
}
