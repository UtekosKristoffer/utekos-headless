'use client'
import { track } from '@vercel/analytics'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { MetaUserData, MetaEventPayload, CaptureBody } from '@types'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { generateEventID } from '@/components/analytics/MetaPixel/generateEventID'
import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { sendGTMEvent } from '@next/third-parties/google'
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

      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const extId = getCookie('ute_ext_id')
      const emailHash = getCookie('ute_user_hash')
      const ua =
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
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

      const snapId = getCookie('ute_sc_cid')
      const metaId = fbc
      const pinId = getCookie('_epik')
      const tiktokId = getCookie('ute_ttclid')

      const sources = []
      if (snapId) sources.push('Snapchat 👻')
      if (metaId) sources.push('Meta 💙')
      if (pinId) sources.push('Pinterest 📌')
      if (tiktokId) sources.push('TikTok 🎵')

      if (sources.length > 0) {
        const sourceLabel = sources.join(' + ')
        fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: 'INFO',
            event: `💳 InitiateCheckout fra ${sourceLabel}`,
            context: {
              source: sourceLabel,
              value,
              cartId,
              snapId: snapId || undefined,
              metaId: metaId || undefined,
              pinId: pinId || undefined,
              tiktokId: tiktokId || undefined
            }
          })
        }).catch(() => {})
      }

      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq(
          'track',
          'InitiateCheckout',
          {
            value,
            currency,
            content_ids: cleanItemIds,
            content_type: 'product',
            num_items
          },
          { eventID }
        )
      }

      if (typeof window !== 'undefined' && window.snaptr) {
        window.snaptr('track', 'START_CHECKOUT', {
          price: value,
          currency: currency,
          number_items: num_items,
          item_ids: cleanItemIds
        })
      }
      if (typeof window !== 'undefined' && window.pintrk) {
        window.pintrk?.('track', 'InitiateCheckout', {
          value: value,
          currency: currency,
          order_quantity: num_items,
          product_ids: cleanItemIds
        })
      }

      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track(
          'InitiateCheckout',
          {
            content_id: cleanItemIds[0], // TikTok foretrekker ofte én hoved-ID eller array mapping
            content_type: 'product',
            value: value,
            currency: currency,
            quantity: num_items
          },
          { event_id: eventID }
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
        actionSource: 'website',
        userData,
        eventData: {
          value,
          currency,
          content_ids: cleanItemIds,
          content_type: 'product',
          num_items
        }
      }

      fetch('/api/tracking-events', {
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
      onClick={() => {
        track('Vercel Analytics', {
          event: 'CheckoutButtonClick',
          quantity: num_items | 1,
          value: subtotalAmount,
          currency: currency,
          cart_id: cartId || 'unknown',
          _fpc: getCookie('_fpc'),
          external_id: getCookie('ute_ext_id') || 'unknown',
          event_name: 'CheckoutButtonClick',
          event_id: generateEventID()
        })
        sendGTMEvent({
          event: 'slow',
          value: 'xyz',
          event_category: 'engagement'
        })
      }}
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
