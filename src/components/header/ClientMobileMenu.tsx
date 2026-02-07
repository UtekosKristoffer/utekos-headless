// Path: src/components/header/ClientMobileMenu.tsx
'use client'

import type { MenuItem } from '@types'
import dynamic from 'next/dynamic'
const MobileMenu = dynamic(
  () => import('@/components/header/MobileMenu/MobileMenu').then(mod => mod.MobileMenu),
  {
    ssr: false,
    loading: () => <div className='h-9 w-9 lg:hidden' />
  }
)

export function ClientMobileMenu({ menu }: { menu: MenuItem[] }) {
  return <MobileMenu menu={menu} />
}
