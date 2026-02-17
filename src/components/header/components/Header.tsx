// Path: src/components/header/Header.tsx

import { Cart } from '@/modules/cart/components/CartDrawer/components/Cart'
import { ClientDesktopNavigation } from '@/components/header/components/DesktopMenu/ClientDesktopNavigation'
import { HeaderLogo } from '@/components/header/components/HeaderLogo'
import { HeaderSearch } from '@/components/header/components/HeaderSearch/components/HeaderSearch'
import type { MenuItem } from '@types'
import { Activity, Suspense } from 'react'
import { ClientMobileMenu } from './MobileMenu/ClientMobileMenu'

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
