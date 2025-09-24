'use client'

import { FREE_SHIPPING_THRESHOLD } from '@/api/constants'
import { Progress } from '@/components/ui/progress'
import { useAccessoryProducts } from '@/lib/context/AccessoryProductsContext'
import { useRecommendedProducts } from '@/lib/context/RecommendedProductsContext'
import { formatNOK } from '@/lib/utils/formatters/formatNOK'
import type { Cart } from '@types'
import { useMemo } from 'react'
import { FreeShippingConfirmation } from './FreeShippingConfirmation'
import { UpsellItem } from './UpsellItem'

export function SmartCartSuggestions({
  cart
}: {
  cart: Cart | null | undefined
}) {
  // STEG 1: Alle hooks kalles ubetinget på toppen
  const recommendedProducts = useRecommendedProducts()
  const accessoryProducts = useAccessoryProducts()

  const { title, suggestions, showDiscountHint, showConfirmation } =
    useMemo(() => {
      // STEG 2: Sjekken for tom handlekurv flyttes INN i useMemo
      if (!cart || cart.totalQuantity === 0) {
        return {
          title: null,
          suggestions: [],
          showDiscountHint: false,
          showConfirmation: false
        }
      }

      const subtotal = parseFloat(cart.cost.subtotalAmount.amount)
      const cartLineProductIds = new Set(
        cart.lines.map(line => line.merchandise.product.id)
      )

      // SCENARIO 2: UNDER FRI FRAKT-GRENSEN
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

        const titleComponent = (
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
        )

        const bestSuggestionIsAccessory = accessoryProducts.some(
          p => p.id === sorted[0]?.id
        )
        return {
          title: titleComponent,
          suggestions: sorted.slice(0, 1),
          showDiscountHint: bestSuggestionIsAccessory,
          showConfirmation: false
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
          showDiscountHint: true,
          showConfirmation: true
        }
      }

      // FALLBACK-SCENARIO
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
        showDiscountHint: false,
        showConfirmation: true
      }
    }, [cart, recommendedProducts, accessoryProducts])

  // STEG 3: "Early return"-sjekkene skjer ETTER alle hooks er kalt
  if (!suggestions || suggestions.length === 0) {
    const subtotal = parseFloat(cart?.cost.subtotalAmount.amount ?? '0')
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      return (
        <div className='border-t border-neutral-800 p-6'>
          <FreeShippingConfirmation />
        </div>
      )
    }
    return null
  }

  return (
    <div className='border-t border-neutral-800 p-6'>
      {showConfirmation && <FreeShippingConfirmation />}
      <div className={showConfirmation ? 'mt-6' : ''}>
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
    </div>
  )
}
