import { sendPinterestPurchase } from '@/lib/tracking/pinterest/sendPinterestPurchase'
import type { TrackingContext } from 'types/tracking/user/TrackingContext'

export async function dispatchSecondaryEvents(context: TrackingContext): Promise<void> {
  await Promise.all([sendPinterestPurchase(context)])
}
