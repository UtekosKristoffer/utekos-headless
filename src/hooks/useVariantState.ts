// Path: src/hooks/useVariantState.ts
import { createVariantReducer } from '@/lib/utils/createVariantReducer'
import { findVariantFromUrl } from '@/lib/utils/findVariantfromUrl'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useReducer } from 'react'

import type { ShopifyProduct } from '@types'

export function useVariantState(product: ShopifyProduct) {
  const variantReducer = useMemo(() => createVariantReducer(product), [product])
  const [variantState, dispatch] = useReducer(variantReducer, {
    status: 'idle'
  })

  const allVariants = useMemo(() => flattenVariants(product) || [], [product])
  const searchParams = useSearchParams()
  const variantIdFromUrl = searchParams.get('variant') // ✅ Ekstraher verdien

  useEffect(() => {
    if (variantState.status !== 'idle' || !allVariants.length) {
      return
    }

    const variantFromUrl =
      variantIdFromUrl ?
        allVariants.find(v => v.id === variantIdFromUrl)
      : undefined

    if (variantFromUrl) {
      dispatch({ type: 'syncFromId', id: variantFromUrl.id })
    } else {
      const firstAvailableVariant = allVariants.find(v => v.availableForSale)
      const defaultVariant = firstAvailableVariant || allVariants[0]
      dispatch({ type: 'syncFromId', id: defaultVariant?.id ?? null })
    }
  }, [variantState.status, allVariants, variantIdFromUrl])

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
