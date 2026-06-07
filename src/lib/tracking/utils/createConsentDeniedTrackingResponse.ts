import { NextResponse } from 'next/server'

export function createConsentDeniedTrackingResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}
