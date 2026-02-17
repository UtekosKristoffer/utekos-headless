// Path: src/components/tracking/Meta/PixelLogic.tsx
'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { sendPageViewToCAPI } from '@/lib/tracking/capi/sendPageViewToCAPI'
import { getCookie } from '@/lib/tracking/utils/getCookie'
import { getOrSetExternalId } from '@/lib/tracking/capi/getOrSetExternalId'

export function PixelLogic() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const lastTrackedPath = useRef<string | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!pixelId) return

    const currentPathString = pathname + (searchParams?.toString() || '')

    if (lastTrackedPath.current === currentPathString) {
      return
    }

    lastTrackedPath.current = currentPathString

    requestAnimationFrame(() => {
      const externalId = getOrSetExternalId()
      const fbc = getCookie('_fbc')
      const fbp = getCookie('_fbp')
      const userHash = getCookie('ute_user_hash')
      const eventId = generateEventID()

      if (!isInitialized.current && window.fbq) {
        window.fbq('init', pixelId, {
          external_id: externalId || undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
          em: userHash || undefined
        })
        isInitialized.current = true
      }

      if (window.fbq) {
        window.fbq('track', 'PageView', {}, { eventID: eventId })
      }

      sendPageViewToCAPI(pathname, eventId, searchParams, externalId, fbc, fbp)
    })
  }, [pathname, searchParams, pixelId])

  return null
}
