import type { Cart } from '@types'

export const isCartEmpty = (cart: Cart | null | undefined): boolean => {
  if (!cart || !cart.lines) return true
  return cart.lines.length === 0
}
