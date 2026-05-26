'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { getQueryClient } from '@/api/lib/getQueryClient'
import { CartMutationProvider } from '@/clients/CartMutationProvider'
import { serverActions } from '@/constants/serverActions'
import { CartIdProvider } from '@/components/providers/CartIdProvider'
import type { DehydratedState } from '@tanstack/react-query'
import { CookieConsentProvider } from '@/components/cookie-consent/CookieConsentProvider'
import { ConditionalTracking } from '../analytics/ConditionalTracking'
import { MarketingPixels } from '@/components/analytics/MarketingPixels'
import { CookieConsentBanner } from '@/components/CookieBanner'

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development' ?
    dynamic(() => import('@tanstack/react-query-devtools').then(module => module.ReactQueryDevtools), {
      ssr: false
    })
  : null

interface ProvidersProps {
  children: React.ReactNode
  cartId: string | null
  dehydratedState: DehydratedState
}

export default function Providers({ children, cartId: initialCartId, dehydratedState }: ProvidersProps) {
  const queryClient = getQueryClient()
  const [cartId, setCartId] = useState<string | null>(initialCartId)

  return (
    <CookieConsentProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <CartIdProvider value={cartId}>
            <CartMutationProvider actions={serverActions} cartId={cartId} setCartId={setCartId}>
              {children}
            </CartMutationProvider>
          </CartIdProvider>
        </HydrationBoundary>
        {ReactQueryDevtools ?
          <ReactQueryDevtools initialIsOpen={false} />
        : null}
      </QueryClientProvider>
      <CookieConsentBanner />
      <MarketingPixels />
      <ConditionalTracking
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
