// Path: src/components/ProductCard/ProductCardFooter.tsx
'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import type React from 'react'
import { ProductCardSoldOut } from './ProductCardSoldOut'

interface ProductCardFooterProps {
  price: string
  productUrl: Route
  isAvailable: boolean
  isPending: boolean
  onQuickBuy: (e: React.MouseEvent) => void
}

export function ProductCardFooter({
  price,
  productUrl,
  isAvailable,
  isPending,
  onQuickBuy
}: ProductCardFooterProps) {
  return (
    <CardFooter className='p-6 pt-0 flex flex-col gap-4 mt-auto'>
      <div className='flex justify-between items-center w-full'>
        <p className='text-2xl font-bold text-white'>{price}</p>
      </div>
      <div className='flex gap-3 w-full'>
        <Link href={productUrl} className='flex-1'>
          <Button
            variant='outline'
            size='default'
            className='w-full border-primary text-white hover:bg-primary font-medium hover:text-primary-foreground transition-all duration-200 bg-transparent'
          >
            Se produkt
          </Button>
        </Link>
        {isAvailable ?
          <Button
            onClick={onQuickBuy}
            variant='default'
            size='sm'
            disabled={isPending}
            className='flex-1 bg-button hover:bg-button/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25'
          >
            {isPending ?
              <Loader2 className='h-4 w-4 animate-spin' />
            : 'Hurtigkjøp'}
          </Button>
        : <ProductCardSoldOut />}
      </div>
    </CardFooter>
  )
}
