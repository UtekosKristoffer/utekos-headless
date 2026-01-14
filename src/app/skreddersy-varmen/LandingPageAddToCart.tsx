'use client'

import { Form } from '@/components/ui/form'
import { CartIdContext } from '@/lib/context/CartIdContext'
import {
  CartMutationContext,
  type CartMutationMachine
} from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { cartStore } from '@/lib/state/cartStore'
import type {
  AddToCartFormValues,
  CartMutationEvent,
  ShopifyProduct,
  ShopifyProductVariant,
  MetaUserData,
  MetaContentItem
} from '@types'
import { useContext, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ActorRef, StateFrom } from 'xstate'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/className'

export function LandingPageAddToCart({
  product,
  selectedVariant,
  className
}: {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  className?: string
}) {
  const [isTransitioning, startTransition] = useTransition()
  const cartActor = CartMutationContext.useActorRef()
  const queryClient = useQueryClient()

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
      toast.error('Vennligst velg en størrelse/farge.')
      return
    }

    startTransition(async () => {
      try {
        const linesToProcess = [
          { variantId: values.variantId, quantity: values.quantity }
        ]

        await createMutationPromise(
          { type: 'ADD_LINES', input: linesToProcess },
          cartActor
        )

        // Tracking Logic (Meta, GA4) - Kopiert fra din fil
        const basePrice = Number.parseFloat(selectedVariant.price.amount)
        const currency = selectedVariant.price.currencyCode
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
        const contentName = product.title
        const value = basePrice * values.quantity

        // Meta Pixel
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
              num_items: values.quantity
            },
            { eventID }
          )
        }

        // CAPI
        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        const userData: MetaUserData = {
          client_user_agent: ua,
          fbp: getCookie('_fbp') || undefined,
          fbc: getCookie('_fbc') || undefined,
          external_id: getCookie('ute_ext_id') || undefined,
          email_hash: getCookie('ute_user_hash') || undefined
        }
        sendJSON('/api/meta-events', {
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
            num_items: values.quantity
          }
        })

        // GA4
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: currency,
              value: value,
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
        console.error('Feil under legg-i-kurv:', mutationError)
        toast.error('Kunne ikke legge varen i handlekurven.')
      }
    })
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  const isAvailable = selectedVariant?.availableForSale ?? false
  const isPending = isTransitioning || isPendingFromMachine

  // --- HER ER ENDRINGEN: Custom UI i stedet for standard UI ---
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddToCart)} className={className}>
        {/* Vi skjuler antall-velgeren for å holde det rent på landingssiden. Default er 1. */}
        <input type='hidden' {...form.register('quantity')} value={1} />
        <input type='hidden' {...form.register('variantId')} />

        <button
          type='submit'
          disabled={!selectedVariant || !isAvailable || isPending}
          className={cn(
            'w-full bg-[#E07A5F] hover:bg-[#d0694e] text-white text-xl font-medium py-6 rounded-sm shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed',
            isPending && 'brightness-90 cursor-wait'
          )}
        >
          {isPending ?
            <>
              <Loader2 className='animate-spin' /> Legger i handlekurv...
            </>
          : !isAvailable ?
            'Utsolgt for øyeblikket'
          : 'Legg i handlekurv – Sendes i dag'}
        </button>
      </form>
    </Form>
  )
}
