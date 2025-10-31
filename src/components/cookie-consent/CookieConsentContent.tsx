'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useConsent } from './useConsent'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { ConsentCategory } from './CookieConsentProvider'

function ConsentRadioGroup({
  category,
  consent,
  updateConsent
}: {
  category: Exclude<ConsentCategory, 'necessary'>
  consent: boolean
  updateConsent: (category: ConsentCategory, value: boolean) => void
}) {
  const stringValue = consent ? 'accept' : 'reject'

  const handleValueChange = (value: string) => {
    updateConsent(category, value === 'accept')
  }

  return (
    <RadioGroup
      value={stringValue}
      onValueChange={handleValueChange}
      className='flex flex-col space-y-2'
    >
      <div className='flex items-center space-x-2'>
        {/* FIX: Legger til className for å tvinge synlige farger */}
        <RadioGroupItem
          value='accept'
          id={`${category}-accept`}
          className='text-foreground border-foreground'
        />
        <Label htmlFor={`${category}-accept`}>Aksepter</Label>
      </div>
      <div className='flex items-center space-x-2'>
        {/* FIX: Legger til className for å tvinge synlige farger */}
        <RadioGroupItem
          value='reject'
          id={`${category}-reject`}
          className='text-foreground border-foreground'
        />
        <Label htmlFor={`${category}-reject`}>Avvis</Label>
      </div>
    </RadioGroup>
  )
}

