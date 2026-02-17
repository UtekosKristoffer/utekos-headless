// Path: src/hooks/useAddToCartForm.ts

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createAddToCartFormConfig } from '@/lib/helpers/cart/createAddToCartFormConfig'
import type { AddToCartFormValues, ShopifyProductVariant } from '@types'

export function useAddToCartForm(
  selectedVariant: ShopifyProductVariant | null
) {
  const form = useForm<AddToCartFormValues>(
    createAddToCartFormConfig(selectedVariant)
  )

  useEffect(() => {
    form.setValue('variantId', selectedVariant?.id ?? '')
  }, [selectedVariant?.id, form])

  return form
}
