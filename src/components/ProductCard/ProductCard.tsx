// Path: src/components/ProductCard/ProductCard.tsx
'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ProductCardProps } from '@types'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getInitialOptionsForProduct } from './getInitialOptionsForProduct'
import { ProductCardFooter } from './ProductCardFooter'
import { ProductCardHeader } from './ProductCardHeader'
import { findMatchingVariant } from './findMatchingVariant'

export function ProductCard({ product, colorHexMap }: ProductCardProps) {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    getInitialOptionsForProduct(product)
  )

  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

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
    toast.success(`${selectedVariant.title} er lagt i handleposen`)
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
    <Card className='product-card bg-sidebar-foreground group flex h-full flex-col'>
      <CardContent className='relative p-0'>
        <Link href={productUrl} aria-label={`Se produkt ${product.title}`}>
          <Badge
            variant='secondary'
            className='absolute left-4 top-4 z-10 border border-muted-foreground bg-[#020244] px-3 py-1 text-xs font-medium tracking-wide text-white'
          >
            UNISEX
          </Badge>
          <AspectRatio
            ratio={2 / 3}
            className='w-full overflow-hidden rounded-t-lg'
          >
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='product-card-image'
            />
          </AspectRatio>
        </Link>
      </CardContent>

      <ProductCardHeader
        title={product.title}
        options={product.options}
        colorHexMap={colorHexMap}
        selectedOptions={selectedOptions}
        onOptionChange={setSelectedOptions}
        productUrl={productUrl}
      />

      <ProductCardFooter
        price={price}
        productUrl={productUrl}
        isAvailable={isAvailable}
        isPending={isPending}
        onQuickBuy={handleQuickBuy}
      />
    </Card>
  )
}
