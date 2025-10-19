'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationClient } from '@/clients/CartMutationClient'
import { serverActions } from '@/constants/serverActions'
import { CartIdProvider } from '@/components/providers/CartIdProvider'
import type { DehydratedState } from '@tanstack/react-query'

interface ProvidersProps {
  children: React.ReactNode
  cartId: string | null
  dehydratedState: DehydratedState
}

export default function Providers({
  children,
  cartId: initialCartId,
  dehydratedState
}: ProvidersProps) {
  const queryClient = getQueryClient()
  const [cartId, setCartId] = useState<string | null>(initialCartId)

  useEffect(() => {
    if (window.innerHeight < 650) return
    if (!document.cookie.includes('welcome-toast=2')) {
      toast(
        '🛍️ Velkommen til Utekos sin nettbutikk! Har du spørsmål? Klikk på chat-ikonet nede til høyre',
        {
          id: 'welcome-toast',
          duration: Infinity,
          onDismiss: () => {
            document.cookie = 'welcome-toast=2; max-age=31536000; path=/'
          },
          classNames: {
            title: 'text-black',
            description: 'text-black'
          }
        }
      )
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <CartIdProvider value={cartId}>
          <CartMutationClient
            actions={serverActions}
            cartId={cartId}
            setCartId={setCartId}
          >
            {children}
          </CartMutationClient>
        </CartIdProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
