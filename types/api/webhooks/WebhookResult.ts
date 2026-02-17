// Path: types/integrations/shopify/webhooks/WebhookResult.ts
import type { NextResponse } from 'next/server'
import type { OrderPaid } from './OrderPaid'
export type WebhookResult =
  | { success: true; order: OrderPaid }
  | { success: false; errorResponse: NextResponse }
