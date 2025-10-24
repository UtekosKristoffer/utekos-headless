// Path: src/components/ui/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { InitiateCheckoutInput } from '@types'

/**
 * Generates appropriate aria-label for checkout button based on cart state.
 */
const getCheckoutAriaLabel = (subtotal: string, isPending: boolean): string =>
  isPending ?
    'Behandler bestilling...'
  : `Gå til kassen med subtotal ${subtotal}`

/** Les en cookie trygt (lokal util for å unngå nye imports) */
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
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true
    })
  } catch {
    // stille fail – må aldri blokkere checkout
  }
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
        // Les eksisterende cookies du allerede setter i MetaPixelEvents.tsx
        const fbp = getCookie('_fbp')
        const fbc = getCookie('_fbc')
        const ua =
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined

        // 1) Capture identifiers til Redis (for Purchase-webhooken)
        const captureBody: {
          cartId: string
          checkoutUrl: string
          userData: {
            fbp?: string
            fbc?: string
            client_user_agent?: string
            client_ip_address?: string
            external_id?: string
          }
          eventId?: string
        } = {
          cartId: 'unknown', // fyll faktisk cartId her hvis du har den i scope
          checkoutUrl,
          userData: {}
        }
        if (fbp) captureBody.userData.fbp = fbp
        if (fbc) captureBody.userData.fbc = fbc
        if (ua) captureBody.userData.client_user_agent = ua

        sendJSON('/api/checkout/capture-identifiers', captureBody)

        // 2) Pixel: InitiateCheckout (lettvekts; det viktige er at eventet finnes for coverage)
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
          window.fbq('track', 'InitiateCheckout')
        }

        // 3) CAPI: InitiateCheckout
        const sourceUrl =
          typeof location !== 'undefined' ? location.href : undefined
        const capiPayload: InitiateCheckoutInput = {
          userData: {},
          ...(sourceUrl !== undefined && { sourceUrl }),
          occuredAt: Date.now()
        }
        if (fbp) capiPayload.userData.fbp = fbp
        if (fbc) capiPayload.userData.fbc = fbc
        if (ua) capiPayload.userData.client_user_agent = ua

        sendJSON('/api/meta/capi/initiated-checkout', capiPayload)
      } catch {
        // aldri blokkér navigasjon
      }
    },
    [checkoutUrl, isPending]
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
        onClick={onClick}
        aria-disabled={isPending}
        rel='noopener noreferrer'
      >
        {children || (isPending ? 'Behandler...' : 'Gå til kassen')}
      </a>
    </Button>
  )
}
