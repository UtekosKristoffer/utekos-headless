import type { ShopifyProduct } from '@types'
import { useEffect, useMemo, useState } from 'react'
import { getInitialAvailableOptionsWithHint } from 'src/components/ProductCard/getInitialAvailableOptionsWithHint'

const ALTERNATING_PRODUCTS = ['utekos-dun', 'utekos-mikrofiber']
export function useColorAlternation(
  product: ShopifyProduct,
  preferredColor?: string | undefined
) {
  const initialOptions = useMemo(
    () => getInitialAvailableOptionsWithHint(product, preferredColor),
    [product, preferredColor]
  )

  const [selectedOptions, setSelectedOptions] = useState(initialOptions)

  useEffect(() => {
    if (preferredColor && ALTERNATING_PRODUCTS.includes(product.handle)) {
      const newOptions = getInitialAvailableOptionsWithHint(
        product,
        preferredColor
      )
      setSelectedOptions(newOptions)
    }
  }, [product, preferredColor])

  return { selectedOptions, setSelectedOptions }
}
