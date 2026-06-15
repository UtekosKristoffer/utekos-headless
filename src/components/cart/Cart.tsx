// Path: src/components/cart/Cart.tsx
'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'
import { CartTrigger } from '@/components/cart/CartTrigger'
import { useCartOpen } from '@/hooks/useCartOpen'

const CartDrawer = dynamic(
  () => import('./CartDrawer/CartDrawer').then(module => module.CartDrawer),
  {
    ssr: false
  }
)

const subscribeToClientSnapshot = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function Cart() {
  const isMounted = useSyncExternalStore(
    subscribeToClientSnapshot,
    getClientSnapshot,
    getServerSnapshot
  )
  const open = useCartOpen()

  if (!isMounted) {
    return <div aria-hidden className='size-11 shrink-0' />
  }

  return (
    <>
      <CartTrigger />
      {open ? <CartDrawer /> : null}
    </>
  )
}
