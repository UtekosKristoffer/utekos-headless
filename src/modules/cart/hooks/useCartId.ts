// Path: src/hooks/useCartId.ts

import { useContext } from 'react'
import { CartIdContext } from '@/modules/cart/context/CartIdContext'
export const useCartId = () => {
  const cartId = useContext(CartIdContext)
  return cartId
}
