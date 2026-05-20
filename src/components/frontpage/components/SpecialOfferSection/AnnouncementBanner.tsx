// Path: src/components/banner/AnnouncementBanner.tsx
'use client'

import { ArrowRightIcon, XIcon, BirdIcon } from 'lucide-react'
import Link from 'next/link'
import { useSyncExternalStore, useState } from 'react'
import { cn } from '@/lib/utils/className'

const BANNER_STORAGE_KEY = 'utekos-tech-announcement-2025'
const BANNER_EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000
const BANNER_STORAGE_EVENT = 'utekos:announcement-banner-storage'

function isAnnouncementBannerVisible() {
  const dismissedTimestamp = window.localStorage.getItem(BANNER_STORAGE_KEY)

  if (!dismissedTimestamp) {
    return true
  }

  return Date.now() - parseInt(dismissedTimestamp, 10) > BANNER_EXPIRATION_MS
}

function subscribeToAnnouncementBanner(onStoreChange: () => void) {
  const handleChange = () => {
    onStoreChange()
  }

  window.addEventListener('storage', handleChange)
  window.addEventListener(BANNER_STORAGE_EVENT, handleChange)

  return () => {
    window.removeEventListener('storage', handleChange)
    window.removeEventListener(BANNER_STORAGE_EVENT, handleChange)
  }
}

export default function AnnouncementBanner() {
  const [isExiting, setIsExiting] = useState(false)
  const showBanner = useSyncExternalStore(
    subscribeToAnnouncementBanner,
    isAnnouncementBannerVisible,
    () => false
  )

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsExiting(true)
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())
    window.dispatchEvent(new Event(BANNER_STORAGE_EVENT))

    setTimeout(() => {
      setIsExiting(false)
    }, 500)
  }

  if (!showBanner && !isExiting) {
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
        href='/skreddersy-varmen'
        data-track='AnnouncementBannerClick'
        className='group block w-full bg-primary-button py-3 pl-4 pr-12 text-center text-sm font-medium text-fairest-jade transition-all hover:brightness-110 sm:px-8'
      >
        <div className='flex items-center justify-center gap-2'>
          <BirdIcon className='h-4 w-4 shrink-0 text-maritime-darkest' />
          <span className='mr-1'>
            <span className='hidden font-bold text-maritime-darkest sm:inline'>
              Vårtilbud:{' '}
            </span>

            <span className='inline text-maritime-darkest md:hidden'>
              Utekos TechDown™ til kr 1790,-
            </span>

            <span className='hidden text-maritime-darkest md:inline'>
              Utekos TechDown™ til kr 1790,-
            </span>
          </span>

          <span className='hidden items-center font-bold text-maritime-darkest underline decoration-maritime-darkest underline-offset-4 transition-all group-hover:decoration-very-white sm:flex'>
            Kjøp her
            <ArrowRightIcon className='ml-1 inline-block size-4 transition-transform group-hover:translate-x-1' />
          </span>
          <ArrowRightIcon className='ml-1 inline-block size-4 shrink-0 sm:hidden' />
        </div>
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-maritime-darkest transition-colors hover:bg-maritime-darkest/10 hover:text-maritime-darkest/80 focus:outline-none focus:ring-2 focus:ring-maritime-darkest focus:ring-offset-2 focus:ring-offset-transparent'
      >
        <XIcon className='h-4 w-4 cursor-pointer' />
      </button>
    </div>
  )
}
