// Path: src/components/header/Header.tsx

import { Cart } from '@/components/cart/Cart'
import { ClientDesktopNavigation } from '@/components/header/ClientDesktopNavigation'
import { HeaderLogo } from '@/components/header/HeaderLogo'
import { HeaderSearch } from '@/components/header/HeaderSearch/HeaderSearch'
import type { MenuItem } from '@types'
import WordmarkWhite from '@public/WordmarkWhite.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Activity, Suspense } from 'react'
import { ClientMobileMenu } from './ClientMobileMenu'

export default function Header({ menu }: { menu: MenuItem[] }) {
  return (
    <header className='sticky! top-0! z-50 w-full border-b border-cloud-dancer/12 bg-havdyp text-foreground'>
      <div className='relative mx-auto grid min-h-18 w-full max-w-360 grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-6 lg:min-h-20 lg:pl-10 lg:pr-4 xl:min-h-22.5 xl:pr-5'>
        <div className='flex min-w-0 items-center justify-start'>
          <Link
            href='/'
            aria-label='Utekos - Til forsiden'
            data-track='HeaderLogoClick'
            className='pl-2 sm:pl-3 lg:hidden'
          >
            <Image src={WordmarkWhite} alt='Utekos' priority className='h-7 w-auto sm:h-8' />
          </Link>

          <div className='hidden lg:flex'>
            <HeaderLogo />
          </div>
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
