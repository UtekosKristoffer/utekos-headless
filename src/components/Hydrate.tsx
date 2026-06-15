import { HydrationBoundary, QueryClientProvider, type DehydratedState } from '@tanstack/react-query'
import { getQueryClient } from '@/api/lib/getQueryClient'

export default function Hydrate({ state, children }: { state: DehydratedState; children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
