import { PostHogProvider } from '@posthog/next'

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const POSTHOG_API_HOST = 'https://portal.utekos.no'
const POSTHOG_UI_HOST = 'https://eu.posthog.com'

export function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider
      {...(POSTHOG_API_KEY ? { apiKey: POSTHOG_API_KEY } : {})}
      clientOptions={{
        api_host: POSTHOG_API_HOST,
        ui_host: POSTHOG_UI_HOST,
        opt_out_capturing_by_default: true,
        opt_out_persistence_by_default: true,
        person_profiles: 'identified_only'
      }}
    >
      {children}
    </PostHogProvider>
  )
}
