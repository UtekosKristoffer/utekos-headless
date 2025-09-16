// Path: types/media.types.ts

export type ShopifyMediaImage = {
  id: string
  image: Image
}

export type ShopifyImageEdge = {
  node: ShopifyMediaImage
}
export type ShopifyImageConnection = {
  edges: ShopifyImageEdge[]
}

export type ShopifyMediaConnection = {
  edges: ShopifyImageEdge[]
}

export type Image = {
  url: string
  altText: string
  width: number
  height: number
}
