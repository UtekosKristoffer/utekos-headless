// Path: src/components/cart/CartDrawer/components/CartBody/EmptyCart/components/RecommendedItem.tsx
import { getInitialAvailableOptions } from '@/modules/products/components/ProductCard/utils/getInitialAvailableOptions'
import { findMatchingVariant } from '@/modules/products/components/ProductCard/utils/findMatchingVariant'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/modules/cart/context/CartMutationContext'
import { cartStore } from '@/modules/cart/state/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'
import Image from 'next/image'
import Link from 'next/link'

export function RecommendedItem({ product }: { product: ShopifyProduct }) {
  const cartActor = CartMutationContext.useActorRef()
  const selectedOptions = getInitialAvailableOptions(product)
  const selectedVariant = findMatchingVariant(product, selectedOptions)

  const handleAddToCart = () => {
    if (selectedVariant) {
      cartActor.send({
        type: 'ADD_LINES',

        input: [{ variantId: selectedVariant.id, quantity: 1 }]
      })
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <Link
        href={`/produkter/${product.handle}`}
        onClick={() => cartStore.send({ type: 'CLOSE' })}
      >
        <div className='w-16 flex-shrink-0'>
          <AspectRatio
            ratio={2 / 3}
            className='overflow-hidden rounded-md border bg-sidebar-foreground'
          >
            {product.featuredImage && (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                className='object-cover'
                sizes='64px'
              />
            )}
          </AspectRatio>
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
