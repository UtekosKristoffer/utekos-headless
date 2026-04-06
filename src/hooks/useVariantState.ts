'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { createVariantReducer } from '@/lib/utils/createVariantReducer'
import { flattenVariants } from '@/lib/utils/flattenVariants'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useReducer } from 'react'
import type { ShopifyProduct, ShopifyProductVariant } from 'types/product'
import type { Route } from 'next'

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
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

  useEffect(() => {
    if (!product || !variantReducer) return
    if (variantState.status !== 'idle' || !allVariants.length) return

    let variantFromUrl: ShopifyProductVariant | null = null

    if (enableUrlSync) {
      variantFromUrl = findVariantFromReadableParams(
        allVariants,
        new URLSearchParams(searchParams.toString())
      )
    }

    if (variantFromUrl) {
      dispatch({ type: 'syncFromId', id: variantFromUrl.id })
    } else {
      const firstAvailableVariant = allVariants.find(v => v.availableForSale)
      const defaultVariant = firstAvailableVariant || allVariants[0]
      dispatch({ type: 'syncFromId', id: defaultVariant?.id ?? null })
    }
  }, [variantState.status, allVariants, product, variantReducer, enableUrlSync, searchParams])

  useEffect(() => {
    if (!enableUrlSync) return
    if (variantState.status !== 'selected' || !variantState.variant) return

    const params = new URLSearchParams(searchParams.toString())

    params.delete('variant')
    const nextVariantParams = buildVariantParams(variantState.variant)
    for (const option of variantState.variant.selectedOptions ?? []) {
      params.delete(slugify(option.name))
    }

    // Sett nye option-parametere
    for (const [key, value] of nextVariantParams.entries()) {
      params.set(key, value)
    }

    const nextQuery = params.toString()
    const nextUrl =
      nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname

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