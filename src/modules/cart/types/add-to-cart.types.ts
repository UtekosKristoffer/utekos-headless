// Path: types/add-to-cart.types.ts
import { AddToCartSchema } from '@/db/zod/schemas/AddToCartSchema'
import type {
  MetaContentItem,
  ShopifyCart,
  ShopifyOperation,
  ShopifyProduct,
  ShopifyProductVariant,
  CartLineInput
} from '@types'
import type { LucideIcon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import type { SizeOptionKey } from '../../../app/kampanje/comfyrobe/utils/sizeSelectorData'
export type AddLinesPayload =
  | CartLineInput[]
  | { lines: CartLineInput[]; discountCode?: string }

export type AddToCartEventData = {
  contentIds: string[]
  contentName: string
  contents: MetaContentItem[]
  currency: string
  eventID: string
  mainVariantId: string
  totalQty: number
  value: number
}

export type AddToCartFormValues = z.infer<typeof AddToCartSchema>

export type AddToCartProps = {
  additionalLine?: { variantId: string; quantity: number } | undefined
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
}

export type AddToCartViewProps = {
  form: UseFormReturn<AddToCartFormValues>
  isAvailable: boolean
  isPending: boolean
  onSubmit: (values: AddToCartFormValues) => void
}

export type CheckoutPanelProps = {
  isUpsellSelected: boolean
  mainProduct: ProductOffer
  productImageSrc: string
  selectedSize: 'S' | 'M' | 'L'
  upsellProduct: ProductOffer
}

export type DispatchPixelsOptions = {
  eventData: AddToCartEventData
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export type ExtendedAddToCartProps = AddToCartProps & {
  additionalProductData?: {
    product: ShopifyProduct
    variant: ShopifyProductVariant
  }
}

export type OfferGalleryProps = {
  mainImageSrc: string
  name: string
}

export type OfferProductProps = {
  product: ProductOffer
}

export type OfferSectionProps = {
  productImageSrc: string
  selectedSize: SizeOptionKey
}

export type ProductOffer = {
  features: string[]
  id: string
  name: string
  originalPrice?: number
  price: number
}

export type ShopifyAddToCartOperation = ShopifyOperation<
  { cartLinesAdd: { cart: ShopifyCart } },
  {
    cartId: string
    lines: { merchandiseId: string; quantity: number }[]
  }
>

export type SizeInfoPanelProps = {
  profile: SizeProfile
}

export type SizeProfile = {
  benefits: {
    desc: string
    title: string
  }[]
  fullName: string
  heightRange: string
  icon: LucideIcon
  id: SizeOptionKey
  idealFor: string[]
  imageSrc?: string
  label: string
  tagline: string
  visualScale: number
}

export type TrackAddToCartOptions = {
  additionalLine?: { variantId: string; quantity: number } | undefined
  product: ShopifyProduct
  quantity: number
  selectedVariant: ShopifyProductVariant
}

export type UseAddToCartActionProps = {
  additionalLine?: { variantId: string; quantity: number } | undefined
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant | null
}
