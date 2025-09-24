import type { ShopifyProduct } from '@types'
import { useMemo } from 'react'

const ALTERNATING_PRODUCTS = ['utekos-dun', 'utekos-mikrofiber']
const COLOR_ROTATION = ['Fjellblå', 'Vargnatt']
export function useAlternatingColors(products: ShopifyProduct[]) {
  return useMemo(() => {
    const colorAssignments = new Map<string, string>()
    let colorIndex = 0

    const alternatingProducts = products.filter(p =>
      ALTERNATING_PRODUCTS.includes(p.handle)
    )

    alternatingProducts.forEach(product => {
      const color = COLOR_ROTATION[colorIndex % COLOR_ROTATION.length]
      if (color) {
        colorAssignments.set(product.handle, color)
      }
      colorIndex++
    })

    return colorAssignments
  }, [products])
}
