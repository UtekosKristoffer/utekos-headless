import { useQueryClient } from '@tanstack/react-query'
import { createOptimisticLineItem } from '@/lib/helpers/cart/createOptimisticLineItem'
import type { Cart, ShopifyProduct, ShopifyProductVariant } from '@types'

interface OptimisticUpdateParams {
  cartId: string
  product: ShopifyProduct
  variant: ShopifyProductVariant
  quantity: number
  customPrice?: number //
}

export function useOptimisticCartUpdate() {
  const queryClient = useQueryClient()

  const updateCartCache = async ({
    cartId,
    product,
    variant,
    quantity,
    customPrice
  }: OptimisticUpdateParams) => {
    await queryClient.cancelQueries({ queryKey: ['cart', cartId] })
    const previousCart = queryClient.getQueryData<Cart>(['cart', cartId])

    if (previousCart) {
      // Opprett linjen med eventuell customPrice (0,-)
      const newLine = createOptimisticLineItem(
        product,
        variant,
        quantity,
        customPrice
      )

      const existingLineIndex = previousCart.lines.findIndex(
        line => line.merchandise.id === newLine.merchandise.id
      )

      // Bruk en kopi av linjene for immutability
      const newLines = [...previousCart.lines]

      if (existingLineIndex >= 0) {
        const existingLine = newLines[existingLineIndex]
        if (existingLine) {
          const newQuantity = existingLine.quantity + quantity
          const currentTotalAmount = parseFloat(
            existingLine.cost.totalAmount.amount
          )

          // Hvis customPrice er satt (0), legg til 0. Hvis ikke, bruk variantens pris.
          const unitPriceToAdd =
            customPrice !== undefined ? customPrice : (
              parseFloat(variant.price.amount)
            )

          const addedCost = unitPriceToAdd * quantity
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
        }
      } else {
        newLines.push(newLine)
      }

      // Oppdater totalantallet i kurven
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
