// Path: src/components/providers/ClientProviders.tsx
'use client'

import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationClient } from '@/clients/CartMutationClient'
import { addCartLinesAction } from '@/lib/actions/addCartLinesAction'
import { clearCartAction } from '@/lib/actions/clearCartAction'
import { removeCartLineAction } from '@/lib/actions/removeCartLineAction'
import { updateCartLineQuantityAction } from '@/lib/actions/updateCartLineQuantityAction'
import { AccessoryProductsProvider } from '@/lib/context/AccessoryProductsContext'
import { CartIdProvider } from '@/lib/context/CartIdContext'
import { RecommendedProductsContext } from '@/lib/context/RecommendedProductsContext'
import type { CartActions, ClientProvidersProps } from '@types'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState } from 'react' // Importer useState

const serverActions: CartActions = {
  addCartLine: addCartLinesAction,
  updateCartLineQuantity: updateCartLineQuantityAction,
  removeCartLine: removeCartLineAction,
  clearCart: clearCartAction
}

export default function ClientProviders({
  children,
  cartId: initialCartId,
  dehydratedState,
  recommendedProducts,
  accessoryProducts
}: ClientProvidersProps) {
  const queryClient = getQueryClient()
  // Administrer cartId i klient-state, med initialverdi fra server
  const [cartId, setCartId] = useState<string | null>(initialCartId)

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <RecommendedProductsContext.Provider value={recommendedProducts}>
          <AccessoryProductsProvider value={accessoryProducts}>
            <CartIdProvider value={cartId}>
              <CartMutationClient
                actions={serverActions}
                cartId={cartId}
                setCartId={setCartId}
              >
                {children}
              </CartMutationClient>
            </CartIdProvider>
          </AccessoryProductsProvider>
        </RecommendedProductsContext.Provider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
