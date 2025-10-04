// Path: src/components/cart/CartBody/CartBody.tsx
'use client'

import { ScrollArea } from '@/components/cart/utils/ScrollArea'
import { CartBodySkeleton } from '@/components/skeletons/CartBodySkeleton'
import { useCartLineIds } from '@/hooks/useCartLines' // Importer den nye hooken
import { useCartPending } from '@/hooks/useCartPending'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { EmptyCartRecommendations } from '@/components/cart/EmptyCart/EmptyCartRecommendations'

export const CartBody = () => {
  const isPending = useCartPending() > 0

  // Hent kun listen med ID-er fra den nye, spesifikke hooken
  const { data: lineIds, isFetching } = useCartLineIds()

  const isEmpty = !lineIds || lineIds.length === 0

  // Vis skeleton ved initiell lasting
  if (isFetching && isEmpty) {
    return <CartBodySkeleton />
  }

  if (isEmpty && !isPending) {
    return (
      <div className='flex flex-1 items-start justify-center p-6'>
        <EmptyCartRecommendations />
      </div>
    )
  }

  return (
    <ScrollArea className='flex-1'>
      <div className='p-6'>
        {lineIds?.map((lineId, index) => (
          <div key={lineId}>
            <CartLineItem lineId={lineId} />
            {index < lineIds.length - 1 && <div className='my-4 border-b' />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
