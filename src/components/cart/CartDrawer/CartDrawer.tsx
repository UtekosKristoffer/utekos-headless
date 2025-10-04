// Path: src/components/cart/CartDrawer.tsx
'use client'

import { CartHeader } from '@/components/cart/CartHeader/CartHeader'
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
import { startTransition, useDeferredValue, memo, useCallback } from 'react'
import { createDrawerStateHandler } from './utils/createDrawerStateHandler'

// Lazy load CartTrigger med prioritet
const CartTrigger = dynamic(
  () => import('@/components/cart/CartTrigger').then(mod => mod.CartTrigger),
  {
    ssr: false,
    loading: () => <div className='h-11 w-11' /> // Placeholder for layout stability
  }
)

// Lazy load tunge komponenter når drawer åpnes
const LazyCartBody = dynamic(
  () => import('@/components/cart/CartBody/CartBody').then(mod => mod.CartBody),
  {
    loading: () => <div className='animate-pulse h-96' />,
    ssr: false
  }
)

const LazySmartCartSuggestions = dynamic(
  () =>
    import('@/components/cart/SmartCartSuggestions').then(
      mod => mod.SmartCartSuggestions
    ),
  {
    loading: () => null,
    ssr: false
  }
)

const LazyCartFooter = dynamic(
  () =>
    import('@/components/cart/CartFooter/CartFooter').then(
      mod => mod.CartFooter
    ),
  {
    loading: () => <div className='h-20' />,
    ssr: false
  }
)

// Memoized drawer content for bedre ytelse
const DrawerContentMemo = memo(
  ({ cart, isOpen }: { cart: any; isOpen: boolean }) => {
    const deferredCart = useDeferredValue(cart)

    // Kun render tunge komponenter når drawer er åpen
    if (!isOpen) return null

    return (
      <>
        <VisuallyHidden>
          <DrawerTitle>Handlepose</DrawerTitle>
          <DrawerDescription>
            Oversikt over varer i handleposen og handlingsknapper.
          </DrawerDescription>
        </VisuallyHidden>
        <CartHeader />
        <LazyCartBody />
        <LazySmartCartSuggestions cart={deferredCart} />
        <LazyCartFooter cart={deferredCart} />
      </>
    )
  }
)

DrawerContentMemo.displayName = 'DrawerContentMemo'

export function CartDrawer(): React.JSX.Element {
  const open = useCartOpen()
  const { data: cart } = useCartQuery()

  // Wrap state handler i useCallback for stabilitet
  const handleStateChange = useCallback((newOpen: boolean) => {
    // Bruk startTransition for non-urgent updates
    startTransition(() => {
      const handler = createDrawerStateHandler(cartStore)
      handler(newOpen)
    })
  }, [])

  // Pre-warm lazy components når bruker hover over trigger
  React.useEffect(() => {
    if (open) {
      // Pre-load komponenter asynkront
      import('@/components/cart/CartBody/CartBody')
      import('@/components/cart/SmartCartSuggestions')
      import('@/components/cart/CartFooter/CartFooter')
    }
  }, [open])

  return (
    <Drawer
      open={open}
      onOpenChange={handleStateChange}
      direction='right'
      modal={true} // Eksplisitt modal for bedre fokushåndtering
    >
      <CartTrigger />
      <DrawerContent>
        <DrawerContentMemo cart={cart} isOpen={open} />
      </DrawerContent>
    </Drawer>
  )
}
