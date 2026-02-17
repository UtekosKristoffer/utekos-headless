// Path: src/components/cart/CartDrawer/utils/createDrawerStateHandler.ts

import { cartStore } from '@/modules/cart/state/cartStore'

export const createDrawerStateHandler =
  (store: typeof cartStore) => (isOpen: boolean) =>
    store.send({ type: isOpen ? 'OPEN' : 'CLOSE' })
