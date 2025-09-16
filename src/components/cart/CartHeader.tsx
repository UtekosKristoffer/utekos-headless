// Path: src/components/cart/CartHeader.tsx
'use client'

import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/Button'
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/Drawer'
import { useCartOptimistic } from '@/hooks/useCartOptimistic'

/**
 * Calculates the total number of items from optimistic cart lines.
 * Developer-facing function, so comment in English.
 */
const calculateItemCount = (lines: Record<string, number>): number =>
  Object.keys(lines).length

/**
 * Determines the correct item text based on count (singular/plural).
 * This handles Norwegian pluralization for customer-facing text.
 */
const getItemText = (count: number): string => (count === 1 ? 'vare' : 'varer')

/**
 * Generates the cart title with proper Norwegian pluralization.
 * Customer-facing text, so in Norwegian.
 */
const getCartTitle = (itemCount: number): string =>
  `Handlekurv (${itemCount} ${getItemText(itemCount)})`

/**
 * Generates contextually appropriate description based on cart state.
 * Customer-facing text, so in Norwegian.
 */
const getCartDescription = (itemCount: number): string =>
  itemCount === 0 ?
    'Din handlekurv er tom. Legg til produkter for å komme i gang.'
  : `Se gjennom ${getItemText(itemCount)} i handlekurven din nedenfor.`

/**
 * Generates accessible aria-label for close button.
 * Customer-facing accessibility text, so in Norwegian.
 */
const getCloseButtonAriaLabel = (itemCount: number): string =>
  `Lukk handlekurv med ${itemCount} ${getItemText(itemCount)}`

/**
 * Renders the header for the cart drawer.
 *
 * This component displays a localized title, dynamic item count with proper pluralization,
 * contextual descriptions, and an accessible close button. It subscribes directly to the
 * cart's optimistic state to ensure immediate UI feedback during mutations.
 *
 * All text generation logic is decomposed into pure, testable functions that follow
 * the single responsibility principle.
 */
export function CartHeader(): React.JSX.Element {
  const optimisticState = useCartOptimistic()
  const itemCount = calculateItemCount(optimisticState.lines)

  return (
    <DrawerHeader className='flex items-center justify-between border-b'>
      <div className='min-w-0 flex-1'>
        <DrawerTitle className='text-lg font-medium leading-tight'>
          {getCartTitle(itemCount)}
        </DrawerTitle>
        <DrawerDescription className='text-sm leading-relaxed'>
          {getCartDescription(itemCount)}
        </DrawerDescription>
      </div>
      <DrawerClose asChild>
        <Button
          variant='ghost'
          size='icon'
          className='ml-4 shrink-0'
          aria-label={getCloseButtonAriaLabel(itemCount)}
        >
          <X className='size-5' />
          <span className='sr-only'>Lukk handlekurv</span>
        </Button>
      </DrawerClose>
    </DrawerHeader>
  )
}
