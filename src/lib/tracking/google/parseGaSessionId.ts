// Path: src/lib/google/parseGaSessionId.ts

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
