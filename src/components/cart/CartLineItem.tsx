// Path: src/components/cart/CartLineItem/CartLineItem.tsx
'use client'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useCartLine } from '@/hooks/useCartLine'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { cn } from '@/lib/utils/className'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AlertDialogTitle } from './AlertDialogen'

interface CartLineItemProps {
  lineId: string
}

export const CartLineItem = ({ lineId }: CartLineItemProps) => {
  const line = useCartLine(lineId)
  const cartActor = CartMutationContext.useActorRef()
  const [localQuantity, setLocalQuantity] = useState(line?.quantity ?? 1)
  const [isDeleting, setIsDeleting] = useState(false)
  const updateTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (line && !isDeleting) {
      setLocalQuantity(line.quantity)
    }
  }, [line, isDeleting])

  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current)
      }
    }
  }, [])

  if (!line) {
    return null
  }

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

  const productTitle = line.merchandise.product?.title || 'Produkt'
  const productHandle = line.merchandise.product?.handle
  const productUrl = (
    productHandle ?
      `/produkter/${productHandle}`
    : '/') as Route
  const variantTitle = line.merchandise.title || ''
  const imageUrl = line.merchandise.image?.url
  const [color, size] = variantTitle.split(' / ')
  const basePrice =
    parseFloat(line.cost?.totalAmount?.amount || '0') / line.quantity
  const displayPrice = basePrice * localQuantity

  return (
    <div
      className={cn('flex gap-4 transition-all duration-200', {
        'opacity-50 pointer-events-none': isDeleting
      })}
    >
      <Link href={productUrl} onClick={() => cartStore.send({ type: 'CLOSE' })}>
        <div className='w-24 flex-shrink-0'>
          <AspectRatio
            ratio={2 / 3}
            className='overflow-hidden rounded-lg border border-neutral-700 bg-background'
          >
            {imageUrl ?
              <Image
                src={imageUrl}
                alt={productTitle}
                fill
                className='object-cover'
                sizes='96px'
              />
            : <div className='flex size-full items-center justify-center text-gray-400'>
                <span className='text-xs'>Ingen bilde</span>
              </div>
            }
          </AspectRatio>
        </div>
      </Link>

      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='relative'>
          <div className='min-w-0 pr-8'>
            <Link
              href={productUrl}
              onClick={() => cartStore.send({ type: 'CLOSE' })}
            >
              <h3 className='break-words text-sm font-medium hover:underline'>
                {productTitle}
              </h3>
            </Link>
            {color && size && (
              <p className='mt-1 text-xs text-muted-foreground'>
                {color} / {size}
              </p>
            )}
          </div>

          <div className='absolute right-0 top-0'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-6 p-0'
                  disabled={isDeleting}
                >
                  <Trash2 className='size-4 text-red-500' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Vil du fjerne {productTitle} fra handleposen din?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Nei, avbryt</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemoveLine}>
                    Ja, fjern produkt
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className='mt-auto flex items-center justify-between gap-4 px-4 pt-2'>
          <div className='flex items-center gap-1'>
            <Button
              variant='default'
              size='icon'
              className='size-7 rounded-md transition-transform active:scale-90'
              onClick={() => handleUpdateQuantity(localQuantity - 1)}
              disabled={localQuantity <= 1 || isDeleting}
            >
              <Minus className='size-3' />
            </Button>
            <span className='min-w-[1.75rem] text-center text-sm font-medium tabular-nums transition-all duration-100'>
              {localQuantity}
            </span>
            <Button
              variant='default'
              size='icon'
              className='size-7 rounded-md transition-transform active:scale-90'
              onClick={() => handleUpdateQuantity(localQuantity + 1)}
              disabled={isDeleting || localQuantity >= 99}
            >
              <Plus className='size-3' />
            </Button>
          </div>
          <span className='whitespace-nowrap text-sm font-medium tabular-nums'>
            {formatNOK(displayPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}
