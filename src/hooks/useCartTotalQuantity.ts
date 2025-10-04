'use client'

import { useQuery } from '@tanstack/react-query'
import { useCartId } from '@/hooks/useCartId'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import type { Cart } from '@types'
import { useCallback } from 'react'
export const useCartTotalQuantity = () => {
  const cartId = useCartId()

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId,
    select: useCallback((data: Cart | null) => data?.totalQuantity ?? 0, []),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  })
}

// Selective cart lines hook
export const useCartLinesOnly = () => {
  const cartId = useCartId()

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId,
    select: useCallback((data: Cart | null) => data?.lines ?? [], []),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  })
}
