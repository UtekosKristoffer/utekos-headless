'use client'

import { MobileMenuClient } from '@/components/header/MobileMenuClient'
import type { MenuItem } from '@/types/menu'

export function MobileMenu({ menu }: { menu: MenuItem[] }) {
  return <MobileMenuClient menu={menu} />
}
