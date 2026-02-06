import type {
  MetaContentItem,
  ShopifyProduct,
  ShopifyProductVariant,
  AddToCartFormValues
} from '@types'
import type { UseFormReturn } from 'react-hook-form'
import type { SizeOptionKey } from '../src/app/kampanje/comfyrobe/utils/sizeSelectorData'
import type { LucideIcon } from 'lucide-react'

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

export interface CheckoutPanelProps {
  mainProduct: ProductOffer
  upsellProduct: ProductOffer
  isUpsellSelected: boolean
  selectedSize: 'S' | 'L'
  productImageSrc: string
}

export interface ProductOffer {
  id: string
  name: string
  price: number
  originalPrice?: number
  features: string[]
}

export interface OfferProductProps {
  product: ProductOffer
}

export interface OfferSectionProps {
  productImageSrc: string
  selectedSize: SizeOptionKey
}

export interface SizeProfile {
  id: SizeOptionKey
  fullName: string
  label: string
  tagline: string
  heightRange: string
  idealFor: string[]
  icon: LucideIcon
  imageSrc?: string
  visualScale: number
  benefits: {
    title: string
    desc: string
  }[]
}

