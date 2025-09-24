import { getProducts } from '@/api/lib/products/getProducts'
import type { GetProductsResponse } from '@types'


/**
 * Henter en liste med produkter som er tagget som 'tilbehør' i Shopify.
 */
export async function getAccessoryProducts(): Promise<GetProductsResponse> {
  // Bruker den eksisterende getProducts-funksjonen med en spesifikk query
  return getProducts({
    first: 5, // Antar at det ikke er så mange tilbehørsprodukter
    query: 'tag:"tilbehør"'
  })
}
