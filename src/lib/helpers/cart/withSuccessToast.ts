import { toast } from 'sonner'
import type { AddToCartFormValues, ShopifyProductVariant } from '@types'

export const withSuccessToast =
  (
    submitHandler: (_values: AddToCartFormValues) => void,
    selectedVariant: ShopifyProductVariant | null
  ) =>
  (values: AddToCartFormValues) => {
    submitHandler(values)
    if (selectedVariant) {
      toast.success(
        `${values.quantity} x ${selectedVariant.title} lagt i handlekurven din!`
      )
    }
  }
