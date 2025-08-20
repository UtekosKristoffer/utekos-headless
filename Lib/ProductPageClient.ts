// src/Components/Products/ProductPageClient.tsx
'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation'
import type { Route } from 'next'

import { useGetProductByHandleQuery } from '@/hooks/useGetProductByHandleQuery'
import computeVariantImages from '@/lib/helpers/computeVariantImages'
import ProductPageView from './ProductPageView'

function ProductPageClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams<{ handle: string }>()
  const handle = params.handle

  const { data: productData, isLoading, isError } = useGetProductByHandleQuery({ handle })
  const product = productData?.product

  const { variantState, updateVariant, allVariants, syncVariantFromId } = useVariantState(product)

  // Synkroniser fra URL ved første last
  useEffect(() => {
    const variantId = searchParams.get('variant')
    if (product) {
      syncVariantFromId(variantId)
    }
  }, [searchParams, syncVariantFromId, product])

  // Oppdater URL når variant endres
  useEffect(() => {
    if (variantState.status === 'selected') {
      const params = new URLSearchParams(searchParams.toString())
      params.set('variant', variantState.variant.id)
      router.replace(`${pathname}?${params.toString()}` as Route, {
        scroll: false
      })
    }
  }, [variantState, router, pathname, searchParams])

  if (isLoading) {
    return <div className='container mx-auto p-8 text-center'>Laster produkt...</div>
  }

  if (isError || !product) {
    return <div className='container mx-auto p-8 text-center'>Kunne ikke laste produktet.</div>
  }

  const selectedVariant = variantState.status === 'selected' ? variantState.variant : null

  if (!selectedVariant) {
    return <div className='container mx-auto p-8 text-center'>Velg en variant for å fortsette.</div>
  }

  return <ProductPageView product={product} selectedVariant={selectedVariant} allVariants={allVariants} variantImages={computeVariantImages(product, selectedVariant)} onOptionChange={updateVariant} />
}

export default ProductPageClient
