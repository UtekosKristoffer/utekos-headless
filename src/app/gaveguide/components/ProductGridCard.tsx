'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ProductCardProps } from '@types'
import { ShoppingBagIcon } from 'lucide-react'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { findMatchingVariant } from '@/components/ProductCard/findMatchingVariant'
import { getInitialOptionsForProduct } from '@/components/ProductCard/getInitialOptionsForProduct'
import { ProductCardSoldOut } from '@/components/ProductCard/ProductCardSoldOut'

interface ExtendedProductCardProps extends ProductCardProps {
  isPriority?: boolean
  initialOptions?: Record<string, string>
}

export function ProductGridCard({
  product,
  isPriority = false,
  initialOptions
}: ExtendedProductCardProps) {
  const [selectedOptions] = useState(
    () => initialOptions ?? getInitialOptionsForProduct(product)
  )

  const cartActor = CartMutationContext.useActorRef()

  const selectedVariant = findMatchingVariant(product, selectedOptions)

  const fallbackPrice = product.priceRange.minVariantPrice
  const fallbackImage = product.featuredImage

  const price = formatPrice(selectedVariant?.price ?? fallbackPrice)
  const productUrl = `/produkter/${product.handle}` as Route
  const imageUrl =
    selectedVariant?.image?.url ?? fallbackImage?.url ?? '/placeholder.svg'
  const altText =
    selectedVariant?.image?.altText ?? fallbackImage?.altText ?? product.title
  const isAvailable = selectedVariant?.availableForSale ?? false

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedVariant) {
      toast.error('Vennligst velg en gyldig kombinasjon.')
      return
    }
    if (!isAvailable) {
      toast.warning('Denne varianten er dessverre utsolgt.')
      return
    }
    cartActor.send({
      type: 'ADD_LINES',
      input: { variantId: selectedVariant.id, quantity: 1 }
    })
    toast.success(`${product.title} er lagt i handlekurven!`)
    cartStore.send({ type: 'OPEN' })
  }

  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )

  useEffect(() => {
    if (lastError) {
      toast.error(lastError)
    }
  }, [lastError])

  return (
    <Card className='group relative flex h-full flex-col overflow-hidden border-none bg-transparent shadow-none'>
      <div className='relative overflow-hidden rounded-lg'>
        <Link href={productUrl} aria-label={`Se produkt ${product.title}`}>
          <AspectRatio ratio={2 / 3}>
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes='(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
              className='transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
              priority={isPriority}
            />
          </AspectRatio>
        </Link>

        <div className='absolute bottom-0 left-0 w-full p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {isAvailable ?
            <Button
              onClick={handleQuickBuy}
              className='w-full'
              aria-label='Legg i handlekurv'
            >
              <ShoppingBagIcon className='mr-2 h-4 w-4' />
              Legg i handlekurv
            </Button>
          : <ProductCardSoldOut />}
        </div>

        <div className='absolute left-3 top-3'></div>
      </div>

      <CardContent className='flex-grow p-0 pt-4'>
        <Link href={productUrl} aria-label={`Se produkt ${product.title}`}>
          <h3 className='truncate font-medium'>{product.title}</h3>
        </Link>
        <p className='text-muted-foreground'>{price}</p>
      </CardContent>
    </Card>
  )
}
