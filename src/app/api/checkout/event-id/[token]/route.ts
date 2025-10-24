// src/app/api/checkout/event-id/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from '@/db/zod/zodConfig'
import { redisGet } from '@/lib/redis'
import type {CheckoutAttribution} from '@types'
export const runtime = 'nodejs'


// Valider route-params med Zod (server-only zod)
const ParamsSchema = z.object({
  token: z.string().min(4).max(128)
})
type Params = z.infer<typeof ParamsSchema>

export async function GET(
  _req: NextRequest,
  ctx: { params: Params }
): Promise<NextResponse> {
  const parsed = ParamsSchema.safeParse(ctx.params)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const token = parsed.data.token
  const attrib = await redisGet<CheckoutAttribution>(`checkout:${token}`)

  return NextResponse.json({
    eventId: attrib?.eventId ?? null
  })
}
