// Path: src/components/header/Header.tsx

import type { MenuItem } from '@/types/menu'

import { CartDrawer } from '@/components/cart/CartDrawer'
import { ClientDesktopNavigation } from '@/components/header/ClientDesktopNavigation'
import { HeaderLogo } from '@/components/header/HeaderLogo'
// Importer den nye bro-komponenten
import { ClientMobileMenu } from './ClientMobileMenu'
export default function Header({ menu }: { menu: MenuItem[] }) {
  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-background py-3'>
      <div className='container mx-auto flex items-center justify-between'>
        <HeaderLogo />

        <ClientDesktopNavigation menu={menu} />

        <div className='flex items-center gap-2'>
          <CartDrawer />

          {/* Bruk den nye komponenten som håndterer klient-logikken */}
          <ClientMobileMenu menu={menu} />
        </div>
      </div>
    </header>
  )
}
