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
import * as React from 'react'
import { Suspense, useTransition } from 'react' // Importer useDeferredValue
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'
import { CartBodySkeleton } from '../../skeletons/CartBodySkeleton'
import { CartTrigger } from '@/components/cart/CartTrigger'

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const [, startTransition] = useTransition()

  const baseHandleStateChange = createDrawerStateHandler(cartStore)

  const handleStateChangeWithTransition = (isOpen: boolean) => {
    startTransition(() => {
      baseHandleStateChange(isOpen)
    })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleStateChangeWithTransition}
      direction='right'
    >
      <Suspense fallback={null}>
        <CartTrigger />
      </Suspense>
      <DrawerContent>
        <VisuallyHidden>
          <Suspense fallback={null}>
            <DrawerTitle>Handlepose</DrawerTitle>
          </Suspense>
          <Suspense fallback={null}>
            <DrawerDescription>
              Oversikt over varer i handleposen og handlingsknapper.
            </DrawerDescription>
          </Suspense>
        </VisuallyHidden>
        <CartHeader />
        <Suspense fallback={<CartBodySkeleton />}>
          <CartBody />
        </Suspense>
        <Suspense fallback={null}>
          <SmartCartSuggestions cart={cart} />
        </Suspense>
        <Suspense fallback={null}>
          <CartFooter cart={cart} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  )
}
