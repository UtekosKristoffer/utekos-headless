// Path: src/components/cart/CartDrawer/CartDrawer.tsx
'use client'

import { CartBody } from './CartBody/CartBody'
import { CartFooter } from './CartFooter/components/CartFooter'
import { CartHeader } from './CartHeader/CartHeader'
import { SmartCartSuggestions } from './SmartCartSuggestions'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle
} from '@/components/ui/drawer'
import { useCartOpen } from '@/modules/cart/hooks/useCartOpen'
import { useCartQuery } from '@/modules/cart/hooks/useCartQuery'
import { cartStore } from '@/modules/cart/state/cartStore'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import * as React from 'react'
import { useTransition } from 'react'
import { createDrawerStateHandler } from '../utils/createDrawerStateHandler'
import { CartTrigger } from './CartTrigger'
import { Activity } from 'react'

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
      <Activity>
        <CartTrigger />
      </Activity>

      <Activity>
        <DrawerContent className='h-full max-h-full overflow-hidden'>
          <VisuallyHidden>
            <DrawerTitle>Handlekurv</DrawerTitle>
            <DrawerDescription>
              Oversikt over varer i handlekurven og handlingsknapper.
            </DrawerDescription>
          </VisuallyHidden>

          <div className='flex flex-col h-full overflow-hidden'>
            <Activity>
              <CartHeader />
            </Activity>

            <Activity>
              <div className='flex-1 min-h-0 overflow-y-auto'>
                <CartBody />
              </div>
            </Activity>

            <Activity>
              <div className='max-h-[35vh] overflow-y-auto'>
                <SmartCartSuggestions cart={cart} />
              </div>
            </Activity>

            <Activity>
              <CartFooter cart={cart} />
            </Activity>
          </div>
        </DrawerContent>
      </Activity>
    </Drawer>
  )
}
