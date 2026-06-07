import 'server-only'

import { getRedis } from '@/lib/redis/getRedis'
import type { AppLogEntry } from 'types/tracking/log/AppLogEntry'

const REDIS_LOG_TIMEOUT_MS = 300

export async function writeAppLogToRedis(logEntry: AppLogEntry): Promise<void> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`Redis app log timed out after ${REDIS_LOG_TIMEOUT_MS}ms`)),
      REDIS_LOG_TIMEOUT_MS
    )
  })

  try {
    const pipeline = getRedis().then(client =>
      client
        .multi()
        .lPush('app_logs', JSON.stringify(logEntry))
        .lTrim('app_logs', 0, 999)
        .execAsPipeline()
    )

    await Promise.race([pipeline, timeout])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}
