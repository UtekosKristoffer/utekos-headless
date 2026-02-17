// Path: src/hooks/useCartMutations.ts

import { CartMutationContext } from '@/modules/cart/context/CartMutationContext'
import { createMutationPromise } from '@/lib/utils/createMutationPromise'
import type { AddLinesPayload } from '@types'
export function useCartMutations() {
  const actor = CartMutationContext.useActorRef()

  const addLines = async (payload: AddLinesPayload) => {
    return createMutationPromise({ type: 'ADD_LINES', input: payload }, actor)
  }

  return {
    addLines
  }
}
