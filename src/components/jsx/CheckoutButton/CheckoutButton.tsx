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
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      sendJSON('/api/log', {
        event: 'Checkout Started',
        level: 'info',
        context: { cartId }
      })
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const extId = getCookie('ute_ext_id')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
      const sourceUrl =
        typeof window !== 'undefined' ? window.location.href : undefined

      const eventID = generateEventID().replace('evt_', 'ic_')

      const captureBody = {
        cartId,
        checkoutUrl,
        eventId: eventID,
        userData: {} as UserData
      }

      if (fbp) captureBody.userData.fbp = fbp
      if (fbc) captureBody.userData.fbc = fbc
      if (extId) captureBody.userData.external_id = extId
      if (ua) captureBody.userData.client_user_agent = ua

      sendJSON('/api/checkout/capture-identifiers', captureBody)
      const value = Number.parseFloat(subtotalAmount || '0') || 0

      const customData: CustomData = {
        value,
        currency,
        content_name: 'string',
        content_ids: item_ids,
        content_type: 'product',
        num_items
      }

      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', customData, { eventID })
      }

      const capiPayload: {
        eventName: string
        eventId: string
        eventSourceUrl?: string
        eventData?: CustomData
        userData?: UserData
      } = {
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventSourceUrl: sourceUrl ?? checkoutUrl,
        eventData: customData,
        userData: {}
      }

      if (ua) capiPayload.userData!.client_user_agent = ua
      if (extId) capiPayload.userData!.external_id = extId
      if (fbp) capiPayload.userData!.fbp = fbp
      if (fbc) capiPayload.userData!.fbc = fbc

      sendJSON('/api/meta-events', capiPayload)
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
