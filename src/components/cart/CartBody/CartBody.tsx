// Path: src/components/cart/CartBody.tsx
'use client'

import { ScrollArea } from '@/components/cart/utils/ScrollArea'
import { CartBodySkeleton } from '@/components/skeletons/CartBodySkeleton'
import { useCartPending } from '@/hooks/useCartPending'
import type { Cart } from '@types'

import { CartLineItem } from '@/components/cart/CartLineItem'
import { isCartEmpty } from './utils/isCartEmpty'

export const CartBody = ({ cart }: { cart: Cart | null | undefined }) => {
  const isPending = useCartPending() > 0
  const isEmpty = isCartEmpty(cart)

  if (isPending && isEmpty) {
    return <CartBodySkeleton />
  }

  if (isEmpty) {
    return (
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='text-center text-muted-foreground'>
          <p className='text-base'>Handleposen din er tom</p>
          <p className='mt-1 text-sm'>Legg til produkter for å komme i gang.</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className='flex-1'>
      <div className='p-6'>
        {cart?.lines?.map((line, index) => (
          <div key={line.id}>
            <CartLineItem line={line} />
            {index < cart.lines.length - 1 && <div className='my-4 border-b' />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
