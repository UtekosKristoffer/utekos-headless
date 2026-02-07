'use client'

import { useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import {
  useOptimisticCartUpdate,
  type OptimisticItemInput
} from '@/hooks/useOptimisticCartUpdate'
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import type {
  UseAddToCartActionProps,
  ShopifyProduct,
  ShopifyProductVariant
} from '@types'

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
  const { trackEvent } = useAnalytics()
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
              customPrice: 0 // <--- Tvinger visuell pris til 0,-
            })
          }

          await updateCartCache({
            cartId,
            items: itemsToUpdate
          })
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

        // 4. SAFETY NET
        if (cartId) {
          // Sjekk rabatt eksplisitt for sikkerhets skyld
          if (additionalLine) {
            await handlePostAddToCartCampaigns({
              cartId,
              additionalLine,
              queryClient
            })
          }

          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }

        await trackAddToCart({
          product,
          selectedVariant,
          quantity,
          additionalLine
        })

        trackEvent('AddToCart', {
          content_name: product.title,
          value: Number(selectedVariant.price.amount),
          currency: selectedVariant.price.currencyCode
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
