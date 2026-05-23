// Path: src/components/cart/Cart.tsx
'use client'

import { useSyncExternalStore } from 'react'
import { CartDrawer } from './CartDrawer/CartDrawer'

const subscribeToClientSnapshot = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function Cart() {
  const isMounted = useSyncExternalStore(
    subscribeToClientSnapshot,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!isMounted) {
    return <div aria-hidden className='size-11 shrink-0' />
  }

  return <CartDrawer />
}
