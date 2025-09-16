// Path: src/components/header/HeaderButton.tsx

'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useReducer } from 'react'

import { Button } from '@/components/ui/button'
import { menuReducer } from '@/lib/utils/menuReducer'
export default function HeaderButton() {
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
    <Button
      variant='ghost'
      size='icon'
      onClick={() => dispatch({ type: 'OPEN_MENU' })}
      aria-label='Åpne meny'
    >
      <MenuIcon className='size-6' />
    </Button>
  )
}
