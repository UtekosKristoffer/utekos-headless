// Path: src/components/providers/Providers.tsx
'use client'

import {
  isServer,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import { CartMutationClient } from '@/clients/CartMutationClient'
import { addCartLinesAction } from '@/lib/actions/addCartLinesAction'
import { clearCartAction } from '@/lib/actions/clearCartAction'
import { removeCartLineAction } from '@/lib/actions/removeCartLineAction'
import { updateCartLineQuantityAction } from '@/lib/actions/updateCartLineQuantityAction'
import type { Cart, CartActions } from '@types'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const serverActions: CartActions = {
  addCartLine: addCartLinesAction,
  updateCartLineQuantity: updateCartLineQuantityAction,
  removeCartLine: removeCartLineAction,
  clearCart: clearCartAction
}

export function Providers({
  children,
  initialCart,
  cartId
}: {
  children: React.ReactNode
  initialCart: Cart | null
  cartId: string | null
}) {
  const queryClient = getQueryClient()
  queryClient.setQueryData(['cart', cartId], initialCart)

  return (
    // 1. QueryClientProvider MÅ være ytterst
    <QueryClientProvider client={queryClient}>
      {/* 2. CartMutationClient kan nå trygt bruke useQueryClient() */}
      <CartMutationClient actions={serverActions}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </CartMutationClient>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
