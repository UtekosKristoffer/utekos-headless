import { getCachedCart } from '@/lib/actions/getCachedCart'
import { getCartIdFromCookie } from '@/lib/actions/getCartIdFromCookie'
import Providers from '@/components/providers/Providers'
import type { ReactNode } from 'react'
import { QueryClient, dehydrate } from '@tanstack/react-query'

export async function CartProviderLoader({
  children
}: {
  children: ReactNode
}) {
  const queryClient = new QueryClient()
  const cartId = await getCartIdFromCookie()

  await queryClient.prefetchQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCachedCart(cartId)
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <Providers dehydratedState={dehydratedState} cartId={cartId}>
      {children}
    </Providers>
  )
}
