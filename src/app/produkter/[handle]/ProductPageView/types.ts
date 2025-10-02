import type { Image, ShopifyProduct, ShopifyProductVariant } from '@types'

export type ProductPageViewProps = {
  productData: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  allVariants: ShopifyProductVariant[]
  variantImages: Image[]
  relatedProducts: ShopifyProduct[]
  colorHexMap: Map<string, string>
  onOptionChange: (_optionName: string, _value: string) => void
}
