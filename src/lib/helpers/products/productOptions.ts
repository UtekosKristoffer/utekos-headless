// Path: lib/helpers/productOptions.ts

/**
 * @fileoverview Query options for fetching products using React Query.
 * 
 * @param queryKey
 * @module lib/helpers/productOptions
 */

import { queryOptions } from '@tanstack/react-query'
import { getProducts } from '@/lib/helpers/products/fetchProducts'

/**
 * Creates query options for fetching one or more products.
 * @param productIds - An array of product IDs to fetch.
 */
export const productOptions = (productIds: string[]) =>
  queryOptions({
    // queryKey må være unik for dataen den henter.
    // Her inkluderer vi ID-ene for å sikre unikhet.
    queryKey: ['products', productIds],

    // queryFn er funksjonen som henter dataen.
    // Den bruker getProducts som vi lagde i sted.
    queryFn: () => getProducts(productIds)
  })
