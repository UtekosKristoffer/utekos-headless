/*eslint-disable max-params*/

import { cartStore } from '@/lib/state/cartStore'

/**
 * Performs optimistic quantity update and triggers server mutation.
 */
export const performOptimisticQuantityUpdate = (
  lineId: string,
  newQuantity: number,
  mutate: (_input: { lineId: string; quantity: number }) => void
) => {
  // Immediate optimistic update
  cartStore.send({
    type: 'OPTIMISTIC_CART_LINES_UPDATE',
    delta: { [lineId]: newQuantity }
  })

  // Server mutation
  mutate({ lineId, quantity: newQuantity })
}
