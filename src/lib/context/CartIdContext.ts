// Path: src/lib/context/CartIdContext.ts
'use client'

import { createContext, useContext } from 'react'

const CartIdContext = createContext<string | null>(null)

export const CartIdProvider = CartIdContext.Provider

export const useCartId = () => {
  const cartId = useContext(CartIdContext)
  return cartId
}
