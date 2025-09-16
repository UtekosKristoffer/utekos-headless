// Path: src/lib/state/createCartMutationActors.ts
import { fromPromise } from 'xstate'

import type { CartActions } from '@/types/cart'

/**
 * Creates dedicated promise actors for each cart mutation operation.
 * Each actor is responsible for a single type of mutation.
 */
export const createCartMutationActors = (actions: CartActions) => ({
  addLineActor: fromPromise(
    async ({
      input
    }: {
      input: { merchandiseId: string; quantity: number }
    }) => {
      return actions.addCartLine(input)
    }
  ),

  updateLineActor: fromPromise(
    async ({ input }: { input: { lineId: string; quantity: number } }) => {
      return actions.updateCartLineQuantity(input)
    }
  ),

  removeLineActor: fromPromise(
    async ({ input }: { input: { lineId: string } }) => {
      return actions.removeCartLine(input)
    }
  ),

  clearCartActor: fromPromise(async () => {
    return actions.clearCart()
  })
})
