// Path: src/components/ui/CheckoutButton.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

/**
 * Generates appropriate aria-label for checkout button based on cart state.
 */
const getCheckoutAriaLabel = (subtotal: string, isPending: boolean): string => (isPending ? 'Behandler bestilling...' : `Gå til kassen med subtotal ${subtotal}`)

/**
 * Pure, reusable checkout button component for external checkout navigation.
 * Optimized for Shopify checkout URLs with proper accessibility and security.
 */
export const CheckoutButton = ({
  checkoutUrl,
  subtotal,
  isPending,
  className,
  children,
  ...props
}: {
  checkoutUrl: string
  subtotal: string
  isPending: boolean
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<typeof Button>, 'asChild' | 'disabled' | 'aria-label'>): React.JSX.Element => (
  <Button asChild className={className} disabled={isPending} aria-label={getCheckoutAriaLabel(subtotal, isPending)} {...props}>
    <a href={checkoutUrl} aria-disabled={isPending} rel='noopener noreferrer'>
      {children || (isPending ? 'Behandler...' : 'Gå til kassen')}
    </a>
  </Button>
)
