'use client'

import { Form } from '@/components/ui/form'
import { CartIdContext } from '@/lib/context/CartIdContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { getCartIdFromCookie } from '@/lib/helpers/cart/getCartIdFromCookie'
import { cartStore } from '@/lib/state/cartStore'
import { applyDiscount } from '@/api/lib/cart/applyDiscount'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ModalSubmitButton } from '../AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from '../QuantitySelector'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useQueryClient } from '@tanstack/react-query'
import { useAnalytics } from '@/hooks/useAnalytics'
import { logAttribution } from '@/lib/tracking/log/logAttribution'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import {
  CartMutationContext,
  type CartMutationMachine
} from '@/lib/context/CartMutationContext'
import type {
  AddToCartFormValues,
  CartMutationEvent,
  ShopifyProduct,
  ShopifyProductVariant,
  MetaContentItem,
  MetaEventPayload,
  MetaUserData
} from '@types'

import type { ActorRef, StateFrom } from 'xstate'

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
          { eventID }
        )
        logAttribution(contentName, value)

        if (typeof window !== 'undefined' && window.snaptr) {
          window.snaptr('track', 'ADD_CART', {
            item_ids: contentIds,
            price: value,
            currency: currency,
            number_items: totalQty,
            description: contentName,
            item_category: product.productType || 'Apparel'
          })
        }

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

        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq(
            'track',
            'AddToCart',
            {
              content_name: contentName,
              content_ids: contentIds,
              content_type: 'product',
              value: value,
              currency: currency,
              contents: contents,
              num_items: totalQty
            },
            { eventID }
          )
        }

        if (typeof window !== 'undefined' && window.ttq) {
          window.ttq.track(
            'AddToCart',
            {
              content_type: 'product',
              content_id: mainVariantId,
              content_name: contentName,
              value: value,
              currency: currency,
              quantity: totalQty
            },
            { event_id: eventID }
          )
        }

        if (typeof window !== 'undefined' && window.pintrk) {
          const pinItems = [
            {
              product_name: product.title,
              product_id: mainVariantId,
              product_category: product.productType || 'Apparel',
              product_price: basePrice,
              product_quantity: values.quantity
            }
          ]

          if (additionalLine) {
            const buffId =
              cleanShopifyId(additionalLine.variantId)
              || additionalLine.variantId
            pinItems.push({
              product_name: 'Utekos Buff™',
              product_id: buffId,
              product_category: 'Apparel',
              product_price: 0,
              product_quantity: additionalLine.quantity
            })
          }

          window.pintrk?.('track', 'AddToCart', {
            value: value,
            order_quantity: totalQty,
            currency: currency,
            line_items: pinItems
          })
        }

        const fbp = getCookie('_fbp')
        const fbc = getCookie('_fbc')
        const extId = getCookie('ute_ext_id')
        const emailHash = getCookie('ute_user_hash')
        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined

        const userData: MetaUserData = {
          fbp: fbp || undefined,
          fbc: fbc || undefined,
          external_id: extId || undefined,
          email_hash: emailHash || undefined,
          client_user_agent: ua
        }

        const capiPayload: MetaEventPayload = {
          eventName: 'AddToCart',
          eventId: eventID,
          eventSourceUrl:
            typeof window !== 'undefined' ?
              window.location.href
            : 'https://utekos.no',
          eventTime: Math.floor(Date.now() / 1000),
          actionSource: 'website',
          userData,
          eventData: {
            value,
            currency,
            content_name: contentName,
            content_ids: contentIds,
            content_type: 'product',
            contents: contents,
            num_items: totalQty
          }
        }

        fetch('/api/tracking-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload),
          keepalive: true
        }).catch(err => console.error('CAPI AddToCart failed', err))

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
