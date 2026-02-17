// Path: src/modules/products/types/ShopifyProductVariant.ts
import type { ShopifyProduct } from '@/modules/products/types/ShopifyProduct'
import type {
  MetaobjectReference,
  Metafield
} from '@/modules/products/types/MetaObject'
import type { VariantProfileReference } from '@/modules/products/types'

import type { Image, Money, SelectedOption } from '@types'
export type ShopifyProductVariant = {
  id: string
  title: string
  barcode: string | null
  availableForSale: boolean
  currentlyNotInStock: boolean
  selectedOptions: SelectedOption[]
  price: Money
  image: Image | null
  compareAtPrice: Money | null
  product: ShopifyProduct
  metafield: Metafield | null
  sku: string | undefined
  variantProfile: VariantProfileReference | null
  variantProfileData?: Partial<MetaobjectReference>
  weight: number | null
  weightUnit: string
  quantityAvailable: number | null
}
