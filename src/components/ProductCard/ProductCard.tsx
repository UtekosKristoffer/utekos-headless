// Path: src/components/ProductCard/ProductCard.tsx
'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { cartStore } from '@/lib/state/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { getInitialOptionsForProduct } from './getInitialOptionsForProduct'
import { ProductCardFooter } from './ProductCardFooter'
import { ProductCardHeader } from './ProductCardHeader'

interface ProductCardProps {
  product: ShopifyProduct
  preferredColor?: string
  colorHexMap: Map<string, string>
}

export function ProductCard({ product, colorHexMap }: ProductCardProps) {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    return getInitialOptionsForProduct(product)
  })

  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const selectedVariant = useMemo(() => {
    if (!product.variants.edges?.length || !selectedOptions) {
      return undefined
    }
    for (const edge of product.variants.edges) {
      const variant = edge.node
      const options = variant.selectedOptions
      if (options.length !== Object.keys(selectedOptions).length) continue
      let allMatch = true
      for (const opt of options) {
        if (selectedOptions[opt.name] !== opt.value) {
          allMatch = false
          break
        }
      }
      if (allMatch) return variant
    }
    return undefined
  }, [selectedOptions, product.variants.edges])

  const derivedValues = useMemo(() => {
    const fallbackPrice = product.priceRange.minVariantPrice
    const fallbackImage = product.featuredImage

    return {
      price: formatPrice(selectedVariant?.price ?? fallbackPrice),
      productUrl: `/produkter/${product.handle}` as Route,
      imageUrl:
        selectedVariant?.image?.url ?? fallbackImage?.url ?? '/placeholder.svg',
      altText:
        selectedVariant?.image?.altText
        ?? fallbackImage?.altText
        ?? product.title,
      isAvailable: selectedVariant?.availableForSale ?? false
    }
  }, [
    selectedVariant,
    product.handle,
    product.priceRange.minVariantPrice,
    product.featuredImage,
    product.title
  ])

  const { price, productUrl, imageUrl, altText, isAvailable } = derivedValues

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
          <AspectRatio
            ratio={2 / 3}
            className='w-full overflow-hidden rounded-t-lg'
          >
            <Image
              src={imageUrl}
              alt={altText}
              fill
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
