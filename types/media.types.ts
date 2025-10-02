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

export type Image = {
  id: string
  url: string
  altText: string
  width: number
  height: number
}
