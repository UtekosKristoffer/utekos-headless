'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { setUrlCookie } from '@/components/analytics/PinterestPixel/setUrlCookie'

const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID
export function PinterestPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loaded, setLoaded] = useState(false)
  const isInitialized = useRef(false)
  const firedEvents = useRef<Set<string>>(new Set())
  const lastPathname = useRef<string | null>(null)

  useEffect(() => {
    if (!PINTEREST_TAG_ID || isInitialized.current) return

    const epik = searchParams.get('epik')
    if (epik) {
      setUrlCookie('_epik', epik, 365)
    }

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

    if (window.pintrk && !window.pintrk.loaded) {
      window.pintrk('load', PINTEREST_TAG_ID, userData)
      window.pintrk.loaded = true
      isInitialized.current = true
      setLoaded(true)
    } else {
      setLoaded(true)
      isInitialized.current = true
    }
  }, [searchParams])

  useEffect(() => {
    if (!loaded || !PINTEREST_TAG_ID) return

    const currentPath =
      pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')

    if (lastPathname.current !== currentPath) {
      firedEvents.current.clear()
      lastPathname.current = currentPath
    }

    if (!firedEvents.current.has('page_visit')) {
      window.pintrk?.('page')
      firedEvents.current.add('page_visit')
    }

    const isExactCategoryPage =
      pathname === '/produkter'
      || pathname === '/kolleksjon'
      || pathname === '/products'

    if (isExactCategoryPage && !firedEvents.current.has('view_category')) {
      firedEvents.current.add('view_category')

      const eventID = generateEventID()

      window.pintrk?.('track', 'ViewCategory')

      const payload = {
        eventName: 'view_category',
        eventId: eventID,
        eventSourceUrl: window.location.href,
        actionSource: 'website'
      }

      fetch('/api/tracking/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => console.error(err))
    }
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
