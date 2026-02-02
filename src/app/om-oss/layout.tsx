import { AboutPageJsonLd } from './components/AboutPageJsonLd'
import type { ReactNode } from 'react'

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutPageJsonLd />
      {children}
    </>
  )
}
