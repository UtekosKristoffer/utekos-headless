// Path: src/types/media.ts

export type Image = {
  id: string
  url: string
  altText: string | null // altText kan være null
}

export type ShopifyMediaImage = {
  id: string
  image: ShopifyImage
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyMediaEdge = {
  node: ShopifyMediaImage
}

export type ShopifyMediaConnection = {
  edges: ShopifyMediaEdge[]
}
