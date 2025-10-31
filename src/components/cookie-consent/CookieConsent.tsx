'use client'

import { useEffect, useState } from 'react'
import { useConsent } from './useConsent'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CookieConsentContent } from './CookieConsentContent'
export default function CookieConsent() {
  const { hasInteracted } = useConsent()
  const [open, setOpen] = useState(false)

  // Viser modalen hvis brukeren ikke har interagert før
  useEffect(() => {
    if (!hasInteracted) {
      setOpen(true)
    }
  }, [hasInteracted])

  // Forhindrer lukking av dialogen før et valg er tatt
  const handleOpenChange = (newOpen: boolean) => {
    if (hasInteracted) {
      setOpen(newOpen)
    } else {
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={
          'sm:max-w-7 !hidden  border-neutral-700 border max-h-[70vh] p-0 '
          + 'bg-background'
        }
      >
        <CookieConsentContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
