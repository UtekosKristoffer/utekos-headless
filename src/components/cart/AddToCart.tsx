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
  ShopifyProductVariant
} from '@types'

import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { ModalSubmitButton } from './AddToCartButton/ModalSubmitButton'
import { QuantitySelector } from './QuantitySelector'
import type { AddToCartInput } from '@types'
/** Les en cookie trygt lokalt (unngår nye imports). */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/** Fire-and-forget JSON (sendBeacon når mulig, ellers fetch keepalive). */
function sendJSON(url: string, data: unknown): void {
  try {
    const payload = JSON.stringify(data)
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const ok = navigator.sendBeacon(
        url,
        new Blob([payload], { type: 'application/json' })
      )
      if (ok) return
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true
    })
  } catch {
    // stille fail – må aldrig blokkere add-to-cart
  }
}

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
        // 1) Legg til hovedlinje
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

        // 2) Legg til gratis buffer + rabattkode (som før)
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

        // 3) Brukerfeedback (som før)
        const successMessage =
          additionalLine ?
            `${product.title} + gratis Utekos Buff™ er lagt i handlekurven!`
          : `${product.title} er lagt i handlekurven!`
        toast.success(successMessage)

        // === 4) TRACKING (Pixel + CAPI) – full typesikkerhet og uten 'any' ===

        if (selectedVariant) {
          // Beregn verdier én gang
          const basePrice = Number.parseFloat(selectedVariant.price.amount)
          const currency = selectedVariant.price.currencyCode
          let totalQty = values.quantity
          const contents: {
            id: string
            quantity?: number
            item_price?: number
          }[] = [
            {
              id: selectedVariant.id,
              quantity: values.quantity,
              item_price: basePrice
            }
          ]
          const contentIds: string[] = [selectedVariant.id]
          let contentName = product.title

          if (additionalLine) {
            contents.push({
              id: additionalLine.variantId,
              quantity: additionalLine.quantity
              // pris 0 – du gir den gratis; item_price lar vi stå tom for denne
            })
            contentIds.push(additionalLine.variantId)
            totalQty += additionalLine.quantity
            contentName += ' + Utekos Buff™'
          }

          const value = basePrice * values.quantity // NB: gratislinjen påvirker ikke value

          // (4a) Pixel AddToCart med eventID for ev. dedupe
          const eventID = `atc_${selectedVariant.id}_${Date.now()}`
          if (
            typeof window !== 'undefined'
            && typeof window.fbq === 'function'
          ) {
            const fbqParams: {
              contents: { id: string; quantity?: number; item_price?: number }[]
              content_type: 'product'
              value?: number
              currency?: string
              content_ids?: string[]
              content_name?: string
              num_items?: number
            } = {
              contents,
              content_type: 'product',
              value,
              currency,
              content_ids: contentIds,
              content_name: contentName,
              num_items: totalQty
            }
            window.fbq('track', 'AddToCart', fbqParams, { eventID })
          }

          // (4b) CAPI AddToCart (server) – fire-and-forget
          const fbp = getCookie('_fbp')
          const fbc = getCookie('_fbc')
          const ua =
            typeof navigator !== 'undefined' ? navigator.userAgent : undefined

          const capiPayload: AddToCartInput = {
            value,
            currency,
            contents,
            content_type: 'product',
            content_ids: contentIds,
            eventId: eventID, // muliggjør dedupe mot Pixel
            ...(typeof location !== 'undefined' && {
              sourceUrl: location.href
            }),
            userData: {}
          }
          if (fbp) capiPayload.userData.fbp = fbp
          if (fbc) capiPayload.userData.fbc = fbc
          if (ua) capiPayload.userData.client_user_agent = ua

          sendJSON('/api/meta/capi/add-to-cart', capiPayload)
        }

        // === 5) GA datalayer (som før) ===
        if (
          typeof window !== 'undefined'
          && (window as unknown as { dataLayer?: unknown[] }).dataLayer
          && selectedVariant
        ) {
          const items = [
            {
              item_id: selectedVariant.id,
              item_name: product.title,
              price: Number.parseFloat(selectedVariant.price.amount),
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
          ;(window as unknown as { dataLayer: unknown[] }).dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: selectedVariant.price.currencyCode,
              value:
                Number.parseFloat(selectedVariant.price.amount)
                * values.quantity,
              items
            }
          })
        }

        // 6) Åpne cart-drawer (som før)
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
