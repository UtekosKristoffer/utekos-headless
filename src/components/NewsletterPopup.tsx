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
import { Mail, Tag } from 'lucide-react'
import { subscribeToNewsletter } from '@/lib/actions/subscribeToNewsLetters'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/className'

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // La til loading state
  const pathname = usePathname()
  const soundPlayedRef = useRef(false)

  useEffect(() => {
    if (isOpen && !soundPlayedRef.current) {
      const audio = new Audio('/sounds/popup-slam.mp3')
      audio.volume = 0.4
      audio.play().catch(err => console.log('Lyd blokkert (normalt):', err))
      soundPlayedRef.current = true
    }
  }, [isOpen])

  useEffect(() => {
    setIsMounted(true)

    if (pathname?.includes('/checkouts') || pathname?.includes('/handlekurv'))
      return

    const hasSeenPopup = localStorage.getItem('utekos_newsletter_v5')
    if (hasSeenPopup) return

    const startCountdown = () => {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 8000)
      return () => clearTimeout(timer)
    }

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
    if (!open) localStorage.setItem('utekos_newsletter_v5', 'true')
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await subscribeToNewsletter(
      { status: 'idle', message: '' },
      formData
    )

    setIsSubmitting(false)
    if (result.status === 'success') {
      setIsOpen(false)
      localStorage.setItem('utekos_newsletter_v5', 'true')
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }
  if (!isMounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          'fixed z-50 grid w-full gap-0 p-0 border-neutral-800 bg-neutral-950 text-white shadow-2xl overflow-hidden',
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'sm:max-w-[800px] sm:rounded-2xl',
          'duration-500 ease-out',
          'data-[state=open]:animate-in',
          'data-[state=closed]:animate-out',
          'data-[state=open]:slide-in-from-bottom-12',
          'data-[state=open]:zoom-in-90',
          'data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95',
          'data-[state=closed]:fade-out-0',
          '[&>button]:text-neutral-400 [&>button]:hover:text-white [&>button]:top-4 [&>button]:right-4 [&>button]:h-8 [&>button]:w-8 [&>button]:bg-black/20 [&>button]:rounded-full'
        )}
      >
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Venstre side: Bilde/Grafikk */}
          <div className='relative hidden md:flex h-full min-h-[400px] w-full flex-col justify-between bg-neutral-900 p-8'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-neutral-900/40 z-0' />

            {/* Endret innhold her for å matche rabatt */}
            <div className='relative z-10'>
              <div className='inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-3 mb-4'>
                <Tag className='h-6 w-6 text-emerald-400' />
              </div>
              <h3 className='text-lg font-medium text-emerald-100'>
                Eksklusiv medlemsfordel
              </h3>
            </div>

            <div className='relative z-10'>
              <p className='text-3xl font-bold text-white mb-2'>Spar 800,-</p>
              <p className='text-sm text-neutral-400 leading-relaxed'>
                "Ingenting slår følelsen av å være varm og tørr – spesielt når
                du gjør et kupp."
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-center p-8 sm:p-12 bg-neutral-950'>
            <DialogHeader className='text-left mb-6'>
              <DialogTitle className='text-2xl sm:text-3xl font-bold tracking-tight mb-2'>
                Få 800kr i rabatt
              </DialogTitle>
              <DialogDescription className='text-neutral-400 text-base'>
                Meld deg på nyhetsbrevet og få rabattkoden på Comfyrobe™ sendt
                direkte til innboksen din.
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
                disabled={isSubmitting}
                className='w-full bg-white text-black hover:bg-neutral-200 font-bold h-11 transition-colors'
              >
                {isSubmitting ? 'Registrerer...' : 'Få rabattkode'}
              </Button>
              <p className='text-xs text-neutral-600 text-center mt-4'>
                Du kan melde deg av når som helst.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
