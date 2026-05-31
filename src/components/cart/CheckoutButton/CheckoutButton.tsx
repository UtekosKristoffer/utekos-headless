// Path: src/components/cart/CheckoutButton/CheckoutButton.tsx
'use client'

import { track } from '@vercel/analytics'
import * as React from 'react'
import { cn } from '@/lib/utils/className'
import { dispatchMetaTrackingEvent } from '@/lib/tracking/meta/dispatchMetaTrackingEvent'
import { getClientMetaUserData } from '@/lib/tracking/meta/utils/getClientMetaUserData'
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
  disabled = false,
  disabledReason,
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
  disabled?: boolean
  disabledReason?: string
  cartId: string | null | undefined
  subtotalAmount: string
  currency: string
  item_ids: string[]
  num_items: number
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<typeof Button>, 'asChild' | 'disabled' | 'aria-label'>): React.JSX.Element => {
  const isDisabled = isPending || disabled
  const buttonText = disabledReason ?? children ?? (isPending ? 'Behandler...' : 'Gå til kassen')

  const trackCheckout = () => {
    if (isDisabled) return

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
          currency,
          number_items: num_items,
          item_ids: cleanItemIds
        })
      }

      if (typeof window !== 'undefined' && window.pintrk) {
        window.pintrk?.('track', 'InitiateCheckout', {
          value,
          currency,
          order_quantity: num_items,
          product_ids: cleanItemIds
        })
      }

      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track(
          'InitiateCheckout',
          {
            content_id: cleanItemIds[0],
            content_type: 'product',
            value,
            currency,
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

  const trackAnalytics = () => {
    if (isDisabled) return

    const valueNum = Number.parseFloat(subtotalAmount || '0') || 0
    const cleanItemIds = item_ids.map(id => cleanShopifyId(id) || id)

    track('Vercel Analytics', {
      event: 'CheckoutButtonClick',
      quantity: num_items || 1,
      value: subtotalAmount,
      currency,
      cart_id: cartId || 'unknown',
      _fpc: getCookie('_fpc'),
      external_id: getCookie('ute_ext_id') || 'unknown',
      event_name: 'CheckoutButtonClick',
      event_id: generateEventID()
    })

    sendGTMEvent({
      event: 'begin_checkout',
      ecommerce: {
        currency,
        value: valueNum,
        items: cleanItemIds.map(id => ({
          item_id: id
        }))
      }
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    trackAnalytics()
    trackCheckout()
  }

  return (
    <Button
      asChild
      className={cn('bg-primary text-background hover:brightness-110', className)}
      data-track='CheckoutButtonClick'
      disabled={isDisabled}
      aria-label={disabledReason ?? getCheckoutAriaLabel(subtotal, isPending)}
      {...props}
    >
      <a
        href={checkoutUrl}
        onClick={handleClick}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
        rel='noopener noreferrer'
      >
        {buttonText}
      </a>
    </Button>
  )
}
