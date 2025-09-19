import type { Cart } from '@types'

export const shouldRenderFooter = (cart: Cart | null | undefined): boolean =>
  Boolean(cart && cart.lines.length > 0)
