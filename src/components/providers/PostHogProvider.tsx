import { PostHogProvider } from '@posthog/next'

const POSTHOG_API_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
  || process.env.NEXT_PUBLIC_POSTHOG_KEY
  || process.env.NEXT_PUBLIC_mentum_POSTHOG_PROJECT_TOKEN

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider
      {...(POSTHOG_API_KEY ? { apiKey: POSTHOG_API_KEY } : {})}
      clientOptions={{
        api_host: '/relay-MAhe',
        opt_out_capturing_by_default: true,
        opt_out_persistence_by_default: true,
        person_profiles: 'identified_only'
      }}
    >
      {children}
    </PostHogProvider>
  )
}
