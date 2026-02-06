'use client'

import { useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
import { useCartMutations } from '@/hooks/useCartMutations'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import type { UseAddToCartActionProps } from '@types'

export function useAddToCartAction({
  product,
  selectedVariant,
  additionalLine
}: UseAddToCartActionProps) {
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

    startTransition(async () => {
      try {
        const cartId = contextCartId || (await getCartIdFromCookie())

        if (cartId) {
          await updateCartCache({
            cartId,
            product,
            variant: selectedVariant,
            quantity
          })
          cartStore.send({ type: 'OPEN' })
        }

        const lines = [{ variantId: selectedVariant.id, quantity }]

        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        await addLines(lines)

        if (cartId && additionalLine) {
          try {
            const updatedCart = await applyDiscount(cartId, 'GRATISBUFF')
            if (updatedCart) {
              queryClient.setQueryData(['cart', cartId], updatedCart)
            }
          } catch (discountError) {
            console.warn(
              'Kunne ikke aktivere gratis buff-rabatt:',
              discountError
            )
          }
        }

        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }

        await handlePostAddToCartCampaigns({
          cartId,
          additionalLine,
          queryClient
        })

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

        if (!cartId) {
          cartStore.send({ type: 'OPEN' })
        }
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
