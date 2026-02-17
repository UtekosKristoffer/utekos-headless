// Path: src/components/cart/AddToCart.tsx

'use client'

import { useAddToCartAction } from '@/modules/cart/hooks/useAddToCartAction'
import { useAddToCartForm } from '@/modules/cart/hooks/useAddToCartForm'
import { useCartErrorMonitoring } from '@/modules/cart/hooks/useCartErrorMonitoring'
import { AddToCartView } from './AddToCartView'
import type {
  AddToCartFormValues,
  AddToCartProps,
  ShopifyProduct,
  ShopifyProductVariant
} from '@types'

interface ExtendedAddToCartProps extends AddToCartProps {
  additionalProductData?: {
    product: ShopifyProduct
    variant: ShopifyProductVariant
  }
}

export function AddToCart({
  product,
  selectedVariant,
  additionalLine,
  additionalProductData
}: ExtendedAddToCartProps) {
  const { performAddToCart, isPending } = useAddToCartAction({
    product,
    selectedVariant,
    additionalLine,
    ...(additionalProductData ? { additionalProductData } : {})
  })

  const form = useAddToCartForm(selectedVariant)

  useCartErrorMonitoring()

  const onSubmit = (values: AddToCartFormValues) => {
    performAddToCart(values.quantity)
  }

  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <AddToCartView
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      isAvailable={isAvailable}
    />
  )
}
