// Path: src/components/header/ClientMobileMenu.tsx
'use client'

import type { MenuItem } from '@types'
import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const MOBILE_MENU_QUERY = '(max-width: 1023.98px)'

const MobileMenu = dynamic(
  () =>
    import('@/components/header/MobileMenu/MobileMenu').then(
      mod => mod.MobileMenu
    ),
  {
    ssr: false,
    loading: () => <div className='size-11 lg:hidden' />
  }
)

const subscribeToMobileMenuQuery = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {}

  const mediaQueryList = window.matchMedia(MOBILE_MENU_QUERY)
  mediaQueryList.addEventListener('change', onStoreChange)

  return () => {
    mediaQueryList.removeEventListener('change', onStoreChange)
  }
}

const getMobileMenuSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_MENU_QUERY).matches

const getServerMenuSnapshot = () => false

export function ClientMobileMenu({ menu }: { menu: MenuItem[] }) {
  const isMobileMenuViewport = useSyncExternalStore(
    subscribeToMobileMenuQuery,
    getMobileMenuSnapshot,
    getServerMenuSnapshot
  )

  if (!isMobileMenuViewport) {
    return <div aria-hidden className='size-11 shrink-0 lg:hidden' />
  }

  return <MobileMenu menu={menu} />
}
