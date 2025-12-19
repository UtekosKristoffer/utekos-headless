'use client'

import { cacheLife } from 'next/cache'
import Script from 'next/script'
export function ActiveOnSite() {
  'use cache'
  cacheLife('max')
  return (
    <Script
      type='text/javascript'
      strategy='afterInteractive'
      async
      src='https://static.klaviyo.com/onsite/js/UPBWw8/klaviyo.js'
    ></Script>
  )
}
