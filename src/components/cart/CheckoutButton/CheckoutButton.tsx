'use client'
import { track } from '@vercel/analytics'
import * as React from 'react'
import { dispatchMetaTrackingEvent } from '@/lib/tracking/meta/dispatchMetaTrackingEvent'
import { getClientMetaUserData } from '@/lib/tracking/meta/getClientMetaUserData'
import { Button } from '@/components/ui/button'
import type { CaptureBody, MetaUserData } from 'types/tracking/meta'
import { getCheckoutAriaLabel } from './getCheckoutAriaLabel'
import { generateEventID } from '@/components/analytics/Meta/generateEventID'
import { getCookie } from '@/components/analytics/Meta/getCookie'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { trackMicrosoftUetEvent } from '@/lib/tracking/microsoft-uet/trackMicrosoftUetEvent'
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
  const onClick = () => {
    if (isPending) return
    if (!cartId) {
      console.error('CheckoutButton onClick: Missing cartId!')
      return
    }

    try {
      const cleanItemIds = item_ids.map(id => cleanShopifyId(id) || id)

      const rawEventID = generateEventID()
      const eventID = rawEventID.replace('evt_', 'ic_')
      const value = Number.parseFloat(subtotalAmount || '0') || 0
      const userData: MetaUserData = getClientMetaUserData()

      const snapId = getCookie('ute_sc_cid')
      const metaId = userData.fbc
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

      trackMicrosoftUetEvent({
        category: 'ecommerce',
        action: 'begin_checkout',
        label: cartId,
        value: num_items,
        revenueValue: value,
        currency,
        productId: cleanItemIds,
        pageType: 'cart',
        eventId: eventID
      })

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

      void dispatchMetaTrackingEvent({
        eventName: 'InitiateCheckout',
        eventId: eventID,
        eventData: {
          value,
          currency,
          content_ids: cleanItemIds,
          content_type: 'product',
          num_items
        },
        userData
      })
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
  }

  return (
    <Button
      onClick={() => {
        const valueNum = Number.parseFloat(subtotalAmount || '0') || 0
        const cleanItemIds = item_ids.map(id => cleanShopifyId(id) || id)

        // 1. Vercel Analytics
        track('Vercel Analytics', {
          event: 'CheckoutButtonClick',
          quantity: num_items || 1,
          value: subtotalAmount,
          currency: currency,
          cart_id: cartId || 'unknown',
          _fpc: getCookie('_fpc'),
          external_id: getCookie('ute_ext_id') || 'unknown',
          event_name: 'CheckoutButtonClick',
          event_id: generateEventID()
        })

        // 2. Google Analytics 4 (begin_checkout)
        // Dette formatet plukkes automatisk opp av "Send Ecommerce data"-avkrysningen
        // i GTM-taggen din!
        sendGTMEvent({
          event: 'begin_checkout',
          ecommerce: {
            currency: currency,
            value: valueNum,
            items: cleanItemIds.map(id => ({
              item_id: id
            }))
          }
        })
      }}
      asChild
      className={className}
      data-track='CheckoutButtonClick'
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
