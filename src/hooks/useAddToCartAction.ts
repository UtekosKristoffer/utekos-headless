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

    // 1. Umiddelbar visuell respons
    cartStore.send({ type: 'OPEN' })

    startTransition(async () => {
      try {
        let cartId = contextCartId || (await getCartIdFromCookie())

        // 2. OPTIMISTISK BATCH UPDATE (0ms)
        if (cartId) {
          const itemsToUpdate: OptimisticItemInput[] = []

          // a) Hovedprodukt
          itemsToUpdate.push({
            product,
            variant: selectedVariant,
            quantity
          })

          // b) Gratis Buff (med pris 0)
          if (additionalLine && additionalProductData) {
            itemsToUpdate.push({
              product: additionalProductData.product,
              variant: additionalProductData.variant,
              quantity: additionalLine.quantity,
              customPrice: 0 // Tvinger visuell pris til 0,-
            })
          }

          await updateCartCache({
            cartId,
            items: itemsToUpdate
          })
        }

        // 3. SERVER KALL
        const lines = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        const mutationPayload =
          additionalLine ? { lines, discountCode: 'GRATISBUFF' } : lines

        // Vi venter på at maskinen skal gjøre seg ferdig.
        // Maskinen oppdaterer cachen automatisk via sin onDone-handler.
        await addLines(mutationPayload)

        // Håndter ny cartId for inkognito-brukere
        if (!cartId) {
          cartId = await getCartIdFromCookie()
        }

        // 4. SYNKRONISERING & SAFETY NET
        if (cartId) {
          // Invalider cachen for å være 100% sikker på at vi har ferske data
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })

          // Sjekk om rabatten ble registrert (Silent Check)
          await handlePostAddToCartCampaigns({
            cartId,
            additionalLine,
            queryClient
          })
        }

        // 5. Tracking
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
