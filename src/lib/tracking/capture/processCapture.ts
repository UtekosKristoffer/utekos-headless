// Path: src/lib/tracking/capture/processCapture.ts
import { prepareCaptureData } from '@/lib/tracking/capture/prepareCaptureData'
import type {
  CaptureDependencies,
  CaptureContext,
  CaptureResult
} from 'types/tracking/capture'
import type { CaptureBody } from 'types/tracking/meta'

export async function processCapture(
  token: string,
  body: CaptureBody,
  context: CaptureContext,
  deps: CaptureDependencies
): Promise<CaptureResult> {
  const payload = prepareCaptureData(body, context)
  const { userData } = payload
  await deps.logger(
    'INFO',
    '📩📩📩 Capture Identifiers 📩📩📩',
    {
      cartId: payload.cartId,
      fbp: userData.fbp,
      fbc: userData.fbc,
      scid: userData.scid,
      click_id: userData.click_id,
      epik: userData.epik,
      external_id: userData.external_id,
      hasEmailHash: !!userData.email_hash,
      clientIp: userData.client_ip_address,
      ga_client_id: payload.ga_client_id ? 'Captured' : 'Missing',
      ga_session_id: payload.ga_session_id ? 'Captured' : 'Missing'
    },
    {
      token,
      checkoutUrl: payload.checkoutUrl
    }
  )

  try {
    await deps.redisSet(`checkout:${token}`, payload, 604800)
    return { success: true }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Redis error'
    await deps.logger(
      'ERROR',
      'Redis save failed',
      { error: errorMessage },
      { token }
    )

    return { success: false, error: 'Failed to save checkout data' }
  }
}
