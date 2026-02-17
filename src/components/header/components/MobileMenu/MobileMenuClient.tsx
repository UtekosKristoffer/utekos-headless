// Path: src/components/header/MobileMenuClient.tsx
'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useReducer } from 'react'

import { MobileMenuPanel } from '@/components/header/components/MobileMenu/MobileMenuPanel'
import { Button } from '@/components/ui/button'
import { menuReducer } from '@/lib/utils/menuReducer'
import type { MenuItem } from '@types'

export function MobileMenuClient({ menu }: { menu: MenuItem[] }) {
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
      <div className='lg:hidden'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => dispatch({ type: 'OPEN_MENU' })}
          aria-label='Åpne meny'
          data-track='MobileMenuClick'
        >
          <MenuIcon className='size-6' />
        </Button>
      </div>

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
