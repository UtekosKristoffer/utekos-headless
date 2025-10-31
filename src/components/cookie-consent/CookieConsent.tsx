'use client'

import { useEffect, useState } from 'react'
import { useConsent } from './useConsent'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CookieConsentContent } from './CookieConsentContent'
export default function CookieConsent() {
  const { hasInteracted } = useConsent()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!hasInteracted) {
      setOpen(false)
    }
  }, [hasInteracted])

  const handleOpenChange = (newOpen: boolean) => {
    if (hasInteracted) {
      setOpen(newOpen)
    } else {
      setOpen(false)
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
