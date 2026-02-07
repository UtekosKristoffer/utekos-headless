import { useQueryClient } from '@tanstack/react-query'
import { createOptimisticLineItem } from '@/lib/helpers/cart/createOptimisticLineItem'
import type { Cart, ShopifyProduct, ShopifyProductVariant } from '@types'

export interface OptimisticItemInput {
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
  customPrice?: number
}

interface OptimisticUpdateParams {
  cartId: string
  items: OptimisticItemInput[]
}

export function useOptimisticCartUpdate() {
  const queryClient = useQueryClient()

  const updateCartCache = async ({ cartId, items }: OptimisticUpdateParams) => {
    // Avbryt pågående queries for å unngå race conditions
    await queryClient.cancelQueries({ queryKey: ['cart', cartId] })

    queryClient.setQueryData<Cart>(['cart', cartId], oldCart => {
      // Hvis ingen cart finnes i cache, har vi ingenting å oppdatere
      if (!oldCart) return oldCart

      // Lag en kopi av linjene (shallow copy av arrayet er nok her, vi bytter ut objektene)
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
          // Hent linjen sikkert
          const existingLine = newLines[existingLineIndex]

          // FIX: Guard clause som tilfredsstiller TypeScript strict null checks
          // Dette løser "'existingLine' is possibly 'undefined'" og følgefeilen med 'id'
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

          // Oppdater linjen ved å erstatte den i arrayet
          newLines[existingLineIndex] = {
            ...existingLine, // Nå er existingLine garantert 'CartLine', så 'id' blir med
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
          // Ny linje
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
