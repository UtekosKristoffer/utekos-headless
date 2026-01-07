'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import type { Route } from 'next'

type ConsentState = {
  necessary: boolean
  marketing: boolean
  analytics: boolean
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    marketing: true,
    analytics: true
  })

  useEffect(() => {
    const savedConsent = localStorage.getItem('utekos_cookie_consent')

    if (!savedConsent) {
      // Vent 2 sekunder før banneret vises (behageligere for brukeren)
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, marketing: true, analytics: true })
  }

  const handleDeclineAll = () => {
    saveConsent({ necessary: true, marketing: false, analytics: false })
  }

  const handleSaveSelection = () => {
    saveConsent(consent)
  }

  const saveConsent = (settings: ConsentState) => {
    localStorage.setItem('utekos_cookie_consent', JSON.stringify(settings))

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'consent_update',
        consent: {
          ad_storage: settings.marketing ? 'granted' : 'denied',
          analytics_storage: settings.analytics ? 'granted' : 'denied',
          ad_user_data: settings.marketing ? 'granted' : 'denied',
          ad_personalization: settings.marketing ? 'granted' : 'denied'
        }
      })
    }

    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    // 1. BACKDROP: Dekker skjermen usynlig (z-40) for å blokkere klikk bak, men uten å mørklegge alt.
    // Hvis du vil ha den mørk, legg til "bg-black/20" i klassen under.
    <div
      className='fixed inset-0 z-[99] h-screen w-screen cursor-default'
      aria-hidden='true'
    >
      {/* 2. SELVE BANNERET: Ligger alltid nederst (bottom-0) */}
      <div className='absolute bottom-0 left-0 right-0 z-[100] border-t border-neutral-800 bg-neutral-950/95 p-4 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-10 duration-700 md:p-6'>
        <div className='mx-auto max-w-7xl'>
          {!showDetails ?
            /* --- ENKEL VISNING --- */
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='space-y-2 md:max-w-3xl'>
                <h3 className='text-lg font-semibold text-white'>
                  Vi bryr oss om ditt personvern
                </h3>
                <p className='text-sm leading-relaxed text-neutral-400'>
                  Vi bruker informasjonskapsler (cookies) for å gi deg den beste
                  opplevelsen på Utekos.no, analysere trafikken vår og levere
                  tilpasset markedsføring. Du kan når som helst endre dine
                  preferanser. Les vår{' '}
                  <Link
                    href={'/personvern' as Route}
                    className='text-emerald-400 hover:underline hover:text-emerald-300 transition-colors'
                  >
                    personvernerklæring
                  </Link>
                  .
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row sm:min-w-fit'>
                <Button
                  variant='outline'
                  onClick={() => setShowDetails(true)}
                  className='border-neutral-700 text-white bg-neutral-800 hover:text-white/60'
                >
                  Tilpass
                </Button>
                <Button
                  variant='outline'
                  onClick={handleDeclineAll}
                  className='border-neutral-700 text-white bg-neutral-800 hover:text-white/60'
                >
                  Avvis
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className='w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold py-6'
                >
                  Godta alle
                </Button>
              </div>
            </div>
          : <div className='space-y-6 animate-in fade-in duration-300'>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-white'>
                  Tilpass dine valg
                </h3>
                <p className='text-sm text-neutral-400'>
                  Velg hvilke informasjonskapsler du tillater.
                </p>
              </div>

              <div className='grid gap-4 md:grid-cols-3'>
                {/* Nødvendige */}
                <div className='rounded-lg border border-neutral-800 bg-neutral-900/50 p-4'>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-white'>Nødvendige</span>
                    <Switch
                      checked={true}
                      disabled
                      aria-label='Nødvendige cookies'
                    />
                  </div>
                  <p className='mt-2 text-xs text-neutral-500'>
                    Kreves for at nettsiden skal fungere (handlekurv, login).
                    Kan ikke slås av.
                  </p>
                </div>

                {/* Statistikk */}
                <div className='rounded-lg border border-neutral-800 bg-neutral-900/50 p-4'>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-white'>Statistikk</span>
                    <Switch
                      checked={consent.analytics}
                      onCheckedChange={checked =>
                        setConsent(prev => ({ ...prev, analytics: checked }))
                      }
                      aria-label='Statistikk cookies'
                    />
                  </div>
                  <p className='mt-2 text-xs text-neutral-500'>
                    Hjelper oss å forstå hvordan besøkende bruker nettsiden.
                  </p>
                </div>

                {/* Markedsføring */}
                <div className='rounded-lg border border-neutral-800 bg-neutral-900/50 p-4'>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-white'>
                      Markedsføring
                    </span>
                    <Switch
                      checked={consent.marketing}
                      onCheckedChange={checked =>
                        setConsent(prev => ({ ...prev, marketing: checked }))
                      }
                      aria-label='Markedsføring cookies'
                    />
                  </div>
                  <p className='mt-2 text-xs text-neutral-500'>
                    Brukes for å vise deg relevante annonser på andre
                    nettsteder.
                  </p>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-4 border-t border-neutral-800'>
                <Button
                  variant='ghost'
                  onClick={() => setShowDetails(false)}
                  className='text-neutral-400 hover:text-white'
                >
                  Tilbake
                </Button>
                <Button
                  onClick={handleSaveSelection}
                  className='bg-white text-black hover:bg-neutral-200 font-bold'
                >
                  Lagre mine valg
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
