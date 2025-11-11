import type { Route } from 'next'
import type React from 'react'
import type {
  ShopifyProduct,
  ShopifyProductVariant,
  RootNode,
  Image,
  MetaobjectReference
} from '@types'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
export type OptionButtonProps = {
  isSelected: boolean
  onClick: () => void
  children: ReactNode
}

export interface AdditionalLine {
  variantId: string
  quantity: number
}

export interface TechDownLaunchOfferProps {
  onAdditionalLineChange: (line: AdditionalLine | undefined) => void
}

export interface PriceActivityPanelProps {
  productHandle: string
  priceAmount: string
  currencyCode: string
  limitedStockCount?: number
  activityNode?: React.ReactNode
}

export type ProductPageAccordionProps = {
  variantProfile: Partial<MetaobjectReference> | null | undefined
}

export type ProductControllerProps = {
  productData: ShopifyProduct
  relatedProducts: ShopifyProduct[]
}

export interface AccordionSectionData {
  id: string
  title: string
  content?: string
  Icon: LucideIcon
  color: string
}

export type ProductGalleryProps = {
  title: string
  images: Image[]
}
export interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
}

export type SizeSelectorProps = {
  optionName: string
  values: string[]
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant
  onSelect: (_optionName: string, _value: string) => void
  productHandle: string // <-- LEGG TIL DENNE LINJEN
}
export type Dimension = {
  value: number
  unit: string
} | null

export type ColorSelectorProps = {
  optionName: string
  values: string[]
  variants: ShopifyProductVariant[]
  colorHexMap: Map<string, string>
  selectedVariant: ShopifyProductVariant
  onSelect: (optionName: string, value: string) => void
}

export interface SmartRealTimeActivityProps {
  baseViewers: number
}
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

export interface SpecialOfferCrossSellProps {
  currentProductHandle: string
}

export type GridCrossProps = {
  className?: string
}
