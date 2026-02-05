import { getCookie } from '@/components/analytics/MetaPixel/getCookie'

export function useGA4Ids() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.replace(
    'G-',
    ''
  )

  const getClientId = () => {
    const gaCookie = getCookie('_ga')
    if (!gaCookie) return undefined

    const parts = gaCookie.split('.')
    if (parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`
    }
    return undefined
  }

  const getSessionId = () => {
    if (!measurementId) return undefined
    const sessionCookie = getCookie(`_ga_${measurementId}`)
    if (!sessionCookie) return undefined

    const parts = sessionCookie.split('.')
    if (parts.length >= 3) {
      return parts[2]
    }
    return undefined
  }

  return {
    client_id: getClientId(),
    session_id: getSessionId()
  }
}
