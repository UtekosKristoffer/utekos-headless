import * as React from 'react'

import { CheckoutButton } from '@/components/jsx/CheckoutButton'
import { DrawerFooter } from '@/components/ui/drawer'
import { useCartPending } from '@/hooks/useCartPending'
import { formatPrice } from '@/lib/utils/formatPrice'
import { SubtotalDisplay } from './SubTotalDisplay'
import { shouldRenderFooter } from './utils/shouldRenderFooter'
import type { Cart } from '@types'

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
  const cartId = cart!.id // Hent ut cartId

  return (
    <DrawerFooter className='border-t'>
      <SubtotalDisplay subtotal={subtotalFormatted} />
      <CheckoutButton
        checkoutUrl={cart!.checkoutUrl}
        subtotal={subtotalFormatted}
        isPending={isPending}
        cartId={cartId} // <-- SEND MED cartId
        className='mt-4'
      />
    </DrawerFooter>
  )
}
