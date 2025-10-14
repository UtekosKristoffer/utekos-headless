'use client'

import { ArrowRightIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/className'

const BANNER_STORAGE_KEY = 'utekos-techdawn-launch-banner-dismissed-timestamp'
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
        'relative animate-slide-in-down',
        isExiting && 'animate-slide-out-up'
      )}
    >
      <Link
        href='/produkter/utekos-techdawn'
        className='group block w-full bg-sky-800 p-3 text-center text-sm font-medium text-white transition-colors hover:text-neutral-200'
      >
        <span className='mr-2'>
          <span className='font-semibold'>NYHET:</span> Opplev Utekos TechDawn™
          - Kompromissløs varme for norske kvelder.
        </span>
        <span className='font-bold'>Se lanseringstilbudet!</span>
        <span> 🎉 </span>
        <ArrowRightIcon className='ml-2 inline-block size-4 transition-transform group-hover:translate-x-1' />
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white'
      >
        <XIcon className='h-4 w-4 cursor-pointer' />
      </button>
    </div>
  )
}
