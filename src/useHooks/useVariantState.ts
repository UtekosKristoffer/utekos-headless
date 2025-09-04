// Path: src/useHooks/useVariantState.ts

/**
 * @fileoverview Hook for managing product variant state.
 * 
 * @param product - The Shopify product object.
 * @module useHooks/useVariantState
 * @returns {object} - Contains variant state and functions to update it.
 */
import { useEffect, useReducer } from 'react'
import {
  variantReducer,
  type VariantState,
  type VariantEvent
} from '@/lib/utils'
import { flattenVariants } from '@/lib/utils'
import type { ShopifyProduct } from '@/types'

export function useVariantState(product: ShopifyProduct) {
  const [variantState, dispatch] = useReducer(
    (state: VariantState, event: VariantEvent) =>
      variantReducer(state, event, product),
    { status: 'idle' }
  )

  const allVariants = flattenVariants(product)

  useEffect(() => {
    if (variantState.status === 'idle' && allVariants?.length) {
      dispatch({ type: 'syncFromId', id: allVariants[0]?.id ?? null })
    }
  }, [variantState.status, allVariants])

  function updateVariant(optionName: string, value: string) {
    dispatch({ type: 'updateFromOptions', optionName, value })
  }

  function syncVariantFromId(id: string | null) {
    dispatch({ type: 'syncFromId', id })
  }

  return {
    variantState,
    updateVariant,
    allVariants,
    syncVariantFromId,
    dispatch
  }
}
