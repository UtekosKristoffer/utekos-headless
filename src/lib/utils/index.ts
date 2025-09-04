//Path: src/lib/utils/index.ts

/**
 * @file src/lib/utils/index.ts
 * @module utils
 * @description Utility functions for various tasks
 * @function menuReducer
 * @function className
 * @function safeJsonParse
 * @function formatPrice
 * @function computeVariantImages
 * @function syncVariantFromUrl
 * @function flattenVariants
 * @function selectVariantByOptions
 * @function variantReducer
 * @function voidAsync
 * @see {@link https://example.com/docs/utils|Documentation}
 */

export { default as className } from '@/lib/utils/className'
export { className as cn } from '@/lib/utils/className'
export { menuReducer } from '@/lib/utils/menuReducer'
export { safeJsonParse } from '@/lib/utils/safeJsonParse'
export { formatPrice } from '@/lib/utils/formatPrice'
export { computeVariantImages } from '@/lib/utils/computeVariantImages'
export { syncVariantFromUrl } from '@/lib/utils/syncVariantFromUrl'
export { flattenVariants } from '@/lib/utils/flattenVariants'
export { selectVariantByOptions } from '@/lib/utils/selectVariantByOptions'
export { variantReducer } from '@/lib/utils/variantReducer'
export { voidAsync } from '@/lib/utils/voidAsync'
export type { VariantState, VariantEvent } from '@/lib/utils/variantReducer'
