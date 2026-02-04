import { useQueryClient } from '@tanstack/react-query'
import { createOptimisticLineItem } from '@/lib/helpers/cart/createOptimisticLineItem'
import type {
  Cart,
  ShopifyProduct,
  ShopifyProductVariant,
  CartLine
} from '@types'

interface OptimisticUpdateParams {
  cartId: string
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
}

export function useOptimisticCartUpdate() {
  const queryClient = useQueryClient()

  const updateCartCache = async ({
    cartId,
    product,
    variant,
    quantity
  }: OptimisticUpdateParams) => {
    await queryClient.cancelQueries({ queryKey: ['cart', cartId] })
    const previousCart = queryClient.getQueryData<Cart>(['cart', cartId])

    if (previousCart) {
      const newLine = createOptimisticLineItem(product, variant, quantity)

      const existingLineIndex = previousCart.lines.findIndex(
        line => line.merchandise.id === newLine.merchandise.id
      )

      let newLines = [...previousCart.lines]

      if (existingLineIndex >= 0) {
        const existingLine = newLines[existingLineIndex]
        if (existingLine) {
          const newQuantity = existingLine.quantity + quantity

          const unitPrice = parseFloat(variant.price.amount)
          const newTotalAmount = (unitPrice * newQuantity).toString()
          newLines[existingLineIndex] = {
            ...existingLine,
            quantity: newQuantity,
            cost: {
              ...existingLine.cost,
              totalAmount: {
                ...existingLine.cost.totalAmount,
                amount: newTotalAmount
              }
            }
          }
        }
      } else {
        newLines.push(newLine)
      }

      queryClient.setQueryData<Cart>(['cart', cartId], {
        ...previousCart,
        lines: newLines,
        totalQuantity: previousCart.totalQuantity + quantity
      })
    }

    return { previousCart }
  }

  return { updateCartCache }
}
