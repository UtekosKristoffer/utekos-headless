// Path: src/components/ui/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { CustomData, UserData } from '@types' // Assuming these exist

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
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}
export const CheckoutButton = ({
  checkoutUrl,
  subtotal,
  isPending,
  cartId,
  className,
  children,
  ...props
}: {
  checkoutUrl: string
  subtotal: string
  isPending: boolean
  cartId: string | null | undefined
  className?: string
  children?: React.ReactNode // Korrigert type
} & Omit<
  React.ComponentProps<typeof Button>,
  'asChild' | 'disabled' | 'aria-label'
>): React.JSX.Element => {
  const onClick = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('Button Clicked!')
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      console.log('CheckoutButton onClick: checkoutUrl =', checkoutUrl)
      console.log('CheckoutButton onClick: cartId =', cartId)

      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
      const sourceUrl =
        typeof window !== 'undefined' ? window.location.href : undefined
      const eventID = generateEventId().replace('evt_', 'ic_')

      // 1) Capture identifiers
      const captureBody = {
        cartId: cartId,
        checkoutUrl: checkoutUrl,
        eventId: eventID,
        userData: {} as UserData
      }
      if (fbp) captureBody.userData.fbp = fbp
      if (fbc) captureBody.userData.fbc = fbc
      if (ua) captureBody.userData.client_user_agent = ua

      console.log('Sending to /api/checkout/capture-identifiers:', captureBody)
      sendJSON('/api/checkout/capture-identifiers', captureBody)

      // 2) Pixel: InitiateCheckout
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {}, { eventID })
        console.log('🛒 Meta Pixel: InitiateCheckout tracked', { eventID })
      }

      // 3) CAPI: InitiateCheckout
      const capiPayload = {
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventSourceUrl: sourceUrl,
        eventData: {} as CustomData,
        userData: {} as UserData
      }
      if (ua) capiPayload.userData!.client_user_agent = ua
      sendJSON('/api/meta-events', capiPayload)
      console.log('🛒 Meta CAPI: InitiateCheckout request sent', {
        capiPayload
      })
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
  } // Slutt på onClick funksjon uten useCallback

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
