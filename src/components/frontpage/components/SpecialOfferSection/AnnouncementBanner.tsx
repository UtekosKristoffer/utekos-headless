// Path: src/components/banner/AnnouncementBanner.tsx
'use client'

import { ArrowRightIcon, XIcon, Timer } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/className'

const BANNER_STORAGE_KEY = 'utekos-tech-announcement-2025'
const BANNER_EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000

export default function AnnouncementBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const dismissedTimestamp = localStorage.getItem(BANNER_STORAGE_KEY)
    if (dismissedTimestamp) {
      if (
        Date.now() - parseInt(dismissedTimestamp, 10)
        > BANNER_EXPIRATION_MS
      ) {
        localStorage.removeItem(BANNER_STORAGE_KEY)
        setShowBanner(true)
      } else {
        setShowBanner(false)
      }
    } else {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsExiting(true)
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())

    setTimeout(() => {
      setShowBanner(false)
    }, 500)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div
      className={cn(
        'relative z-40 animate-slide-in-down shadow-md',
        isExiting && 'animate-slide-out-up'
      )}
    >
      <Link
        href='/produkter/comfyrobe'
        data-track='AnnouncementBannerClick'
        className='group block w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-3 pl-4 pr-12 text-center text-sm font-medium text-white transition-all hover:bg-slate-950 sm:px-8'
      >
        <div className='flex items-center justify-center gap-2'>
          <Timer className='h-4 w-4 shrink-0 text-blue-200' />

          <span className='mr-1'>
            <span className='hidden font-bold text-blue-100 sm:inline'>
              Siste sjanse:{' '}
            </span>

            <span className='inline md:hidden'>
              Siste sjanse: Comfyrobe™ kr 990,-
            </span>

            <span className='hidden md:inline'>
              Sikre deg Comfyrobe™ til kun kr 990,-
            </span>
          </span>

          <span className='hidden items-center font-bold text-white underline decoration-blue-400 underline-offset-4 transition-all group-hover:decoration-white sm:flex'>
            Kjøp her
            <ArrowRightIcon className='ml-1 inline-block size-4 transition-transform group-hover:translate-x-1' />
          </span>

          <ArrowRightIcon className='ml-1 inline-block size-4 shrink-0 sm:hidden' />
        </div>
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white'
      >
        <XIcon className='h-4 w-4 cursor-pointer' />
      </button>
    </div>
  )
}
