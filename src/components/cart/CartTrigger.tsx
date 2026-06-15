// Path: src/components/cart/CartTrigger.tsx
'use client'

import { Button } from '@/components/ui/button'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useCartStoreSnapshot } from '@/hooks/useCartStoreSnapshot'
import { cartStore } from '@/lib/state/cartStore'
import { cn } from '@/lib/utils/className'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import { getRecommendedProducts } from '@/api/lib/products/getRecommendedProducts'
import { getAccessoryProducts } from '@/api/lib/products/getAccessoryProducts'

const getOptimisticCount = (lines: Record<string, unknown> | undefined): number => {
  if (!lines) return 0
  return Object.values(lines).reduce<number>((sum, line) => {
    const quantity = (line as { quantity?: unknown })?.quantity
    return sum + (typeof quantity === 'number' ? quantity : 0)
  }, 0)
}

export function CartTrigger({ className }: { className?: string }): React.JSX.Element {
  const { optimisticCartLines } = useCartStoreSnapshot().context
  const { data: cart } = useCartQuery()
  const queryClient = useQueryClient()

  const optimisticCount = getOptimisticCount(optimisticCartLines?.lines)
  const serverCount = cart?.totalQuantity ?? 0
  const itemCount = optimisticCount > 0 ? optimisticCount : serverCount

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['products', 'recommended'],
      queryFn: getRecommendedProducts
    })
    queryClient.prefetchQuery({
      queryKey: ['products', 'accessory'],
      queryFn: getAccessoryProducts
    })
  }

  const handleOpen = () => {
    handlePrefetch()
    cartStore.send({ type: 'OPEN' })
  }

  return (
    <Button
      type='button'
      aria-label={`Åpne handlekurven, ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}`}
      variant='outline'
      className={cn(
        'relative flex h-11 w-11 items-center justify-center rounded-md',
        'border border-cloud-dancer/10 text-foreground transition-colors hover:bg-cloud-dancer/5',
        'p-0',
        className
      )}
      onClick={handleOpen}
      onMouseEnter={handlePrefetch}
    >
      <ShoppingCartIcon className='h-4 text-foreground transition-all ease-in-out hover:scale-110' />

      {itemCount > 0 && (
        <div
          className='pointer-events-none absolute -right-2 -top-2 z-10 grid h-4 w-4
                          place-items-center rounded-sm border border-cloud-dancer/10 bg-background text-[11px]
                          font-medium text-foreground'
        >
          {itemCount}
        </div>
      )}

      <span className='sr-only' aria-live='polite'>
        {itemCount} {itemCount === 1 ? 'vare' : 'varer'} i handlekurven
      </span>
    </Button>
  )
}
