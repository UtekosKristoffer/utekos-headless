import { NextRequest } from 'next/server'
import crypto from 'node:crypto'
export function verifyHmac(req: NextRequest, raw: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET ?? ''
  if (!secret) {
    console.error('[HMAC Verify] SHOPIFY_WEBHOOK_SECRET is not set')
    return false
  }
  const header = req.headers.get('x-shopify-hmac-sha256') ?? ''
  if (!header) {
    console.error('[HMAC Verify] Missing x-shopify-hmac-sha256 header')
    return false
  }
  const digest = crypto
    .createHmac('sha256', secret)
    .update(raw, 'utf8')
    .digest('base64')

  if (header.length !== digest.length) {
    console.error('[HMAC Verify] Header length mismatch')
    return false
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(header))
  } catch (error) {
    console.error(
      '[HMAC Verify] Error during timingSafeEqual (likely invalid header format):',
      error
    )
    return false
  }
}
