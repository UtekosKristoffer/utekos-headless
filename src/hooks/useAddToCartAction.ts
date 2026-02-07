// Path: src/hooks/useAddToCartAction.ts
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

    // Umiddelbar respons: Åpne handlekurven med en gang
    cartStore.send({ type: 'OPEN' })

    startTransition(async () => {
      try {
        const cartId = contextCartId || (await getCartIdFromCookie())

        if (cartId) {
          // Optimistisk oppdatering for hovedproduktet
          await updateCartCache({
            cartId,
            product,
            variant: selectedVariant,
            quantity
          })
        }

        const lines = [{ variantId: selectedVariant.id, quantity }]

        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        // Send med rabattkode direkte i payloaden hvis vi har en additionalLine (Buff)
        // Dette sikrer at rabatten registreres atomisk på serveren.
        const mutationPayload =
          additionalLine ? { lines, discountCode: 'GRATISBUFF' } : lines

        await addLines(mutationPayload)

        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }

        // Merk: applyDiscount er fjernet herfra fordi den nå håndteres
        // direkte i addLines-kallet via server actions.

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
