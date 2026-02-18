import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { MetaEventPayload } from 'types/tracking/meta/event/MetaEventPayload'
import type { ValidationResult } from 'types/tracking/webhook/ValidationResult'

export async function parseAndValidateEventPayload(
  request: NextRequest
): Promise<ValidationResult> {
  let body: MetaEventPayload

  try {
    body = (await request.json()) as MetaEventPayload
  } catch {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      )
    }
  }

  if (!body.eventName || !body.eventId) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Missing required parameters: eventName or eventId' },
        { status: 400 }
      )
    }
  }

  return { success: true, payload: body }
}
