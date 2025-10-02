'use client'

import { useState } from 'react'
import type { Route } from 'next'
import type { ShopifyProduct, ShopifyProductVariant } from '@types'
import { getInitialOptionsForProduct } from '@/components/ProductCard/getInitialOptionsForProduct'
import { computeVariantImages } from '@/lib/utils/computeVariantImages'
import { formatPrice } from '@/lib/utils/formatPrice'

export function useProductData(product: ShopifyProduct) {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    getInitialOptionsForProduct(product)
  )

  const selectedVariant = (() => {
    if (!product.variants.edges?.length || !selectedOptions) return null
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
    return null
  })()

  const finalVariant =
    selectedVariant ?? product.selectedOrFirstAvailableVariant
  const fallbackPrice = product.priceRange.minVariantPrice
  const fallbackImage = product.featuredImage

  const variantImages = computeVariantImages(product, finalVariant)
  const price = formatPrice(finalVariant?.price ?? fallbackPrice)
  const productUrl = `/produkter/${product.handle}` as Route
  const imageUrl =
    finalVariant?.image?.url ?? fallbackImage?.url ?? '/placeholder.svg'
  const altText =
    finalVariant?.image?.altText ?? fallbackImage?.altText ?? product.title
  const isAvailable = finalVariant?.availableForSale ?? false

  const colorHexMap = new Map<string, string>()
  if (product?.variants?.edges) {
    for (const edge of product.variants.edges) {
      const variant = edge.node
      const colorOption = variant.selectedOptions.find(
        opt => opt.name.toLowerCase() === 'farge'
      )
      const field = variant.variantProfileData?.swatchHexcolorForVariant
      if (
        colorOption?.value
        && field
        && typeof field === 'object'
        && !Array.isArray(field)
        && field.value
      ) {
        if (!colorHexMap.has(colorOption.value)) {
          colorHexMap.set(colorOption.value, field.value)
        }
      }
    }
  }

  return {
    variantImages,
    price,
    productUrl,
    imageUrl,
    altText,
    isAvailable,
    selectedVariant: finalVariant,
    allVariants: product.variants.edges.map(
      e => e.node
    ) as ShopifyProductVariant[],
    productOptions: product.options,
    productTitle: product.title,
    productHandle: product.handle,
    productDescription: product.description,
    colorHexMap,
    selectedOptions,
    updateVariant: setSelectedOptions
  }
}
