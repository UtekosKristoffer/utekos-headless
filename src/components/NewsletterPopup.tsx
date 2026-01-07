'use client'

import { useEffect, useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Mail } from 'lucide-react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetter'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/className'

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Ref for å holde styr på om lyden er spilt (unngår dobbel avspilling i React Strict Mode)
  const soundPlayedRef = useRef(false)

  // --- LYDEFFEKT LOGIKK ---
  useEffect(() => {
    if (isOpen && !soundPlayedRef.current) {
      // Stien til lydfilen din i public-mappen
      const audio = new Audio('/sounds/popup-slam.mp3')
      audio.volume = 0.4 // Ikke for høyt! Juster mellom 0.1 og 1.0

      // Vi må bruke try/catch fordi nettlesere ofte blokkerer autoplay
      audio
        .play()
        .then(() => {
          soundPlayedRef.current = true
        })
        .catch(error => {
          // Dette er normalt hvis brukeren ikke har samhandlet med siden ennå.
          console.log(
            'Autoplay av lyd ble blokkert av nettleseren (normalt):',
            error
          )
        })
    }
  }, [isOpen])
  // ------------------------

  useEffect(() => {
    setIsMounted(true)

    if (pathname?.includes('/checkouts') || pathname?.includes('/handlekurv')) {
      return
    }

    const hasSeenPopup = localStorage.getItem('utekos_newsletter_v2')

    if (!hasSeenPopup) {
      // TILBAKE TIL 8 SEKUNDER
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem('utekos_newsletter_v2', 'true')
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsOpen(false)
    localStorage.setItem('utekos_newsletter_v2', 'true')

    const result = await subscribeToNewsletter(formData)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* HER ER MAGIEN FOR ANIMASJONEN:
        Vi overstyrer Shadcn sine standard sentrerings-klasser med !important (!).
        Vi plasserer den 'fixed bottom-4 right-4'.
        Vi bruker 'slide-in-from-right' og 'slide-in-from-bottom' for "slam"-effekten.
      */}
      <DialogContent
        className={cn(
          // Base styles
          'fixed z-50 grid w-full gap-0 p-0 border-neutral-800 bg-neutral-950 text-white shadow-2xl overflow-hidden',
          // Resetting av Shadcn sentrering (viktig!)
          '!left-auto !top-auto !translate-x-0 !translate-y-0',
          // Posisjonering i hjørnet
          'bottom-0 right-0 sm:bottom-6 sm:right-6 sm:rounded-2xl sm:max-w-[800px]',
          // Animasjoner
          'duration-500 ease-out', // Litt lengre tid og 'ease-out' for tyngde
          'data-[state=open]:animate-in',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=open]:fade-in-0',
          // "SLAM" effekten: Kommer fra høyre og bunn, og scaler litt opp
          'data-[state=open]:slide-in-from-right-full',
          'data-[state=open]:slide-in-from-bottom-1/4',
          'sm:data-[state=open]:zoom-in-95', // Gir en liten "landings"-effekt på desktop
          'data-[state=closed]:slide-out-to-right-full',
          'data-[state=closed]:zoom-out-95'
        )}
      >
        <button
          onClick={() => handleOpenChange(false)}
          className='absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white/70 hover:bg-black/40 hover:text-white transition-colors'
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Lukk</span>
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Venstre side: Bilde / Stemning (Vises kun på desktop pga plass i hjørnet) */}
          <div className='relative hidden md:flex h-full min-h-[400px] w-full flex-col justify-between bg-neutral-900 p-8'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-neutral-900/40 z-0' />

            <div className='relative z-10'>
              <div className='inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-3 mb-4'>
                <Mail className='h-6 w-6 text-emerald-400' />
              </div>
              <h3 className='text-lg font-medium text-emerald-100'>
                Utekos® Club
              </h3>
            </div>

            <div className='relative z-10'>
              <p className='text-sm text-neutral-400 leading-relaxed'>
                "Det finnes ikke dårlig vær, bare dårlige klær... og for få
                nyhetsbrev om komfort."
              </p>
            </div>
          </div>

          {/* Høyre side: Skjema */}
          <div className='flex flex-col justify-center p-8 sm:p-12 bg-neutral-950'>
            <DialogHeader className='text-left mb-6'>
              <DialogTitle className='text-2xl sm:text-3xl font-bold tracking-tight mb-2'>
                Bli en del av varmen
              </DialogTitle>
              <DialogDescription className='text-neutral-400 text-base'>
                Få eksklusive rabatter, turtips og få vite først om nyheter rett
                i innboksen.
              </DialogDescription>
            </DialogHeader>

            <form action={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Input
                  name='email'
                  type='email'
                  placeholder='din@epost.no'
                  required
                  className='bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-emerald-600 h-11'
                />
              </div>
              <Button
                type='submit'
                className='w-full bg-white text-black hover:bg-neutral-200 font-bold h-11'
              >
                Meld meg på
              </Button>
              <p className='text-xs text-neutral-600 text-center mt-4'>
                Ingen spam. Meld deg av når som helst.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
