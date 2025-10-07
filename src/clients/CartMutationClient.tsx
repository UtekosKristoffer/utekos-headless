// Path: src/clients/CartMutationClient.tsx
'use client'

import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { Cart, CartActions } from '@types'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

export function CartMutationClient({
  actions,
  children,
  setCartId
}: {
  actions: CartActions
  children: React.ReactNode
  cartId: string | null
  setCartId: (cartId: string) => void
}) {
  const queryClient = useQueryClient()

  const updateCartCache = (newCart: Cart) => {
    if (newCart?.id) {
      queryClient.setQueryData(['cart', newCart.id], newCart)
    }
  }

  const cartMutationMachine = createCartMutationMachine(
    actions,
    updateCartCache,
    setCartId
  )

  return (
    <CartMutationContext.Provider logic={cartMutationMachine}>
      {children}
    </CartMutationContext.Provider>
  )
}
