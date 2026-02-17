import { z } from '@/db/zod/zodConfig'

export const CaptureIdentifiersSchema = z.object({
  cartId: z.string().min(1),
  checkoutUrl: z.string().url(),
  eventId: z.string().optional() // Kobling til InitiateCheckout eventet
})

export type CaptureIdentifiersInput = z.infer<typeof CaptureIdentifiersSchema>
