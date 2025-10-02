// Path: src/components/cart/CartDrawer.tsx
'use client'

import { CartBody } from '@/components/cart/CartBody/CartBody'
import { CartFooter } from '@/components/cart/CartFooter/CartFooter'
import { CartHeader } from '@/components/cart/CartHeader/CartHeader'
import { SmartCartSuggestions } from '@/components/cart/SmartCartSuggestions'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from '@/components/ui/drawer'
import { useCartOpen } from '@/hooks/useCartOpen'
import { useCartQuery } from '@/hooks/useCartQuery'
import { cartStore } from '@/lib/state/cartStore'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'
const CartTrigger = dynamic(
  () => import('@/components/cart/CartTrigger').then(mod => mod.CartTrigger),
  { ssr: false }
)

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const handleStateChange = createDrawerStateHandler(cartStore)
  const subtotalString = cart?.cost?.subtotalAmount?.amount ?? '0'
  const subtotal = parseFloat(subtotalString)

  return (
    <Drawer open={open} onOpenChange={handleStateChange} direction='right'>
      <CartTrigger />
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Handlepose</DrawerTitle>
          <DrawerDescription>
            Oversikt over varer i handleposen og handlingsknapper.
          </DrawerDescription>
        </VisuallyHidden>

        <CartHeader />
        <CartBody cart={cart} />
        <SmartCartSuggestions cart={cart} />
        <CartFooter cart={cart} />
      </DrawerContent>
    </Drawer>
  )
}
