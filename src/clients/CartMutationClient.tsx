// Path: src/clients/CartMutationClient.tsx
'use client'

import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { CartActions } from '@types'
import { CartMutationContext } from '../lib/context/CartMutationContext'

export function CartMutationClient({
  actions,
  children,
  cartId
}: {
  actions: CartActions
  children: React.ReactNode
  cartId: string | null
}) {
  const queryClient = useQueryClient()

  // LØSNING: Bruk refetchQueries for å tvinge ny fetch
  const revalidateCart = React.useCallback(() => {
    if (cartId) {
      console.log('Refetcher handlekurv-data for ID:', cartId)

      queryClient.invalidateQueries({
        queryKey: ['cart', cartId],
        refetchType: 'active' // Tvinger aktiv refetch
      })
    }
  }, [cartId, queryClient])

  const cartMutationMachine = React.useMemo(
    () => createCartMutationMachine(actions, revalidateCart),
    [actions, revalidateCart]
  )

  return (
    <CartMutationContext.Provider logic={cartMutationMachine}>
      {children}
    </CartMutationContext.Provider>
  )
}

export { CartMutationContext }
