export function parseGaSessionId(cookieValue?: string): string | undefined {
  if (!cookieValue) return undefined

  // Cookien ser ofte slik ut: GS1.1.1766430637.1.0.0.0 (gammel standard)
  // eller s1766430637$o1$g0... (ny standard)

  // For ny standard: Hent tallene rett etter 's'
  if (cookieValue.startsWith('s')) {
    const match = cookieValue.match(/^s(\d+)/)
    return match ? match[1] : undefined
  }

  // For gammel standard (hvis den har punktumer):
  const parts = cookieValue.split('.')
  if (parts.length >= 3) {
    return parts[2] // Posisjon 2 er normalt session_id
  }

  return undefined
}
