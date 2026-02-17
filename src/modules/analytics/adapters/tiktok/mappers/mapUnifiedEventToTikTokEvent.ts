import type { UnifiedAnalyticsEvent } from '@/modules/analytics/domain/types/events/UnifiedAnalyticsEvent'
import type {
  TikTokEvent,
  TikTokContent,
  TikTokUser,
  TikTokPage,
  TikTokContext
} from '../types'
import { ensureString } from '@/lib/utils/ensure'

export function mapUnifiedEventToTikTokEvent(
  event: UnifiedAnalyticsEvent
): TikTokEvent {
  const eventNameMap: Record<string, string> = {
    Purchase: 'PlaceAnOrder',
    AddToCart: 'AddToCart',
    InitiateCheckout: 'InitiateCheckout',
    ViewContent: 'ViewContent',
    PageView: 'Pageview',
    Lead: 'Contact',
    Search: 'Search',
    CompleteRegistration: 'CompleteRegistration'
  }

  const tiktokEventName = eventNameMap[event.eventName] || event.eventName

  const contents: TikTokContent[] = (event.data?.items || []).map(item => {
    const itemId = item.item_id
    const itemName = item.item_name
    const itemCategory = item.item_category
    const itemBrand = item.item_brand
    const itemPrice = item.price
    const itemQuantity = item.quantity

    return {
      ...(itemId && { content_id: itemId }),
      content_type: 'product',
      ...(itemName && { content_name: itemName }),
      ...(itemCategory && { content_category: itemCategory }),
      ...(itemBrand && { brand: itemBrand }),
      ...(itemPrice !== undefined && { price: itemPrice }),
      ...(itemQuantity !== undefined && { quantity: itemQuantity })
    }
  })

  const unifiedUser = event.user

  const resolvedExternalId = ensureString(unifiedUser.externalId)
  const resolvedEmail =
    ensureString(unifiedUser.emailHash) || ensureString(unifiedUser.email)
  const resolvedPhone = ensureString(unifiedUser.phone)
  const resolvedTtclid = ensureString(unifiedUser.ttclid)
  const resolvedTtp = ensureString(unifiedUser.ttp)
  const resolvedClientIp = ensureString(unifiedUser.clientIp)
  const resolvedUserAgent = ensureString(unifiedUser.userAgent)

  const userContext: TikTokUser = {
    ...(resolvedExternalId && { external_id: resolvedExternalId }),
    ...(resolvedEmail && { email: resolvedEmail }),
    ...(resolvedPhone && { phone: resolvedPhone }),
    ...(resolvedTtclid && { ttclid: resolvedTtclid }),
    ...(resolvedTtp && { ttp: resolvedTtp }),
    ...(resolvedClientIp && { ip: resolvedClientIp }),
    ...(resolvedUserAgent && { user_agent: resolvedUserAgent })
  }

  const resolvedSourceUrl = ensureString(event.sourceUrl)

  const pageContext: TikTokPage = {
    ...(resolvedSourceUrl && { url: resolvedSourceUrl })
  }

  const globalContext: TikTokContext = {
    user: userContext,
    page: pageContext,
    ...(resolvedClientIp && { ip: resolvedClientIp }),
    ...(resolvedUserAgent && { user_agent: resolvedUserAgent })
  }

  const eventCurrency = event.data?.currency
  const eventValue = event.data?.value
  const eventTransactionId = event.data?.transactionId

  return {
    type: 'track',
    event: tiktokEventName,

    ...(event.eventId && { event_id: event.eventId }),

    timestamp: new Date(event.occurredAt * 1000).toISOString(),

    context: globalContext,

    properties: {
      ...(contents.length > 0 && { contents }),
      content_type: 'product',

      ...(eventCurrency && { currency: eventCurrency }),
      ...(eventValue !== undefined && { value: eventValue }),
      ...(eventTransactionId && { order_id: eventTransactionId })
    }
  }
}
