// Path: src/components/cart/CartFooter.tsx
'use client'

import * as React from 'react'
import { DrawerFooter } from '@/components/ui/Drawer'
import { useCartPending } from '@/useHooks'
import { formatPrice } from '@/lib/utils'
import { CheckoutButton } from '@/components/ui/CheckoutButton'
import type { Cart } from '@/types'

/**
 * Determines if the cart footer should be rendered.
 * Pure function for clean conditional logic.
 */
const shouldRenderFooter = (cart: Cart | null | undefined): boolean => Boolean(cart && cart.lines.length > 0)

/**
 * Pure component that renders the subtotal display.
 * Separates presentation logic from main component.
 */
const SubtotalDisplay = ({ subtotal }: { subtotal: string }): React.JSX.Element => (
  <div className='flex justify-between font-semibold'>
    <span>Delsum</span>
    <span>{subtotal}</span>
  </div>
)

/**
 * Renders the footer of the cart drawer, displaying the subtotal
 * and a checkout button. Does not render if the cart is empty.
 *
 * This component orchestrates the footer's rendering by delegating
 * to pure helper functions and reusable components, following the
 * single responsibility principle.
 */
export const CartFooter = ({ cart }: { cart: Cart | null | undefined }): React.JSX.Element | null => {
  const isPending = useCartPending() > 0

  if (!shouldRenderFooter(cart)) {
    return null
  }

  const subtotalFormatted = formatPrice(cart!.cost.subtotalAmount)

  return (
    <DrawerFooter className='border-t'>
      <SubtotalDisplay subtotal={subtotalFormatted} />
      <CheckoutButton checkoutUrl={cart!.checkoutUrl} subtotal={subtotalFormatted} isPending={isPending} className='mt-4' />
    </DrawerFooter>
  )
}
