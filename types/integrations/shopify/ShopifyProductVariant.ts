// Path: src/integrations/shopify/ShopifyProductVariant.ts
import type {
  Image,
  Money,
  Metafield,
  MetaobjectReference,
  VariantProfileReference,
  ShopifyProduct,
  SelectedOption
} from '@types'
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
