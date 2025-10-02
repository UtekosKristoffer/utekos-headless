// Path: types/product.types.ts
import type {
  Image,
  Metafield,
  MetaobjectReference,
  Money,
  ShopifyImageConnection
} from '.'

export interface ProductDescriptionProps {
  descriptionHtml: string | undefined | null // This is actually a JSON string
}

export interface ProductCarouselProps {
  products: ShopifyProduct[]
}

export interface RelatedProductsProps {
  products: ShopifyProduct[]
}

export interface ProductCardProps {
  product: ShopifyProduct
  preferredColor?: string
  colorHexMap: Map<string, string>
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  updatedAt: string
  compareAtPriceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  availableForSale: boolean
  images: ShopifyImageConnection
  options: ProductOption[]
  description: string
  featuredImage: Image | null
  vendor: string
  tags: string[]
  relatedProducts: ShopifyProduct[]
  metafield?: Metafield | null
  variantProfile?: MetaobjectReference | null
  seo: {
    title: string | null
    description: string | null
  }
  selectedOrFirstAvailableVariant: ShopifyProductVariant
  variants: ProductVariantConnection
}
export type ShopifySelectedOption = {
  name: string
  value: string
}

export type ProductOption = {
  name: string
  optionValues: {
    name: string
  }[]
}

type SelectedOption = {
  name: string
  value: string
}
export type VariantProfileReference = {
  reference: MetaobjectReference | null
}

export type ProductVariantEdge = {
  node: ShopifyProductVariant
}

export type ProductVariantConnection = {
  edges: ProductVariantEdge[]
}

export type ShopifyProductVariant = {
  id: string
  title: string
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
}
