import { type GA4SendResult } from '@/lib/tracking/server/sendGA4Events'

export type PurchaseSendResult =
  | {
      sent: true
      result: GA4SendResult
    }
  | {
      sent: false
      reason: 'missing_client_id' | 'missing_transaction_id' | 'missing_items'
    }
