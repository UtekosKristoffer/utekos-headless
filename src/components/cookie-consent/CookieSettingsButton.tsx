'use client'

import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/className'
import { CookieConsentContent } from './CookieConsentContent' // NY IMPORT

export default function CookieSettingsButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'link' }),
          'p-0 h-auto text-sm text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark'
        )}
      >
        Innstillinger for informasjonskapsler
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className='sm:max-w-lg items-center bg-background! mx-auto max-h-[60vh]'
      >
        <CookieConsentContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
