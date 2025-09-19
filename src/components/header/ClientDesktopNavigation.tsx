'use client'

import type { MenuItem } from '@types'
import dynamic from 'next/dynamic'

// Importer DesktopNavigation dynamisk med ssr: false
const DesktopNavigation = dynamic(
  () =>
    import('@/components/header/DesktopNavigation').then(
      mod => mod.DesktopNavigation
    ),
  { ssr: false }
)

export function ClientDesktopNavigation({ menu }: { menu: MenuItem[] }) {
  return <DesktopNavigation menu={menu} />
}
