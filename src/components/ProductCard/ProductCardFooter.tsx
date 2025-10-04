// Path: src/components/ProductCard/ProductCardFooter.tsx
'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { ProductCardFooterProps } from '@types'
import Link from 'next/link'
import type React from 'react'
import { useTransition } from 'react' // Importer useTransition
import { ProductCardSoldOut } from './ProductCardSoldOut'

export function ProductCardFooter({
  price,
  productUrl,
  isAvailable,
  isPending: isMutationPending, // Gi nytt navn for å unngå kollisjon
  onQuickBuy
}: ProductCardFooterProps) {
  const [isTransitioning, startTransition] = useTransition()

  const handleQuickBuyClick = (e: React.MouseEvent) => {
    startTransition(() => {
      onQuickBuy(e) // Kall den originale funksjonen inne i en transition
    })
  }

  const isPending = isTransitioning || isMutationPending

  return (
    <CardFooter className='mt-auto flex flex-col gap-4 p-6 pt-0'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-2xl font-bold text-white'>{price}</p>
      </div>
      <div className='grid grid-cols-2 w-full gap-3'>
        <Link href={productUrl} className='flex-1'>
          <Button
            variant='default'
            size='default'
            className='border size-full border-neutral-700  text-white hover:bg-primary font-medium hover:text-primary-foreground transition-all duration-200 bg-transparent'
          >
            Se produkt
          </Button>
        </Link>
        {isAvailable ?
          <Button
            onClick={handleQuickBuyClick} // Bruk den nye handleren
            variant='default'
            size='default'
            disabled={isPending}
            className='bg-button border border-primary size-full font-medium text-primary-foreground transition-all duration-200 hover:bg-button/90 hover:shadow-lg hover:shadow-primary/25'
          >
            {isPending ?
              <Loader2 className='size-4 animate-spin' />
            : 'Hurtigkjøp'}
          </Button>
        : <ProductCardSoldOut />}
      </div>
    </CardFooter>
  )
}
