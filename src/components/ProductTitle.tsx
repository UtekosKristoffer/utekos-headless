// Path: src/components/ProductTitle.tsx
import { getProduct } from '@/api/lib/products/getProduct'
import { useQuery } from '@tanstack/react-query'
import type { ShopifyProduct } from '@types'

export function ProductData({ producthandle }: { producthandle: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', producthandle],
    queryFn: async () => {
      const response = await getProduct(producthandle)
      if (!response) {
        throw new Error('Product not found or API call failed')
      }
      return response
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>{data?.handle}</div>
}

/**
 * Displays product title
 * @why Provides consistent product title rendering across the application
 */
export function ProductTitle({
  product
}: {
  product: ShopifyProduct | undefined
}) {
  return <h1 className='text-2xl font-bold mb-4'>{product?.title}</h1>
}
