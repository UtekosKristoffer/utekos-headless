// Path: src/app/api/meta-events/build-user-data/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
const bizSdk = require('facebook-nodejs-business-sdk')
const { UserData, ServerEvent, EventRequest } = bizSdk

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

interface MetaEventRequestBody {
  event_name: string
  event_id: string
  event_source_url: string
  custom_data?: Record<string, unknown>
}

interface MetaEventResponse {
  events_received: number
  messages: string[]
  fbtrace_id: string
}

interface FacebookUserData {
  setClientIpAddress(ip: string): FacebookUserData
  setClientUserAgent(ua: string): FacebookUserData
  setFbc(fbc: string): FacebookUserData
  setFbp(fbp: string): FacebookUserData
}

interface FacebookServerEvent {
  setEventName(name: string): FacebookServerEvent
  setEventId(id: string): FacebookServerEvent
  setEventTime(timestamp: number): FacebookServerEvent
  setEventSourceUrl(url: string): FacebookServerEvent
  setActionSource(source: string): FacebookServerEvent
  setUserData(userData: FacebookUserData): FacebookServerEvent
  setCustomData(data: Record<string, unknown>): FacebookServerEvent
}

interface FacebookEventRequest {
  setEvents(events: FacebookServerEvent[]): FacebookEventRequest
  execute(): Promise<MetaEventResponse>
}

async function buildUserData(req: NextRequest): Promise<FacebookUserData> {
  const cookieStore = await cookies()

  const fbc = cookieStore.get('_fbc')?.value
  const fbp = cookieStore.get('_fbp')?.value
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ua = req.headers.get('user-agent') ?? undefined

  const userData = new UserData() as FacebookUserData
  if (ip) userData.setClientIpAddress(ip)
  if (ua) userData.setClientUserAgent(ua)
  if (fbc) userData.setFbc(fbc)
  if (fbp) userData.setFbp(fbp)

  return userData
}

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Missing Meta config' }, { status: 500 })
  }

  const body = (await req.json()) as MetaEventRequestBody
  const userData = await buildUserData(req)

  const serverEvent = new ServerEvent() as FacebookServerEvent
  serverEvent
    .setEventName(body.event_name)
    .setEventId(body.event_id)
    .setEventTime(Math.floor(Date.now() / 1000))
    .setEventSourceUrl(body.event_source_url)
    .setActionSource('website')
    .setUserData(userData)
    .setCustomData(body.custom_data ?? {})

  const eventRequest = new EventRequest(
    ACCESS_TOKEN,
    PIXEL_ID
  ) as FacebookEventRequest
  eventRequest.setEvents([serverEvent])

  const response = await eventRequest.execute()

  return NextResponse.json({ success: true, response })
}
