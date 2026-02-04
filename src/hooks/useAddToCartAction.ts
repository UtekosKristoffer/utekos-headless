import { useState, useTransition, useContext } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
// Context & State
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { cartStore } from '@/lib/state/cartStore'
// Infrastructure
import { useCartMutations } from '@/hooks/useCartMutations'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { useOptimisticCartUpdate } from '@/hooks/useOptimisticCartUpdate'
// Services
import { handlePostAddToCartCampaigns } from '@/lib/campaigns/cart/handlePostAddToCartCampaigns'
import { trackAddToCart } from '@/lib/tracking/client/trackAddToCart'
import { useAnalytics } from '@/hooks/useAnalytics'
// Types
import type { ShopifyProduct, ShopifyProductVariant } from '@types'

interface UseAddToCartActionProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number } | undefined
}

export function useAddToCartAction({
  product,
  selectedVariant,
  additionalLine
}: UseAddToCartActionProps) {
  const [isTransitioning, startTransition] = useTransition()
  const { addLines } = useCartMutations()
  const { updateCartCache } = useOptimisticCartUpdate() // <-- NY
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

        // 1. OPTIMISTIC UPDATE: Oppdater UI umiddelbart
        if (cartId) {
          await updateCartCache({
            cartId,
            product,
            variant: selectedVariant,
            quantity
          })
          // Hvis du har additionalLine (Buff), bør den også legges til optimistisk her
          // ved å kalle updateCartCache en gang til eller utvide funksjonen.
        }

        // 2. Prepare Data
        const lines = [{ variantId: selectedVariant.id, quantity }]
        if (additionalLine) {
          lines.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }

        // 3. Execute Mutation (Server)
        await addLines(lines)

        // 4. Invalidate (Sikre at vi har fersk data fra server til slutt)
        if (cartId) {
          queryClient.invalidateQueries({ queryKey: ['cart', cartId] })
        }

        // 5. Apply Campaigns (Business Logic)
        await handlePostAddToCartCampaigns({
          cartId,
          additionalLine,
          queryClient
        })

        // 6. Tracking
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

        // 7. UI Feedback (Allerede håndtert av OptimisticCartOpen, men dette sikrer state sync)
        cartStore.send({ type: 'OPEN' })
      } catch (mutationError) {
        console.error('Feil under legg-i-kurv operasjon:', mutationError)
        toast.error('Kunne ikke legge varen(e) i handlekurven. Prøv igjen.')
        // Ved feil vil React Query automatisk refetche ved neste invalidation,
        // så cachen retter seg selv opp.
      }
    })
  }

  return {
    performAddToCart,
    isPending: isTransitioning || isPendingFromMachine
  }
}
