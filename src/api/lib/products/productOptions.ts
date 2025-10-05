import { queryOptions } from '@tanstack/react-query'
import { fetchProducts } from '@/api/lib/products/getProducts'
import { getProduct } from '@/api/lib/products/getProduct'
export const productOptions = (handle: string) =>
  queryOptions({
    queryKey: ['products', handle],
    queryFn: async () => {
      const product = await getProduct(handle)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  })

export const allProductsOptions = () =>
  queryOptions({
    queryKey: ['products', 'all'],
    queryFn: () => fetchProducts()
  })

export const featuredProducts = queryOptions({
  queryKey: ['featuredProducts'],
  queryFn: async () => {
    const response = await fetch('endpoint')

    return response.json()
  }
})
