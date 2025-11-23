// Path: src/components/header/Header.tsx

import { Cart } from '@/components/cart/Cart'
import { ClientDesktopNavigation } from '@/components/header/ClientDesktopNavigation'
import { HeaderLogo } from '@/components/header/HeaderLogo'
import { HeaderSearch } from '@/components/header/HeaderSearch/HeaderSearch'
import type { MenuItem } from '@types'
import { Activity, Suspense } from 'react'
import { ClientMobileMenu } from './ClientMobileMenu'

export default function Header({ menu }: { menu: MenuItem[] }) {
  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-sidebar-foreground py-3'>
      <div className='container mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <HeaderLogo />

        <Suspense fallback={null}>
          <ClientDesktopNavigation menu={menu} />
        </Suspense>

        <div className='flex items-center gap-2'>
          <HeaderSearch />

          <Activity>
            <Cart />
          </Activity>

          <ClientMobileMenu menu={menu} />
        </div>
      </div>
    </header>
  )
}
