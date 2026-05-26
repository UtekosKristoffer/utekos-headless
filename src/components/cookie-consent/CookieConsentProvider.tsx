'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import { broadcastConsentState } from './broadcastConsentState'
import { defaultConsentState } from './defaultConsentState'
import { persistConsentState } from './persistConsentState'
import { readStoredConsentState } from './readStoredConsentState'

// ENDRET: Nye kategorier som matcher Nike
export type ConsentCategory =
  | 'necessary'
  | 'analytics' // Ytelse og analyse
  | 'functional' // Personlig tilpassede opplevelser
  | 'marketing' // Personlig annonsering
  | 'profile_marketing' // Profilbasert personlig tilpasset annonsering

export interface ConsentState {
  necessary: boolean
  analytics: boolean
  functional: boolean
  marketing: boolean
  profile_marketing: boolean // ENDRET: Lagt til
}

interface ConsentContextType {
  consent: ConsentState
  hasInteracted: boolean
  updateConsent: (category: ConsentCategory, value: boolean) => void
  acceptAll: () => void
  rejectNonEssential: () => void
  savePreferences: (nextConsent?: ConsentState) => void
}

export const ConsentContext = createContext<ConsentContextType>({
  consent: defaultConsentState,
  hasInteracted: false,
  updateConsent: () => {},
  acceptAll: () => {},
  rejectNonEssential: () => {},
  savePreferences: () => {}
})

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedConsent = readStoredConsentState()

      if (savedConsent) {
        setConsent(savedConsent)
        persistConsentState(savedConsent)
        broadcastConsentState(savedConsent)
        setHasInteracted(true)
      }

      setIsLoaded(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const commitConsent = (nextConsent: ConsentState) => {
    const finalConsent = { ...nextConsent, necessary: true }
    setConsent(finalConsent)
    persistConsentState(finalConsent)
    broadcastConsentState(finalConsent)
    setHasInteracted(true)
  }

  const updateConsent = (category: ConsentCategory, value: boolean) => {
    if (category === 'necessary') return // Kan ikke endre 'necessary'
    setConsent(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const acceptAll = () => {
    const allAccepted: ConsentState = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      profile_marketing: true // ENDRET: Lagt til
    }
    commitConsent(allAccepted)
  }

  const rejectNonEssential = () => {
    const essentialOnly: ConsentState = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      profile_marketing: false // ENDRET: Lagt til
    }
    commitConsent(essentialOnly)
  }

  const savePreferences = (nextConsent?: ConsentState) => {
    commitConsent(nextConsent ?? consent)
  }

  if (!isLoaded) {
    return null
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasInteracted,
        updateConsent,
        acceptAll,
        rejectNonEssential,
        savePreferences
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}
