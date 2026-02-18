import { sendSnapPurchase } from '@/lib/tracking/snapchat/sendSnapPurchase'
import { sendPinterestPurchase } from '@/lib/tracking/pinterest/sendPinterestPurchase'
import { sendTikTokPurchase } from '@/lib/tracking/tiktok/sendTikTokPurchase'
import type { TrackingContext } from 'types/tracking/user/TrackingContext'

export async function dispatchSecondaryEvents(
  context: TrackingContext
): Promise<void> {
  await Promise.all([
    sendSnapPurchase(context),
    sendPinterestPurchase(context),
    sendTikTokPurchase(context)
  ])
}
