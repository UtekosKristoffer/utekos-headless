// Path: src/components/banner/AnnouncementBanner.tsx
'use client'

import { ArrowRightIcon, Bird, XIcon } from 'lucide-react'
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

export function AnnouncementBanner() {
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
        'relative py-2 z-40 hover:bg-plum-hover font-utekos-text-medium bg-[#492A34] animate-slide-in-do text-foreground text-lg font-medium)',
        isExiting && 'animate-slide-out-up'
      )}
    >
      <Link
        href='/skreddersy-varmen'
        prefetch={false}
        data-track='AnnouncementBannerClick'
        aria-label='Se tilbudet på Utekos TechDown til kr 1790'
        className='group block w-full px-10 py-1 text-center tracking-wide font-medium  outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kombu-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-overcast sm:px-12'
      >
        <div className='mx-auto justify-content flex max-w-5xl items-center justify-center gap-2.5'>
          <Bird
            aria-hidden='true'
            className='size-5 sm:size-6 md:size-7 lg:size-8 xl:size-9 shrink-0 text-foreground'
            strokeWidth={1.5}
          />

          <p className='font-utekos-text-medium text-sm md:text-base text-justify text-foreground'>
            Utekos TechDown™ til kr 1790,-
          </p>

          <span className='hidden items-center gap-1 font-semibold text-foreground transition-colors group-hover:text-background sm:flex'>
            <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none' />
          </span>
          <ArrowRightIcon aria-hidden='true' className='size-4 shrink-0 text-foreground sm:hidden' />
        </div>
      </Link>

      <button
        onClick={handleDismiss}
        aria-label='Lukk banner'
        className='absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-heading-secondary focus:ring-offset-2 focus:ring-offset-overcast'
      >
        <XIcon className='size-4 cursor-pointer text-foreground' />
      </button>
    </div>
  )
}
