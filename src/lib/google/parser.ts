// src/lib/google/parser.ts

export function parseGaClientId(
  cookieValue: string | undefined
): string | null {
  if (!cookieValue) return null

  const parts = cookieValue.split('.')
  if (parts.length >= 4) {
    return parts.slice(2).join('.')
  }
  return null
}

export function parseGaSessionId(
  cookieValue: string | undefined
): string | null {
  if (!cookieValue) return null

  const parts = cookieValue.split('.')
  if (parts.length >= 3) {
    return parts[2] ?? null
  }
  return null
}

export function findGaSessionCookie(
  cookies: Map<string, string>,
  measurementId: string
): string | undefined {
  const idSuffix = measurementId.replace('G-', '')
  const cookieName = `_ga_${idSuffix}`

  return cookies.get(cookieName)
}
