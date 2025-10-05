// Path: src/components/cart/CartTrigger.tsx
'use client'

import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useCartStoreSnapshot } from '@/hooks/useCartStoreSnapshot'
import { cn } from '@/lib/utils/className'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import * as React from 'react'

const getOptimisticCount = (
  lines: Record<string, unknown> | undefined
): number => {
  if (!lines) return 0
  return Object.values(lines).reduce<number>((sum, line) => {
    const quantity = (line as { quantity?: unknown })?.quantity
    return sum + (typeof quantity === 'number' ? quantity : 0)
  }, 0)
}

export function CartTrigger({
  className
}: {
  className?: string
}): React.JSX.Element {
  const { optimisticCartLines } = useCartStoreSnapshot().context
  const { data: cart } = useCartQuery()
  const optimisticCount = getOptimisticCount(optimisticCartLines?.lines)
  const serverCount = cart?.totalQuantity ?? 0
  const itemCount = optimisticCount > 0 ? optimisticCount : serverCount

  return (
    <DrawerTrigger asChild>
      <Button
        type='button'
        aria-label={`Åpne handlepose, ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}`}
        variant='cart'
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-md',
          'border border-white/10 transition-colors',
          'dark:border-neutral-700 dark:text-white',
          'p-0',
          className
        )}
      >
        <ShoppingCartIcon className='h-4 transition-all text-white ease-in-out hover:scale-110' />

        {itemCount > 0 && (
          <div
            className='absolute right-0 top-0 -mr-2 -mt-2 grid h-4 w-4 place-items-center
                          rounded-sm bg-blue-600 text-[11px] font-medium text-white
                          pointer-events-none z-10'
          >
            {itemCount}
          </div>
        )}

        <span className='sr-only' aria-live='polite'>
          {itemCount} {itemCount === 1 ? 'vare' : 'varer'} i handleposen
        </span>
      </Button>
    </DrawerTrigger>
  )
}
