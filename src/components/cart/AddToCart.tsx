// Path: src/components/cart/AddToCart.tsx
'use client'

import { Form } from '@/components/ui/form'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { createAddToCartSubmitHandler } from '@/lib/helpers/cart/createAddToCartSubmitHandler'
import { withSuccessToast } from '@/lib/helpers/cart/withSuccessToast'
import { cartStore } from '@/lib/state/cartStore'
import type { AddToCartFormValues, ShopifyProductVariant } from '@types'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { AddToCartButton } from './AddToCartButton'

export function AddToCart({
  selectedVariant
}: {
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
  const submitWithToast = withSuccessToast(baseSubmitHandler, selectedVariant)
  const handleAddToCart = (values: AddToCartFormValues) => {
    startTransition(() => {
      submitWithToast(values)
    })
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
