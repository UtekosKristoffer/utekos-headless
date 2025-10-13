// Path: app/api/meta-events/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    return NextResponse.json(
      { error: 'Missing Meta Pixel configuration' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { eventName, eventData, userData } = body

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: userData,
          custom_data: eventData
        }
      ]
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI Error:', result)
      return NextResponse.json(
        { error: 'Failed to send event to Meta' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
