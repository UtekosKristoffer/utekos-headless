import { useQueryClient } from '@tanstack/react-query'
import { createOptimisticLineItem } from '@/lib/helpers/cart/createOptimisticLineItem'
import type { Cart, ShopifyProduct, ShopifyProductVariant } from '@types'

// Definerer strukturen for et enkelt item i en batch-oppdatering
export interface OptimisticItemInput {
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
  customPrice?: number
}

interface OptimisticUpdateParams {
  cartId: string
  items: OptimisticItemInput[] // <--- Batch-støtte
}

export function useOptimisticCartUpdate() {
  const queryClient = useQueryClient()

  const updateCartCache = async ({ cartId, items }: OptimisticUpdateParams) => {
    await queryClient.cancelQueries({ queryKey: ['cart', cartId] })

    queryClient.setQueryData<Cart>(['cart', cartId], oldCart => {
      if (!oldCart) return oldCart

      const newLines = [...oldCart.lines]
      let addedQuantity = 0

      for (const item of items) {
        const newLine = createOptimisticLineItem(
          item.product,
          item.variant,
          item.quantity,
          item.customPrice
        )

        const existingLineIndex = newLines.findIndex(
          line => line.merchandise.id === newLine.merchandise.id
        )

        if (existingLineIndex >= 0) {
          const existingLine = newLines[existingLineIndex]

          if (!existingLine) continue

          const newQuantity = existingLine.quantity + item.quantity

          const unitPriceToAdd =
            item.customPrice !== undefined ?
              item.customPrice
            : parseFloat(item.variant.price.amount)

          const currentTotalAmount = parseFloat(
            existingLine.cost.totalAmount.amount
          )

          const addedCost = unitPriceToAdd * item.quantity
          const newTotalAmount = (currentTotalAmount + addedCost).toString()

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
        } else {
          newLines.push(newLine)
        }

        addedQuantity += item.quantity
      }

      return {
        ...oldCart,
        lines: newLines,
        totalQuantity: oldCart.totalQuantity + addedQuantity
      }
    })
  }

  return { updateCartCache }
}
