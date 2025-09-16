// Path: src/components/cart/CartDrawer.tsx
'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'

import { CartBody } from '@/components/cart/CartBody'
import { CartFooter } from '@/components/cart/CartFooter'
import { CartHeader } from '@/components/cart/CartHeader'
import { Drawer, DrawerContent } from '@/components/ui/Drawer'
import { useCartOpen } from '@/hooks/useCartOpen'
import { useCartQuery } from '@/hooks/useCartQuery'
import { cartStore } from '@/lib/state/cartStore'

const CartTrigger = dynamic(
  () => import('@/components/cart/CartTrigger').then(mod => mod.CartTrigger),
  {
    ssr: false
  }
)

const createDrawerStateHandler =
  (store: typeof cartStore) => (isOpen: boolean) =>
    store.send({ type: isOpen ? 'OPEN' : 'CLOSE' })

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const handleStateChange = createDrawerStateHandler(cartStore)

  return (
    <Drawer open={open} onOpenChange={handleStateChange} direction='right'>
      <CartTrigger />
      <DrawerContent className='flex h-full w-full max-w-md flex-col'>
        <CartHeader />
        <CartBody cart={cart} />
        <CartFooter cart={cart} />
      </DrawerContent>
    </Drawer>
  )
}
