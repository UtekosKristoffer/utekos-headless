'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CookieConsentContent } from './CookieConsentContent' // NY IMPORT

export default function CookieSettingsButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='p-0 h-auto text-sm text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark'
        >
          Innstillinger for informasjonskapsler
        </Button>
      </DialogTrigger>
      <DialogContent
        className={
          'hidden sm:max-w-lg max-h-[60vh] p-0 ' + 'bg-background' // Krysset er OK her
        }
      >
        <CookieConsentContent setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
