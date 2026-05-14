import type { ReactNode } from 'react'
import { NbccPageJsonLd } from './components/NbccPageJsonLd'

export default function NbccLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NbccPageJsonLd />
      {children}
    </>
  )
}
