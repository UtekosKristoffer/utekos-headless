// Path: src/components/analytics/MetaPixel/PixelLogic.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { generateEventID } from '@/components/analytics/Meta/generateEventID'
import { sendPageViewToCAPI } from '@/components/analytics/Meta/sendPageViewToCAPI'
import { getCookie } from '@/components/analytics/Meta/getCookie'
import { getOrSetExternalId } from '@/components/analytics/Meta/getOrSetExternalId'

let hasInitializedMetaPixel = false
let lastDevelopmentPixelPageViewPath: string | null = null

export function PixelLogic() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pixelId) return

    const currentPathString = pathname + (searchParams?.toString() || '')

    if (lastTrackedPath.current === currentPathString) {
      return
    }

    if (
      process.env.NODE_ENV === 'development'
      && lastDevelopmentPixelPageViewPath === currentPathString
    ) {
      return
    }

    lastTrackedPath.current = currentPathString
    lastDevelopmentPixelPageViewPath = currentPathString

    requestAnimationFrame(() => {
      const externalId = getOrSetExternalId()
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const userHash = getCookie('ute_user_hash')
      const eventId = generateEventID()

      if (!hasInitializedMetaPixel && window.fbq) {
        window.fbq('init', pixelId, {
          external_id: externalId || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          em: userHash || undefined
        })
        hasInitializedMetaPixel = true
      }

      if (window.fbq) {
        window.fbq('track', 'PageView', {}, { eventID: eventId })
      }

      sendPageViewToCAPI(pathname, eventId, searchParams, externalId, fbc, fbp)
    })
  }, [pathname, searchParams, pixelId])

  return null
}
