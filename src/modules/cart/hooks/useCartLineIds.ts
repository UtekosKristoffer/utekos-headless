// Path: src/hooks/useCartLineIds.ts
import { useQuery } from '@tanstack/react-query'
import { useCartId } from '@/modules/cart/hooks/useCartId'
import { selectLineIds } from '@/lib/utils/selectLineIds'
import { fetchCart } from '@/lib/helpers/cart/fetchCart'

export const useCartLineIds = () => {
  const cartId = useCartId()

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null
      return fetchCart(cartId)
    },
    enabled: !!cartId,
    select: selectLineIds
  })
}
