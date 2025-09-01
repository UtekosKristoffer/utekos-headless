// Path: src/components/cart/CartDrawer.tsx
'use client'

import * as React from 'react'
import { CartBody, CartFooter, CartHeader, CartTrigger } from '@/components/cart'
import { Drawer, DrawerContent } from '@/components/ui/Drawer'
import { useCartOpen, useCartQuery } from '@/useHooks'
import { cartStore } from '@/lib/state/cartStore'

/**
 * Creates the drawer state change handler.
 * Separates the event handling logic for better testability.
 */
const createDrawerStateHandler = (store: typeof cartStore) => (isOpen: boolean) => store.send({ type: isOpen ? 'OPEN' : 'CLOSE' })

/**
 * The main orchestrator for the Cart Drawer.
 *
 * This component's single responsibility is to coordinate the cart drawer's
 * presentation by composing its constituent parts (trigger, header, body, footer)
 * and managing the open/close state through the cart store.
 *
 * All cart data fetching and state management is delegated to hooks and
 * sub-components, keeping this component focused purely on orchestration.
 */
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
