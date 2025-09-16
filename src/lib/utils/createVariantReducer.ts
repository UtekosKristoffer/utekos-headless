// Path: src/lib/utils/variantReducer.ts

import { flattenVariants } from '@/lib/utils/flattenVariants'
import { selectVariantByOptions } from '@/lib/utils/selectVariantByOptions'
import type {
  ShopifyProduct,
  ShopifyProductVariant,
  VariantEvent,
  VariantState
} from '@types'

export function createVariantReducer(product: ShopifyProduct) {
  return function variantReducer(
    state: VariantState,
    event: VariantEvent
  ): VariantState {
    switch (event.type) {
      case 'updateFromOptions': {
        if (state.status !== 'selected') return state

        const allVariants = flattenVariants(product).filter(
          Boolean
        ) as ShopifyProductVariant[]

        const newVariant = selectVariantByOptions(allVariants, {
          current: state.variant,
          optionName: event.optionName,
          value: event.value
        })

        return newVariant ? { status: 'selected', variant: newVariant } : state // Returner gammel state ved 'notfound'
      }
      case 'syncFromId': {
        const all = flattenVariants(product).filter(
          Boolean
        ) as ShopifyProductVariant[]
        const found = all.find(v => v.id === event.id)
        return found ?
            { status: 'selected', variant: found }
          : { status: 'notfound' }
      }
      default:
        return state
    }
  }
}
