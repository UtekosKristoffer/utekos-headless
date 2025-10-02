import { useSyncExternalStore } from 'react'

import { cartStore } from '@/lib/state/cartStore'

/**
 * Adapter som kobler XState store mot Reacts useSyncExternalStore,
 * slik at komponenten rerenderes på alle relevante state-endringer.
 */
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

  return useSyncExternalStore(subscribe, getSnapshot)
}
