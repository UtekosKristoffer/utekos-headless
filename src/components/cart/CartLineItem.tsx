'use client'

import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { CartLine } from '@types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface CartLineItemProps {
  line: CartLine
}

export const CartLineItem = ({ line }: CartLineItemProps) => {
  const cartActor = CartMutationContext.useActorRef()

  // Lokal state for øyeblikkelig UI-oppdatering
  const [localQuantity, setLocalQuantity] = useState(line.quantity)
  const [isDeleting, setIsDeleting] = useState(false)

  // Debounce timer ref
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Synk lokal state når line.quantity endres fra server
  useEffect(() => {
    if (!isDeleting) {
      setLocalQuantity(line.quantity)
    }
  }, [line.quantity, isDeleting])

  const handleUpdateQuantity = (newQuantity: number) => {
    setLocalQuantity(newQuantity)

    if (updateTimerRef.current) {
      clearTimeout(updateTimerRef.current)
    }

    if (newQuantity === 0) {
      setIsDeleting(true)
      cartActor.send({
        type: 'REMOVE_LINE',
        input: { lineId: line.id }
      })
    } else {
      updateTimerRef.current = setTimeout(() => {
        cartActor.send({
          type: 'UPDATE_LINE',
          input: {
            lineId: line.id,
            quantity: newQuantity
          }
        })
      }, 300)
    }
  }

  const handleRemoveLine = () => {
    setIsDeleting(true)
    setLocalQuantity(0)
    cartActor.send({
      type: 'REMOVE_LINE',
      input: { lineId: line.id }
    })
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current)
      }
    }
  }, [])

  const productTitle = line.merchandise.product?.title || 'Produkt'
  const variantTitle = line.merchandise.title || ''
  const imageUrl = line.merchandise.image?.url
  const [color, size] = variantTitle.split(' / ')

  // Beregn pris basert på lokal quantity
  const basePrice =
    parseFloat(line.cost?.totalAmount?.amount || '0') / line.quantity
  const displayPrice = basePrice * localQuantity

  return (
    <div
      className={`flex gap-4 transition-all duration-200 ${isDeleting ? 'opacity-50 scale-95' : ''}`}
    >
      {/* Product Image */}
      <div className='relative h-32 w-22 flex-shrink-0 overflow-hidden rounded-lg bg-background border border-neutral-700'>
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
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6 p-0'
                onClick={handleRemoveLine}
                disabled={isDeleting}
              >
                <Trash2 className='h-4 w-4 text-red-500' />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className='w-60 bg-sidebar-foreground border border-neutral-800'
              side='left'
              align='center'
            >
              <div className='flex items-start space-x-3'>
                <Trash2 className='h-5 w-5 text-red-500 mt-0.5' />
                <div className='space-y-1'>
                  <h4 className='text-sm text-white font-semibold'>
                    Fjern produkt
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Dette vil fjerne hele produktet fra handlevognen
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Quantity and Price */}
        <div className='mt-auto flex items-center justify-between pt-2'>
          <div className='flex items-center gap-2'>
            <Button
              variant='default'
              size='icon'
              className='h-7 w-7 rounded-md transition-transform active:scale-90'
              onClick={() => handleUpdateQuantity(localQuantity - 1)}
              disabled={localQuantity <= 1 || isDeleting}
            >
              <Minus className='h-3 w-3' />
            </Button>
            <span className='min-w-[2rem] text-center text-sm font-medium tabular-nums transition-all duration-100'>
              {localQuantity}
            </span>
            <Button
              variant='default'
              size='icon'
              className='h-7 w-7 rounded-md transition-transform active:scale-90'
              onClick={() => handleUpdateQuantity(localQuantity + 1)}
              disabled={isDeleting || localQuantity >= 99}
            >
              <Plus className='h-3 w-3' />
            </Button>
          </div>
          <span className='text-sm font-medium tabular-nums transition-all duration-200'>
            {formatNOK(displayPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}
