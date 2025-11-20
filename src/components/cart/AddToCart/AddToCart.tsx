// Path: src/components/cart/AddToCart.tsx
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
  CustomData,
  UserData
} from '@types'
import { Activity } from 'react'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from '../AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from '../QuantitySelector'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'

export function AddToCart({
  product,
  selectedVariant,
  additionalLine,
  destination_url
}: {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number }
  destination_url: string
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
    if (!selectedVariant) {
      toast.error('Vennligst velg en variant før du legger i handlekurven.')
      return
    }

    startTransition(async () => {
      try {
        await createMutationPromise(
          {
            type: 'ADD_LINES',
            input: { variantId: values.variantId, quantity: values.quantity }
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
            const cartId = contextCartId || (await getCartIdFromCookie())
            if (cartId) {
              await applyDiscount(cartId, 'GRATISBUFF')
            } else {
              console.warn('Kunne ikke hente cartId for å legge til rabatt.')
            }
          } catch (discountError) {
            if (
              !(
                discountError instanceof Error
                && discountError.message.includes('already applied')
              )
            ) {
              console.error('Kunne ikke legge til rabattkode:', discountError)
            }
          }
        }

        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
        let totalQty = values.quantity

        const contents: CustomData['contents'] = [
          {
            id: selectedVariant.id.toString(),
            quantity: values.quantity,
            item_price: basePrice
          }
        ]
        const contentIds: string[] = [selectedVariant.id.toString()]
        let contentName = product.title

        if (additionalLine) {
          contents.push({
            id: additionalLine.variantId.toString(),
            quantity: additionalLine.quantity
          })
          contentIds.push(additionalLine.variantId.toString())
          totalQty += additionalLine.quantity
          contentName += ' + Utekos Buff™'
        }

        const value = basePrice * values.quantity

        const eventID = `atc_${selectedVariant.id}_${Date.now()}`

        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          const fbqParams = {
            contents,
            content_type: 'product' as const,
            value,
            currency,
            content_ids: contentIds,
            content_name: contentName,
            num_items: totalQty
          }

          window.fbq('track', 'AddToCart', fbqParams, { eventID })

          if (process.env.NODE_ENV === 'development') {
            console.group('🛒 [Meta Pixel] AddToCart Fired')
            console.log('Event ID:', eventID)
            console.log('Params:', fbqParams)
            console.groupEnd()
          }
        }

        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        const fbp = getCookie('_fbp')
        const fbc = getCookie('_fbc')
        const externalId = getCookie('ute_ext_id')

        const capiPayload: {
          eventName: string
          eventId: string
          eventSourceUrl: string
          eventData?: CustomData
          userData?: UserData
        } = {
          eventName: 'AddToCart',
          eventId: eventID,
          eventSourceUrl:
            typeof window !== 'undefined' ? window.location.href : '',
          eventData: {
            value,
            content_name: contentName,
            contents,
            content_type: 'product',
            content_ids: contentIds,
            num_items: totalQty
          },
          userData: {}
        }

        if (ua) capiPayload.userData!.client_user_agent = ua
        if (fbp) capiPayload.userData!.fbp = fbp
        if (fbc) capiPayload.userData!.fbc = fbc
        if (externalId) capiPayload.userData!.external_id = externalId

        if (process.env.NODE_ENV === 'development') {
          console.group('🚀 [Meta CAPI] Sending AddToCart')
          console.log('Payload:', capiPayload)
          console.log('Identity Package:', { fbp, fbc, externalId, ua })
          console.groupEnd()
        }

        sendJSON('/api/meta-events', capiPayload)

        if (
          typeof window !== 'undefined'
          && typeof window.dataLayer !== 'undefined'
        ) {
          const ga4Items = [
            {
              item_id: selectedVariant.id.toString(),
              item_name: product.title,
              item_variant: selectedVariant.title,
              price: basePrice,
              quantity: values.quantity
            }
          ]

          if (additionalLine) {
            ga4Items.push({
              item_id: additionalLine.variantId.toString(),
              item_name: product.title,
              item_variant: 'Utekos Buff™',
              price: 0,
              quantity: additionalLine.quantity
            })
          }

          const ga4Data = {
            event: 'add_to_cart',
            ecommerce: {
              currency: currency,
              value: value,
              items: ga4Items
            }
          }

          window.dataLayer.push(ga4Data)

          if (process.env.NODE_ENV === 'development') {
            console.group('📊 [GA4] AddToCart Pushed')
            console.log('DataLayer Push:', ga4Data)
            console.groupEnd()
          }
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
        <Activity>
          <ModalSubmitButton
            isPending={isPending}
            isDisabled={!selectedVariant || !isAvailable || isPending}
            availableForSale={isAvailable}
          />
        </Activity>
      </form>
    </Form>
  )
}
