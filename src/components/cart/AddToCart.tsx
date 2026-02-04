'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { ModalSubmitButton } from './ModalSubmitButton'
import { QuantitySelector } from './QuantitySelector'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import { useAddToCartAction } from '@/hooks/useAddToCartAction'
import { CartMutationContext } from '@/lib/context/CartMutationContext'
import type { AddToCartFormValues, AddToCartProps } from '@types'

export function AddToCart({
  product,
  selectedVariant,
  additionalLine
}: AddToCartProps) {
  const { performAddToCart, isPending } = useAddToCartAction({
    product,
    selectedVariant,
    additionalLine
  })

  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )

  const lastError = CartMutationContext.useSelector(
    state => state.context.error
  )

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  useEffect(() => {
    if (lastError) {
      console.error('Feil fra handlekurv-maskin:', lastError)
    }
  }, [lastError])

  const onSubmit = (values: AddToCartFormValues) => {
    performAddToCart(values.quantity)
  }

  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
