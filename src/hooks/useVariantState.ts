// Path: src/hooks/useVariantState.ts

'use client'

import { createVariantReducer } from '@/lib/utils/createVariantReducer'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useReducer } from 'react'
import type { ShopifyProduct, ShopifyProductVariant } from 'types/product'
import type { Route } from 'next'
import type { VariantState } from '@types'

function idleVariantState(): VariantState {
  return { status: 'idle' }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll('æ', 'ae')
    .replaceAll('ø', 'o')
    .replaceAll('å', 'a')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildVariantParams(variant: ShopifyProductVariant) {
  const params = new URLSearchParams()

  for (const option of variant.selectedOptions ?? []) {
    const key = slugify(option.name)
    const value = slugify(option.value)

    if (key && value) {
      params.set(key, value)
    }
  }

  return params
}

function findVariantFromReadableParams(
  allVariants: ShopifyProductVariant[],
  searchParams: URLSearchParams
) {
  return (
    allVariants.find(variant => {
      const selectedOptions = variant.selectedOptions ?? []
      if (!selectedOptions.length) return false

      return selectedOptions.every(option => {
        const key = slugify(option.name)
        const value = slugify(option.value)

        return searchParams.get(key) === value
      })
    }) ?? null
  )
}

function findInitialVariant(
  allVariants: ShopifyProductVariant[],
  initialVariantId: string | null
) {
  if (!allVariants.length) return null

  if (initialVariantId) {
    const fromInitialId = allVariants.find(
      variant => variant.id === initialVariantId
    )

    if (fromInitialId) return fromInitialId
  }

  return allVariants.find(variant => variant.availableForSale) ?? allVariants[0]
}

function createInitialVariantState(
  allVariants: ShopifyProductVariant[],
  initialVariantId: string | null
): VariantState {
  const initialVariant = findInitialVariant(allVariants, initialVariantId)

  return initialVariant ?
      { status: 'selected', variant: initialVariant }
    : { status: 'idle' }
}

const fallbackReducer = (state: VariantState) => state

export function useVariantState(
  product: ShopifyProduct | undefined,
  enableUrlSync: boolean = true,
  initialVariantId: string | null = null
) {
  const allVariants = useMemo(
    () => (product ? flattenVariants(product) || [] : []),
    [product]
  )

  const variantReducer = useMemo(
    () => (product ? createVariantReducer(product) : null),
    [product]
  )

  const initialState = useMemo(
    () => createInitialVariantState(allVariants, initialVariantId),
    [allVariants, initialVariantId]
  )

  const [variantState, dispatch] = useReducer(
    variantReducer || fallbackReducer,
    initialState
  )

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!product || !variantReducer || !allVariants.length) return

    let variantFromUrl: ShopifyProductVariant | null = null

    if (enableUrlSync) {
      const variantId = searchParams.get('variant')

      if (variantId) {
        variantFromUrl =
          allVariants.find(variant => variant.id === variantId) ?? null
      }

      if (!variantFromUrl) {
        variantFromUrl = findVariantFromReadableParams(
          allVariants,
          new URLSearchParams(searchParams.toString())
        )
      }
    }

    const fallbackVariant = findInitialVariant(allVariants, initialVariantId)
    const nextVariant = variantFromUrl ?? fallbackVariant

    if (!nextVariant) return

    if (
      variantState.status === 'selected'
      && variantState.variant.id === nextVariant.id
    ) {
      return
    }

    dispatch({ type: 'syncFromId', id: nextVariant.id })
  }, [
    allVariants,
    enableUrlSync,
    initialVariantId,
    product,
    searchParams,
    variantReducer,
    variantState
  ])

  useEffect(() => {
    if (!enableUrlSync) return
    if (variantState.status !== 'selected' || !variantState.variant) return

    const params = new URLSearchParams(searchParams.toString())

    params.delete('variant')

    const nextVariantParams = buildVariantParams(variantState.variant)

    for (const option of variantState.variant.selectedOptions ?? []) {
      params.delete(slugify(option.name))
    }

    for (const [key, value] of nextVariantParams.entries()) {
      params.set(key, value)
    }

    const nextQuery = params.toString()
    const nextUrl = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname

    const currentUrl =
      searchParams.toString().length > 0 ?
        `${pathname}?${searchParams.toString()}`
      : pathname

    if (currentUrl !== nextUrl) {
      router.replace(nextUrl as Route, { scroll: false })
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
