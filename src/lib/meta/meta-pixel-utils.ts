// src/lib/meta-pixel-utils.ts
'use server'
/**
 * SHA-256 hashing for manual advanced matching
 */
async function hashValue(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Oppdater Meta Pixel med advanced matching data
 * Kall denne når brukerdata blir tilgjengelig (ved login, checkout, etc.)
 *
 * @example
 * // I din checkout eller login komponent:
 * await setMetaAdvancedMatching({
 *   email: user.email,
 *   firstName: user.firstName,
 *   lastName: user.lastName,
 *   phone: user.phone,
 *   city: user.city,
 *   zipCode: user.zipCode,
 *   country: 'no'
 * })
 */
export async function setMetaAdvancedMatching(userData: {
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  externalId?: string
}) {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('Meta Pixel not available for advanced matching')
    return
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  if (!pixelId) return

  const hashedData: Record<string, string> = {}

  try {
    // Hash brukerdata for manual advanced matching
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
      // Fjern alle non-digits og hash (for norske nummer, behold landkode)
      const cleanPhone = userData.phone.replace(/\D/g, '')
      hashedData.ph = await hashValue(cleanPhone)
    }
    if (userData.city) {
      hashedData.ct = await hashValue(userData.city.replace(/\s/g, ''))
    }
    if (userData.state) {
      hashedData.st = await hashValue(userData.state.toLowerCase())
    }
    if (userData.zipCode) {
      hashedData.zp = await hashValue(userData.zipCode)
    }
    if (userData.country) {
      hashedData.country = await hashValue(userData.country.toLowerCase())
    }
    if (userData.externalId) {
      // External ID bør også hashes for sikkerhet
      hashedData.external_id = await hashValue(userData.externalId)
    }

    // Re-initialize pixel med advanced matching data
    if (Object.keys(hashedData).length > 0) {
      window.fbq('init', pixelId, hashedData)

      console.log('📊 Meta Pixel: Advanced matching updated', {
        fields: Object.keys(hashedData),
        timestamp: new Date().toISOString()
      })

      // Lagre i sessionStorage for gjenbruk i samme sesjon
      sessionStorage.setItem('meta_am_data', JSON.stringify(hashedData))
    }
  } catch (error) {
    console.error('Meta Pixel: Error setting advanced matching', error)
  }

  return hashedData
}

/**
 * Hent cached advanced matching data fra sessionStorage
 */
export function getCachedAdvancedMatchingData(): Record<string, string> | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = sessionStorage.getItem('meta_am_data')
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

/**
 * Track standard events med advanced matching
 */
export async function trackMetaEvent(
  eventName: string,
  params?: Record<string, any>,
  includeUserData: boolean = true
) {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('Meta Pixel not available')
    return
  }

  const eventId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Track via browser pixel
  window.fbq('track', eventName, params || {}, { eventID: eventId })

  // Send til CAPI med advanced matching data hvis tilgjengelig
  if (process.env.NODE_ENV === 'production') {
    const userData = includeUserData ? getCachedAdvancedMatchingData() : null

    try {
      const response = await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          eventData: params || {},
          eventId,
          eventSourceUrl: window.location.href,
          eventTime: Math.floor(Date.now() / 1000),
          ...(userData && { userData })
        })
      })

      if (!response.ok) {
        console.error('Meta CAPI error:', await response.json())
      }
    } catch (error) {
      console.error('Meta CAPI failed:', error)
    }
  }

  console.log(`📊 Meta Pixel: ${eventName} tracked`, { params, eventId })
}
