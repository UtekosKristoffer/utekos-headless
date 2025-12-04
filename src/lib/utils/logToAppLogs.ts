// Path: src/lib/utils/logToAppLogs.ts
import { redisPush, redisTrim } from '@/lib/redis'
import crypto from 'crypto'

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

/**
 * Sentralisert logging for både Vercel Console og Redis.
 * Sikrer at vi har tidsstempel og kontekst for alle hendelser.
 */
export async function logToAppLogs(
  level: LogLevel,
  event: string,
  data?: Record<string, any>,
  context?: Record<string, any>
) {
  const timestamp = new Date().toISOString()
  const logId = crypto.randomUUID()

  const logEntry = {
    id: logId,
    timestamp,
    level,
    event,
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
