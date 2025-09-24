'use client'

import { getInitialAvailableOptions } from '@/components/ProductCard/getInitialAvailableOptions'
import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { useRecommendedProducts } from '@/lib/context/RecommendedProductsContext'
import { cartStore } from '@/lib/state/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

function RecommendedItem({ product }: { product: ShopifyProduct }) {
  const cartActor = CartMutationContext.useActorRef()

  const selectedOptions = useMemo(
    () => getInitialAvailableOptions(product),
    [product]
  )

  const selectedVariant = useMemo(() => {
    return product.variants.edges.find(({ node: variant }) =>
      variant.selectedOptions.every(
        option => selectedOptions[option.name] === option.value
      )
    )?.node
  }, [selectedOptions, product.variants.edges])

  const handleAddToCart = () => {
    if (selectedVariant) {
      cartActor.send({
        type: 'ADD_LINES',
        input: { variantId: selectedVariant.id, quantity: 1 }
      })
    }
  }

  return (
    <div className='flex justify-center items-center gap-4'>
      <Link
        href={`/produkter/${product.handle}`}
        onClick={() => cartStore.send({ type: 'CLOSE' })}
      >
        <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-sidebar-foreground'>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className='object-cover'
              sizes='64px'
            />
          )}
        </div>
      </Link>
      <div className='flex-grow'>
        <Link
          href={`/produkter/${product.handle}`}
          onClick={() => cartStore.send({ type: 'CLOSE' })}
        >
          <h4 className='text-sm font-medium hover:underline'>
            {product.title}
          </h4>
        </Link>
        <p className='mt-1 text-sm text-muted-foreground'>
          {formatPrice(product.priceRange.minVariantPrice)}
        </p>
      </div>
      <Button size='sm' onClick={handleAddToCart} disabled={!selectedVariant}>
        Legg til
      </Button>
    </div>
  )
}

// Hovedkomponent
export function EmptyCartRecommendations() {
  const products = useRecommendedProducts()

  if (!products || products.length === 0) {
    return (
      <div className='text-center text-muted-foreground'>
        <p className='text-base'>Handleposen din er tom</p>
        <p className='mt-1 text-sm'>Legg til produkter for å komme i gang.</p>
      </div>
    )
  }

  return (
    <div className='text-left'>
      <h3 className='text-base font-semibold mb-4'>Start din Utekos her</h3>
      <div className='space-y-4'>
        {products.map(product => (
          <RecommendedItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
