import { USERCENTRICS_AUTOBLOCKER_SRC } from '@/lib/tracking/proxy/usercentricsAutoblockerMarkup'

/**
 * Local/dev fallback when `proxy.ts` cannot use `HTMLRewriter` (non-Vercel Edge).
 * On Vercel, autoblocker is prepended to `<head>` in `src/proxy.ts` instead.
 */
export function UsercentricsAutoblockerScript() {
  if (process.env.VERCEL) {
    return null
  }

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script suppressHydrationWarning src={USERCENTRICS_AUTOBLOCKER_SRC} />
  )
}
