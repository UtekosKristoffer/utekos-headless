'use client'

import { ScrollArea } from '@/components/cart/utils/ScrollArea'
import { CartBodySkeleton } from '@/components/skeletons/CartBodySkeleton'
import { useCartPending } from '@/hooks/useCartPending'
import type { Cart } from '@types'

import { CartLineItem } from '@/components/cart/CartLineItem'
import { EmptyCartRecommendations } from '@/components/cart/EmptyCart/EmptyCartRecommendations'
import { isCartEmpty } from './utils/isCartEmpty'

export const CartBody = ({ cart }: { cart: Cart | null | undefined }) => {
  const isPending = useCartPending() > 0
  const isEmpty = isCartEmpty(cart)

  if (isPending && isEmpty) {
    return <CartBodySkeleton />
  }

  if (isEmpty) {
    return (
      <div className='flex flex-1 items-start justify-center p-6'>
        {/* ERSTATT DEN GAMLE TEKSTEN MED DEN NYE KOMPONENTEN */}
        <EmptyCartRecommendations />
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
