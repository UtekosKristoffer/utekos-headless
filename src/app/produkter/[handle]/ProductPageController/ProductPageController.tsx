// Path: src/app/produkter/[handle]/ProductPageController/ProductPageController.tsx
'use client'

import { useProductPage } from '@/hooks/useProductPage'
import ProductPageView from '@/app/produkter/[handle]/ProductPageView/ProductPageView'
import { ProductPageSkeleton } from '../ProductPageSkeleton/ProductPageSkeleton'
import type { ShopifyProduct, MetaEventPayload, MetaUserData } from '@types'
import { useEffect, useRef } from 'react'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

interface ProductPageControllerProps {
  handle: string
  initialRelatedProducts: ShopifyProduct[]
}

export function ProductPageController({
  handle,
  initialRelatedProducts
}: ProductPageControllerProps) {
  const {
    productData,
    selectedVariant,
    allVariants,
    variantImages,
    updateVariant,
    relatedProducts,
    swatchColorMap,
    isLoading
  } = useProductPage(handle, initialRelatedProducts)

  const lastTrackedVariant = useRef<string | null>(null)

  useEffect(() => {
    if (!productData || !selectedVariant) return

    // Unngå duplikater: Sjekk om ID er endret siden sist
    if (lastTrackedVariant.current === selectedVariant.id) return

    lastTrackedVariant.current = selectedVariant.id

    const cleanId = cleanShopifyId(selectedVariant.id) || selectedVariant.id
    const price = parseFloat(selectedVariant.price.amount)
    const currency = selectedVariant.price.currencyCode
    const eventId = generateEventID().replace('evt_', 'vc_')

    const eventData = {
      content_ids: [cleanId],
      content_type: 'product' as const,
      content_name: productData.title,
      value: price,
      currency: currency
    }

    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'ViewContent', eventData, {
        eventID: eventId
      })
    }
    const fbc = getCookie('_fbc')
    const fbp = getCookie('_fbp')
    const externalId = getCookie('ute_ext_id')
    const emailHash = getCookie('ute_user_hash')

    const userData: MetaUserData = {
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      external_id: externalId || undefined,
      email_hash: emailHash || undefined,
      client_user_agent: navigator.userAgent
    }

    const payload: MetaEventPayload = {
      eventName: 'ViewContent',
      eventId,
      eventSourceUrl: window.location.href,
      eventTime: Math.floor(Date.now() / 1000),
      actionSource: 'website',
      userData,
      eventData
    }

    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(console.error)
  }, [productData, selectedVariant])

  if (isLoading || !productData || !selectedVariant) {
    return <ProductPageSkeleton />
  }

  return (
    <ProductPageView
      productData={productData}
      selectedVariant={selectedVariant}
      allVariants={allVariants}
      variantImages={variantImages}
      onOptionChange={updateVariant}
      relatedProducts={relatedProducts}
      colorHexMap={swatchColorMap}
    />
  )
}
