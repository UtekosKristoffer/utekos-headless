'use client'

import { useContext } from 'react'
import { ConsentContext, type ConsentCategory } from './CookieConsentProvider'

export function useConsent() {
  const context = useContext(ConsentContext)

  if (context === undefined) {
    throw new Error('useConsent must be used within a CookieConsentProvider')
  }

  return context
}

export function useConsentFor(category: ConsentCategory): boolean {
  const { consent } = useConsent()
  return consent[category]
}
