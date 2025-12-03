// Path: src/lib/utils/logToAppLogs.ts
import { redisPush, redisTrim } from '@/lib/redis'
import crypto from 'crypto'
export async function logToAppLogs(
  level: 'INFO' | 'WARN' | 'ERROR',
  event: string,
  identity: any,
  context: any,
  data: any
) {
  try {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level,
      event,
      identity: {
        ip: identity.ip,
        fbp: identity.fbp,
        fbc: identity.fbc,
        externalId: identity.externalId,
        userAgent: identity.userAgent
      },
      context,
      data
    }

    console.log(`[${level}] ${event}`, JSON.stringify(logEntry))

    await redisPush('app_logs', logEntry)
    await redisTrim('app_logs', 0, 999)
  } catch (e) {
    console.error('Failed to write to app_logs:', e)
  }
}
