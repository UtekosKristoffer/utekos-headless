// Path: src/components/cart/AddToCart.tsx
'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form } from '@/components/ui/form' // Vi tar denne tilbake!
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import { createAddToCartSubmitHandler } from '@/lib/helpers/cart/cartForm'
import { cartStore } from '@/lib/state/cartStore'
import { AddToCartButton } from './AddToCartButton'

import type { AddToCartFormValues, ShopifyProductVariant } from '@types'

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

  const form = useForm<AddToCartFormValues>({
    defaultValues: {
      variantId: selectedVariant?.id || '',
      quantity: 1
    }
  })

  const handleAddToCart = (values: AddToCartFormValues) => {
    console.log('SUCCESS: handleAddToCart (onSubmit) blir nå kalt!', { values })

    createAddToCartSubmitHandler(cartActor)(values)

    if (selectedVariant) {
      toast.success(`${selectedVariant.title} ble lagt i handleposen din.`)
    }

    cartStore.send({ type: 'OPEN' })
  }

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  useEffect(() => {
    if (lastError) {
      toast.error(lastError)
    }
  }, [lastError])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddToCart)} // Bruker nå RHF sin handleSubmit
        className='space-y-4'
      >
        <AddToCartButton isPending={isPending} isDisabled={!selectedVariant} />
      </form>
    </Form>
  )
}
