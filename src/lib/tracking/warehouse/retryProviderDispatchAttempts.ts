import 'server-only'

import { claimProviderDispatchAttempts } from '@/lib/tracking/warehouse/claimProviderDispatchAttempts'
import { completeProviderDispatchAttempt } from '@/lib/tracking/warehouse/completeProviderDispatchAttempt'
import { dispatchClaimedProviderAttempt } from '@/lib/tracking/warehouse/dispatchClaimedProviderAttempt'
import { failProviderDispatchAttempt } from '@/lib/tracking/warehouse/failProviderDispatchAttempt'

const BATCH_SIZE = 10

export async function retryProviderDispatchAttempts() {
  const attempts = await claimProviderDispatchAttempts(BATCH_SIZE)
  const outcomes = await Promise.all(
    attempts.map(async attempt => {
      const result = await dispatchClaimedProviderAttempt(attempt)

      if (result.success) {
        await completeProviderDispatchAttempt(attempt.id)
        return 'succeeded' as const
      }

      return await failProviderDispatchAttempt(attempt, result.error, result.retryable)
    })
  )

  let succeeded = 0
  let retryScheduled = 0
  let failed = 0
  let deadLettered = 0

  for (const outcome of outcomes) {
    if (outcome === 'succeeded') succeeded += 1
    if (outcome === 'retry_scheduled') retryScheduled += 1
    if (outcome === 'failed') failed += 1
    if (outcome === 'dead_lettered') deadLettered += 1
  }

  return {
    success: true,
    claimed: attempts.length,
    succeeded,
    retryScheduled,
    failed,
    deadLettered
  }
}
