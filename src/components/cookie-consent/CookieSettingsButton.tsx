'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/className'
import { useConsent } from './useConsent'

export default function CookieSettingsButton() {
  const { openSettings } = useConsent()

  return (
    <button
      type='button'
      onClick={openSettings}
      className={cn(
        buttonVariants({ variant: 'link' }),
        'p-0 h-auto text-sm text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark'
      )}
    >
      Innstillinger for informasjonskapsler
    </button>
  )
}
