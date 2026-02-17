// Path: src/components/cart/CartFooter.tsx
import * as React from 'react'

import { CheckoutButton } from '@/components/cart/CheckoutButton/components/CheckoutButton'
import { DrawerFooter } from '@/components/ui/drawer'
import { useCartPending } from '@/modules/cart/hooks/useCartPending'
import { formatPrice } from '@/lib/utils/formatPrice'
import { SubtotalDisplay } from './SubTotalDisplay'
import { shouldRenderFooter } from '../utils/shouldRenderFooter'
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
  const subtotalAmount = cart!.cost.subtotalAmount.amount // string
  const currency = cart!.cost.subtotalAmount.currencyCode // string
  const item_ids = cart!.lines.map(line => line.merchandise.id) // string[]
  const num_items = cart!.totalQuantity // number

  return (
    <DrawerFooter className='border-t'>
      <SubtotalDisplay subtotal={subtotalFormatted} />
      <CheckoutButton
        checkoutUrl={cart!.checkoutUrl}
        subtotal={subtotalFormatted}
        isPending={isPending}
        cartId={cartId}
        subtotalAmount={subtotalAmount}
        currency={currency}
        item_ids={item_ids}
        num_items={num_items}
        className='mt-4'
      />
    </DrawerFooter>
  )
}
