// Path: src/components/cart/CartBody/CartBody.tsx
import { ScrollArea } from '@/components/cart/utils/ScrollArea'
import { useCartLineIds } from '@/hooks/useCartLines'
import { useCartPending } from '@/hooks/useCartPending'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { EmptyCartRecommendations } from '@/components/cart/EmptyCart/EmptyCartRecommendations'
import { SmartCartSuggestions } from '@/components/cart/SmartCartSuggestions'
import type { Cart } from '@types'

export const CartBody = ({ cart }: { cart: Cart | null | undefined }) => {
  const isPending = useCartPending() > 0
  const { data: lineIds } = useCartLineIds()
  const isEmpty = !lineIds || lineIds.length === 0

  if (isEmpty && !isPending) {
    return (
      <div className='flex flex-1 items-start justify-center p-6'>
        <EmptyCartRecommendations />
      </div>
    )
  }

  return (
    // ScrollArea har allerede flex-1, som er perfekt.
    // Den vil nå fylle all ledig plass mellom header og footer.
    <ScrollArea className='flex-1'>
      <div className='p-6'>
        {lineIds?.map((lineId, index) => (
          <div key={lineId}>
            <CartLineItem lineId={lineId} />
            {index < lineIds.length - 1 && <div className='my-4 border-b' />}
          </div>
        ))}
      </div>
      {/* ENDRING: SmartCartSuggestions er flyttet hit, inn i det scrollbare området */}
      <SmartCartSuggestions cart={cart} />
    </ScrollArea>
  )
}
