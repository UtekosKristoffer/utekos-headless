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
    startTransition(async () => {
      try {
        await createMutationPromise(
          {
            type: 'ADD_LINES',
            input: {
              variantId: values.variantId,
              quantity: values.quantity
            }
          },
          cartActor
        )

        if (additionalLine) {
          await createMutationPromise(
            {
              type: 'ADD_LINES',
              input: {
                variantId: additionalLine.variantId,
                quantity: additionalLine.quantity
              }
            },
            cartActor
          )

          try {
            let cartId = contextCartId
            if (!cartId) {
              cartId = await getCartIdFromCookie()
            }
            if (cartId) {
              await applyDiscount(cartId, 'GRATISBUFF')
            } else {
              console.warn('Kunne ikke hente cartId for å legge til rabatt.')
            }
          } catch (error) {
            if (
              !(
                error instanceof Error
                && error.message.includes('already applied')
              )
            ) {
              console.error('Kunne ikke legge til rabattkode:', error)
            }
          }
        }

        const successMessage =
          additionalLine ?
            `${product.title} + gratis Utekos Buff™ er lagt i handlekurven!`
          : `${product.title} er lagt i handlekurven!`
        toast.success(successMessage)

        if (typeof window.fbq === 'function' && selectedVariant) {
          const fbqData: any = {
            content_ids: [selectedVariant.id],
            content_name: product.title,
            content_type: 'product',
            currency: selectedVariant.price.currencyCode,
            value: parseFloat(selectedVariant.price.amount),
            num_items: values.quantity
          }
          if (additionalLine) {
            fbqData.content_ids.push(additionalLine.variantId)
            fbqData.content_name += ' + Utekos Buff™'
            fbqData.num_items += additionalLine.quantity
          }
          window.fbq('track', 'AddToCart', fbqData)
        }

        if (
          typeof window !== 'undefined'
          && window.dataLayer
          && selectedVariant
        ) {
          const items = [
            {
              item_id: selectedVariant.id,
              item_name: product.title,
              price: parseFloat(selectedVariant.price.amount),
              quantity: values.quantity
            }
          ]
          if (additionalLine) {
            items.push({
              item_id: additionalLine.variantId,
              item_name: 'Utekos Buff™',
              price: 0,
              quantity: additionalLine.quantity
            })
          }
          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: selectedVariant.price.currencyCode,
              value: parseFloat(selectedVariant.price.amount) * values.quantity,
              items
            }
          })
        }

        cartStore.send({ type: 'OPEN' })
      } catch (error) {
        console.error('En kritisk feil skjedde i handlekurv-sekvensen:', error)
        toast.error('En feil oppstod ved å legge til i handlekurven.')
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
