// Path: src/components/cart/CartBody.tsx

import { DrawerDescription } from '@/components/ui/drawer'
import { useCartPending } from '@/hooks/useCartPending'
import type { Cart } from '@types'

import { CartBodySkeleton } from '@/components/skeletons/CartBodySkeleton'

/**
 * Determines if the cart is in an empty state. Pure logic function.
 */
const isCartEmpty = (cart: Cart | null | undefined): boolean =>
  !cart || cart.lines.length === 0

import React from 'react'

import { renderPopulatedCart } from './utils/renderPopulatedCart'

/**
 * Orchestrates and renders the correct body for the cart drawer
 * based on the current state (loading, empty, or populated).
 */
export const CartBody = ({
  cart
}: {
  cart: Cart | null | undefined
}): React.JSX.Element => {
  const isPending = useCartPending() > 0
  const isEmpty = isCartEmpty(cart)

  if (isPending && isEmpty) {
    // For simple, single-component returns, inline is often more readable.
    return <CartBodySkeleton />
  }

  if (isEmpty) {
    // This is also simple enough to keep inline for better co-location of logic and UI.
    return (
      <div className='flex flex-1 items-center justify-center p-8'>
        <DrawerDescription className='text-center text-muted-foreground'>
          Handlekurven din er tom
          <br />
          <span className='text-sm'>
            Legg til noen varer for å komme i gang.
          </span>
        </DrawerDescription>
      </div>
    )
  }

  // The populated state has more complex logic (mapping, separator),
  // So delegating to a dedicated render function is a clean pattern.
  return renderPopulatedCart(cart!)
}
