'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import Cookies from 'js-cookie'

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
  savePreferences: () => void
}

const defaultConsentState: ConsentState = {
  necessary: true, // Alltid påkrevd
  analytics: false,
  functional: false,
  marketing: false,
  profile_marketing: false // ENDRET: Lagt til
}

export const ConsentContext = createContext<ConsentContextType>({
  consent: defaultConsentState,
  hasInteracted: false,
  updateConsent: () => {},
  acceptAll: () => {},
  rejectNonEssential: () => {},
  savePreferences: () => {}
})

const COOKIE_NAME = 'cookie-consent'
const COOKIE_EXPIRY = 365 // Dager

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Last samtykke fra cookie ved oppstart
  useEffect(() => {
    const savedConsent = Cookies.get(COOKIE_NAME)

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent)
        // Sikrer at 'necessary' alltid er true
        setConsent({
          ...defaultConsentState,
          ...parsedConsent,
          necessary: true
        })
        setHasInteracted(true)
      } catch (e) {
        console.error('Error parsing consent cookie:', e)
      }
    }

    setIsLoaded(true)
  }, [])

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
    setConsent(allAccepted)
    saveConsentCookie(allAccepted)
    setHasInteracted(true)
  }

  const rejectNonEssential = () => {
    const essentialOnly: ConsentState = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      profile_marketing: false // ENDRET: Lagt til
    }
    setConsent(essentialOnly)
    saveConsentCookie(essentialOnly)
    setHasInteracted(true)
  }

  const savePreferences = () => {
    // Sikrer at 'necessary' alltid er true ved lagring
    const finalConsent = { ...consent, necessary: true }
    saveConsentCookie(finalConsent)
    setHasInteracted(true)
  }

  const saveConsentCookie = (consentState: ConsentState) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(consentState), {
      expires: COOKIE_EXPIRY,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })
  }

  // Render barna først etter at vi har sjekket for samtykke
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
