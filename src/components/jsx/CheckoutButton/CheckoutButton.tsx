'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { CustomData, UserData } from '@types'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { getCookie } from './getCookie'
import { sendJSON } from './sendJSON'
import { generateEventID } from './generateEventID'

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
    console.log('Button Clicked!')
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      sendJSON('/api/log/checkout-start', { cartId })

      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
      const sourceUrl =
        typeof window !== 'undefined' ? window.location.href : undefined
      const eventID = generateEventID().replace('evt_', 'ic_')
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

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {}, { eventID })
      }

      const capiPayload = {
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventSourceUrl: sourceUrl,
        eventData: {} as CustomData,
        userData: {} as UserData
      }
      if (ua) capiPayload.userData!.client_user_agent = ua
      sendJSON('/api/meta-events', capiPayload)

      if (typeof window.snaptr === 'function') {
        const snapData = {
          price: parseFloat(subtotalAmount),
          currency: currency,
          item_ids: item_ids,
          item_category: 'product',
          number_items: num_items,
          client_deduplication_id: eventID
        }
        window.snaptr('track', 'START_CHECKOUT', snapData)
        console.log('🛒 Snap Pixel: START_CHECKOUT tracked', { snapData })
      }
      const snapCapiPayload = {
        eventName: 'START_CHECKOUT',
        eventId: eventID,
        eventSourceUrl: sourceUrl,
        eventData: {
          value: parseFloat(subtotalAmount),
          currency: currency,
          content_ids: item_ids,
          num_items: num_items
        }
        // userData: {} // Hentes av API-rute
      }
      sendJSON('/api/snap-events', snapCapiPayload)
      console.log('🛒 Snap CAPI: START_CHECKOUT request sent', {
        snapCapiPayload
      })
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
