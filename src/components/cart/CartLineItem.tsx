// Path: src/components/cart/CartLineItem.tsx
'use client'

import * as React from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCartMutation } from '@/useHooks/useCartMutation'
import { updateLineQuantityAction } from '@/lib/actions/updateLineQuantityAction'
import { removeCartLineAction } from '@/lib/actions/removeCartLineAction'
import { formatPrice } from '@/lib/utils'
import { cartStore } from '@/lib/state/cartStore'
import type { CartLine } from '@/types'

/**
 * Performs optimistic quantity update and triggers server mutation.
 */
const performOptimisticQuantityUpdate = (lineId: string, newQuantity: number, mutate: (input: { lineId: string; quantity: number }) => void) => {
  // Immediate optimistic update
  cartStore.send({
    type: 'OPTIMISTIC_LINES_UPDATE',
    delta: { [lineId]: newQuantity }
  })

  // Server mutation
  mutate({ lineId, quantity: newQuantity })
}

/**
 * Performs optimistic item removal and triggers server mutation.
 */
const performOptimisticRemoval = (lineId: string, mutate: (input: { lineId: string }) => void) => {
  // Immediate optimistic removal (quantity 0 gets filtered out)
  cartStore.send({
    type: 'OPTIMISTIC_LINES_UPDATE',
    delta: { [lineId]: 0 }
  })

  // Server mutation
  mutate({ lineId })
}
/**
 * Generates accessible aria-label for quantity buttons.
 */
const getQuantityAriaLabel = (action: 'increase' | 'decrease', itemTitle: string): string => (action === 'increase' ? `Øk antall for ${itemTitle}` : `Reduser antall for ${itemTitle}`)

/**
 * Generates accessible aria-label for remove button.
 */
const getRemoveAriaLabel = (itemTitle: string): string => `Fjern ${itemTitle} fra handlekurv`

/**
 * Renders the quantity controls for a cart line item.
 */
const QuantityControls = ({ line, isPending, onQuantityChange }: { line: CartLine; isPending: boolean; onQuantityChange: (newQuantity: number) => void }): React.JSX.Element => (
  <div className='flex items-center gap-2'>
    <Button variant='outline' size='icon' aria-label={getQuantityAriaLabel('decrease', line.merchandise.title)} disabled={isPending || line.quantity <= 1} onClick={() => onQuantityChange(line.quantity - 1)}>
      <Minus className='size-4' />
    </Button>
    <span className='w-8 text-center text-sm font-medium' aria-live='polite'>
      {line.quantity}
    </span>
    <Button variant='outline' size='icon' aria-label={getQuantityAriaLabel('increase', line.merchandise.title)} disabled={isPending} onClick={() => onQuantityChange(line.quantity + 1)}>
      <Plus className='size-4' />
    </Button>
  </div>
)

/**
 * Renders a single line item within the cart, providing controls
 * to update the quantity or remove the item with optimistic updates.
 */
export function CartLineItem({ line }: { line: CartLine }): React.JSX.Element {
  const { mutate: updateQuantity, isPending: isUpdatePending } = useCartMutation(updateLineQuantityAction)
  const { mutate: removeLine, isPending: isRemovePending } = useCartMutation(removeCartLineAction)

  const isPending = isUpdatePending || isRemovePending

  const handleQuantityChange = React.useCallback(
    (newQuantity: number) => {
      performOptimisticQuantityUpdate(line.id, newQuantity, updateQuantity)
    },
    [line.id, updateQuantity]
  )

  const handleRemove = React.useCallback(() => {
    performOptimisticRemoval(line.id, removeLine)
  }, [line.id, removeLine])

  return (
    <li className='flex items-start gap-4'>
      <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md border'>
        <Image src={line.merchandise.image?.url ?? '/placeholder.svg'} alt={line.merchandise.image?.altText ?? line.merchandise.title} fill sizes='80px' className='object-cover' />
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-medium leading-tight'>{line.merchandise.title}</h3>
        <div className='mt-2'>
          <QuantityControls line={line} isPending={isPending} onQuantityChange={handleQuantityChange} />
        </div>
      </div>

      <div className='flex flex-col items-end justify-between h-20'>
        <Button variant='ghost' size='sm' className='h-auto p-1 text-muted-foreground hover:text-destructive' disabled={isPending} aria-label={getRemoveAriaLabel(line.merchandise.title)} onClick={handleRemove}>
          <X className='size-4' />
          <span className='sr-only'>Fjern</span>
        </Button>
        <p className='text-sm font-medium'>{formatPrice(line.merchandise.price)}</p>
      </div>
    </li>
  )
}
