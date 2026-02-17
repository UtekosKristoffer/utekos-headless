// Path: src/modules/analytics/services/trackServerEvent.ts
import { logToAppLogs } from '@/lib/tracking/log/logToAppLogs'
import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type { TrackingAdapterResult } from 'types/analytics/events/TrackingAdapterResult'
import { sendMetaCapiEvent } from '@/modules/analytics/adapters/meta/lib/sendMetaCapiEvents'
import { sendTikTokEvent } from '@/modules/analytics/adapters/tiktok/sendTikTokEvent'
import { sendGoogleMeasurementProtocolEvent } from '@/modules/analytics/adapters/google/sendGoogleMeasurementProtocolEvent'
export type TrackingServiceResult = {
  success: boolean
  details: Record<string, { success: boolean; error?: string }>
  eventId: string
}

export async function trackServerEvent(
  unifiedEvent: UnifiedAnalyticsEvent
): Promise<TrackingServiceResult> {
  const transactionId = unifiedEvent.data?.transactionId || 'N/A'
  const eventName = unifiedEvent.eventName
  const trackingPromises: Promise<TrackingAdapterResult>[] = [
    sendMetaCapiEvent(unifiedEvent),
    sendGoogleMeasurementProtocolEvent(unifiedEvent),
    sendTikTokEvent(unifiedEvent)
  ]

  const executionResults = await Promise.allSettled(trackingPromises)
  const aggregatedDetails: Record<
    string,
    { success: boolean; error?: string }
  > = {}

  let successCount = 0

  executionResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const adapterResult = result.value
      const providerName = adapterResult.provider || `adapter_${index}`

      aggregatedDetails[providerName] = {
        success: adapterResult.success,
        ...(adapterResult.error && { error: adapterResult.error })
      }

      if (adapterResult.success) {
        successCount++
      }
    } else {
      const errorKey = `adapter_index_${index}_crash`
      aggregatedDetails[errorKey] = {
        success: false,
        error: String(result.reason)
      }
      console.error(
        `[TrackingService] Adapter Crash at index ${index}:`,
        result.reason
      )
    }
  })

  const overallSuccess = successCount > 0
  const logLevel = overallSuccess ? 'INFO' : 'ERROR'
  const logMessage =
    overallSuccess ?
      `✅ Tracking Success: ${eventName}`
    : `❌ Tracking Failed: ${eventName}`

  await logToAppLogs(logLevel, logMessage, {
    eventId: unifiedEvent.eventId,
    transactionId: transactionId,
    providers: aggregatedDetails,
    successCount
  })

  return {
    success: overallSuccess,
    details: aggregatedDetails,
    eventId: unifiedEvent.eventId
  }
}
