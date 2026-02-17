// Path: src/components/cart/SmartCartSuggestions.tsx

'use client'

import { useQuery } from '@tanstack/react-query'
import { FREE_SHIPPING_THRESHOLD } from '@/constants'
import { getAccessoryProducts } from '@/modules/products/services/getAccessoryProducts'
import { getRecommendedProducts } from '@/modules/products/services/getRecommendedProducts'
import { Progress } from '@/components/ui/progress'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { Cart, ShopifyProduct } from '@types'
import { FreeShippingConfirmation } from '@/components/cart/CartDrawer/components/FreeShippingConfirmation'
import { UpsellItem } from '@/components/cart/CartDrawer/components/UpsellItem'

export function SmartCartSuggestions({
  cart
}: {
  cart: Cart | null | undefined
}) {
  const { data: recommendedProducts = [] } = useQuery<ShopifyProduct[]>({
    queryKey: ['products', 'recommended'],
    queryFn: getRecommendedProducts
  })
  const { data: accessoryProducts = [] } = useQuery<ShopifyProduct[]>({
    queryKey: ['products', 'accessory'],
    queryFn: getAccessoryProducts
  })

  if (!cart || cart.totalQuantity === 0) {
    return null
  }

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount)
  const cartLineProductIds = new Set(
    cart.lines.map(line => line.merchandise.product.id)
  )

  if (subtotal < FREE_SHIPPING_THRESHOLD) {
    const remainingAmount = FREE_SHIPPING_THRESHOLD - subtotal
    const allPotential = [...accessoryProducts, ...recommendedProducts]
    const availableSuggestions = [
      ...new Map(allPotential.map(p => [p.id, p])).values()
    ].filter(p => !cartLineProductIds.has(p.id))

    const sorted = [...availableSuggestions].sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
      const aIsBridge = priceA >= remainingAmount
      const bIsBridge = priceB >= remainingAmount
      if (aIsBridge && !bIsBridge) return -1
      if (!aIsBridge && bIsBridge) return 1
      if (aIsBridge && bIsBridge) return priceA - priceB
      return priceB - priceA
    })

    const suggestions = sorted.slice(0, 1)
    if (suggestions.length === 0) return null

    const showDiscountHint = accessoryProducts.some(p => p.id === sorted[0]?.id)

    return (
      <div className='border-t border-neutral-800 p-6'>
        <div className='text-center'>
          <p>
            Du er kun{' '}
            <span className='font-bold text-white'>
              {formatNOK(remainingAmount)}
            </span>{' '}
            unna fri frakt!
          </p>
          <Progress
            value={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
            className='mt-2 h-2'
          />
        </div>
        <div className='mt-4 space-y-4'>
          {suggestions.map(product => (
            <UpsellItem
              key={product.id}
              product={product}
              showDiscountHint={showDiscountHint}
            />
          ))}
        </div>
      </div>
    )
  }

  const accessoriesToShow = accessoryProducts.filter(
    p => !cartLineProductIds.has(p.id)
  )

  const suggestions =
    accessoriesToShow.length > 0 ?
      accessoriesToShow
    : recommendedProducts.filter(p => !cartLineProductIds.has(p.id)).slice(0, 2)

  if (suggestions.length === 0) {
    return (
      <div className='border-t border-neutral-800 p-6'>
        <FreeShippingConfirmation />
      </div>
    )
  }

  const showDiscountHint = accessoriesToShow.length > 0
  const title =
    accessoriesToShow.length > 0 ?
      'Fullfør din Utekos'
    : 'Andre livsnytere har også sett på'

  return (
    <div className='border-t border-neutral-800 p-6'>
      <FreeShippingConfirmation />
      <div className='mt-6'>
        <h3 className='text-sm font-semibold text-center'>{title}</h3>
        <div className='mt-4 space-y-4'>
          {suggestions.map(product => (
            <UpsellItem
              key={product.id}
              product={product}
              showDiscountHint={showDiscountHint}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
