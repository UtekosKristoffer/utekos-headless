// Path: src/lib/utils/variantReducer.ts

/**
 * @fileoverview Reducer for managing product variant state
 * @module utils/variantReducer
 * @requires {@link flattenVariants}
 * @requires {@link selectVariantByOptions}
 */

import { flattenVariants, selectVariantByOptions } from '@/lib/utils'
import type { ShopifyProduct, ShopifyProductVariant } from '@/types'

/**
 * @type {Object} VariantState
 * @property {string} status - Current status of the variant state
 * @property {ShopifyProductVariant} [variant] - Currently selected variant
 * @property {string} [message] - Error message if status is 'error'
 */
export type VariantState =
  | { status: 'idle' }
  | { status: 'selected'; variant: ShopifyProductVariant }
  | { status: 'notfound' }
  | { status: 'error'; message: string }

/**
 * @type {Object} VariantEvent
 * @property {string} type - Type of the event
 * @property {string} [optionName] - Name of the option to update
 * @property {string} [value] - Value of the option to update
 * @property {string|null
 */
export type VariantEvent =
  | { type: 'init'; product: ShopifyProduct }
  | { type: 'updateFromOptions'; optionName: string; value: string }
  | { type: 'syncFromId'; id: string | null }
  | { type: 'reset' }
  | { type: 'error'; message: string }

/**
 * @param variantReducer - Reducer function to manage variant state
 * @param state - Current state of the variant
 * @param event - Event to process
 * @param product - Shopify product data
 * @returns New state after processing the event
 */
export function variantReducer(
  state: VariantState,
  event: VariantEvent,
  product: ShopifyProduct
): VariantState {
  switch (event.type) {
    case 'init': {
      const all = flattenVariants(event.product)
      const first =
        //Copilot: 'all' is possibly 'null'.ts(18047)
        selectVariantByOptions(event.product, null, null, null) ?? all[0]
      return first ?
          { status: 'selected', variant: first }
        : { status: 'notfound' }
    }
    case 'updateFromOptions': {
      if (state.status !== 'selected') return state
      const newVariant = selectVariantByOptions(
        product,
        state.variant,
        event.optionName,
        event.value
      )
      return newVariant ?
          { status: 'selected', variant: newVariant }
        : { status: 'notfound' }
    }
    case 'syncFromId': {
      const all = flattenVariants(product)
      const found = all.find(v => v.id === event.id)
      return found ?
          { status: 'selected', variant: found }
        : { status: 'notfound' }
    }
    case 'reset':
      return { status: 'idle' }
    case 'error':
      return { status: 'error', message: event.message }
    default:
      return state
  }
}
