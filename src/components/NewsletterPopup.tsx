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
  const soundPlayedRef = useRef(false)

  // Lydeffekt (som før)
  useEffect(() => {
    if (isOpen && !soundPlayedRef.current) {
      const audio = new Audio('/sounds/popup-slam.mp3')
      audio.volume = 0.4
      audio.play().catch(() => {}) // Ignorerer feil hvis autoplay blokkeres
      soundPlayedRef.current = true
    }
  }, [isOpen])

  useEffect(() => {
    setIsMounted(true)

    // Ikke vis i kasse/handlekurv
    if (pathname?.includes('/checkouts') || pathname?.includes('/handlekurv'))
      return

    const hasSeenPopup = localStorage.getItem('utekos_newsletter_v2')
    if (hasSeenPopup) return // Har allerede sett den, stopp her.

    // Funksjon for å starte nedtellingen
    const startCountdown = () => {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 8000) // 8 sekunder
      return () => clearTimeout(timer)
    }

    // Sjekk om brukeren allerede har tatt stilling til cookies
    const hasConsent = localStorage.getItem('utekos_cookie_consent')

    if (hasConsent) {
      return startCountdown()
    } else {
      const handleConsentSaved = () => {
        startCountdown()
        window.removeEventListener('cookie_consent_saved', handleConsentSaved)
      }

      window.addEventListener('cookie_consent_saved', handleConsentSaved)

      return () =>
        window.removeEventListener('cookie_consent_saved', handleConsentSaved)
    }
  }, [pathname])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) localStorage.setItem('utekos_newsletter_v2', 'true')
  }

  const handleSubmit = async (formData: FormData) => {
    setIsOpen(false)
    localStorage.setItem('utekos_newsletter_v2', 'true')
    const result = await subscribeToNewsletter(formData)
    if (result.success) toast.success(result.message)
    else toast.error(result.message)
  }

  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          // Base styles
          'fixed z-50 grid w-full gap-0 p-0 border-neutral-800 bg-neutral-950 text-white shadow-2xl overflow-hidden',

          // --- SENTRERING (Standard Modal) ---np run sync 'l'
          // Shadcn bruker vanligvis left-1/2 top-1/2 translate osv. som standard i sin base-komponent.
          // Hvis din DialogContent-base mangler dette, kan du legge til:
          // 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',

          // --- STØRRELSE ---
          'sm:max-w-[800px] sm:rounded-2xl',

          // --- ANIMASJONER ("SLAM" effekt i midten) ---
          'duration-500 ease-out', // Litt "tyngde"
          'data-[state=open]:animate-in',
          'data-[state=closed]:animate-out',

          // Kommer nedenfra og scaler opp (Slam)
          'data-[state=open]:slide-in-from-bottom-12', // Starter litt lenger ned
          'data-[state=open]:zoom-in-90', // Starter litt mindre (90%) og vokser til 100%
          'data-[state=open]:fade-in-0',

          'data-[state=closed]:zoom-out-95',
          'data-[state=closed]:fade-out-0'
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
          {/* Venstre side: Bilde (Kun desktop) */}
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
