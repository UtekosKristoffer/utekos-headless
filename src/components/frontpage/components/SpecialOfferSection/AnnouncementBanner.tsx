// Path: src/components/banner/AnnouncementBanner.tsx
'use client'

import { ArrowRightIcon, BadgePercent, XIcon } from 'lucide-react'
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
        'relative z-40 animate-slide-in-down border-b border-maritime-blue/16 bg-overcast text-maritime-darkest shadow-[0_14px_34px_-30px_color-mix(in_oklab,var(--demitasse)_46%,transparent)]',
        isExiting && 'animate-slide-out-up'
      )}
    >
      <Link
        href='/skreddersy-varmen'
        data-track='AnnouncementBannerClick'
        aria-label='Se tilbudet på Utekos TechDown til kr 1790'
        className='group block w-full px-10 py-2.5 text-center text-sm font-medium tracking-[-0.01em] outline-none transition-colors hover:bg-cloud-dancer/34 focus-visible:ring-2 focus-visible:ring-maritime-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast sm:px-12'
      >
        <div className='mx-auto flex max-w-5xl items-center justify-center gap-2.5'>
          <BadgePercent
            aria-hidden='true'
            className='hidden size-4 shrink-0 text-maritime-blue sm:block'
            strokeWidth={1.8}
          />

          <span className='min-w-0 text-maritime-darkest/86'>
            <span className='font-semibold text-maritime-darkest'>
              Utekos TechDown™
            </span>{' '}
            <span className='text-maritime-darkest/72'>til kr 1790,-</span>
          </span>

          <span className='hidden items-center gap-1 font-semibold text-maritime-blue transition-colors group-hover:text-maritime-darkest sm:flex'>
            Kjøp her
            <ArrowRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
          </span>
          <ArrowRightIcon
            aria-hidden='true'
            className='size-4 shrink-0 text-maritime-blue sm:hidden'
          />
        </div>
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-maritime-darkest/62 transition-colors hover:bg-maritime-blue/8 hover:text-maritime-darkest focus:outline-none focus:ring-2 focus:ring-maritime-blue/50 focus:ring-offset-2 focus:ring-offset-overcast'
      >
        <XIcon className='size-4 cursor-pointer' />
      </button>
    </div>
  )
}
