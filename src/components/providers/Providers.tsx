// Path: src/components/providers/Providers.tsx
'use client'

import { CartMutationClient } from '@/clients/CartMutationClient'
import { addCartLinesAction } from '@/lib/actions/addCartLinesAction'
import { clearCartAction } from '@/lib/actions/clearCartAction'
import { removeCartLineAction } from '@/lib/actions/removeCartLineAction'
import { updateCartLineQuantityAction } from '@/lib/actions/updateCartLineQuantityAction'
import { AccessoryProductsProvider } from '@/lib/context/AccessoryProductsContext'
import { CartIdProvider } from '@/lib/context/CartIdContext'
import { RecommendedProductsContext } from '@/lib/context/RecommendedProductsContext'
import {
  isServer,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import type { Cart, CartActions, ShopifyProduct } from '@types' // <-- NY: Importer ShopifyProduct

function makeQueryClient() {
  // ... (funksjonen er uendret)
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
  // ... (funksjonen er uendret)
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const serverActions: CartActions = {
  // ... (objektet er uendret)
  addCartLine: addCartLinesAction,
  updateCartLineQuantity: updateCartLineQuantityAction,
  removeCartLine: removeCartLineAction,
  clearCart: clearCartAction
}

// Definer props i et eget interface for bedre lesbarhet
interface ProvidersProps {
  children: React.ReactNode
  initialCart: Cart | null
  cartId: string | null
  recommendedProducts: ShopifyProduct[]
  accessoryProducts: ShopifyProduct[]
}

export function Providers({
  children,
  initialCart,
  cartId,
  recommendedProducts,
  accessoryProducts
}: ProvidersProps) {
  const queryClient = getQueryClient()
  queryClient.setQueryData(['cart', cartId], initialCart)

  return (
    <QueryClientProvider client={queryClient}>
      {/* Pakk de andre providerne inn i den nye her */}
      <RecommendedProductsContext.Provider value={recommendedProducts}>
        <AccessoryProductsProvider value={accessoryProducts}>
          <CartIdProvider value={cartId}>
            <CartMutationClient actions={serverActions} cartId={cartId}>
              <ReactQueryStreamedHydration>
                {children}
              </ReactQueryStreamedHydration>
            </CartMutationClient>
          </CartIdProvider>
        </AccessoryProductsProvider>
      </RecommendedProductsContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
