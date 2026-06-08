'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import { broadcastConsentState } from './broadcastConsentState'
import { defaultConsentState } from './defaultConsentState'
import { createUsercentricsConsentState } from './createUsercentricsConsentState'
import { readStoredConsentState } from './readStoredConsentState'
import { USERCENTRICS_CONSENT_EVENT_NAME } from './usercentricsConfig'

export type ConsentCategory = 'necessary' | 'preferences' | 'statistics' | 'marketing'

export interface ConsentState {
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
  services: Record<string, boolean>
  source: 'usercentrics'
}

interface ConsentContextType {
  consent: ConsentState
  hasInteracted: boolean
  openSettings: () => void
  hasServiceConsent: (serviceName: string) => boolean
}

export const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const initialSyncTimer = window.setTimeout(() => {
      const storedConsent = readStoredConsentState()

      if (storedConsent) {
        setConsent(storedConsent)
        setHasInteracted(true)
        broadcastConsentState(storedConsent)
      }
    }, 0)

    const syncUsercentricsConsent = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail

      if (!detail || detail.event !== 'consent_status') {
        return
      }

      const services = Object.fromEntries(
        Object.entries(detail).filter(([, value]) => typeof value === 'boolean')
      ) as Record<string, boolean>
      const nextConsent = createUsercentricsConsentState(services)

      setConsent(nextConsent)
      setHasInteracted(true)
      broadcastConsentState(nextConsent)
    }

    window.addEventListener(USERCENTRICS_CONSENT_EVENT_NAME, syncUsercentricsConsent)
    return () => {
      window.clearTimeout(initialSyncTimer)
      window.removeEventListener(USERCENTRICS_CONSENT_EVENT_NAME, syncUsercentricsConsent)
    }
  }, [])

  const openSettings = () => {
    window.UC_UI?.showSecondLayer()
  }

  const hasServiceConsent = (serviceName: string) => consent.services[serviceName] === true

  return (
    <ConsentContext.Provider value={{ consent, hasInteracted, openSettings, hasServiceConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}
