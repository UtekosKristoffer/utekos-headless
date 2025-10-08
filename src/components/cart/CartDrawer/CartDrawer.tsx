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
import { useTransition } from 'react'
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'
import { CartTrigger } from '@/components/cart/CartTrigger'

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()
  const [, startTransition] = useTransition()
  const baseHandleStateChange = createDrawerStateHandler(cartStore)

  const handleStateChangeWithTransition = React.useCallback(
    (isOpen: boolean) => {
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
      <DrawerContent className='h-full max-h-full'>
        <VisuallyHidden>
          <DrawerTitle>Handlepose</DrawerTitle>
          <DrawerDescription>
            Oversikt over varer i handleposen og handlingsknapper.
          </DrawerDescription>
        </VisuallyHidden>

        <div className='flex h-full flex-col'>
          <CartHeader />

          <div className='flex-1 overflow-y-auto'>
            <CartBody />
          </div>

          <div className='border-t'>
            <SmartCartSuggestions cart={cart} />
          </div>

          <CartFooter cart={cart} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
