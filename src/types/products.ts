// Path: src/types/products.ts
import type {
  Money,
  Image,
  MetaobjectReference,
  ShopifySelectedOption,
  ShopifyImage,
  ShopifyPrice,
  ShopifyMediaConnection
} from '@/types'
/**
 * @module types/products
 * @description This module contains TypeScript types related to products, including product details,
 * variants, and responses from product queries. These types help ensure type safety and consistency
 * when working with product data throughout the application.
 */

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  priceRange: {
    minVariantPrice: ShopifyPrice
  }
  options: ShopifyOption[]
  media: ShopifyMediaConnection
  variants: ShopifyVariantConnection
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
  values: string[]
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
  metafield?: MetaobjectReference
}

export type ProductsQueryResponse = ShopifyProduct
export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: ShopifySelectedOption[]
  price: ShopifyPrice
  image: ShopifyImage | null
  variantProfile: VariantProfileReference | null
  variantProfileData?: { [key: string]: any }
}

export type VariantProfileReference = {
  reference: MetaobjectReference | null
}

export type ShopifyVariantEdge = {
  node: ShopifyProductVariant
}

export type SelectedOrFirstAvailableVariant = {
  id: string
  title: string
  product: ShopifyProductVariant
  price: {
    amount: Money
    currencyCode: string
  }
  selectedOptions: {
    name: string
    value: string
  }
  compareAtPrice: {
    amount: Money
    currencyCode: string
  }
  metafield?: MetaobjectReference | null
}

export type ShopifyVariantConnection = {
  edges: ShopifyVariantEdge[]
}
