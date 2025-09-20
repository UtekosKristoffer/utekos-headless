// Path: src/components/legal/PrivacyNav.tsx
'use client'

import { cn } from '@/lib/utils/className'
import { useEffect, useState } from 'react'

type Section = {
  id: string
  title: string
}

type PrivacyNavProps = {
  sections: Section[]
}

export function PrivacyNav({ sections }: PrivacyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' } // Finner elementet når det er i toppen av skjermen
    )

    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sections])

  return (
    <nav className='sticky top-28 hidden lg:block'>
      <h3 className='mb-4 font-semibold text-sm'>På denne siden</h3>
      <ul className='space-y-3'>
        {sections.map(section => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                'block text-sm transition-colors text-foreground/60 hover:text-foreground',
                activeId === section.id && 'font-medium text-foreground'
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
