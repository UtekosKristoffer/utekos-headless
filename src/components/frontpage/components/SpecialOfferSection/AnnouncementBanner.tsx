'use client'

import { ArrowRightIcon, XIcon, Gift } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/className'
const BANNER_STORAGE_KEY = 'utekos-local-delivery-bergen-2024'
const BANNER_EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000 // 3 dager
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
        href='/kampanje/julegaver/lokal-levering'
        className='group block w-full bg-gradient-to-r from-red-950 via-red-900 to-red-950 px-8 py-3 text-center text-sm font-medium text-white transition-all hover:bg-red-950'
      >
        <div className='flex items-center justify-center gap-2'>
          <Gift className='h-4 w-4 text-red-200' />

          <span className='mr-1'>
            <span className='font-bold text-red-100'>Bergen: </span>
            {/* Kort tekst på mobil */}
            <span className='inline md:hidden'>
              Hjemlevering på bestillinger helt frem til julaftenn 🎅
            </span>
            {/* Full tekst på desktop */}
            <span className='hidden md:inline'>
              Hjemlevering på bestillinger helt frem til julaften 🎅
            </span>
          </span>

          <span className='hidden items-center font-bold text-white underline decoration-red-400 underline-offset-4 transition-all group-hover:decoration-white sm:flex'>
            Kjøp julegavene her
            <ArrowRightIcon className='ml-1 inline-block size-4 transition-transform group-hover:translate-x-1' />
          </span>

          <ArrowRightIcon className='inline-block size-4 sm:hidden' />
        </div>
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-red-200/80 transition-colors hover:bg-red-950/50 hover:text-white'
      >
        <XIcon className='h-4 w-4 cursor-pointer' />
      </button>
    </div>
  )
}
