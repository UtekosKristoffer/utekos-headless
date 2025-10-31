# Cookie Logic

## src/components/cookie-consent/CookieConsent.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useConsent } from './useConsent'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { ConsentCategory } from './CookieConsentProvider'

interface CookieOption {
  id: ConsentCategory
  name: string
  description: string
  required: boolean
}

export default function CookieConsent() {
  const {
    consent,
    hasInteracted,
    updateConsent,
    acceptAll,
    rejectNonEssential,
    savePreferences
  } = useConsent()
  const [open, setOpen] = useState(false)

  // Show the modal when the component mounts if the user hasn't interacted yet
  useEffect(() => {
    if (!hasInteracted) {
      setOpen(true)
    }
  }, [hasInteracted])

  const cookieOptions: CookieOption[] = [
    {
      id: 'necessary',
      name: 'Nødvendige',
      description:
        'Disse er nødvendige for at nettstedet skal fungere, og kan ikke deaktiveres.',
      required: true
    },
    {
      id: 'functional',
      name: 'Funksjonelle',
      description:
        'Disse muliggjør tilpassede funksjoner og funksjonalitet, som for eksempel videoer og chat.',
      required: false
    },
    {
      id: 'analytics',
      name: 'Analyse og statistikk',
      description:
        'Disse hjelper oss å forstå hvordan besøkende bruker nettstedet vårt (Google Analytics, PostHog).',
      required: false
    },
    {
      id: 'marketing',
      name: 'Markedsføring',
      description:
        'Disse brukes til å spore besøkende på tvers av nettsteder for å vise relevante annonser (Meta Pixel).',
      required: false
    }
  ]

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

  const handleOpenChange = (newOpen: boolean) => {
    if (hasInteracted) {
      setOpen(newOpen)
    } else {
      // If they try to close without making a choice, keep it open
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Innstillinger for informasjonskapsler</DialogTitle>
          <DialogDescription>
            Vi bruker informasjonskapsler for å forbedre nettopplevelsen din,
            analysere trafikken på siden og tilpasse innhold.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {cookieOptions.map(option => (
            <div
              key={option.id}
              className='flex items-start justify-between space-x-4 p-3 rounded-lg border'
            >
              <div className='space-y-1'>
                <Label htmlFor={option.id} className='text-sm font-medium'>
                  {option.name}
                </Label>
                <p className='text-xs text-muted-foreground'>
                  {option.description}
                </p>
              </div>
              <Switch
                id={option.id}
                checked={consent[option.id]}
                onCheckedChange={checked => updateConsent(option.id, checked)}
                disabled={option.required}
                aria-readonly={option.required}
              />
            </div>
          ))}
        </div>
        <DialogFooter className='flex-col sm:flex-row gap-2'>
          <Button
            variant='outline'
            className='sm:w-auto'
            onClick={handleRejectNonEssential}
          >
            Avslå alle
          </Button>
          <Button
            variant='outline'
            className='sm:w-auto'
            onClick={handleSavePreferences}
          >
            Lagre mine valg
          </Button>
          <Button className='sm:w-auto' onClick={handleAcceptAll}>
            Aksepter alle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## src/components/cookie-consent/CookieConsentProvider.tsx

```tsx
'use client'

import { createContext, useEffect, useState, type ReactNode } from 'react'
import Cookies from 'js-cookie'

export type ConsentCategory =
  | 'necessary'
  | 'functional'
  | 'analytics'
  | 'marketing'

export interface ConsentState {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
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
  necessary: true, // Always required
  functional: false,
  analytics: false,
  marketing: false
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
const COOKIE_EXPIRY = 365 // Days

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Load consent state from cookie on mount
  useEffect(() => {
    const savedConsent = Cookies.get(COOKIE_NAME)

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent)
        setConsent({
          ...defaultConsentState,
          ...parsedConsent
        })
        setHasInteracted(true)
      } catch (e) {
        console.error('Error parsing consent cookie:', e)
      }
    }

    setIsLoaded(true)
  }, [])

  const updateConsent = (category: ConsentCategory, value: boolean) => {
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
      marketing: true
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
      marketing: false
    }
    setConsent(essentialOnly)
    saveConsentCookie(essentialOnly)
    setHasInteracted(true)
  }

  const savePreferences = () => {
    saveConsentCookie(consent)
    setHasInteracted(true)
  }

  const saveConsentCookie = (consentState: ConsentState) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(consentState), {
      expires: COOKIE_EXPIRY,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })
  }

  // Only render children after we've checked for existing consent
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
```

## src/components/cookie-consent/CookieSettingsButton.tsx

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useConsent } from './useConsent'
import type { ConsentCategory } from './CookieConsentProvider'

interface CookieOption {
  id: ConsentCategory
  name: string
  description: string
  required: boolean
}

export default function CookieSettingsButton() {
  const {
    consent,
    updateConsent,
    acceptAll,
    rejectNonEssential,
    savePreferences
  } = useConsent()
  const [open, setOpen] = useState(false)

  const cookieOptions: CookieOption[] = [
    {
      id: 'necessary',
      name: 'Strictly Necessary',
      description:
        'These cookies are essential for the website to function properly and cannot be disabled.',
      required: true
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description:
        'These cookies enable personalized features and functionality such as videos and live chat.',
      required: false
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description:
        'These cookies help us understand how visitors interact with our website (Google Analytics, PostHog).',
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description:
        'These cookies are used to track visitors across websites to display relevant advertisements (Facebook Pixel).',
      required: false
    }
  ]

  const handleSave = () => {
    savePreferences()
    setOpen(false)
  }

  const handleAcceptAll = () => {
    acceptAll()
    setOpen(false)
  }

  const handleRejectAll = () => {
    rejectNonEssential()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Cookie Settings
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Cookie Settings</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. You can enable or disable different
            types of cookies below.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {cookieOptions.map(option => (
            <div
              key={option.id}
              className='flex items-start justify-between space-x-4 p-3 rounded-lg border'
            >
              <div className='space-y-1'>
                <Label
                  htmlFor={`dialog-${option.id}`}
                  className='text-sm font-medium'
                >
                  {option.name}
                </Label>
                <p className='text-xs text-muted-foreground'>
                  {option.description}
                </p>
              </div>
              <Switch
                id={`dialog-${option.id}`}
                checked={consent[option.id]}
                onCheckedChange={checked => updateConsent(option.id, checked)}
                disabled={option.required}
                aria-readonly={option.required}
              />
            </div>
          ))}
        </div>
        <DialogFooter className='flex-col sm:flex-row gap-2'>
          <Button variant='outline' onClick={handleRejectAll}>
            Reject All
          </Button>
          <Button variant='outline' onClick={handleSave}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## src/components/cookie-consent/TrackingScripts.tsx

```tsx
'use client'

import { useConsent } from './useConsent'
import Script from 'next/script'

interface TrackingScriptsProps {
  googleAnalyticsId?: string
  facebookPixelId?: string
  postHogApiKey?: string
  postHogHost?: string
}

export default function TrackingScripts({
  googleAnalyticsId,
  facebookPixelId,
  postHogApiKey,
  postHogHost = 'https://app.posthog.com'
}: TrackingScriptsProps) {
  const { consent } = useConsent()

  return (
    <>
      {/* Google Analytics */}
      {consent.analytics && googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy='afterInteractive'
          />
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {consent.marketing && facebookPixelId && (
        <>
          <Script id='facebook-pixel' strategy='afterInteractive'>
            {` 
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {/* PostHog */}
      {consent.analytics && postHogApiKey && (
        <Script id='posthog-script' strategy='afterInteractive'>
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${postHogApiKey}', {api_host: '${postHogHost}'})
          `}
        </Script>
      )}
    </>
  )
}
```

## src/components/cookie-consent/useConsent.tsx

```tsx
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

// Helper function to check if a specific category is consented
export function useConsentFor(category: ConsentCategory): boolean {
  const { consent } = useConsent()
  return consent[category]
}
```

## src/app/admin/posthog/instrumentation-client.ts

- 100% basert på PostHog sin guide

```ts
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
  ui_host: 'https://eu.posthog.com',
  defaults: '2025-05-24'
})
```

## Vercel Example Layout File

```tsx
import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { CookieConsentProvider } from '@/components//cookie-consent/CookieConsentProvider'
import CookieConsent from '@/components//cookie-consent/CookieConsent'
import TrackingScripts from '@/components/cookie-consent/TrackingScripts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your app description'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <CookieConsentProvider>
            {children}
            <CookieConsent />
            <TrackingScripts
              googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
              facebookPixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID}
              postHogApiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
            />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```
