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
    <header className='sticky! top-0! z-50 w-full border-b border-cloud-dancer/12 bg-maritime-blue/96 text-cloud-dancer shadow-[0_18px_44px_-34px_color-mix(in_oklab,var(--maritime-darkest)_82%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-maritime-blue/90'>
      <div className='relative mx-auto grid min-h-[72px] w-full max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6 lg:min-h-[80px] lg:pl-10 lg:pr-4 xl:min-h-[90px] xl:pr-5'>
        <div className='flex min-w-0 items-center justify-start'>
          <HeaderLogo />
        </div>

        <div className='pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex'>
          <Suspense fallback={null}>
            <ClientDesktopNavigation menu={menu} />
          </Suspense>
        </div>

        <div className='flex min-w-0 items-center justify-end gap-2'>
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
