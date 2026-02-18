import { NextResponse } from 'next/server'
import type { TrackingServiceResult } from 'types/tracking/webhook/TrackingServiceResult'

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
      success: false,
      error: result.error || 'Unknown tracking error',
      details: result.details
    },
    { status: 200 }
  )
}
