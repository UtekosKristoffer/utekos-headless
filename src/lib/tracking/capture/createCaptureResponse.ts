import { NextResponse } from 'next/server'
import type { CaptureResult } from '@types'
export function createCaptureResponse(result: CaptureResult): NextResponse {
  if (result.success) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: result.error }, { status: 500 })
}
