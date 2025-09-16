import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/helpers/products/fetchProducts'
import type { ShopifyProduct } from '../types/shopify'

export function useProducts() {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['products'],
    queryFn: fetchProducts
  })
}
