// Path: src/hooks/useVariantState.ts

/*eslint-disable react-hooks/exhaustive-deps*/

import { createVariantReducer } from '@/lib/utils/createVariantReducer'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import type { ShopifyProduct } from 'types/product'
import type { Route } from 'next'
export function useVariantState(
  product: ShopifyProduct | undefined,
  enableUrlSync: boolean = true
) {
  const variantReducer = product ? createVariantReducer(product) : null

  const [variantState, dispatch] = useReducer(
    variantReducer || (() => ({ status: 'idle' as const })),
    { status: 'idle' as const }
  )

  const allVariants = product ? flattenVariants(product) || [] : []

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const variantIdFromUrl = searchParams.get('variant')

  useEffect(() => {
    if (!product || !variantReducer) return
    if (variantState.status !== 'idle' || !allVariants.length) return

    let variantFromUrl = undefined

    if (enableUrlSync && variantIdFromUrl) {
      variantFromUrl = allVariants.find(v => v.id === variantIdFromUrl)
    }

    if (variantFromUrl) {
      dispatch({ type: 'syncFromId', id: variantFromUrl.id })
    } else {
      const firstAvailableVariant = allVariants.find(v => v.availableForSale)
      const defaultVariant = firstAvailableVariant || allVariants[0]
      dispatch({ type: 'syncFromId', id: defaultVariant?.id ?? null })
    }
  }, [
    variantState.status,
    allVariants,
    variantIdFromUrl,
    product,
    variantReducer,
    enableUrlSync
  ])

  useEffect(() => {
    if (!enableUrlSync) return

    if (variantState.status === 'selected' && variantState.variant) {
      const currentId = searchParams.get('variant')
      const newId = variantState.variant.id

      if (currentId !== newId) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('variant', newId)

        const nextUrl = `${pathname}?${params.toString()}` as Route

        router.replace(nextUrl, { scroll: false })
      }
    }
  }, [variantState, pathname, router, searchParams, enableUrlSync])
  function updateVariant(optionName: string, value: string) {
    if (variantReducer) {
      dispatch({ type: 'updateFromOptions', optionName, value })
    }
  }

  function syncVariantFromId(id: string | null) {
    if (variantReducer) {
      dispatch({ type: 'syncFromId', id })
    }
  }

  return {
    variantState,
    updateVariant,
    allVariants,
    syncVariantFromId,
    dispatch
  }
}
