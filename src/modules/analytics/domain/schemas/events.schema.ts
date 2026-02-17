// Path: src/modules/analytics/domain/events.schema.ts
import { z } from '@/db/zod/zodConfig'

const CurrencyCode = z.enum(['NOK', 'USD', 'EUR']).default('NOK')

export const AnalyticsUserSchema = z
  .object({
    id: z.string().optional(),
    email: z.email().optional(),
    emailHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    clientIp: z.union([z.ipv4(), z.ipv6()]).optional(),
    userAgent: z.string().optional(),
    fbp: z.string().optional(),
    fbc: z.string().optional(),
    fbclid: z.string().optional(),
    externalId: z.string().optional(),
    gaClientId: z.string().optional(),
    gaSessionId: z.number().optional(), 
    ttclid: z.string().optional(), 
    ttp: z.string().optional(),
    epik: z.string().optional(),
    scid: z.string().optional(),
    clickId: z.string().optional()
  })
  .loose()

export const AnalyticsItemSchema = z
  .object({
    item_id: z.string().min(1),
    item_name: z.string().optional(),
    item_variant: z.string().optional(),
    price: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    item_brand: z.string().optional(),
    item_category: z.string().optional()
  })
  .loose()

export const AnalyticsDataSchema = z
  .object({
    transactionId: z.string().optional(),
    value: z.number().nonnegative().optional(),
    currency: CurrencyCode,
    tax: z.number().optional(),
    shipping: z.number().optional(),
    coupon: z.string().optional(),
    items: z.array(AnalyticsItemSchema).optional(),
    contentIds: z.array(z.string()).optional()
  })
  .loose()

export const BaseEvent = z
  .object({
    eventId: z.string().min(1),
    occurredAt: z.number().int(),
    sourceUrl: z.url(),
    user: AnalyticsUserSchema
  })
  .loose()

export const PurchaseEvent = BaseEvent.extend({
  eventName: z.literal('Purchase'),
  data: AnalyticsDataSchema.extend({
    transactionId: z.string().min(1),
    value: z.number().min(0)
  })
})

export const AddToCartEvent = BaseEvent.extend({
  eventName: z.literal('AddToCart'),
  data: AnalyticsDataSchema
})

export const GeneralEvent = BaseEvent.extend({
  eventName: z.string(),
  data: AnalyticsDataSchema.optional()
})

export const UnifiedAnalyticsEventSchema = z.discriminatedUnion('eventName', [
  PurchaseEvent,
  AddToCartEvent,
  GeneralEvent
])

export type AnalyticsItem = z.infer<typeof AnalyticsItemSchema>
export type AnalyticsUser = z.infer<typeof AnalyticsUserSchema>
export type UnifiedAnalyticsEvent = z.infer<typeof UnifiedAnalyticsEventSchema>
export type AnalyticsData = z.infer<typeof AnalyticsDataSchema>
export type BaseEvent = z.infer<typeof BaseEvent>
export type PurchaseEvent = z.infer<typeof PurchaseEvent>
export type AddToCartEvent = z.infer<typeof AddToCartEvent>
export type GeneralEvent = z.infer<typeof GeneralEvent>
