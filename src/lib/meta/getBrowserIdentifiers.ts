import { cookies, headers } from 'next/headers'
import type { BrowserIdentifiers } from '@types'

export async function getBrowserIdentifiers(): Promise<BrowserIdentifiers> {
  const cookieStore = await cookies()
  const headersList = await headers()

  const forwardedFor = headersList.get('x-forwarded-for') ?? ''
  const clientIp =
    forwardedFor.split(',')[0]?.trim()
    || headersList.get('x-real-ip')
    || undefined

  const userAgent = headersList.get('user-agent') ?? undefined
  const fbp = cookieStore.get('_fbp')?.value
  const fbc = cookieStore.get('_fbc')?.value

  return {
    ...(clientIp !== undefined && { clientIp }),
    ...(userAgent !== undefined && { userAgent }),
    ...(fbp !== undefined && { fbp }),
    ...(fbc !== undefined && { fbc })
  }
}
