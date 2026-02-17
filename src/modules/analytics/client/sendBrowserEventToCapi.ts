import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import { getBrowserUserData } from './utils/getBrowserUserData'

export async function sendBrowserEventToCapi(
  partialEvent: Omit<UnifiedAnalyticsEvent, 'user'> & {
    user?: Partial<UnifiedAnalyticsEvent['user']>
  }
): Promise<void> {
  const browserUser = getBrowserUserData()

  const fullEvent = {
    ...partialEvent,
    user: {
      ...browserUser,
      ...partialEvent.user // Lar spesifikk input overskrive cookies hvis nødvendig
    }
  } as UnifiedAnalyticsEvent

  try {
    const response = await fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullEvent),
      keepalive: true // Sikrer at requesten fullføres selv om brukeren navigerer vekk
    })

    if (!response.ok) {
      console.error('[Analytics] CAPI Request failed:', response.status)
    }
  } catch (error) {
    console.error('[Analytics] CAPI Network error:', error)
  }
}
