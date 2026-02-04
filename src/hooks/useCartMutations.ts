import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createMutationPromise } from '@/lib/utils/createMutationPromise'
import type { CartLineInput } from '@types'

export function useCartMutations() {
  const actor = CartMutationContext.useActorRef()

  const addLines = async (lines: CartLineInput[]) => {
    return createMutationPromise({ type: 'ADD_LINES', input: lines }, actor)
  }

  return {
    addLines
  }
}
