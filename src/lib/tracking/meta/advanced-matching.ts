// src/lib/meta/advanced-matching.ts
'use server'

async function hashValue(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

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
      const cleanPhone = userData.phone.replace(/\D/g, '')

      const phoneWithCountry =
        cleanPhone.startsWith('47') ? cleanPhone : '47' + cleanPhone
      hashedData.ph = await hashValue(phoneWithCountry)
    }
    if (userData.zipCode) {
      hashedData.zp = await hashValue(userData.zipCode)
    }

    hashedData.country = await hashValue('no')

    window.fbq('init', pixelId, hashedData)

    console.log('📊 Meta: Advanced matching aktivert', {
      fields: Object.keys(hashedData)
    })

    sessionStorage.setItem('meta_am', JSON.stringify(hashedData))

    return hashedData
  } catch (error) {
    console.error('Meta: Advanced matching error', error)
    return null
  }
}

export function getCachedAdvancedMatching(): Record<string, string> | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = sessionStorage.getItem('meta_am')
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}
export async function trackWithAdvancedMatching(
  eventName: string,
  params?: Record<string, any>
) {
  if (!window.fbq) return

  const eventId = `${eventName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  window.fbq('track', eventName, params || {}, { eventID: eventId })

  if (process.env.NODE_ENV === 'production') {
    const cachedAM = getCachedAdvancedMatching()

    fetch('/api/tracking-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventData: params || {},
        eventId,
        eventSourceUrl: window.location.href,
        eventTime: Math.floor(Date.now() / 1000),
        ...(cachedAM && { userData: cachedAM })
      })
    }).catch(err => console.error('CAPI error:', err))
  }
}
