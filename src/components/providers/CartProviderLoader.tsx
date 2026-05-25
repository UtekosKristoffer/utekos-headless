// Path: src/components/providers/CartProviderLoader.tsx

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

  return (
    <Providers dehydratedState={dehydrate(queryClient)} cartId={cartId}>
      {children}
    </Providers>
  )
}
