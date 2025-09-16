import type { Product } from '@/api/shopify/types/types' // Bruk din ferdige getProduct-funksjon
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../lib/queries/getProduct'

export function ProductData({ producthandle }: { producthandle: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', producthandle],
    queryFn: async () => {
      const response = await getProduct(producthandle)
      if (!response.success || !response.body.product) {
        throw new Error('Product not found or API call failed')
      }
      return response.body.product
    }
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data?.handle}</div>
}

export function ProductTitle({ product }: { product: Product }) {
  return <h1 className='text-2xl font-bold mb-4'>{product.title}</h1>
}
