'use client'

import { Form } from '@/components/ui/form'
import { CartIdContext } from '@/lib/context/CartIdContext'
import {
  CartMutationContext,
  type CartMutationMachine
} from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { cartStore } from '@/lib/state/cartStore'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import type {
  AddToCartFormValues,
  CartMutationEvent,
  ShopifyProduct,
  ShopifyProductVariant,
  MetaContentItem
} from '@types'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from '../AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from '../QuantitySelector'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useQueryClient } from '@tanstack/react-query'
import { useAnalytics } from '@/hooks/useAnalytics'

export function AddToCart({
  product,
  selectedVariant,
  additionalLine
}: {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number }
}) {
  const [isTransitioning, startTransition] = useTransition()
  const cartActor = CartMutationContext.useActorRef()
  const queryClient = useQueryClient()
  const { trackEvent } = useAnalytics()

  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )
  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )

  const contextCartId = useContext(CartIdContext)
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )

  const createMutationPromise = (
    event: CartMutationEvent,
    actor: ActorRef<StateFrom<CartMutationMachine>, CartMutationEvent>
  ): Promise<StateFrom<CartMutationMachine>> => {
    return new Promise(resolve => {
      let isInitialEmission = true
      const subscription = actor.subscribe(snapshot => {
        if (isInitialEmission) {
          isInitialEmission = false
          return
        }
        if (snapshot.matches('idle')) {
          subscription.unsubscribe()
          resolve(snapshot)
        }
      })
      actor.send(event)
    })
  }

  const handleAddToCart = async (values: AddToCartFormValues) => {
    if (!selectedVariant) {
      toast.error('Vennligst velg en variant før du legger i handlekurven.')
      return
    }

    startTransition(async () => {
      try {
        const linesToProcess = [
          { variantId: values.variantId, quantity: values.quantity }
        ]
        if (additionalLine) {
          linesToProcess.push({
            variantId: additionalLine.variantId,
            quantity: additionalLine.quantity
          })
        }
        await createMutationPromise(
          { type: 'ADD_LINES', input: linesToProcess },
          cartActor
        )

        if (additionalLine) {
          try {
            const cartId = contextCartId || (await getCartIdFromCookie())
            if (cartId) {
              const updatedCart = await applyDiscount(cartId, 'GRATISBUFF')
              if (updatedCart) {
                queryClient.setQueryData(['cart', cartId], updatedCart)
              }
            }
          } catch (e) {
            console.error('Feil ved påføring av rabatt:', e)
          }
        }

        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
        let totalQty = values.quantity

        const mainVariantId =
          cleanShopifyId(selectedVariant.id) || selectedVariant.id.toString()

        // VIKTIG: Beholder din originale ID-logikk for AddToCart deduplisering
        const eventID = `atc_${cleanShopifyId(selectedVariant.id)}_${Date.now()}`

        const contents: MetaContentItem[] = [
          {
            id: mainVariantId,
            quantity: values.quantity,
            item_price: basePrice
          }
        ]
        const contentIds: string[] = [mainVariantId]
        let contentName = product.title

        if (additionalLine) {
          const buffId =
            cleanShopifyId(additionalLine.variantId) || additionalLine.variantId

          contents.push({
            id: buffId,
            quantity: additionalLine.quantity,
            item_price: 0
          })
          contentIds.push(buffId)
          totalQty += additionalLine.quantity
          contentName += ' + Utekos Buff™'
        }

        const value = basePrice * values.quantity

        // Bruker hooken, men sender med den kritiske eventID-en
        trackEvent(
          'AddToCart',
          {
            content_name: contentName,
            content_ids: contentIds,
            content_type: 'product',
            contents: contents,
            value: value,
            currency: currency,
            num_items: totalQty
          },
          { eventID } // <-- Sender custom ID
        )

        // GA4 (Beholdes manuell)
        if (typeof window !== 'undefined' && window.dataLayer) {
          const ga4Items = [
            {
              item_id: mainVariantId,
              item_name: product.title,
              item_variant: selectedVariant.title,
              price: basePrice,
              quantity: values.quantity
            }
          ]

          if (additionalLine) {
            const buffId =
              cleanShopifyId(additionalLine.variantId)
              || additionalLine.variantId
            ga4Items.push({
              item_id: buffId,
              item_name: product.title,
              item_variant: 'Utekos Buff™',
              price: 0,
              quantity: additionalLine.quantity
            })
          }

          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: { currency: currency, value: value, items: ga4Items }
          })
        }

        cartStore.send({ type: 'OPEN' })
      } catch (mutationError) {
        console.error('Feil under legg-i-kurv operasjon:', mutationError)
        toast.error('Kunne ikke legge varen(e) i handlekurven. Prøv igjen.')
      }
    })
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  useEffect(() => {
    if (lastError) {
      console.error('Feil fra handlekurv-maskin:', lastError)
    }
  }, [lastError])

  const isAvailable = selectedVariant?.availableForSale ?? false
  const isPending = isTransitioning || isPendingFromMachine

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddToCart)}
        className='flex flex-col gap-4'
      >
        <div>
          <label className='mb-2 block text-sm font-medium'>Antall</label>
          <QuantitySelector />
        </div>
        <ModalSubmitButton
          isPending={isPending}
          isDisabled={!selectedVariant || !isAvailable || isPending}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
