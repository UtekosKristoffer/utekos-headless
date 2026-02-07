// Path: src/app/api/checkout/capture-identifiers/route.ts
import type { NextRequest } from 'next/server'
import { parseAndValidateCaptureRequest } from '@/lib/tracking/capture/parseAndValidateCaptureRequest'
import { adaptRequestToCaptureContext } from '@/lib/tracking/capture/adaptRequestToCaptureContext'
import { createCaptureResponse } from '@/lib/tracking/capture/createCaptureResponse'
import { redisSet } from '@/lib/redis/getRedis'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import { processCapture } from '@/lib/tracking/capture/processCapture'

export async function POST(req: NextRequest) {
  const validation = await parseAndValidateCaptureRequest(req)

  if (!validation.success) {
    return validation.errorResponse
  }

  const context = adaptRequestToCaptureContext(req)
  const result = await processCapture(
    validation.token,
    validation.body,
    context,
    {
      redisSet,
      logger: logToAppLogs
    }
  )

  return createCaptureResponse(result)
}
