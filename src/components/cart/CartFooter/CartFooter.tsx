import * as React from 'react'

import { CheckoutButton } from '@/components/jsx/CheckoutButton'
import { DrawerFooter } from '@/components/ui/drawer'
import { useCartPending } from '@/hooks/useCartPending'
import { formatPrice } from '@/lib/utils/formatPrice'
import { SubtotalDisplay } from './SubTotalDisplay'
import { shouldRenderFooter } from './utils/shouldRenderFooter'

import type { Cart } from '@types'

/**
 * Renders the footer of the cart drawer, displaying the subtotal
 * and a checkout button. Does not render if the cart is empty.
 *
 * This component orchestrates the footer's rendering by delegating
 * to pure helper functions and reusable components, following the
 * single responsibility principle.
 */
export const CartFooter = ({
  cart
}: {
  cart: Cart | null | undefined
}): React.JSX.Element | null => {
  const isPending = useCartPending() > 0

  if (!shouldRenderFooter(cart)) {
    return null
  }

  const subtotalFormatted = formatPrice(cart!.cost.subtotalAmount)

  return (
    <DrawerFooter className='border-t'>
      <SubtotalDisplay subtotal={subtotalFormatted} />
      <CheckoutButton
        checkoutUrl={cart!.checkoutUrl}
        subtotal={subtotalFormatted}
        isPending={isPending}
        className='mt-4'
      />
    </DrawerFooter>
  )
}
