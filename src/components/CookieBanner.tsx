'use client'

import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import { cn } from '@/lib/utils/className'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { useConsent } from '@/components/cookie-consent/useConsent'
import type { Route } from 'next'
import type { ConsentState } from '@/components/cookie-consent/CookieConsentProvider'

type ConsentActionTone = 'primary' | 'cloud' | 'ancient'

type ConsentActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  tone?: ConsentActionTone
}

type ConsentPreferenceCardProps = {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const consentActionClassName =
  'min-h-11 w-full select-none px-6 py-3 text-sm font-semibold leading-[1.2] tracking-normal shadow-[0_18px_38px_-30px_color-mix(in_oklab,var(--demitasse)_72%,transparent)] transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto'

const consentActionToneConfig: Record<
  ConsentActionTone,
  { backgroundColor: string; textColor: string; className?: string }
> = {
  primary: {
    backgroundColor: 'var(--primary)',
    textColor: 'var(--maritime-darkest)',
    className: 'border border-primary/24'
  },
  cloud: {
    backgroundColor: 'var(--cloud-dancer)',
    textColor: 'var(--maritime-darkest)',
    className: 'border border-cloud-dancer/24'
  },
  ancient: {
    backgroundColor: 'var(--ancient-water)',
    textColor: 'var(--maritime-darkest)',
    className: 'border border-ancient-water/24'
  }
}

function ConsentActionButton({ tone = 'cloud', className, children, ...props }: ConsentActionButtonProps) {
  const toneConfig = consentActionToneConfig[tone]

  return (
    <BrandBadge
      asChild
      backgroundColor={toneConfig.backgroundColor}
      textColor={toneConfig.textColor}
      className={cn(consentActionClassName, toneConfig.className, className)}
    >
      <button type='button' {...props}>
        {children}
      </button>
    </BrandBadge>
  )
}

function ConsentPreferenceCard({
  title,
  description,
  checked,
  disabled,
  onCheckedChange
}: ConsentPreferenceCardProps) {
  const switchProps: {
    disabled?: boolean
    onCheckedChange?: (checked: boolean) => void
  } = {}

  if (disabled !== undefined) {
    switchProps.disabled = disabled
  }

  if (onCheckedChange !== undefined) {
    switchProps.onCheckedChange = onCheckedChange
  }

  return (
    <section className='rounded-lg border border-cloud-dancer/12 bg-havdyp/55 p-4 shadow-[0_18px_38px_-34px_color-mix(in_oklab,var(--maritime-darkest)_82%,transparent)]'>
      <div className='flex items-center justify-between gap-4'>
        <h4 className='font-google-sans text-base font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer'>
          {title}
        </h4>
        <Switch
          checked={checked}
          aria-label={`${title} informasjonskapsler`}
          className='border-cloud-dancer/15 data-[state=checked]:bg-primary data-[state=unchecked]:bg-havdyp focus-visible:ring-primary/35'
          {...switchProps}
        />
      </div>
      <p className='mt-3   text-xs leading-[1.45]   text-cloud-dancer/72'>{description}</p>
    </section>
  )
}

export function CookieConsentBanner() {
  const {
    consent: storedConsent,
    hasInteracted,
    acceptAll,
    rejectNonEssential,
    savePreferences
  } = useConsent()
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>(storedConsent)

  useEffect(() => {
    setConsent(storedConsent)
  }, [storedConsent])

  useEffect(() => {
    if (hasInteracted) {
      setIsVisible(false)
      return undefined
    }

    const timer = window.setTimeout(() => setIsVisible(true), 250)
    return () => window.clearTimeout(timer)
  }, [hasInteracted])

  const handleAcceptAll = () => {
    acceptAll()
    setIsVisible(false)
  }

  const handleUseNecessaryOnly = () => {
    rejectNonEssential()
    setIsVisible(false)
  }

  const handleSaveSelection = () => {
    savePreferences(consent)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className='pointer-events-none fixed inset-x-0 bottom-0 z-[100001] px-3 pb-3 sm:px-6 sm:pb-6'
      role='dialog'
      aria-modal='false'
      aria-labelledby='cookie-consent-title'
      aria-describedby='cookie-consent-description'
    >
      <div className='pointer-events-auto mx-auto max-w-7xl rounded-lg border border-cloud-dancer/12 bg-maritime-darkest/96 p-4 text-cloud-dancer shadow-[0_28px_80px_-36px_color-mix(in_oklab,var(--maritime-darkest)_92%,transparent)] backdrop-blur-md animate-in slide-in-from-bottom-6 duration-500 motion-reduce:animate-none md:p-6'>
        <div>
          {!showDetails ?
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='space-y-3 md:max-w-3xl'>
                <h3
                  id='cookie-consent-title'
                  className='font-google-sans text-xl font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer md:text-2xl'
                >
                  Vi bryr oss om ditt personvern
                </h3>
                <p
                  id='cookie-consent-description'
                  className='max-w-3xl   text-sm leading-[1.45]   text-cloud-dancer/82 md:text-base'
                >
                  Vi bruker informasjonskapsler for å holde siden trygg, måle hva som fungerer og vise
                  relevant innhold. Du kan godta alt, bruke kun nødvendige eller tilpasse valgene dine. Les{' '}
                  <Link
                    href={'/personvern' as Route}
                    className='font-medium text-primary underline underline-offset-4 transition-colors hover:text-cloud-dancer'
                  >
                    personvernerklæringen
                  </Link>
                  .
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:min-w-fit sm:flex-row sm:items-center'>
                <ConsentActionButton onClick={() => setShowDetails(true)} tone='ancient'>
                  Tilpass
                </ConsentActionButton>
                <ConsentActionButton onClick={handleUseNecessaryOnly}>Kun nødvendige</ConsentActionButton>
                <ConsentActionButton onClick={handleAcceptAll} tone='primary'>
                  Godta alle
                </ConsentActionButton>
              </div>
            </div>
          : <div className='space-y-6 animate-in fade-in duration-300 motion-reduce:animate-none'>
              <div className='space-y-3'>
                <h3
                  id='cookie-consent-title'
                  className='font-google-sans text-xl font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer md:text-2xl'
                >
                  Tilpass dine valg
                </h3>
                <p
                  id='cookie-consent-description'
                  className='  text-sm leading-[1.45]   text-cloud-dancer/82 md:text-base'
                >
                  Velg hvilke informasjonskapsler du vil bruke. Nødvendige kapsler holder handlekurv,
                  sikkerhet og sidefunksjoner i gang.
                </p>
              </div>

              <div className='grid gap-4 md:grid-cols-3'>
                <ConsentPreferenceCard
                  title='Nødvendige'
                  description='Holder handlekurv, sikkerhet og grunnleggende funksjoner i gang.'
                  checked={true}
                  disabled
                />
                <ConsentPreferenceCard
                  title='Statistikk'
                  description='Hjelper oss å se hva som fungerer, slik at siden blir raskere og enklere å bruke.'
                  checked={consent.analytics}
                  onCheckedChange={checked =>
                    setConsent(previousConsent => ({
                      ...previousConsent,
                      analytics: checked
                    }))
                  }
                />
                <ConsentPreferenceCard
                  title='Markedsføring'
                  description='Gjør innhold og annonser mer relevante når du møter Utekos andre steder.'
                  checked={consent.marketing}
                  onCheckedChange={checked =>
                    setConsent(previousConsent => ({
                      ...previousConsent,
                      marketing: checked
                    }))
                  }
                />
              </div>

              <div className='flex flex-col justify-end gap-3 border-t border-cloud-dancer/12 pt-4 sm:flex-row'>
                <ConsentActionButton onClick={() => setShowDetails(false)} tone='ancient'>
                  Tilbake
                </ConsentActionButton>
                <ConsentActionButton onClick={handleUseNecessaryOnly} tone='cloud'>
                  Kun nødvendige
                </ConsentActionButton>
                <ConsentActionButton onClick={handleSaveSelection} tone='primary'>
                  Lagre valg
                </ConsentActionButton>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
