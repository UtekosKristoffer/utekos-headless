'use client'

import { generateEventID } from '@/lib/tracking/utils/generateEventID'
import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'
import { sendBrowserEventToCapi } from '@/modules/analytics/client/sendBrowserEventToCapi'
import { getCookie } from '@/lib/tracking/utils/getCookie'
import type { CaptureIdentifiersPayload } from 'types/analytics/network'

type InitiateCheckoutProps = {
  cartId: string
  checkoutUrl: string
  subtotalAmount: string
  currency: string
  itemIds: string[]
  numItems: number
}

export function trackInitiateCheckout({
  cartId,
  checkoutUrl,
  subtotalAmount,
  currency,
  itemIds,
  numItems
}: InitiateCheckoutProps): string {
  // 1. Prepare Data
  const cleanItemIds = itemIds.map(id => cleanShopifyId(id) || id)
  // Vi erstatter 'evt_' med 'ic_' for å skille event-typen, men beholder unikhet
  const eventId = generateEventID().replace('evt_', 'ic_')
  const value = Number.parseFloat(subtotalAmount || '0') || 0
  const timestamp = Math.floor(Date.now() / 1000)
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : checkoutUrl

  // 2. Fire Client Pixels (Legacy Bridge)
  if (typeof window !== 'undefined') {
    // Meta
    if (window.fbq) {
      window.fbq(
        'track',
        'InitiateCheckout',
        {
          value,
          currency,
          content_ids: cleanItemIds,
          content_type: 'product',
          num_items: numItems
        },
        { eventID: eventId }
      )
    }

    // Snapchat
    if (window.snaptr) {
      window.snaptr('track', 'START_CHECKOUT', {
        price: value,
        currency: currency,
        number_items: numItems,
        item_ids: cleanItemIds,
        client_dedup_id: eventId
      })
    }

    // Pinterest
    if (window.pintrk) {
      window.pintrk('track', 'InitiateCheckout', {
        value: value,
        currency: currency,
        order_quantity: numItems,
        product_ids: cleanItemIds,
        event_id: eventId
      })
    }

    // TikTok
    if (window.ttq) {
      window.ttq.track(
        'InitiateCheckout',
        {
          content_id: cleanItemIds[0], // TikTok foretrekker ofte singel ID eller array avhengig av oppsett
          content_type: 'product',
          value: value,
          currency: currency,
          quantity: numItems
        },
        { event_id: eventId }
      )
    }
  }

  // 3. CAPTURE IDENTIFIERS (Bevare eksisterende backend-logikk)
  // Dette er kritisk for at Webhooken (Purchase) senere skal kunne finne igjen brukeren
  const captureBody: CaptureIdentifiersPayload = {
    cartId,
    checkoutUrl,
    eventId,
    userData: {
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      external_id: getCookie('ute_ext_id'),
      email_hash: getCookie('ute_user_hash'),
      client_user_agent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    }
  }

  // Vi bruker 'void' operator eller catch for å ikke blokkere UI
  fetch('/api/checkout/capture-identifiers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(captureBody),
    keepalive: true
  }).catch(err => console.error('[Analytics] Capture identifiers failed', err))

  // 4. Send Strict Server Event (The New Way)
  // Erstatter den gamle manuelle fetch('/api/tracking-events')
  sendBrowserEventToCapi({
    eventName: 'InitiateCheckout',
    eventId: eventId,
    occurredAt: timestamp,
    sourceUrl: currentUrl,
    data: {
      currency: currency as any,
      value: value,
      contentIds: cleanItemIds
      // Vi har ikke full item-info her (kun IDer), så vi sender ikke 'items'-arrayet ennå.
      // Dette er en begrensning i propsene til funksjonen, men akseptabelt for IC.
    }
  }).catch(err => console.error('[Analytics] CAPI IC failed', err))

  return eventId
}
