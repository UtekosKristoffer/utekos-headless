import { BobilJsonLd } from './BobilJsonLd'
import type { ReactNode } from 'react'

export default function BobilLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BobilJsonLd />
      {children}
    </>
  )
}
