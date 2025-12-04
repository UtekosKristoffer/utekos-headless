// Path: src/components/jsx/CheckoutButton/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { MetaUserData, MetaEventPayload, CaptureBody } from '@types'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

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

      const cleanItemIds = item_ids.map(id => cleanShopifyId(id) || id)

      // Vi bruker den robuste getCookie som håndterer decoding
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const extId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined

      // Genererer krypto-sikker Event ID (evt_...)
      // Vi bruker 'ic_' prefix for InitiateCheckout for enkel debugging,
      // men beholder formatet fra generateEventID
      const rawEventID = generateEventID()
      const eventID = rawEventID.replace('evt_', 'ic_')

      const value = Number.parseFloat(subtotalAmount || '0') || 0

      const userData: MetaUserData = {
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        external_id: extId || undefined,
        email_hash: emailHash || undefined,
        client_user_agent: ua
      }

      // 2. Browser Pixel Tracking (Client-Side)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
          'track',
          'InitiateCheckout',
          {
            value,
            currency,
            content_ids: cleanItemIds, // Send rensede ID-er
            content_type: 'product',
            num_items
          },
          { eventID }
        )
      }

      // 3. Capture Identifiers (Redis lagring for Webhook enrichment)
      // Dette er kritisk for at "Purchase" eventet senere skal kunne dedupliseres
      const captureBody: CaptureBody = {
        cartId,
        checkoutUrl,
        eventId: eventID,
        userData
      }

      // Vi bruker keepalive: true for å sikre at requesten fullføres
      // selv om nettleseren redirecter til checkout umiddelbart
      fetch('/api/checkout/capture-identifiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(captureBody),
        keepalive: true
      }).catch(err => console.error('Capture identifiers failed', err))

      // 4. CAPI Tracking (Server-Side)
      const capiPayload: MetaEventPayload = {
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventSourceUrl:
          typeof window !== 'undefined' ? window.location.href : checkoutUrl,
        eventTime: Math.floor(Date.now() / 1000),
        actionSource: 'website',
        userData,
        eventData: {
          value,
          currency,
          content_ids: cleanItemIds, // Send rensede ID-er
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
