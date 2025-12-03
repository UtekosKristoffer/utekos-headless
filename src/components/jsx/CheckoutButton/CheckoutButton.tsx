// Path: src/components/jsx/CheckoutButton/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { MetaUserData, MetaEventPayload, CaptureBody } from '@types'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { generateEventID } from './generateEventID'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export const CheckoutButton = ({
  checkoutUrl,
  subtotal,
  isPending,
  cartId,
  subtotalAmount,
  currency,
  item_ids,
  num_items,
  className,
  children,
  ...props
}: {
  checkoutUrl: string
  subtotal: string
  isPending: boolean
  cartId: string | null | undefined
  subtotalAmount: string
  currency: string
  item_ids: string[]
  num_items: number
  className?: string
  children?: React.ReactNode
} & Omit<
  React.ComponentProps<typeof Button>,
  'asChild' | 'disabled' | 'aria-label'
>): React.JSX.Element => {
  const onClick = (_e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const extId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined

      const eventID = generateEventID().replace('evt_', 'ic_')
      const value = Number.parseFloat(subtotalAmount || '0') || 0

      const userData: MetaUserData = {
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id: extId || undefined,
        email_hash: emailHash || undefined,
        client_user_agent: ua
      }

      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
          'track',
          'InitiateCheckout',
          {
            value,
            currency,
            content_ids: item_ids,
            content_type: 'product',
            num_items
          },
          { eventID }
        )
      }

      const captureBody: CaptureBody = {
        cartId,
        checkoutUrl,
        eventId: eventID,
        userData
      }

      fetch('/api/checkout/capture-identifiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(captureBody),
        keepalive: true
      }).catch(err => console.error('Capture identifiers failed', err))

      const capiPayload: MetaEventPayload = {
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventSourceUrl:
          typeof window !== 'undefined' ? window.location.href : checkoutUrl,
        eventTime: Math.floor(Date.now() / 1000),
        userData,
        eventData: {
          value,
          currency,
          content_ids: item_ids,
          content_type: 'product',
          num_items
        }
      }

      fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
        keepalive: true
      }).catch(err => console.error('CAPI IC failed', err))
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
  }

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
