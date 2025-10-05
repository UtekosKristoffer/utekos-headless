// Path: src/components/cart/CartDrawer/CartDrawer.tsx
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
import { Suspense, useTransition } from 'react'
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'
import { CartBodySkeleton } from '../../skeletons/CartBodySkeleton'
import { CartTrigger } from '@/components/cart/CartTrigger'

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const [, startTransition] = useTransition()

  const baseHandleStateChange = createDrawerStateHandler(cartStore)

  const handleStateChangeWithTransition = React.useCallback(
    (isOpen: boolean) => {
      // Bruk requestIdleCallback for å utsette state-endring til browser er idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          startTransition(() => {
            baseHandleStateChange(isOpen)
          })
        })
      } else {
        startTransition(() => {
          baseHandleStateChange(isOpen)
        })
      }
    },
    [baseHandleStateChange]
  )

  return (
    <Drawer
      open={open}
      onOpenChange={handleStateChangeWithTransition}
      direction='right'
    >
      <CartTrigger />
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Handlepose</DrawerTitle>
          <DrawerDescription>
            Oversikt over varer i handleposen og handlingsknapper.
          </DrawerDescription>
        </VisuallyHidden>
        <CartHeader />
        <Suspense fallback={<CartBodySkeleton />}>
          <CartBody />
        </Suspense>
        <SmartCartSuggestions cart={cart} />
        <CartFooter cart={cart} />
      </DrawerContent>
    </Drawer>
  )
}
