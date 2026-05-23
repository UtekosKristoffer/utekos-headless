'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getCookie } from '@/components/analytics/Meta/getCookie'
import { generateEventID } from '@/components/analytics/Meta/generateEventID'
import { setUrlCookie } from '@/components/analytics/Pinterest/setUrlCookie'

const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID
type PinterestTracker = NonNullable<Window['pintrk']>

export function PinterestTag() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isInitialized = useRef(false)
  const firedEvents = useRef<Set<string>>(new Set())
  const lastPathname = useRef<string | null>(null)
  const epik = searchParams.get('epik')

  useEffect(() => {
    if (!PINTEREST_TAG_ID || isInitialized.current) return

    if (epik) {
      setUrlCookie('_epik', epik, 365)
    }

    if (!window.pintrk) {
      const pintrkInit = ((...args: unknown[]) => {
        pintrkInit.queue.push(args)
      }) as PinterestTracker
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
    } else {
      isInitialized.current = true
    }
  }, [searchParams, epik])

  useEffect(() => {
    if (!PINTEREST_TAG_ID || !window.pintrk) return

    const currentPath =
      pathname + (searchParams.toString() ? '?' + searchParams.toString() : '')

    if (lastPathname.current !== currentPath) {
      firedEvents.current.clear()
      lastPathname.current = currentPath
    }

    if (!firedEvents.current.has('page_visit')) {
      const pageViewID = generateEventID()

      window.pintrk?.('track', 'PageVisit', {
        event_id: pageViewID
      })

      firedEvents.current.add('page_visit')
    }

    const isExactCategoryPage =
      pathname === '/produkter'
      || pathname === '/kolleksjon'
      || pathname === '/products'

    if (isExactCategoryPage && !firedEvents.current.has('view_category')) {
      firedEvents.current.add('view_category')
      const eventID = generateEventID()

      window.pintrk?.('track', 'ViewCategory', { event_id: eventID })

      const payload = {
        eventName: 'view_category',
        eventId: eventID,
        eventSourceUrl: window.location.href,
        actionSource: 'website'
      }

      const trackingEventsUrl =
        epik ?
          `/api/tracking-events?epik=${encodeURIComponent(epik)}`
        : '/api/tracking-events'

      fetch(trackingEventsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => console.error(err))
    }
  }, [pathname, searchParams, epik])

  return null
}
