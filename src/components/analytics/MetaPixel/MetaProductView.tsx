// Path: src/components/analytics/MetaPixel/MetaProductView.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { sendJSON } from '@/components/jsx/CheckoutButton/sendJSON'
import type {
  ShopifyProduct,
  ShopifyProductVariant,
  MetaEventPayload,
  MetaUserData
} from '@types'

interface MetaProductViewProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
}

export function MetaProductView({
  product,
  selectedVariant
}: MetaProductViewProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const eventFired = useRef<string | null>(null)

  useEffect(() => {
    const contentId = cleanShopifyId(selectedVariant.id) || selectedVariant.id
    const eventId = generateEventID()
    const uniqueKey = `${pathname}-${contentId}` // Unik nøkkel for denne visningen

    if (eventFired.current === uniqueKey) return
    eventFired.current = uniqueKey

    const price = parseFloat(selectedVariant.price.amount)
    const currency = selectedVariant.price.currencyCode

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq(
        'track',
        'ViewContent',
        {
          content_ids: [contentId],
          content_type: 'product',
          content_name: product.title,
          value: price,
          currency: currency
        },
        { eventID: eventId }
      )
    }

    const ua = navigator.userAgent
    const fbp = getCookie('_fbp')
    const fbc = getCookie('_fbc')
    const externalId = getCookie('ute_ext_id')
    const emailHash = getCookie('ute_user_hash')

    const userData: MetaUserData = {
      client_user_agent: ua,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      external_id: externalId || undefined,
      email_hash: emailHash || undefined
    }

    const capiPayload: MetaEventPayload = {
      eventName: 'ViewContent',
      eventId: eventId,
      eventSourceUrl: window.location.href,
      eventTime: Math.floor(Date.now() / 1000),
      actionSource: 'website',
      userData,
      eventData: {
        value: price,
        currency: currency,
        content_ids: [contentId],
        content_type: 'product',
        content_name: product.title
      }
    }

    sendJSON('/api/meta-events', capiPayload)
  }, [pathname, searchParams, product, selectedVariant])

  return null
}
