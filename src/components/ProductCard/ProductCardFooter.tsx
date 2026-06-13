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
  onQuickBuy,
  onViewProduct
}: ProductCardFooterProps) {
  const handleQuickBuyClick = (e: React.MouseEvent) => {
    onQuickBuy(e)
  }

  const actionBadgeClassName =
    'size-full min-h-12 min-w-0 border px-3 py-3 text-center text-[clamp(0.75rem,3.3vw,0.875rem)] font-utekos-text-medium whitespace-normal transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2'
  const productViewClickProps = onViewProduct ? { onClick: onViewProduct } : {}

  return (
    <CardFooter className='mt-auto flex flex-col gap-4 p-6 pt-0'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-2xl font-bold text-foreground'>{price}</p>
      </div>
      <div className='grid w-full grid-cols-2 gap-3'>
        <BrandBadge
          asChild
          backgroundColor='var(--cloud-dancer)'
          textColor='var(--background)'
          className={`${actionBadgeClassName} border-cloud-dancer/20 font-utekos-text-medium hover:brightness-95 focus-visible:outline-cloud-dancer`}
        >
          <Link
            href={productUrl}
            data-track='ProductCardFooterViewMoreClick'
            {...productViewClickProps}
            aria-label='Se produkt'
            className='flex-1 min-w-0'
          >
            Se produkt
          </Link>
        </BrandBadge>
        {isAvailable ?
          <BrandBadge
            asChild
            backgroundColor='var(--primary)'
            textColor='var(--background)'
            className={`${actionBadgeClassName} border-primary/35 font-utekos-text-medium hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-primary`}
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
