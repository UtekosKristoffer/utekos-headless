'use client'

import { MobileMenuClient } from '@/components/header/MobileMenuClient'
import type { MenuItem } from '@types'

export function MobileMenu({ menu }: { menu: MenuItem[] }) {
  return <MobileMenuClient menu={menu} />
}
