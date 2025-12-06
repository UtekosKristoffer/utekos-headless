import { AboutPageJsonLd } from './Sections/AboutPageJsonLd'
import type { ReactNode } from 'react'

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutPageJsonLd />
      {children}
    </>
  )
}
