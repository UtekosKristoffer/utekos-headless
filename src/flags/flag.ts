import { flag } from 'flags/next'
import { vercelAdapter } from '@flags-sdk/vercel'

export const marketingBanner = flag({
  key: 'marketing-banner',
  adapter: vercelAdapter()
})
