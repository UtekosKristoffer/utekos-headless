// Path: src/components/cart/AddToCart.tsx

import { Form } from '@/components/ui/form'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { createAddToCartSubmitHandler } from '@/lib/helpers/cart/createAddToCartSubmitHandler'
import { withSuccessToast } from '@/lib/helpers/cart/withSuccessToast'
import { cartStore } from '@/lib/state/cartStore'
import type {
  AddToCartFormValues,
  ShopifyProduct, // Antar at du har en type for hele produktet
  ShopifyProductVariant
} from '@types'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { AddToCartButton } from './AddToCartButton'

declare global {
  interface Window {
    fbq: (...args: any[]) => void
  }
}

export function AddToCart({
  product, // <--- ENDRING 1: Legg til product prop
  selectedVariant
}: {
  product: ShopifyProduct // <--- ENDRING 1: Definer typen her
  selectedVariant: ShopifyProductVariant | null
}) {
  const [isTransitioning, startTransition] = useTransition()
  const cartActor = CartMutationContext.useActorRef()
  const isPendingFromMachine = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )
  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )
  const baseSubmitHandler = createAddToCartSubmitHandler(cartActor)

  const handleAddToCart = async (values: AddToCartFormValues) => {
    startTransition(async () => {
      try {
        const result = await baseSubmitHandler(values)

        // Send sporing til Meta Pixel
        if (typeof window.fbq === 'function' && selectedVariant) {
          window.fbq('track', 'AddToCart', {
            content_ids: [selectedVariant.id],
            content_name: product.title,
            content_type: 'product',
            currency: selectedVariant.price.currencyCode,
            value: parseFloat(selectedVariant.price.amount),
            num_items: values.quantity
          })
        }
        if (
          typeof window !== 'undefined'
          && window.dataLayer
          && selectedVariant
        ) {
          window.dataLayer.push({
            event: 'add_to_cart', // Dette matcher event-navnet i GTM
            ecommerce: {
              currency: selectedVariant.price.currencyCode,
              value: parseFloat(selectedVariant.price.amount) * values.quantity,
              items: [
                {
                  item_id: selectedVariant.id,
                  item_name: product.title,
                  price: parseFloat(selectedVariant.price.amount),
                  quantity: values.quantity
                }
              ]
            }
          })
        }

        cartStore.send({ type: 'OPEN' })
      } catch (error) {
        console.error('Failed to add to cart:', error)
      }
    })
  }
  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])
  useEffect(() => {
    if (lastError) {
      // Håndter feil fra XState machine her
    }
  }, [lastError])

  const isAvailable = selectedVariant?.availableForSale ?? false
  const isPending = isTransitioning || isPendingFromMachine

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddToCart)} className='space-y-4'>
        <AddToCartButton
          isPending={isPending}
          isDisabled={!selectedVariant || !isAvailable || isPending}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
