// Path: types/product.types.ts
import type {
  Image,
  Metafield,
  MetaobjectReference,
  Money,
  ShopifyImageConnection,
  ShopifyResponse
} from '.'

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
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
  metafield?: Metafield | null
  variantProfile?: MetaobjectReference | null
  seo: {
    title: string | null
    description: string | null
  }
  selectedOrFirstAvailableVariant: ShopifyProductVariant
  variants: ProductVariantConnection
}

export type ShopifyOption = {
  name: string
  values: string[]
}

export type ShopifyCollection = {
  id: string
  title: string
  handle: string
  description: string
  products: ShopifyProductConnection
}

export type ShopifySelectedOption = {
  name: string
  value: string
}
export type ShopifyProductConnection = {
  edges: Array<{
    node: ShopifyProduct
  }>
  pageInfo?: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor?: string
    endCursor?: string
  }
}
export type ProductOption = {
  name: string
  optionValues: {
    name: string
  }[]
}

export type ProductVariantInput = {
  id: string
  title: string
  image: Image | null
  selectedOptions: {
    name: string
    value: string
  }[]
  price: Money
  compareAtPrice: Money | null
  metafield?: MetaobjectReference
}

export type ProductQueryResponse = {
  product: ShopifyProduct
}

export type ProductsQueryResponse = ShopifyResponse<ShopifyProduct[]>

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

export type SelectedOrFirstAvailableVariant = {
  id: string
  title: string
  product: ShopifyProductVariant
  price: Money
  selectedOptions: ShopifySelectedOption[]
  compareAtPrice: Money | null
  availableForSale: boolean
  metafield?: MetaobjectReference | null
}

export type ProductVariantConnection = {
  edges: ProductVariantEdge[]
}

export type Product = ShopifyProduct

export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  currentlyNotInStock: boolean
  selectedOptions: SelectedOption[]
  price: Money
  compareAtPrice: Money | null
  product: ShopifyProduct
  metafield: Metafield | null
  sku: string | undefined
  variantProfile: VariantProfileReference | null
  variantProfileData?: Partial<MetaobjectReference>
}

export type ProductsData = {
  products: {
    edges: Array<{
      node: ShopifyProduct
    }>
  }
}
