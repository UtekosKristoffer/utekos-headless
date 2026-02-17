// Path: src/components/cart/CartTrigger.tsx
'use client'

import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
import { useCartQuery } from '@/modules/cart/hooks/useCartQuery'
import { useCartStoreSnapshot } from '@/modules/cart/hooks/useCartStoreSnapshot'
import { cn } from '@/lib/utils/className'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { getRecommendedProducts } from '@/modules/products/services/getRecommendedProducts'
import { getAccessoryProducts } from '@/modules/products/services/getAccessoryProducts'
import { getOptimisticCount } from '@/lib/utils/getOptimisicCount'
export function CartTrigger({
  className
}: {
  className?: string
}): React.JSX.Element {
  const { optimisticCartLines } = useCartStoreSnapshot().context
  const { data: cart } = useCartQuery()
  const queryClient = useQueryClient()

  const optimisticCount = getOptimisticCount(optimisticCartLines?.lines)
  const serverCount = cart?.totalQuantity ?? 0
  const itemCount = optimisticCount > 0 ? optimisticCount : serverCount

  const handlePrefetch = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['products', 'recommended'],
      queryFn: getRecommendedProducts
    })
    queryClient.prefetchQuery({
      queryKey: ['products', 'accessory'],
      queryFn: getAccessoryProducts
    })
  }, [queryClient])

  return (
    <DrawerTrigger asChild>
      <Button
        type='button'
        aria-label={`Åpne handlekurven, ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}`}
        variant='cart'
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-md',
          'border border-white/10 transition-colors',
          'dark:border-neutral-700 dark:text-white',
          'p-0',
          className
        )}
        onMouseEnter={handlePrefetch}
      >
        <ShoppingCartIcon className='h-4 text-white transition-all ease-in-out hover:scale-110' />

        {itemCount > 0 && (
          <div
            className='pointer-events-none absolute -right-2 -top-2 z-10 grid h-4 w-4
                          place-items-center rounded-sm bg-blue-600 text-[11px]
                          font-medium text-white'
          >
            {itemCount}
          </div>
        )}

        <span className='sr-only' aria-live='polite'>
          {itemCount} {itemCount === 1 ? 'vare' : 'varer'} i handlekurven
        </span>
      </Button>
    </DrawerTrigger>
  )
}
