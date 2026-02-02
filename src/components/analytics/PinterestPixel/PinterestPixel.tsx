// Path: src/components/analytics/PinterestPixel/PinterestPixel.tsx

'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'

const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID

export function PinterestPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!PINTEREST_TAG_ID) return

    if (!window.pintrk) {
      const pintrkInit = function (...args: any[]) {
        window.pintrk?.queue.push(args)
      } as any

      pintrkInit.queue = []
      pintrkInit.version = '3.0'

      window.pintrk = pintrkInit
    }

    const emailHash = getCookie('ute_user_hash')
    const externalId = getCookie('ute_ext_id')

    const userData: Record<string, string> = {}
    if (emailHash) userData.em = emailHash
    if (externalId) userData.external_id = externalId

    window.pintrk?.('load', PINTEREST_TAG_ID, userData)

    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded || !PINTEREST_TAG_ID) return

    window.pintrk?.('page')
  }, [pathname, searchParams, loaded])

  if (!PINTEREST_TAG_ID) return null

  return (
    <Script
      id='pinterest-pixel'
      strategy='afterInteractive'
      src='https://s.pinimg.com/ct/core.js'
    />
  )
}
