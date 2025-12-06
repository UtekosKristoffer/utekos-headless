import { MaintenanceJsonLd } from './MaintenanceJsonLd'
import type { ReactNode } from 'react'

export default function MaintenanceLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <MaintenanceJsonLd />
      {children}
    </>
  )
}
