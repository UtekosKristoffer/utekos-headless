/**
 * PostHog provider for Next.js App Router.
 *
 * By default this component is **static-safe** — it does not call any
 * dynamic APIs (`cookies()`, `headers()`) and is compatible with static
 * generation, ISR, and Partial Prerendering (PPR).
 *
 * When `bootstrapFlags` is enabled, the provider evaluates feature flags
 * on the server and bootstraps the client SDK, which opts the route into
 * dynamic rendering.
 *
 * All PostHog hooks (`usePostHog`, `useFeatureFlagEnabled`, etc.)
 * require this provider as an ancestor.
 */

import { PostHogProvider, PostHogPageView } from '@posthog/next'

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider clientOptions={{ api_host: '/ingest' }} bootstrapFlags>
      <PostHogPageView />
      {children}
    </PostHogProvider>
  )
}
