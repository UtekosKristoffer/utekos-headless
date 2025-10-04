// /app/inspirasjon/layout.tsx

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Caravan, Flame, Home, Sailboat, Sofa } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface InspirasjonLayoutProps {
  children: ReactNode
}

const inspirationPages = [
  {
    href: '/inspirasjon/hytteliv' as const,
    label: 'Hytteliv',
    description: 'Komfort på hytten året rundt',
    icon: Home,
    color: 'from-emerald-500/20',
    iconColor: 'text-emerald-500'
  },
  {
    href: '/inspirasjon/bobil' as const,
    label: 'Bobil & Camping',
    description: 'Forleng campingsesongen',
    icon: Caravan,
    color: 'from-blue-500/20',
    iconColor: 'text-blue-500'
  },
  {
    href: '/inspirasjon/batliv' as const,
    label: 'Båtliv',
    description: 'Varme på vannet',
    icon: Sailboat,
    color: 'from-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    href: '/inspirasjon/terrassen' as const,
    label: 'Terrassen',
    description: 'Hjemme best',
    icon: Sofa,
    color: 'from-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    href: '/inspirasjon/grillkvelden' as const,
    label: 'Grillkvelden',
    description: 'Sosiale stunder',
    icon: Flame,
    color: 'from-orange-500/20',
    iconColor: 'text-orange-500'
  }
]

export default function InspirasjonLayout({
  children
}: InspirasjonLayoutProps) {
  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb Section - NÅ OPPDATERT */}
      <section className='border-b border-neutral-800'>
        <div className='container mx-auto px-4 py-6'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Hjem</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Inspirasjon</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Main Content */}
      {children}

      {/* Cross-Navigation Section (uendret) */}
      <section className='bg-sidebar-foreground py-16 border-t border-neutral-800'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl font-bold tracking-tight mb-4'>
              Mer inspirasjon for dine øyeblikk
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Utekos passer perfekt til alle situasjoner hvor komfort møter
              norsk natur. La deg inspirere av hvordan andre nyter de gode
              stundene.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {inspirationPages.map(page => (
              <Link key={page.href} href={page.href} className='group block'>
                <div className='relative overflow-hidden rounded-lg border border-neutral-800 bg-background p-6 transition-all h-full hover:border-neutral-700 hover:-translate-y-1'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${page.color} to-transparent opacity-20 transition-opacity group-hover:opacity-30`}
                  />
                  <div className='relative'>
                    <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-foreground border border-neutral-700'>
                      <page.icon
                        className={`h-5 w-5 ${page.iconColor} transition-colors group-hover:text-primary`}
                      />
                    </div>
                    <h3 className='font-semibold mb-2 group-hover:text-primary transition-colors'>
                      {page.label}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {page.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='mt-12 text-center'>
            <p className='text-sm text-muted-foreground mb-4'>
              Klar til å oppleve komforten selv?
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <Button asChild>
                <Link href='/produkter'>Se alle produkter</Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='/handlehjelp/storrelsesguide'>
                  Finn din størrelse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators (uendret) */}
      <section className='py-8 border-t border-neutral-800'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center gap-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <span className='text-primary'>🇳🇴</span>
              <span>Skapt for norske forhold</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sky-800'>✓</span>
              <span>Fri frakt over 999 kr</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sky-800'>✓</span>
              <span>30 dagers åpent kjøp</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
