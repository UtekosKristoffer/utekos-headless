// Path: src/lib/middleware/infrastructure/dispatchAnalyticsLogs.ts

import type { NextRequest } from 'next/server'
import { dispatchLog } from '@/modules/proxy/utils/dispatchLog'
import type { DetectedAdInteraction } from '@/modules/proxy/types'

export async function dispatchAnalyticsLogs(
  request: NextRequest,
  logs: DetectedAdInteraction['logData'][],
  metadata: { userAgent: string; referer: string }
): Promise<void> {
  const promises = logs.map(logData =>
    dispatchLog(request, logData, metadata.userAgent, metadata.referer)
  )

  if (promises.length > 0) {
    await Promise.all(promises)
  }
}
