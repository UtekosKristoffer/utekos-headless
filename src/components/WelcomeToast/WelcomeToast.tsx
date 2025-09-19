'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export function WelcomeToast() {
  useEffect(() => {
    // Ignore if screen height is too small
    if (window.innerHeight < 650) return
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Velkommen til Utekos sin nettbutikk!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/'
        },
        description: (
          <>
            Ikke la kjølige kvelder stoppe deg. Sjekk ut vårt utvalg av
            komfortplagg!
          </>
        )
      })
    }
  }, [])

  return null
}
