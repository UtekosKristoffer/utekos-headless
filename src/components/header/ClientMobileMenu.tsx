// Path: src/components/header/ClientMobileMenu.tsx
'use client'

import type { MenuItem } from '@/types/menu'
import dynamic from 'next/dynamic'

// Den dynamiske importen skjer nå trygt inne i en Client Component
const MobileMenu = dynamic(
  () => import('@/components/header/MobileMenu').then(mod => mod.MobileMenu),
  {
    ssr: false,
    loading: () => <div className='h-9 w-9 lg:hidden' />
  }
)

// Denne komponenten fungerer som en bro
export function ClientMobileMenu({ menu }: { menu: MenuItem[] }) {
  return <MobileMenu menu={menu} />
}
