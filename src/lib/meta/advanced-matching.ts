// src/lib/meta/advanced-matching.ts
'use server'
/**
 * Helper for å sette advanced matching når brukerdata blir tilgjengelig
 * Bruk denne i checkout og nyhetsbrev-komponenter
 */

/**
 * Hash data med SHA-256 for Meta
 */
async function hashValue(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Send advanced matching data til Meta
 * Kall denne når bruker gir data (checkout, nyhetsbrev)
 */
export async function setAdvancedMatching(userData: {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  zipCode?: string
}) {
  if (typeof window === 'undefined' || !window.fbq) return

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) return

  try {
    const hashedData: Record<string, string> = {}

    // Hash all brukerdata
    if (userData.email) {
      hashedData.em = await hashValue(userData.email)
    }
    if (userData.firstName) {
      hashedData.fn = await hashValue(userData.firstName)
    }
    if (userData.lastName) {
      hashedData.ln = await hashValue(userData.lastName)
    }
    if (userData.phone) {
      // Fjern mellomrom og spesialtegn, behold kun tall
      const cleanPhone = userData.phone.replace(/\D/g, '')
      // Legg til landkode 47 hvis ikke allerede der
      const phoneWithCountry =
        cleanPhone.startsWith('47') ? cleanPhone : '47' + cleanPhone
      hashedData.ph = await hashValue(phoneWithCountry)
    }
    if (userData.zipCode) {
      hashedData.zp = await hashValue(userData.zipCode)
    }

    // Sett country til 'no' for Norge
    hashedData.country = await hashValue('no')

    // Re-init pixel med advanced matching
    window.fbq('init', pixelId, hashedData)

    console.log('📊 Meta: Advanced matching aktivert', {
      fields: Object.keys(hashedData)
    })

    // Lagre i sessionStorage for gjenbruk
    sessionStorage.setItem('meta_am', JSON.stringify(hashedData))

    return hashedData
  } catch (error) {
    console.error('Meta: Advanced matching error', error)
    return null
  }
}

/**
 * Hent cached advanced matching data
 */
export function getCachedAdvancedMatching(): Record<string, string> | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = sessionStorage.getItem('meta_am')
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

/**
 * Track event med advanced matching hvis tilgjengelig
 */
export async function trackWithAdvancedMatching(
  eventName: string,
  params?: Record<string, any>
) {
  if (!window.fbq) return

  const eventId = `${eventName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Track i browser
  window.fbq('track', eventName, params || {}, { eventID: eventId })

  // Send til CAPI med advanced matching
  if (process.env.NODE_ENV === 'production') {
    const cachedAM = getCachedAdvancedMatching()

    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventData: params || {},
        eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000),
        // Legg til hashed brukerdata hvis tilgjengelig
        ...(cachedAM && { userData: cachedAM })
      })
    }).catch(err => console.error('CAPI error:', err))
  }
}
