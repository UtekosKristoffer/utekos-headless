export const META_CUSTOM_LABEL_KEYS = [
  'custom_label_0',
  'custom_label_1',
  'custom_label_2',
  'custom_label_3',
  'custom_label_4'
] as const

export type MetaCatalogCustomLabelKey =
  (typeof META_CUSTOM_LABEL_KEYS)[number]

export type MetaCatalogCustomLabels = Partial<
  Record<MetaCatalogCustomLabelKey, string>
>

export type MetaCatalogAccessTokenSource =
  | 'META_SYSTEM_USER_TOKEN'
  | 'CATALOG_ACCESS_TOKEN'
  | 'META_ACCESS_TOKEN'

export type MetaCatalogShippingWeightUnit = 'g' | 'kg' | 'lb' | 'oz'

export type MetaCatalogMetafieldValue = {
  value: string
}

export type MetaCatalogVariant = {
  id: string
  title: string
  price: string
  compareAtPrice: string | null
  inventoryQuantity: number | null
  image: {
    url: string
  } | null
  selectedOptions: Array<{
    name: string
    value: string
  }>
  weight: number | null
  weightUnit: MetaCatalogShippingWeightUnit
  customLabel0: MetaCatalogMetafieldValue | null
  customLabel1: MetaCatalogMetafieldValue | null
  customLabel2: MetaCatalogMetafieldValue | null
  customLabel3: MetaCatalogMetafieldValue | null
  customLabel4: MetaCatalogMetafieldValue | null
}

export type MetaCatalogProduct = {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  vendor: string | null
  status: string
  featuredImage: {
    url: string
  } | null
  variants: {
    edges: Array<{
      node: MetaCatalogVariant
    }>
  }
}

export type MetaCatalogSyncSummary = {
  productsScanned: number
  productsExcluded: number
  inactiveProductsSkipped: number
  productsMissingGroupId: number
  variantsScanned: number
  variantsExcluded: number
  variantsMissingIdentifiers: number
  variantsQueued: number
  missingLabels: Record<MetaCatalogCustomLabelKey, number>
}

export type MetaCatalogSyncErrorDetails = {
  message: string
  code?: number | string
  type?: string
  fbtraceId?: string
  raw?: unknown
}

export type MetaCatalogSyncResult = {
  success: boolean
  catalogId: string
  tokenSource?: MetaCatalogAccessTokenSource
  summary: MetaCatalogSyncSummary
  batchResponse?: unknown
  error?: MetaCatalogSyncErrorDetails
}

