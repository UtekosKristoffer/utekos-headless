// Path: src/components/ProductCard/ProductCard.tsx
/* eslint-disable no-duplicate-imports */
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
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { colorMap } from './colorMap'
import { getInitialOptionsForProduct } from './getInitialOptionsForProduct'
import { ProductCardFooter } from './ProductCardFooter'
import { ProductCardHeader } from './ProductCardHeader'
interface ProductCardProps {
  product: ShopifyProduct
  preferredColor?: string
}
export function ProductCard({ product }: { product: ShopifyProduct }) {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    console.log(
      `Initialiserer ${product.handle} med:`,
      getInitialOptionsForProduct(product)
    )
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
    <Card className='h-full flex flex-col bg-card-foreground border border-border/20 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 w-full overflow-hidden group'>
      <CardContent className='p-0 relative'>
        <Badge
          variant='secondary'
          className='absolute top-4 left-4 z-10 border border-muted-foreground bg-[#020244] text-white font-medium px-3 py-1 text-xs tracking-wide'
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
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </AspectRatio>
      </CardContent>

      <ProductCardHeader
        title={product.title}
        options={product.options}
        colorMap={colorMap}
        selectedOptions={selectedOptions}
        onOptionChange={setSelectedOptions}
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
