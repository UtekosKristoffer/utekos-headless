import { queryOptions } from '@tanstack/react-query'
// ENDRING: Import fra actions.ts i stedet for direkte fra server-filene
import { getProductsAction, getProductAction } from '@/api/lib/products/actions'

export const productOptions = (handle: string) =>
  queryOptions({
    queryKey: ['products', handle],
    queryFn: async () => {
      // ENDRING: Bruk action
      const product = await getProductAction(handle)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  })

export const allProductsOptions = () =>
  queryOptions({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const response = await getProductsAction()

      if (!response.success || !response.body) {
        throw new Error(response.error ?? 'Failed to fetch products')
      }

      return response.body
    }
  })

export const featuredProducts = queryOptions({
  queryKey: ['featuredProducts'],
  queryFn: async () => {
    const response = await fetch('endpoint')
    return response.json()
  }
})
