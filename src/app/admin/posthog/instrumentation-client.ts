import posthog from 'posthog-js'

const postHogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  ...(postHogHost ? { api_host: postHogHost } : {}),
  defaults: '2026-01-30'
})