// Dette er det nye innholdet som gjenbrukes
export function CookieConsentContent({
  setOpen
}: {
  setOpen: (open: boolean) => void
}) {
  const {
    consent,
    updateConsent,
    acceptAll,
    rejectNonEssential,
    savePreferences
  } = useConsent()

  const [showFullView, setShowFullView] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768) // md breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const hasChangedSettings =
    consent.analytics
    || consent.functional
    || consent.marketing
    || consent.profile_marketing

  const handleAcceptAll = () => {
    acceptAll()
    setOpen(false)
  }

  const handleRejectNonEssential = () => {
    rejectNonEssential()
    setOpen(false)
  }

  const handleSavePreferences = () => {
    savePreferences()
    setOpen(false)
  }

  const handleCustomize = () => {
    setShowFullView(true)
  }

  if (!isDesktop && !showFullView) {
    return (
      <>
        <div className='p-6 space-y-6'>
          <div className='mb-2 bg-sidebar-foreground/5 rounded-lg p-2 flex flex-col items-center text-balance'>
            <Image
              src='/icon.png'
              alt='Utekos logo'
              width={52}
              height={52}
              className='rounded-full mb-4 !border !border-white/80'
            />
            <DialogTitle className='text-left self-start flex ml-0'>
              Vi forbedrer opplevelsen din
            </DialogTitle>
            <DialogDescription>
              <span className='text-sm mt-4 text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark leading-relaxed block'>
                Vi bruker informasjonskapsler og andre former for teknologi for
                å sørge for at nettstedet vårt er sikkert og pålitelig, måle
                hvordan det presterer, og gi en personlig shoppingopplevelse og
                brukertilpasset markedsføring. For å gjøre dette samler og
                analyserer vi informasjon om brukerne, adferden deres og hvilke
                enheter de bruker.
              </span>
            </DialogDescription>
          </div>

          <div className='space-y-3'>
            <Button
              variant='secondary'
              className='w-full h-12 text-base text-article-white font-medium bg-button hover:bg-button/90'
              onClick={handleAcceptAll}
            >
              Godta alle
            </Button>
            <Button
              variant='default'
              className='w-full h-10 text-article-white'
              onClick={handleCustomize}
            >
              Tilpass innstillinger
            </Button>
          </div>
        </div>
      </>
    )
  }

  // Full view (alltid på desktop, eller etter "Tilpass innstillinger" på mobil)
  return (
    <>
      <DialogHeader className='sticky top-0 z-10 flex flex-col items-center border-b bg-background p-6'>
        <Image
          src='/icon.png'
          alt='Utekos logo'
          width={42}
          height={42}
          className='rounded-full border border-white/80'
        />
      </DialogHeader>
      <ScrollArea hideScrollbar className={'h-[40vh] px-6'}>
        <DialogTitle className='my-2 mt-4 text-2xl'>
          Vi forbedrer opplevelsen din
        </DialogTitle>
        <DialogDescription asChild>
          <div className='space-y-2 text-foreground text-lg leading-relaxed pt-2'>
            <p>
              Vi bruker informasjonskapsler og andre former for teknologi for å
              sørge for at nettstedet vårt er sikkert og pålitelig, måle hvordan
              det presterer, og gi en personlig shoppingopplevelse og
              brukertilpasset markedsføring. For å gjøre dette samler og
              analyserer vi informasjon om brukerne, adferden deres og hvilke
              enheter de bruker.
            </p>
            <p>
              Hvis du vil ha mer informasjon, kan du se våre{' '}
              <Link href='/personvern' className='underline'>
                Vilkår for personvern og informasjonskapsler
              </Link>
              .
            </p>
          </div>
        </DialogDescription>

        <div className='py-4 space-y-6'>
          <div>
            <h3 className='font-semibold text-lg mt-2 mb-4 text-foreground'>
              Strengt nødvendig (alltid på)
            </h3>
            <p className='text-md text-muted-foreground'>
              Aktiverer grunnleggende funksjonalitet for å huske språk, sted og
              handlekurv. Støtter også sikkerhet, nettverksadministrasjon og
              tilgjengelighet.
            </p>
          </div>

          {/* 2. Ytelse og analyse */}
          <div className='space-y-3'>
            <h3 className='font-medium text-foreground'>Ytelse og analyse</h3>
            <p className='text-sm text-muted-foreground'>
              Tillater bruk av atferdsdata for å optimalisere ytelsen, se
              hvordan du samhandler med nettstedene og appene våre og å forbedre
              opplevelsen.
            </p>
            <ConsentRadioGroup
              category='analytics'
              consent={consent.analytics}
              updateConsent={updateConsent}
            />
          </div>

          <Separator />

          {/* 3. Personlig tilpassede opplevelser */}
          <div className='space-y-3'>
            <h3 className='font-medium text-foreground'>
              Personlig tilpassede opplevelser
            </h3>
            <p className='text-sm text-muted-foreground'>
              Tillater deling av atferdsdata, ved bruk av informasjonskapsler og
              andre teknologier, for å forbedre opplevelsen din og gi relevant
              innhold på våre plattformer og i vår kommunikasjon.
            </p>
            <ConsentRadioGroup
              category='functional'
              consent={consent.functional}
              updateConsent={updateConsent}
            />
          </div>

          <Separator />

          {/* 4. Personlig annonsering */}
          <div className='space-y-3'>
            <h3 className='font-medium text-foreground'>
              Personlig annonsering
            </h3>
            <p className='text-sm text-muted-foreground'>
              Tillater deling av atferdsdata med annonsepartnere. Disse dataene
              brukes til å forbedre og rapportere om opplevelsen av personlig
              tilpassede annonser på nettstedene til partnere.
            </p>
            <ConsentRadioGroup
              category='marketing'
              consent={consent.marketing}
              updateConsent={updateConsent}
            />
          </div>

          <Separator />

          {/* 5. Profilbasert personlig tilpasset annonsering */}
          <div className='space-y-3'>
            <h3 className='font-medium text-foreground'>
              Profilbasert personlig tilpasset annonsering
            </h3>
            <p className='text-sm text-muted-foreground'>
              Tillat deling av e-postadressen og telefonnummeret mitt med
              annonseringspartnere for å tilpasse annonsering basert på mine
              interesser og måle effektiviteten av annonsering på
              partnernettsteder.
            </p>
            <ConsentRadioGroup
              category='profile_marketing'
              consent={consent.profile_marketing}
              updateConsent={updateConsent}
            />
          </div>
        </div>
      </ScrollArea>

      <DialogFooter className='flex-col min-h-[200-px] sm:flex-row gap-2 p-6 border-t bg-background'>
        <Button
          variant='ghost'
          className='sm:w-auto text-muted-foreground'
          onClick={handleRejectNonEssential}
        >
          Avvis alle
        </Button>
        <div className='sm:flex-grow' />
        {hasChangedSettings && (
          <Button
            className='sm:w-auto'
            variant='secondary'
            size={'lg'}
            onClick={handleSavePreferences}
          >
            Bekreft valg
          </Button>
        )}
        <Button
          variant='secondary'
          className='sm:w-auto bg-button text-article-white hover:bg-button/90'
          size='lg'
          onClick={handleAcceptAll}
        >
          Godta alle
        </Button>
      </DialogFooter>
    </>
  )
}
