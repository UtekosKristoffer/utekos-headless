// Path: src/components/cart/CartTrigger.tsx
'use client'

import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useCartStoreSnapshot } from '@/hooks/useCartStoreSnapshot'
import { cn } from '@/lib/utils/className'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import * as React from 'react'
import { memo, useMemo, useCallback, startTransition } from 'react'

// Optimaliser count-beregning med memoization
// Record<string, number> hvor number er quantity
const getOptimisticCount = (
  lines: Record<string, number> | undefined
): number => {
  if (!lines) return 0
  return Object.values(lines).reduce<number>((sum, quantity) => {
    return sum + (typeof quantity === 'number' ? quantity : 0)
  }, 0)
}

// Separat komponent for count badge for bedre re-render ytelse
const CartCountBadge = memo(({ count }: { count: number }) => {
  if (count === 0) return null

  return (
    <div
      className='absolute right-0 top-0 -mr-2 -mt-2 grid h-4 w-4 place-items-center
                    rounded-sm bg-blue-600 text-[11px] font-medium text-white
                    pointer-events-none z-10'
    >
      {count}
    </div>
  )
})

CartCountBadge.displayName = 'CartCountBadge'

// Memoized button content
const CartButtonContent = memo(({ itemCount }: { itemCount: number }) => (
  <>
    <ShoppingCartIcon className='h-4 transition-all text-white ease-in-out hover:scale-110' />
    <CartCountBadge count={itemCount} />
    <span className='sr-only' aria-live='polite'>
      {itemCount} {itemCount === 1 ? 'vare' : 'varer'} i handleposen
    </span>
  </>
))

CartButtonContent.displayName = 'CartButtonContent'

export const CartTrigger = memo(function CartTrigger({
  className
}: {
  className?: string
}): React.JSX.Element {
  const snapshot = useCartStoreSnapshot()
  const { optimisticCartLines } = snapshot.context
  const { data: cart } = useCartQuery()

  // Memoize count beregning
  const itemCount = useMemo(() => {
    const optimisticCount = getOptimisticCount(optimisticCartLines?.lines)
    const serverCount = cart?.totalQuantity ?? 0
    return optimisticCount > 0 ? optimisticCount : serverCount
  }, [optimisticCartLines?.lines, cart?.totalQuantity])

  // Memoize aria-label
  const ariaLabel = useMemo(
    () => `Åpne handlepose, ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}`,
    [itemCount]
  )

  // Pre-warm drawer komponenter on hover/focus
  const handleInteraction = useCallback(() => {
    startTransition(() => {
      // Pre-load drawer komponenter
      import('@/components/cart/CartBody/CartBody')
      import('@/components/cart/SmartCartSuggestions')
      import('@/components/cart/CartFooter/CartFooter')
    })
  }, [])

  return (
    <DrawerTrigger asChild>
      <Button
        type='button'
        aria-label={ariaLabel}
        variant='cart'
        onMouseEnter={handleInteraction}
        onFocus={handleInteraction}
        onTouchStart={handleInteraction}
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-md',
          'border border-white/10 transition-colors',
          'dark:border-neutral-700 dark:text-white',
          'p-0',
          className
        )}
      >
        <CartButtonContent itemCount={itemCount} />
      </Button>
    </DrawerTrigger>
  )
})
