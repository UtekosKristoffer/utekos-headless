// Path: src/lib/utils/logToAppLogs.ts
import { redisPush } from '@/lib/redis/redisPush'
import { redisTrim } from '@/lib/redis/redisList'
import crypto from 'crypto'

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

export async function logToAppLogs(
  level: LogLevel,
  event: string,
  data?: Record<string, any>,
  context?: Record<string, any>
) {
  const timestamp = new Date().toISOString()
  const logId = crypto.randomUUID()

  const logEntry = {
    event,
    id: logId,
    timestamp,
    level,
    data: data || {},
    context: context || {}
  }

  if (level === 'ERROR') {
    console.error(JSON.stringify(logEntry))
  } else {
    console.log(JSON.stringify(logEntry))
  }

  try {
    await redisPush('app_logs', logEntry)
    await redisTrim('app_logs', 0, 999)
  } catch (err) {
    console.error('Failed to push log to Redis:', err)
  }
}
