// Path: src/hooks/useCartLine.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { useCartId } from '@/hooks/useCartId'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import type { Cart, CartLine } from '@types'
import { useCallback } from 'react'

export const useCartLine = (lineId: string): CartLine | undefined => {
  const cartId = useCartId()

  // Stabilized selector function with memoized dependency
  const selector = useCallback(
    (cart: Cart | null): CartLine | undefined =>
      cart?.lines?.find(line => line.id === lineId),
    [lineId]
  )

  const { data: line } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId && !!lineId,
    select: selector,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    structuralSharing: true
  })

  return line
}
