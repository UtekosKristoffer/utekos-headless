// Path: src/lib/tracking/utils/createTrackingResponse.ts

import { NextResponse } from 'next/server'
import type { TrackingServiceResult } from '@types'
export function createTrackingResponse(
  result: TrackingServiceResult
): NextResponse {
  if (result.success) {
    return NextResponse.json({
      success: true,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id
    })
  }

  return NextResponse.json(
    {
      error: result.error || 'Unknown tracking error',
      details: result.details
    },
    { status: 500 }
  )
}
