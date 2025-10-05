import { useMemo } from 'react'
import type { ShopifyProduct } from '@types'

export function useSwatchColorMap(product: ShopifyProduct | undefined) {
  return useMemo(() => {
    const map = new Map<string, string>()

    if (!product?.variants?.edges) return map

    for (const edge of product.variants.edges) {
      const variant = edge.node
      const colorOption = variant.selectedOptions.find(
        option => option.name.toLowerCase() === 'farge'
      )

      const metaColorData = variant.variantProfileData?.swatchHexcolorForVariant

      if (
        colorOption?.value
        && metaColorData
        && typeof metaColorData === 'object'
        && !Array.isArray(metaColorData)
        && metaColorData.value
      ) {
        map.set(colorOption.value, metaColorData.value as string)
      }
    }

    return map
  }, [product])
}
