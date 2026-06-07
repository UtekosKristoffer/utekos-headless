import 'server-only'

import { getRedis } from '@/lib/redis/getRedis'
import type { AppLogEntry } from 'types/tracking/log/AppLogEntry'

// Timeout should be generous to account for:
// 1. Redis client connection initialization (if not cached)
// 2. Network round-trip latency
// 3. Pipeline execution (lPush + lTrim)
// 4. Server load variability
const REDIS_LOG_TIMEOUT_MS = 2000

export async function writeAppLogToRedis(logEntry: AppLogEntry): Promise<void> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`Redis app log timed out after ${REDIS_LOG_TIMEOUT_MS}ms`)),
      REDIS_LOG_TIMEOUT_MS
    )
  })

  try {
    const client = await getRedis()
    const pipeline = client
      .multi()
      .lPush('app_logs', JSON.stringify(logEntry))
      .lTrim('app_logs', 0, 999)
      .execAsPipeline()

    await Promise.race([pipeline, timeout])
  } catch (error) {
    // Log Redis errors but don't throw - observability should never crash the app
    console.error('Failed to push log to Redis:', error instanceof Error ? error.message : String(error))
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}
