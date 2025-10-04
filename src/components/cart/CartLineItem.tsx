// Path: src/components/cart/CartLineItem.tsx
'use client'

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
import dynamic from 'next/dynamic'

const AspectRatio = dynamic(
  () => import('@/components/ui/aspect-ratio').then(mod => mod.AspectRatio),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogDescription = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(
      mod => mod.AlertDialogDescription
    ),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogCancel = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogCancel),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogTitle = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogTitle),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogFooter = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogFooter),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialog = dynamic(
  () => import('@/components/ui/alert-dialog').then(mod => mod.AlertDialog),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogContent = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogContent),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogHeader = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogHeader),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogAction = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogAction),
  {
    ssr: false,
    loading: () => <div />
  }
)

const AlertDialogTrigger = dynamic(
  () =>
    import('@/components/ui/alert-dialog').then(mod => mod.AlertDialogTrigger),
  {
    ssr: false,
    loading: () => <div />
  }
)

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
    if (line && !isDeleting && line.quantity !== localQuantity) {
      setLocalQuantity(line.quantity)
    }
  }, [line, isDeleting, localQuantity])

  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current)
      }
    }
  }, [])

  // Steg 2: Nå kan vi trygt returnere tidlig hvis data ikke er klar
  if (!line) {
    return null
  }

  // Steg 3: All logikk og JSX er trygg fordi 'line' garantert eksisterer her
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

      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between'>
          <div>
            <Link
              href={productUrl}
              onClick={() => cartStore.send({ type: 'CLOSE' })}
            >
              <h3 className='text-sm font-medium hover:underline'>
                {productTitle}
              </h3>
            </Link>
            {color && size && (
              <p className='mt-1 text-xs text-muted-foreground'>
                {color} / {size}
              </p>
            )}
          </div>

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
                  Dette vil fjerne {productTitle} permanent fra handleposen din.
                  Handlingen kan ikke angres.
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

        <div className='mt-auto flex items-center justify-between pt-2'>
          <div className='flex items-center gap-2'>
            <Button
              variant='default'
              size='icon'
              className='size-7 rounded-md transition-transform active:scale-90'
              onClick={() => handleUpdateQuantity(localQuantity - 1)}
              disabled={localQuantity <= 1 || isDeleting}
            >
              <Minus className='size-3' />
            </Button>
            <span className='min-w-[2rem] text-center text-sm font-medium tabular-nums transition-all duration-100'>
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
          <span className='text-sm font-medium tabular-nums transition-all duration-200'>
            {formatNOK(displayPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}
