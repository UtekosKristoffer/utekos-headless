// Path: src/lib/tracking/google/findGoogleAnalyticsSessionCookie.ts

export function findGoogleAnalyticsSessionCookie(
  cookies: Map<string, string>,
  measurementId: string
): string | undefined {
  const idSuffix = measurementId.replace('G-', '')
  const cookieName = `_ga_${idSuffix}`

  return cookies.get(cookieName)
}
