// Path: src/components/cart/CartLineItem.tsx
'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import { Button } from '@/components/ui/Button'
import { useCartMutation } from '@/hooks/useCartMutation'
import { performOptimisticQuantityUpdate } from '@/lib/actions/perform/performOptimisticQuantityUpdate'
import { performOptimisticRemoval } from '@/lib/actions/perform/performOptimisticRemoval'
import { removeCartLineAction } from '@/lib/actions/removeCartLineAction'
import { updateCartLineQuantityAction } from '@/lib/actions/updateCartLineQuantityAction'
import { formatPrice } from '@/lib/utils/formatPrice'
import QuantityControls from './QuantityControls'
import { getRemoveAriaLabel } from './utils/getRemoveAriaLabel'

import type { CartLine } from '@types'

export default function CartLineItem({
  line
}: {
  line: CartLine
}): React.JSX.Element {
  const { mutate: updateQuantity, isPending: isUpdatePending } =
    useCartMutation(updateCartLineQuantityAction)
  const { mutate: removeLine, isPending: isRemovePending } =
    useCartMutation(removeCartLineAction)

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
        <Image
          src={line.merchandise.image?.url ?? '/placeholder.svg'}
          alt={line.merchandise.image?.altText ?? line.merchandise.title}
          fill
          sizes='80px'
          className='object-cover'
        />
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-medium leading-tight'>{line.merchandise.title}</h3>
        <div className='mt-2'>
          <QuantityControls
            line={line}
            isPending={isPending}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>

      <div className='flex flex-col items-end justify-between h-20'>
        <Button
          variant='ghost'
          size='sm'
          className='h-auto p-1 text-muted-foreground hover:text-destructive'
          disabled={isPending}
          aria-label={getRemoveAriaLabel(line.merchandise.title)}
          onClick={handleRemove}
        >
          <X className='size-4' />
          <span className='sr-only'>Fjern</span>
        </Button>
        <p className='text-sm font-medium'>
          {formatPrice(line.merchandise.price)}
        </p>
      </div>
    </li>
  )
}
