import { ensureString } from '@/lib/utils/ensure'
import type { OrderPaid } from 'types/api/webhooks/OrderPaid'
import type { AttributionSnapshot } from '../../domain/types/attribution/AttributionSnapshot'
import { fetchFirstActiveRedisRecord } from './operations/fetchFirstActiveRedisRecord'
import { mapRawRedisDataToSnapshot } from './mappers/mapRawRedisDataToSnapshot'

/**
 * Orchestrator: Retrieves and adapts attribution data for a Shopify Order.
 *
 * Flow:
 * 1. Calculate potential keys (Domain Logic)
 * 2. Fetch raw data (Infrastructure Logic)
 * 3. Map to domain object (Business Logic)
 */
export async function getAttributionFromRedis(
  order: OrderPaid
): Promise<AttributionSnapshot | null> {
  // 1. Resolve Keys
  const checkoutToken = ensureString(order.checkout_token)
  const cartToken = ensureString(order.cart_token)

  const candidateKeys: string[] = []
  if (checkoutToken) candidateKeys.push(`checkout:${checkoutToken}`)
  if (cartToken) candidateKeys.push(`checkout:${cartToken}`)

  if (candidateKeys.length === 0) {
    return null
  }

  // 2. Fetch Data
  const rawData = await fetchFirstActiveRedisRecord(candidateKeys)

  // 3. Transform & Return
  return mapRawRedisDataToSnapshot(rawData)
}
