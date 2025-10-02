// Path: src/components/cart/AddToCart.tsx
'use client'

import { Form } from '@/components/ui/form'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import {
  createAddToCartFormConfig,
  createAddToCartSubmitHandler,
  withSuccessToast
} from '@/lib/helpers/cart/cartForm'
import { cartStore } from '@/lib/state/cartStore'
import type { AddToCartFormValues, ShopifyProductVariant } from '@types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AddToCartButton } from './AddToCartButton'

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
  const submitWithToast = withSuccessToast(baseSubmitHandler, selectedVariant)

  const handleAddToCart = (values: AddToCartFormValues) => {
    submitWithToast(values)
    cartStore.send({ type: 'OPEN' })
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  useEffect(() => {
    if (lastError) {
    }
  }, [lastError])

  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddToCart)} className='space-y-4'>
        <AddToCartButton
          isPending={isPending}
          isDisabled={!selectedVariant || !isAvailable}
          availableForSale={isAvailable}
        />
      </form>
    </Form>
  )
}
