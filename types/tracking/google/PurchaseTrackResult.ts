export type PurchaseTrackResult =
  | { sent: true }
  | {
      sent: false
      reason:
        | 'missing_client_id'
        | 'missing_transaction_id'
        | 'missing_items'
        | 'ga_error'
        | 'missing_credentials'
      details?: Record<string, any>
    }
