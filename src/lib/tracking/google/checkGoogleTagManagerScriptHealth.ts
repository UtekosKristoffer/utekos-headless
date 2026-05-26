type GoogleTagManagerScriptHealthInput = {
  gtmId: string
  scriptOrigin: string
}

type GoogleTagManagerScriptHealth = {
  ok: boolean
  status?: number
  reason?: string
}

let cachedHealth:
  | {
      checkedAt: number
      health: GoogleTagManagerScriptHealth
    }
  | undefined

function getHealthCacheDurationMs(): number {
  const configuredDuration = Number(process.env.GA_SGTM_HEALTH_CACHE_MS)
  return Number.isFinite(configuredDuration) && configuredDuration > 0 ? configuredDuration : 60_000
}

function buildGoogleTagManagerHealthUrl(scriptOrigin: string, gtmId: string): string {
  return `${scriptOrigin.replace(/\/$/, '')}/gtm.js?id=${encodeURIComponent(gtmId)}`
}

export async function checkGoogleTagManagerScriptHealth({
  gtmId,
  scriptOrigin
}: GoogleTagManagerScriptHealthInput): Promise<GoogleTagManagerScriptHealth> {
  const now = Date.now()
  const cacheDurationMs = getHealthCacheDurationMs()

  if (cachedHealth && now - cachedHealth.checkedAt < cacheDurationMs) {
    return cachedHealth.health
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 1500)

  try {
    const response = await fetch(buildGoogleTagManagerHealthUrl(scriptOrigin, gtmId), {
      cache: 'no-store',
      signal: controller.signal
    })

    const health = {
      ok: response.ok,
      status: response.status,
      ...(response.ok ? {} : { reason: `HTTP ${response.status}` })
    }

    cachedHealth = { checkedAt: now, health }
    return health
  } catch (error) {
    const health = {
      ok: false,
      reason: error instanceof Error ? error.message : String(error)
    }

    cachedHealth = { checkedAt: now, health }
    return health
  } finally {
    clearTimeout(timeout)
  }
}
