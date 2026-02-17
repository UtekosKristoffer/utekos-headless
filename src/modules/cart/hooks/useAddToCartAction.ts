// Path: src/hooks/useAddToCartAction.ts
'use client'

import { useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/modules/cart/context/CartMutationContext'
import { CartIdContext } from '@/modules/cart/context/CartIdContext'
import { cartStore } from '@/modules/cart/state/cartStore'
import { useCartMutations } from '@/modules/cart/hooks/useCartMutations'
import { getCartIdFromCookie } from '@/modules/cart/actions/getCartIdFromCookie'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import type {
  UseAddToCartActionProps,
  ShopifyProduct,
  ShopifyProductVariant,
  Cart
} from '@types'
import type { OptimisticItemInput } from 'types/commerce/optimistic'

interface ExtendedAddToCartProps extends UseAddToCartActionProps {
  additionalProductData?:
    | {
        product: ShopifyProduct
        variant: ShopifyProductVariant
      }
    | undefined
}

export function useAddToCartAction({
  product,
  selectedVariant,
  additionalLine,
  additionalProductData
}: ExtendedAddToCartProps) {
  const [isTransitioning, startTransition] = useTransition()
  const { addLines } = useCartMutations()
  const { updateCartCache } = useOptimisticCartUpdate()
  const queryClient = useQueryClient()
  const contextCartId = useContext(CartIdContext)

  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )

  const performAddToCart = async (quantity: number) => {
    if (!selectedVariant) {
      toast.error('Vennligst velg en variant før du legger i handlekurven.')
      return
    }

    cartStore.send({ type: 'OPEN' })

    startTransition(async () => {
      try {
        let cartId = contextCartId || (await getCartIdFromCookie())

        if (cartId) {
          const itemsToUpdate: OptimisticItemInput[] = []
          itemsToUpdate.push({
            product,
            variant: selectedVariant,
            quantity
          })

          if (additionalLine && additionalProductData) {
            itemsToUpdate.push({
              product: additionalProductData.product,
              variant: additionalProductData.variant,
              quantity: additionalLine.quantity,
              customPrice: 0
            })
          }
          await updateCartCache({ cartId, items: itemsToUpdate })
        }

        const lines = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        const mutationPayload =
          additionalLine ? { lines, discountCode: 'GRATISBUFF' } : lines

        await addLines(mutationPayload)

        if (!cartId) {
          cartId = await getCartIdFromCookie()
        }

        if (cartId && additionalLine) {
          const freshCart = queryClient.getQueryData<Cart>(['cart', cartId])

          if (freshCart) {
            let needsFix = false
            const fixedLines = freshCart.lines.map(line => {
              if (line.merchandise.id === additionalLine.variantId) {
                if (parseFloat(line.cost.totalAmount.amount) > 0) {
                  needsFix = true
                  return {
                    ...line,
                    cost: {
                      ...line.cost,
                      totalAmount: { ...line.cost.totalAmount, amount: '0.0' }
                    }
                  }
                }
              }
              return line
            })

            if (needsFix) {
              queryClient.setQueryData(['cart', cartId], {
                ...freshCart,
                lines: fixedLines
              })
            }
          }

          handlePostAddToCartCampaigns({
            cartId,
            additionalLine,
            queryClient
          }).catch(console.error)
        }

        await trackAddToCart({
          product,
          selectedVariant,
          quantity,
          additionalLine
        })
      } catch (mutationError) {
        console.error('Feil under legg-i-kurv operasjon:', mutationError)
        toast.error('Kunne ikke legge varen(e) i handlekurven. Prøv igjen.')

        const cartId = contextCartId || (await getCartIdFromCookie())
        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }
      }
    })
  }

  return {
    performAddToCart,
    isPending: isTransitioning || isPendingFromMachine
  }
}
