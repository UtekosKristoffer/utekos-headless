import { redisGet } from '@/lib/redis'
import { safeString } from '@/lib/utils/safeString'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { CheckoutAttribution, OrderPaid } from '@types'

export async function getRedisAttribution(
  order: OrderPaid
): Promise<CheckoutAttribution | null> {
  const cartToken = safeString(order.cart_token)
  const checkoutToken = safeString(order.checkout_token)

  const possibleKeys = [
    checkoutToken ? `checkout:${checkoutToken}` : null,
    cartToken ? `checkout:${cartToken}` : null
  ].filter(Boolean) as string[]

  let redisData: CheckoutAttribution | null = null
  let foundKey: string | null = null

  for (const key of possibleKeys) {
    try {
      const data = (await redisGet(key)) as CheckoutAttribution | null
      if (data) {
        redisData = data
        foundKey = key
        console.log(`[Webhooks] Attribution found in Redis for key: ${key}`)
        break
      }
    } catch (e) {
      console.error(`[Webhooks] Redis read error for key ${key}:`, e)
    }
  }

  await logToAppLogs(
    'INFO',
    'Webhook: Attribution Lookup',
    {
      orderId: order.id,
      attributionFound: !!redisData,
      keyUsed: foundKey || 'None'
    },
    { cartToken, checkoutToken }
  )

  return redisData
}
