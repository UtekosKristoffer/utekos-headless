'use client'
// Path: src/components/ProductCard/ProductCardFooter.tsx
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import type { ProductCardFooterProps } from '@types'
import Link from 'next/link'
import type React from 'react'
import { ProductCardSoldOut } from './ProductCardSoldOut'

export function ProductCardFooter({
  price,
  productUrl,
  isAvailable,
  isPending,
  onQuickBuy
}: ProductCardFooterProps) {
  const handleQuickBuyClick = (e: React.MouseEvent) => {
    onQuickBuy(e)
  }

  return (
    <CardFooter className='mt-auto flex flex-col gap-4 p-6 pt-0'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-2xl font-bold text-cloud-dancer'>{price}</p>
      </div>
      <div className='grid w-full grid-cols-2 gap-3'>
        <BrandBadge
          asChild
          backgroundColor='var(--cloud-dancer)'
          textColor='var(--maritime-darkest)'
          className='size-full min-h-12 border border-cloud-dancer/20 px-4 text-sm font-medium transition-all duration-200 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloud-dancer sm:text-base'
        >
          <Link
            href={productUrl}
            data-track='ProductCardFooterViewMoreClick'
            aria-label='Se produkt'
            className='flex-1'
          >
            Se produkt
          </Link>
        </BrandBadge>
        {isAvailable ?
          <BrandBadge
            asChild
            backgroundColor='var(--primary-button)'
            textColor='var(--maritime-darkest)'
            className='size-full min-h-12 border border-primary-button/35 px-4 text-sm font-medium transition-all duration-200 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-button sm:text-base'
          >
            <button
              type='button'
              onClick={handleQuickBuyClick}
              data-track='ProductCardFooterAddToCartClick'
              disabled={isPending}
            >
              {isPending ?
                <Loader2 className='size-4 animate-spin' />
              : 'Legg i handlekurv'}
            </button>
          </BrandBadge>
        : <ProductCardSoldOut />}
      </div>
    </CardFooter>
  )
}
