// Path: src/hooks/useCartQuery.tsx
'use client'

import { useQuery } from '@tanstack/react-query'

import { useCartId } from '@/lib/context/CartIdContext' // Ny import!
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import type { Cart } from '@types'

export const useCartQuery = () => {

  const cartId = useCartId()

  return useQuery<Cart | null>({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId
  })
}

export default useCartQuery
