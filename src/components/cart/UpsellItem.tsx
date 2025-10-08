import { getInitialAvailableOptions } from '@/components/ProductCard/getInitialAvailableOptions'
import { findMatchingVariant } from '@/components/ProductCard/findMatchingVariant'
import { Button } from '@/components/ui/button'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { ShopifyProduct } from '@types'
import { ArrowRightIcon, PercentIcon } from 'lucide-react'
import Image from 'next/image'

interface UpsellItemProps {
  product: ShopifyProduct
  showDiscountHint?: boolean
}

export function UpsellItem({ product, showDiscountHint }: UpsellItemProps) {
  const cartActor = CartMutationContext.useActorRef()

  const selectedOptions = getInitialAvailableOptions(product)
  const selectedVariant = findMatchingVariant(product, selectedOptions)

  const originalPrice = parseFloat(product.priceRange.minVariantPrice.amount)
  const discountedPrice = originalPrice * 0.9 // 10% rabatt

  const handleAddToCart = () => {
    if (selectedVariant) {
      cartActor.send({
        type: 'ADD_LINES',
        input: { variantId: selectedVariant.id, quantity: 1 }
      })
    }
  }

  return (
    <div
      className={`mt-4 flex flex-col gap-3 rounded-lg border ${
        showDiscountHint ?
          'border-sky-500/30 bg-sky-900/10 ring-1 ring-inset ring-sky-500/20'
        : 'border-neutral-800 bg-neutral-900/50'
      } p-3`}
    >
      {/* Mobilvennlig layout med bedre flex-håndtering */}
      <div className='flex items-start gap-3'>
        {/* Bilde - fast størrelse */}
        <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md'>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              className='object-cover'
              sizes='48px'
            />
          )}
        </div>

        {/* Innhold og knapp wrapper - tillater wrapping på mobil */}
        <div className='flex flex-1 flex-col gap-2 min-w-0'>
          {/* Produktinfo */}
          <div className='flex-1'>
            <p className='text-sm font-medium line-clamp-2'>{product.title}</p>
            <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1'>
              {showDiscountHint ?
                <>
                  <span className='line-through'>
                    {formatPrice(product.priceRange.minVariantPrice)}
                  </span>
                  <span className='font-bold text-white'>
                    {formatPrice({
                      amount: discountedPrice.toString(),
                      currencyCode: 'NOK'
                    })}
                  </span>
                </>
              : <span className='font-bold text-white'>
                  {formatPrice(product.priceRange.minVariantPrice)}
                </span>
              }
            </div>
          </div>

          {/* Knapp - full bredde på mobil, auto på desktop */}
          <Button
            size='sm'
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className='w-full sm:w-auto sm:self-start'
          >
            Legg til <ArrowRightIcon className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Rabatthint */}
      {showDiscountHint && (
        <div className='flex items-center justify-center text-xs font-semibold text-sky-400 border-t border-sky-500/20 pt-2'>
          <PercentIcon className='h-3 w-3 mr-1.5' />
          Du får 10% rabatt på dette produktet!
        </div>
      )}
    </div>
  )
}
