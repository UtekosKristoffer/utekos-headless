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
  MetaUserData,
  MetaEventPayload,
  MetaContentItem
} from '@types'
import { Activity, useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from '../AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from '../QuantitySelector'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { getMarketingParams } from '@/components/analytics/Klaviyo/getMarketingParams'
import { useQueryClient } from '@tanstack/react-query' // Ny import

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
  const queryClient = useQueryClient() // Ny hook

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

        // Steg 2: Påfør rabatt og oppdater cache manuelt
        if (additionalLine) {
          try {
            const cartId = contextCartId || (await getCartIdFromCookie())
            if (cartId) {
              const updatedCart = await applyDiscount(cartId, 'GRATISBUFF')
              // VIKTIG: Oppdater React Query cachen med den nye handlekurven (rabattert)
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
        const eventID = `atc_${cleanShopifyId(selectedVariant.id)}_${Date.now()}`
        const mainVariantId =
          cleanShopifyId(selectedVariant.id) || selectedVariant.id.toString()

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

        if (typeof window !== 'undefined' && window.klaviyo) {
          const marketingParams = getMarketingParams()

          const klaviyoPayload = {
            $value: value,
            AddedItemProductName: product.title,
            AddedItemProductID: mainVariantId,
            AddedItemSKU: selectedVariant.sku,
            AddedItemImageURL: selectedVariant.image?.url || '',
            AddedItemURL: window.location.href,
            AddedItemPrice: basePrice,
            AddedItemQuantity: values.quantity,
            ItemNames: [
              product.title,
              ...(additionalLine ? ['Utekos Buff™'] : [])
            ],
            Items: [
              {
                ProductID: mainVariantId,
                SKU: selectedVariant.sku,
                ProductName: product.title,
                Quantity: values.quantity,
                ItemPrice: basePrice,
                RowTotal: value,
                ProductURL: window.location.href,
                ImageURL: selectedVariant.image?.url || '',
                ProductCategories: product.tags // Hvis tilgjengelig
              }
            ],
            Metadata: {
              Brand: product.vendor,
              Price: basePrice,
              CompareAtPrice: selectedVariant.compareAtPrice,
              Source: marketingParams.source,
              Medium: marketingParams.medium,
              CampaignID: marketingParams.campaign_id
            }
          }

          if (additionalLine) {
            const buffId =
              cleanShopifyId(additionalLine.variantId)
              || additionalLine.variantId
            klaviyoPayload.Items.push({
              ProductID: buffId,
              SKU: 'BUFF', // Eller riktig SKU
              ProductName: 'Utekos Buff™',
              Quantity: additionalLine.quantity,
              ItemPrice: 0,
              RowTotal: 0,
              ProductURL: window.location.href,
              ImageURL: '', // URL til buff-bilde hvis du har
              ProductCategories: ['Tilbehør']
            })
          }

          window.klaviyo.track('Added to Cart', klaviyoPayload)
        }
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq(
            'track',
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
        }

        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        const userData: MetaUserData = {
          client_user_agent: ua,
          fbp: getCookie('_fbp') || undefined,
          fbc: getCookie('_fbc') || undefined,
          external_id: getCookie('ute_ext_id') || undefined,
          email_hash: getCookie('ute_user_hash') || undefined
        }

        const capiPayload: MetaEventPayload = {
          eventName: 'AddToCart',
          eventId: eventID,
          eventSourceUrl:
            typeof window !== 'undefined' ? window.location.href : '',
          eventTime: Math.floor(Date.now() / 1000),
          actionSource: 'website',
          userData,
          eventData: {
            value,
            currency,
            content_name: contentName,
            contents,
            content_type: 'product',
            content_ids: contentIds,
            num_items: totalQty
          }
        }
        sendJSON('/api/meta-events', capiPayload)

        // GA4
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
      {/* Fjernet onClick herfra for å unngå feil sporing */}
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
