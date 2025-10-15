'use client'

import { usePathname } from 'next/navigation'
import { NewsLetter } from '@/components/footer/NewsLetter'

export function ConditionalNewsLetter() {
  const pathname = usePathname()

  // Hvis den nåværende stien starter med '/magasinet', render ingenting.
  if (pathname.startsWith('/magasinet')) {
    return null
  }

  // For alle andre stier, render nyhetsbrev-komponenten.
  return <NewsLetter />
}
