'use client'

import { useEffect, useState } from 'react'
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

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)

    // Sjekk om vi er i kassen eller handlekurv - ikke forstyrr da!
    if (pathname?.includes('/checkouts') || pathname?.includes('/handlekurv')) {
      return
    }

    // Endret nøkkelen til '_v2' så den dukker opp på nytt for deg nå
    const hasSeenPopup = localStorage.getItem('utekos_newsletter_v2')

    if (!hasSeenPopup) {
      // Viser etter 3 sekunder (raskere respons)
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Lagrer at den er sett når den lukkes
      localStorage.setItem('utekos_newsletter_v2', 'true')
    }
  }

  const handleSubmit = async (formData: FormData) => {
    // Lukker modalen umiddelbart for bedre UX
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
      <DialogContent className='sm:max-w-[800px] p-0 gap-0 bg-neutral-950 border-neutral-800 text-white overflow-hidden'>
        <button
          onClick={() => handleOpenChange(false)}
          className='absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white/70 hover:bg-black/40 hover:text-white transition-colors'
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Lukk</span>
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Venstre side: Bilde / Stemning */}
          <div className='relative hidden md:flex h-full min-h-[400px] w-full flex-col justify-between bg-neutral-900 p-8'>
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-neutral-900/40 z-0' />
            {/* Bakgrunnsbilde kan legges inn her med next/image fill */}

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
                Det finnes ikke dårlig vær, bare dårlige klær... og for få
                nyhetsbrev om komfort.
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
                Få 10% rabatt på ditt første kjøp, eksklusive turtips og nyheter
                rett i innboksen.
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
