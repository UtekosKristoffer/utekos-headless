// Path: src/components/cart/CartLineItem.tsx
'use client'

import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { CartLine } from '@types'
interface CartLineItemProps {
  line: CartLine
}

export const CartLineItem = ({ line }: CartLineItemProps) => {
  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      cartActor.send({
        type: 'REMOVE_LINE',
        input: { lineId: line.id }
      })
    } else {
      cartActor.send({
        type: 'UPDATE_LINE',
        input: {
          lineId: line.id,
          quantity: newQuantity
        }
      })
    }
  }

  // Extract product info
  const productTitle = line.merchandise.product?.title || 'Produkt'
  const variantTitle = line.merchandise.title || ''
  const price = line.cost?.totalAmount?.amount || '0'
  const imageUrl = line.merchandise.image?.url

  // Parse variant info (e.g., "Fjellblå / Large / Unisex" -> separate values)
  const [color, size] = variantTitle.split(' / ')

  return (
    <div className='flex gap-4'>
      {/* Product Image */}
      <div className='relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'>
        {imageUrl ?
          <Image
            src={imageUrl}
            alt={productTitle}
            fill
            className='object-cover'
            sizes='80px'
          />
        : <div className='flex h-full w-full items-center justify-center text-gray-400'>
            <span className='text-xs'>Ingen bilde</span>
          </div>
        }
      </div>

      {/* Product Info */}
      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-sm font-medium'>{productTitle}</h3>
            {color && size && (
              <p className='mt-1 text-xs text-muted-foreground'>
                {color} / {size}
              </p>
            )}
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 p-0'
            onClick={() => handleUpdateQuantity(0)}
            disabled={isPending}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Quantity and Price */}
        <div className='mt-auto flex items-center justify-between pt-2'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7 rounded-md'
              onClick={() => handleUpdateQuantity(line.quantity - 1)}
              disabled={isPending || line.quantity <= 1}
            >
              <Minus className='h-3 w-3' />
            </Button>
            <span className='min-w-[2rem] text-center text-sm'>
              {line.quantity}
            </span>
            <Button
              variant='outline'
              size='icon'
              className='h-7 w-7 rounded-md'
              onClick={() => handleUpdateQuantity(line.quantity + 1)}
              disabled={isPending}
            >
              <Plus className='h-3 w-3' />
            </Button>
          </div>
          <span className='text-sm font-medium'>
            {formatNOK(parseFloat(price))}
          </span>
        </div>
      </div>
    </div>
  )
}
