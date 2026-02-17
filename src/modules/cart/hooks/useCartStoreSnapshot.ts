// Path: src/hooks/useCartStoreSnapshot.ts

import { useSyncExternalStore } from 'react'

import { cartStore } from '@/modules/cart/state/cartStore'

export function useCartStoreSnapshot() {
  const subscribe = (onStoreChange: () => void) => {
    const subscription = cartStore.subscribe({
      next: onStoreChange,
      error: () => {},
      complete: () => {}
    })
    return () => subscription.unsubscribe()
  }

  const getSnapshot = () => cartStore.getSnapshot()

  const getServerSnapshot = () => cartStore.getInitialSnapshot()

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
