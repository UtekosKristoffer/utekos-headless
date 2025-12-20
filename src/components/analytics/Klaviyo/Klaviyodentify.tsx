'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function KlaviyoIdentify() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.klaviyo) return

    const getEmail = () => {
      const urlEmail =
        searchParams.get('utm_email')
        || searchParams.get('user_email')
        || searchParams.get('email')

      if (urlEmail) {
        window.localStorage.setItem('user_email', urlEmail)
        return urlEmail
      }
      return window.localStorage.getItem('user_email')
    }

    const email = getEmail()
    if (email) {
      window.klaviyo.identify({ email: email })
    }
    window.klaviyo.track('Viewed Page', {
      'page name': document.title,
      'path': pathname
    })
  }, [pathname, searchParams])

  return null
}
