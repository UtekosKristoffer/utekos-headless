import type {
  MetaContentItem,
  ShopifyProduct,
  ShopifyProductVariant,
  AddToCartFormValues
} from '@types'
import type { UseFormReturn } from 'react-hook-form'

export interface PrepareAddToCartInput {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  quantity: number
  additionalLine?: { variantId: string; quantity: number } | undefined
}

export interface AddToCartEventData {
  eventID: string
  contentName: string
  contentIds: string[]
  contents: MetaContentItem[]
  value: number
  currency: string
  totalQty: number
  mainVariantId: string
}

export interface DispatchPixelsOptions {
  eventData: AddToCartEventData
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export interface TrackAddToCartOptions {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  quantity: number
  additionalLine?: { variantId: string; quantity: number } | undefined
}

export interface UseAddToCartActionProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number } | undefined
}

export interface AddToCartProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
  additionalLine?: { variantId: string; quantity: number } | undefined
}

export interface AddToCartViewProps {
  form: UseFormReturn<AddToCartFormValues>
  onSubmit: (values: AddToCartFormValues) => void
  isPending: boolean
  isAvailable: boolean
}
