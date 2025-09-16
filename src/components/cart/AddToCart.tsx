// Path: src/components/cart/AddToCart.tsx
'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/ui/Form'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import {
  createAddToCartFormConfig,
  createAddToCartSubmitHandler,
  withSuccessToast
} from '@/lib/helpers/cart/cartForm'
import type { AddToCartFormValues } from '@/types/cart'
import type { ShopifyProductVariant } from '@/types/products'

import { AddToCartButton } from './AddToCartButton'

/**
 * The primary "smart" component for the Add to Cart form.
 *
 * This component acts as the orchestrator for the "add to cart" feature. Its
 * main responsibility is to wire together the global state machine (via XState
 * context), the form state (via `react-hook-form`), and the reusable form
 * logic from our helper files. It handles side-effects and delegates the
 * actual field rendering to the `AddToCartFormFields` presentational component.
 *
 * @param {object} props - The component's props.
 * @param {ProductVariant | null} props.selectedVariant - The currently selected product variant, which is necessary to populate the hidden variantId field.
 * @returns {JSX.Element} The complete, interactive Add to Cart form.
 */
export function AddToCart({
  selectedVariant
}: {
  selectedVariant: ShopifyProductVariant | null
}) {
  const cartActor = CartMutationContext.useActorRef()
  const isPending = CartMutationContext.useSelector(state =>
    state.matches('mutating')
  )
  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )

  const baseSubmitHandler = createAddToCartSubmitHandler(cartActor)
  const onSubmit = withSuccessToast(baseSubmitHandler, selectedVariant)

  // Effect to sync the selected variant prop with the form's hidden input
  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '', {
      shouldValidate: true
    })
  }, [selectedVariant?.id, form]) // Spesifiser eksakte verdier i stedet for hele objekter

  // Effect to display server errors from the XState machine context
  useEffect(() => {
    if (lastError) {
      toast.error(lastError)
    }
  }, [lastError])

  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)} className='space-y-4'>
        <AddToCartButton isPending={isPending} isDisabled={!selectedVariant} />
      </form>
    </Form>
  )
}
