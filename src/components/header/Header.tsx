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
    <header className='sticky! lg:min-h-[80px] xl:min-h-[90px] px-10 mx-auto max-sm:px-6 top-0! z-50 border-b border-cloud-dancer/12 bg-maritime-blue py-3 w-full min-w-screen flex items-stretch justify-evenly text-cloud-dancer shadow-[0_18px_44px_-34px_rgba(8,12,28,0.9)] backdrop-blur-xl supports-[backdrop-filter]:bg-maritime-blue'>
      <div className='flex flex-1 basis-0 items-center justify-start min-w-fit w-fit max-w-3xl'>
        <HeaderLogo />
      </div>

      <Suspense fallback={null}>
        <ClientDesktopNavigation menu={menu} />
      </Suspense>

      <div className='flex flex-1 basis-0 items-center justify-end gap-2'>
        <HeaderSearch />

        <Activity>
          <Cart />
        </Activity>

        <ClientMobileMenu menu={menu} />
      </div>
    </header>
  )
}
