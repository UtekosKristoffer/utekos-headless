// Path: src/components/cart/DiscountedAddToCartButton.tsx
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
  ShopifyProductVariant
} from '@types'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from './AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from './QuantitySelector'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useQueryClient } from '@tanstack/react-query'
import { useAnalytics } from '@/hooks/useAnalytics'

export function DiscountedAddToCartButton({
  product,
  selectedVariant,
  discountCode
}: {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  discountCode?: string
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
        await createMutationPromise(
          {
            type: 'ADD_LINES',
            input: [{ variantId: values.variantId, quantity: values.quantity }]
          },
          cartActor
        )

        if (discountCode) {
          try {
            const cartId = contextCartId || (await getCartIdFromCookie())
            if (cartId) {
              const updatedCart = await applyDiscount(cartId, discountCode)
              if (updatedCart) {
                queryClient.setQueryData(['cart', cartId], updatedCart)
                toast.success(`Rabattkode "${discountCode}" lagt til!`)
              }
            }
          } catch (e: any) {
            console.error('Feil ved påføring av rabatt:', e)
            toast.error(e.message || 'Kunne ikke legge til rabattkoden.')
          }
        }

        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
        const mainVariantId =
          cleanShopifyId(selectedVariant.id) || selectedVariant.id.toString()
        const eventID = `atc_${mainVariantId}_${Date.now()}`

        trackEvent(
          'AddToCart',
          {
            content_name: product.title,
            content_ids: [mainVariantId],
            content_type: 'product',
            contents: [
              {
                id: mainVariantId,
                quantity: values.quantity,
                item_price: basePrice
              }
            ],
            value: basePrice * values.quantity,
            currency: currency,
            num_items: values.quantity
          },
          { eventID }
        )

        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: currency,
              value: basePrice * values.quantity,
              items: [
                {
                  item_id: mainVariantId,
                  item_name: product.title,
                  item_variant: selectedVariant.title,
                  price: basePrice,
                  quantity: values.quantity
                }
              ]
            }
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
