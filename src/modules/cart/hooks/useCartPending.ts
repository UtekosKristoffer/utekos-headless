// Path: src/hooks/useCartPending.ts

import { cartStore } from '@/modules/cart/state/cartStore'
import type { CartUserInterfaceContext } from '@types'
import type { StoreSnapshot } from '@xstate/store'
import { useSelector } from '@xstate/store/react'
export const selectPending = (
  snapshot: StoreSnapshot<CartUserInterfaceContext>
): number => snapshot.context.pending

export const useCartPending = () => useSelector(cartStore, selectPending)
