import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { MagazineNewsletterSignup } from '@/components/form/MagazineNewsletterSignUp' // Importer den nye komponenten

export default function MagazineLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-background'>
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
                <BreadcrumbPage>Magasinet</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className='border-b border-neutral-800 bg-sidebar-foreground'>
        <div className='container mx-auto px-4 py-12 text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Utekos Magasinet
          </h1>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Inspirasjon, tips og historier for deg som verdsetter de gode
            stundene ute.
          </p>
        </div>
      </section>

      <main className='py-16 sm:py-24'>{children}</main>

      {/* NY SEKSJON FOR PÅMELDING */}
      <MagazineNewsletterSignup />
    </div>
  )
}
