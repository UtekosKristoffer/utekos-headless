// Path: src/lib/actors/CartMutationContext.ts"

import { createActorContext } from '@xstate/react'

import { createCartMutationMachine } from '@/lib/state/createCartMutationMachine'
import type { CartActions } from '@types'

/**
 * Represents the instantiated XState machine for cart mutations.
 * @see createCartMutationMachine
 */
export type CartMutationMachine = ReturnType<typeof createCartMutationMachine>

/**
 * A dummy implementation of the cart server actions.
 * This is used to initialize the context and will throw an error if called,
 * ensuring that real actions are provided at the application level.
 * @see CartMutationContext.Provider
 */
export const dummyServerActions: CartActions = {
  addCartLine: async () => {
    throw new Error(
      'CartMutationContext: "addCartLine" server action was not provided.'
    )
  },
  updateCartLineQuantity: async () => {
    throw new Error(
      'CartMutationContext: "updateCartLineQuantity" server action was not provided.'
    )
  },
  removeCartLine: async () => {
    throw new Error(
      'CartMutationContext: "removeCartLine" server action was not provided.'
    )
  },
  clearCart: async () => {
    throw new Error(
      'CartMutationContext: "clearCart" server action was not provided.'
    )
  }
}

/**
 * A React Context provider for the cart mutation machine.
 * This allows any client component in the tree to access the running machine actor
 * to send events and subscribe to its state.
 *
 * @example
 *  In your layout or page component:
 * <CartMutationContext.Provider logic={createCartMutationMachine(serverActions, revalidateCart)}>
 *   <YourApp />
 * </CartMutationContext.Provider>
 *
 * @example
 *  In a client component:
 * const actorRef = CartMutationContext.useActorRef();
 * const state = CartMutationContext.useSelector(state => state);
 * actorRef.send({ type: 'ADD_LINE', ... });
 */
export const CartMutationContext = createActorContext<CartMutationMachine>(
  createCartMutationMachine(dummyServerActions, () => {
    // The placeholder for revalidateCart should also be explicit.
    // It shouldn't do anything, as it will be provided for real.
  })
)
