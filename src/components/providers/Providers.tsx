'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState } from 'react'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationClient } from '@/clients/CartMutationClient'
import { serverActions } from '@/constants/serverActions'
import { CartIdProvider } from '@/components/providers/CartIdProvider'
import type { DehydratedState } from '@tanstack/react-query'
import { CookieConsentProvider } from '@/components/cookie-consent/CookieConsentProvider'
import CookieConsent from '@/components/cookie-consent/CookieConsent'
import { ConditionalTracking } from '../analytics/ConditionalTracking'

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

  return (
    <CookieConsentProvider>
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

      <CookieConsent />

      <ConditionalTracking
        {...(process.env.NEXT_PUBLIC_META_PIXEL_ID && {
          metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID && {
          snapPixelId: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_KEY && {
          postHogApiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY
        })}
        {...(process.env.NEXT_PUBLIC_POSTHOG_HOST && {
          postHogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST
        })}
      />
    </CookieConsentProvider>
  )
}
