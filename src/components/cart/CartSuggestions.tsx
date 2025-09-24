'use client'

import { FREE_SHIPPING_THRESHOLD } from '@/api/constants'
import { Progress } from '@/components/ui/progress'
import { useAccessoryProducts } from '@/lib/context/AccessoryProductsContext'
import { useRecommendedProducts } from '@/lib/context/RecommendedProductsContext'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { Cart } from '@types'
import { useMemo } from 'react'
import { UpsellItem } from './UpsellItem'

export function CartSuggestions({ cart }: { cart: Cart | null | undefined }) {
  const recommendedProducts = useRecommendedProducts()
  const accessoryProducts = useAccessoryProducts()

  const { title, suggestions, showDiscountHint } = useMemo(() => {
    if (!cart || cart.totalQuantity === 0) {
      return { title: null, suggestions: [], showDiscountHint: false }
    }

    const subtotal = parseFloat(cart.cost.subtotalAmount.amount)
    const cartLineProductIds = new Set(
      cart.lines.map(line => line.merchandise.product.id)
    )

    // SCENARIO 2: UNDER FRI FRAKT-GRENSEN
    if (subtotal < FREE_SHIPPING_THRESHOLD) {
      const allPotential = [...recommendedProducts, ...accessoryProducts]
      const available = [
        ...new Map(allPotential.map(p => [p.id, p])).values()
      ].filter(p => !cartLineProductIds.has(p.id))

      const sorted = [...available].sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
        const aIsBridge = priceA >= FREE_SHIPPING_THRESHOLD - subtotal
        const bIsBridge = priceB >= FREE_SHIPPING_THRESHOLD - subtotal
        if (aIsBridge && !bIsBridge) return -1
        if (!aIsBridge && bIsBridge) return 1
        if (aIsBridge && bIsBridge) return priceA - priceB
        return priceB - priceA
      })

      const titleComponent = (
        <div className='text-center'>
          <p>
            Du er kun{' '}
            <span className='font-bold text-white'>
              {formatNOK(FREE_SHIPPING_THRESHOLD - subtotal)}
            </span>{' '}
            unna fri frakt!
          </p>
          <Progress
            value={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
            className='mt-2 h-2'
          />
        </div>
      )

      return {
        title: titleComponent,
        suggestions: sorted.slice(0, 2),
        showDiscountHint: false
      }
    }

    // SCENARIO 3: OVER FRI FRAKT-GRENSEN
    const accessoriesToShow = accessoryProducts.filter(
      p => !cartLineProductIds.has(p.id)
    )

    if (accessoriesToShow.length > 0) {
      return {
        title: (
          <h3 className='text-sm font-semibold text-center'>
            Fullfør din Utekos
          </h3>
        ),
        suggestions: accessoriesToShow,
        showDiscountHint: true // Vi tilbyr rabatt på tilbehør
      }
    }

    // FALLBACK-SCENARIO: Over fri frakt OG alt tilbehør er i kurven
    const generalRecommendations = recommendedProducts.filter(
      p => !cartLineProductIds.has(p.id)
    )

    return {
      title: (
        <h3 className='text-sm font-semibold text-center'>
          Andre har også sett på
        </h3>
      ),
      suggestions: generalRecommendations.slice(0, 2),
      showDiscountHint: false // Vi tilbyr IKKE rabatt på generelle produkter
    }
  }, [cart, recommendedProducts, accessoryProducts])

  if (!suggestions || suggestions.length === 0) {
    return null
  }

  return (
    <div className='border-t border-neutral-800 p-6'>
      {title}
      <div className='mt-4 space-y-4'>
        {suggestions.map(product => (
          <UpsellItem
            key={product.id}
            product={product}
            withDiscountHint={showDiscountHint}
          />
        ))}
      </div>
    </div>
  )
}
