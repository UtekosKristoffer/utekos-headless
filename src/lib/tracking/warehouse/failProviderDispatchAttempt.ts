import 'server-only'

import { getTrackingWarehouse } from '@/lib/tracking/warehouse/getTrackingWarehouse'
import type { ProviderDispatchQueueItem } from 'types/tracking/warehouse/ProviderDispatchQueueItem'
import type postgres from 'postgres'

const MAX_ATTEMPTS = 5

export async function failProviderDispatchAttempt(
  attempt: ProviderDispatchQueueItem,
  error: string
): Promise<'retry_scheduled' | 'dead_lettered'> {
  const sql = getTrackingWarehouse()
  const nextAttemptCount = attempt.attemptCount + 1
  const status = nextAttemptCount >= MAX_ATTEMPTS ? 'dead_lettered' : 'retry_scheduled'

  if (!sql) {
    return status
  }

  const delaySeconds = Math.min(3600, 60 * 2 ** Math.max(0, nextAttemptCount - 1))
  const normalizedError = error.slice(0, 4000)

  await sql.begin(async transaction => {
    await transaction`
      update ops.provider_dispatch_attempts
      set
        status = ${status},
        attempt_count = ${nextAttemptCount},
        next_attempt_at = ${
          status === 'retry_scheduled'
            ? transaction`now() + (${delaySeconds} * interval '1 second')`
            : null
        },
        last_error = ${normalizedError},
        processed_at = ${status === 'dead_lettered' ? new Date() : null},
        updated_at = now()
      where id = ${attempt.id}
        and status = 'processing'
    `

    if (status === 'dead_lettered') {
      await transaction`
        insert into ops.dead_letter_events (
          source,
          reason,
          payload,
          metadata
        )
        values (
          ${`tracking:${attempt.provider}`},
          ${normalizedError},
          ${transaction.json(attempt.payload as postgres.JSONValue)},
          ${transaction.json({
            providerDispatchAttemptId: attempt.id,
            eventId: attempt.eventId,
            eventName: attempt.eventName,
            attemptCount: nextAttemptCount
          })}
        )
      `
    }
  })

  return status
}
