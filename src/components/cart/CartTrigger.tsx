// Path: src/components/cart/CartTrigger.tsx
'use client'

import { ShoppingBagIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/Button'
import { DrawerTrigger } from '@/components/ui/Drawer'
import { useCartStoreSnapshot } from '@/hooks/useCartStoreSnapshot'
import { cartStore } from '@/lib/state/cartStore'

/**
 * Calculates the total number of items in the cart from optimistic state.
 */
const calculateItemCount = (lines: Record<string, number>): number =>
  Object.keys(lines).length

/**
 * Generates accessible aria-label for the cart trigger button.
 */
const getCartTriggerAriaLabel = (itemCount: number): string =>
  `Åpne handlekurv, ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}`

/**
 * Creates the cart open handler.
 * Separates event handling logic for better testability.
 */
const createCartOpenHandler = (store: typeof cartStore) => () =>
  store.send({ type: 'OPEN' })

/**
 * Renders the cart trigger button with dynamic item count badge.
 *
 * This component's responsibility is to provide an accessible way to open
 * the cart drawer while displaying the current number of items through
 * optimistic state for immediate UI feedback.
 */
export function CartTrigger(): React.JSX.Element {
  const { optimisticCartLines } = useCartStoreSnapshot().context
  const itemCount = calculateItemCount(optimisticCartLines.lines)
  const handleOpenCart = createCartOpenHandler(cartStore)

  return (
    <DrawerTrigger asChild>
      <Button
        size='default'
        aria-label={getCartTriggerAriaLabel(itemCount)}
        className='relative'
        onClick={handleOpenCart}
      >
        <ShoppingBagIcon className='size-6' />
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>
            {itemCount}
          </span>
        )}
      </Button>
    </DrawerTrigger>
  )
}
