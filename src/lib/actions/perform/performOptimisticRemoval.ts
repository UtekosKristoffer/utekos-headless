import { cartStore } from '@/lib/state/cartStore'

export const performOptimisticRemoval = (
  lineId: string,
  mutate: (_input: { lineId: string }) => void
) => {
  cartStore.send({
    type: 'OPTIMISTIC_CART_LINES_UPDATE',
    delta: { [lineId]: 0 }
  })
  mutate({ lineId })
}
