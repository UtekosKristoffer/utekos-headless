import type { ReactNode } from 'react'
import { FunctionalityJsonLd } from './FunctionalityJsonLd'

export default function FunctionalityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FunctionalityJsonLd />
      {children}
    </>
  )
}
