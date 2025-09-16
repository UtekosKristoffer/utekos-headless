// Path: src/lib/helpers/getCachedCart.ts
import { unstable_cache as cache } from 'next/cache'

import { CartNotFoundError } from '@/lib/errors/CartNotFoundError' // Import the custom error class
import { fetchCart } from '@/lib/helpers/cart/fetchCart'
import type { Cart } from '@/types/cart'

export const getCachedCart = cache(
  async (cartId: string | null): Promise<Cart | null> => {
    if (!cartId) {
      return null
    }

    try {
      const cart = await fetchCart(cartId)
      return cart
    } catch (error) {
      if (error instanceof CartNotFoundError) {
        return null
      }

      throw error
    }
  },
  ['get-cart-by-id'],
  {
    tags: ['cart']
  }
)
