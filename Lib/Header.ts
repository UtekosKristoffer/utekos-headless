// Fil: src/components/header/Header.tsx
'use client'
import type { MenuItem, GetMenuQuery } from '@/shared/types/header'
import { usePathname } from 'next/navigation'
import { useReducer, useEffect } from 'react'
import { MenuIcon } from 'lucide-react'
import Button from '@/components/ui/button'
import menuReducer from '@/lib/helpers/menuReducer'
import HeaderLogo from './HeaderLogo'
import DesktopNavigation from './DesktopNavigation'
import MobileMenuPanel from './MobileMenuPanel'
import SearchDialog from './SearchDialog'
import CartDrawer from '../cart/CartDrawer'

function Header({ menu }: { menu: MenuItem[] }) {
  const [state, dispatch] = useReducer(menuReducer, { status: 'CLOSED' })
  const pathname = usePathname()

  useEffect(() => {
    dispatch({ type: 'CLOSE_MENU' })
  }, [pathname])

  useEffect(() => {
    if (state.status === 'OPEN') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [state.status])

  return (
    <>
      <header className='bg-background sticky top-0 z-50 rounded-b-xl border-b border-white/10 shadow-lg'>
        <div className='container mx-auto flex items-center justify-between px-4 py-3 sm:px-8'>
          <HeaderLogo />
          <DesktopNavigation menu={menu} />

          <div className='flex items-center gap-2'>
            <SearchDialog />
            <CartDrawer />

            <div className='lg:hidden'>
              <Button variant='ghost' size='icon' onClick={() => dispatch({ type: 'OPEN_MENU' })} aria-label='Åpne meny'>
                <MenuIcon className='size-6' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenuPanel
        menu={menu}
        isOpen={state.status === 'OPEN'}
        onOpenChange={isOpen => {
          if (isOpen) {
            dispatch({ type: 'OPEN_MENU' })
          } else {
            dispatch({ type: 'CLOSE_MENU' })
          }
        }}
      />
    </>
  )
}

export default Header
