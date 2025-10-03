import type { Route } from 'next'
import type React from 'react'
import type { ShopifyProduct, RootNode } from '@types'

export type Section = {
  id: string
  title: string
  content: React.ReactNode
}

export interface ProductDescriptionProps {
  descriptionHtml: string | undefined | null // This is actually a JSON string
}

export interface ProductCarouselProps {
  products: ShopifyProduct[]
}

export interface SizeLabelProps {
  className?: string
}

export interface ProductCardProps {
  product: ShopifyProduct
  preferredColor?: string
  colorHexMap: Map<string, string>
}
export interface RichTextRendererProps {
  content: RootNode | null
}

export interface ProductVariantSelectorProps {
  options: ShopifyProduct['options']
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
  colorHexMap: Map<string, string>
}

export interface ProductCardFooterProps {
  price: string
  productUrl: Route
  isAvailable: boolean
  isPending: boolean
  onQuickBuy: (e: React.MouseEvent) => void
}

export interface ProductCardHeaderProps {
  title: string
  options: ShopifyProduct['options']
  colorHexMap: Map<string, string>
  selectedOptions: Record<string, string>
  onOptionChange: React.Dispatch<React.SetStateAction<Record<string, string>>>
  productUrl: Route
}

export interface ProductCardProps {
  product: ShopifyProduct
  preferredColor?: string
  colorHexMap: Map<string, string>
}
