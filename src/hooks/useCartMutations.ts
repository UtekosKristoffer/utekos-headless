// Path: src/hooks/useCartMutations.ts
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createMutationPromise } from '@/lib/utils/createMutationPromise'
import type { CartLineInput } from '@types'

type AddLinesPayload =
  | CartLineInput[]
  | { lines: CartLineInput[]; discountCode?: string }

export function useCartMutations() {
  const actor = CartMutationContext.useActorRef()

  const addLines = async (payload: AddLinesPayload) => {
    return createMutationPromise({ type: 'ADD_LINES', input: payload }, actor)
  }

  return {
    addLines
  }
}
