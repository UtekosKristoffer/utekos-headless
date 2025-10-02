'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRightIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BANNER_STORAGE_KEY = 'utekos-special-edition-banner-dismissed-timestamp'
const BANNER_EXPIRATION_MS = 3 * 24 * 60 * 60 * 1000

export function AnnouncementBanner() {
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    const dismissedTimestamp = localStorage.getItem(BANNER_STORAGE_KEY)

    if (dismissedTimestamp) {
      const dismissedTime = parseInt(dismissedTimestamp, 10)
      const now = Date.now()
      if (now - dismissedTime > BANNER_EXPIRATION_MS) {
        setIsDismissed(false)
        localStorage.removeItem(BANNER_STORAGE_KEY) // Fjern gammel verdi
      }
    } else {
      setIsDismissed(false)
    }
  }, [])

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Forhindrer at Link-en aktiveres når man lukker.
    e.stopPropagation()
    setIsDismissed(true)

    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='relative'
        >
          <Link
            href='/produkter/utekos-special-edition'
            className='group block w-full bg-button p-3 text-center text-sm font-medium text-white transition-colors hover:text-neutral-200'
          >
            <span className='mr-2'>
              <span className='font-semibold'>SISTE SJANSE:</span> Et fåtall
              igjen av vår utgående Special Edition.
            </span>
            <span className='font-bold'>Nå kun 750,-</span>
            <ArrowRightIcon className='ml-2 inline-block size-4 transition-transform group-hover:translate-x-1' />
          </Link>

          <button
            onClick={handleDismiss}
            aria-label='Lukk banner'
            className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white'
          >
            <XIcon className='h-4 w-4 cursor-pointer' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
