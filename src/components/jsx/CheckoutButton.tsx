// Path: src/components/ui/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { CustomData, UserData } from '@types'

const getCheckoutAriaLabel = (subtotal: string, isPending: boolean): string =>
  isPending ?
    'Behandler bestilling...'
  : `Gå til kassen med subtotal ${subtotal}`

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

/** Fire-and-forget JSON. Bruker sendBeacon ved navigasjon, ellers fetch(keepalive). */
function sendJSON(url: string, data: unknown): void {
  try {
    const payload = JSON.stringify(data)
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const ok = navigator.sendBeacon(
        url,
        new Blob([payload], { type: 'application/json' })
      )
      if (ok) return
      console.warn(
        `navigator.sendBeacon to ${url} failed, falling back to fetch.`
      )
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true
    })
  } catch (error) {
    console.error(`Failed to send analytics data to ${url}:`, error)
    // stille fail – må aldri blokkere checkout
  }
}

/** Generer unik Event ID (lik den i MetaPixelEvents) */
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

export const CheckoutButton = ({
  checkoutUrl,
  subtotal,
  isPending,
  className,
  children,
  ...props
}: {
  checkoutUrl: string
  subtotal: string
  isPending: boolean
  className?: string
  children?: React.ReactNode
} & Omit<
  React.ComponentProps<typeof Button>,
  'asChild' | 'disabled' | 'aria-label'
>): React.JSX.Element => {
  const onClick = React.useCallback(
    (_e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isPending) return

      try {
        const fbp = getCookie('_fbp')
        const fbc = getCookie('_fbc')
        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        const sourceUrl =
          typeof window !== 'undefined' ? window.location.href : undefined

        // ---- Unik Event ID for InitiateCheckout ----
        const eventID = generateEventId().replace('evt_', 'ic_') // Bruk prefiks for lesbarhet

        // 1) Capture identifiers til Redis (som før, men legg til eventID?)
        //    Vurder om cartId *faktisk* er tilgjengelig her. Hvis ikke, må den hentes.
        const cartIdFromContext = 'unknown' // Hvordan får vi tak i cartId her? Trengs Context eller prop.
        const captureBody = {
          cartId: cartIdFromContext, // <--- MÅ FIKSES HVIS DU BRUKER DENNE
          checkoutUrl,
          eventId: eventID, 
          userData: {} as UserData // Start med tomt objekt, bruk UserData type
        }
        if (fbp) captureBody.userData.fbp = fbp
        if (fbc) captureBody.userData.fbc = fbc
        if (ua) captureBody.userData.client_user_agent = ua
        // La Redis-ruten hente IP
        sendJSON('/api/checkout/capture-identifiers', captureBody)
        console.log('📦 Identifier Capture request sent', { captureBody })

        // 2) Pixel: InitiateCheckout (med eventID)
        if (typeof window.fbq === 'function') {
          // Send grunnleggende InitiateCheckout, Meta anbefaler ofte flere params her (value, currency, contents)
          // Men for enkelhet og dedupe, holder det med eventID foreløpig.
          window.fbq('track', 'InitiateCheckout', {}, { eventID })
          console.log('🛒 Meta Pixel: InitiateCheckout tracked', { eventID })
        }

        // 3) CAPI: InitiateCheckout (via /api/meta-events)
        const capiPayload: {
          eventName: string
          eventId: string
          eventSourceUrl?: string
          eventData?: CustomData // Tomt for nå, men kan fylles
          userData?: UserData
        } = {
          eventName: 'InitiateCheckout',
          eventId: eventID, // Samme ID som Pixel
          ...(sourceUrl && { eventSourceUrl: sourceUrl }),
          eventData: {}, // Kan legge til value/currency/contents hvis tilgjengelig
          userData: {}
        }
        // Fyll userData betinget (kun UA fra klient)
        if (ua) capiPayload.userData!.client_user_agent = ua

        sendJSON('/api/meta-events', capiPayload)

        console.log('🛒 Meta CAPI: InitiateCheckout request sent', {
          capiPayload
        })
      } catch (error) {
        console.error('Feil under sending av checkout-events:', error)
        // aldri blokkér navigasjon
      }
    },
    [checkoutUrl, isPending] // Fjern subtotal hvis den ikke brukes i callbacken
  )

  return (
    <Button
      asChild
      className={className}
      disabled={isPending}
      aria-label={getCheckoutAriaLabel(subtotal, isPending)}
      {...props}
    >
      <a
        href={checkoutUrl}
        onClick={onClick} // Kjør event-sending FØR navigering starter
        aria-disabled={isPending}
        rel='noopener noreferrer' // Viktig for sikkerhet ved eksterne lenker (som checkout)
      >
        {children || (isPending ? 'Behandler...' : 'Gå til kassen')}
      </a>
    </Button>
  )
}
