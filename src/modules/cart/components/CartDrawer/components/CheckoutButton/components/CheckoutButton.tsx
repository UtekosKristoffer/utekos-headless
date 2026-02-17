// Path: src/components/cart/CheckoutButton/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { track } from '@vercel/analytics'
import { Button } from '@/components/ui/button'
import { getCheckoutAriaLabel } from '@/components/cart/CheckoutButton/utils/getCheckoutAriaLabel'
import { getCookie } from '@/lib/tracking/utils/getCookie'
import { sendGTMEvent } from '@next/third-parties/google'
import { trackInitiateCheckout } from '@/lib/tracking/client/trackInitiateCheckout'

type CheckoutButtonProps = {
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
  'asChild' | 'disabled' | 'aria-label' | 'onClick'
>

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
}: CheckoutButtonProps): React.JSX.Element => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPending || !cartId) {
      e.preventDefault()

      if (!cartId) {
        console.error('CheckoutButton onClick: Missing cartId!')
      }
      return
    }

    try {
      // 1. Delegér CAPI, Pixels og Redis-logikk til vår dedikerte tracking-funksjon
      const generatedEventId = trackInitiateCheckout({
        cartId,
        checkoutUrl,
        subtotalAmount,
        currency,
        itemIds: item_ids,
        numItems: num_items
      })

      // 2. Isolerte Analytics-kall (Vercel & GTM - Hører hjemme i UI-laget)
      track('Vercel Analytics', {
        event: 'CheckoutButtonClick',
        quantity: num_items || 1,
        value: subtotalAmount,
        currency: currency,
        cart_id: cartId,
        _fpc: getCookie('_fpc'),
        external_id: getCookie('ute_ext_id') || 'unknown',
        event_name: 'CheckoutButtonClick',
        event_id: generatedEventId
      })

      sendGTMEvent({
        event: 'slow',
        value: 'xyz',
        event_category: 'engagement'
      })
    } catch (error) {
      console.error('Feil under sending av checkout-events:', error)
    }
  }

  return (
    <Button
      onClick={onClick}
      asChild
      className={className}
      data-track='CheckoutButtonClick'
      disabled={isPending}
      aria-label={getCheckoutAriaLabel(subtotal, isPending)}
      {...props}
    >
      <a href={checkoutUrl} aria-disabled={isPending} rel='noopener noreferrer'>
        {children || (isPending ? 'Behandler...' : 'Gå til kassen')}
      </a>
    </Button>
  )
}
