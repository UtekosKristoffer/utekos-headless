// Path: src/components/cart/CartDrawer.tsx
'use client'

import { CartBody } from '@/components/cart/CartBody/CartBody'
import { CartFooter } from '@/components/cart/CartFooter/CartFooter'
import { CartHeader } from '@/components/cart/CartHeader/CartHeader'
import { SmartCartSuggestions } from '@/components/cart/SmartCartSuggestions'
import { CartBodySkeleton } from '@/components/skeletons/CartBodySkeleton'
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
  const [isContentLoaded, setIsContentLoaded] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsContentLoaded(true), 50)
      return () => clearTimeout(timer)
    } else {
      setIsContentLoaded(false)
    }
  }, [open])

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

        {
          isContentLoaded ?
            // Steg 2: Render det faktiske innholdet når skuffen er synlig
            <>
              <CartBody cart={cart} />
              <SmartCartSuggestions cart={cart} />
              <CartFooter cart={cart} />
            </>
            // Steg 1: Render kun skjeletter umiddelbart
          : <CartBodySkeleton />
        }
      </DrawerContent>
    </Drawer>
  )
}
