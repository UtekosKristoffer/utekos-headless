// Path: src/components/cart/CartBody.tsx
import * as React from 'react'
import type { Cart } from '@/types'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { useCartPending } from '@/useHooks'
import { CartBodySkeleton } from '../skeletons/CartBodySkeleton'
import { DrawerDescription } from '@/components/ui/Drawer'
import { Separator } from '@/components/ui/Separator'

/**
 * Determines if the cart is in an empty state. Pure logic function.
 */
const isCartEmpty = (cart: Cart | null | undefined): boolean => !cart || cart.lines.length === 0

/**
 * Renders the populated cart with a list of line items.
 * This is extracted into its own function because the rendering logic is more complex.
 * @returns {React.JSX.Element} The rendered list of cart items.
 */
const renderPopulatedCart = (cart: Cart): React.JSX.Element => (
  <div className='flex-1 overflow-y-auto'>
    <div className='px-4 py-2'>
      <ul className='space-y-0'>
        {cart.lines.map((line, index) => (
          <React.Fragment key={line.id}>
            <CartLineItem line={line} />
            {index < cart.lines.length - 1 && <Separator className='my-4' />}
          </React.Fragment>
        ))}
      </ul>
    </div>
  </div>
)

/**
 * Orchestrates and renders the correct body for the cart drawer
 * based on the current state (loading, empty, or populated).
 */
export const CartBody = ({ cart }: { cart: Cart | null | undefined }): React.JSX.Element => {
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
          <span className='text-sm'>Legg til noen varer for å komme i gang.</span>
        </DrawerDescription>
      </div>
    )
  }

  // The populated state has more complex logic (mapping, separator),
  // so delegating to a dedicated render function is a clean pattern.
  return renderPopulatedCart(cart!)
}
