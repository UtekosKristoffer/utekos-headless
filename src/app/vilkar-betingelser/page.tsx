import { GridCross } from '@/components/legal/GridCross'
import { PrivacyNav } from '@/components/legal/PrivacyNav'
import { lastUpdated, termsSections } from '@/db/config/terms.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Personvernerklæring | Utekos',
  description:
    'Les våre vilkår og betingelser for bruk av Utekos-nettstedet og kjøp av produkter. Vi streber etter å gi deg en trygg og pålitelig handleopplevelse',
  alternates: { canonical: '/vilkar-betingelser' },
  openGraph: {
    title: 'Vilkår og betingelser | Utekos',
    description:
      'Les våre vilkår og betingelser for bruk av Utekos-nettstedet og kjøp av produkter. Vi streber etter å gi deg en trygg og pålitelig handleopplevelse.',
    url: '/vilkar-betingelser',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-legal.webp',
        width: 1200,
        height: 630,
        alt: 'Utekos vilkår og betingelser'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

const SectionWrapper = ({
  id,
  title,
  children
}: {
  id: string
  title: string
  children: React.ReactNode
}) => (
  <section id={id} className='relative py-12 scroll-mt-24'>
    <GridCross className='left-[-16px] top-[60px] hidden lg:block' />
    <GridCross className='right-[-16px] top-[60px] hidden lg:block' />
    <div className='absolute inset-x-0 top-[75px] h-px border-t border-dashed border-white/10 hidden lg:block' />
    <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
    <div className='prose prose-invert mt-6 max-w-none text-foreground/80'>
      {children}
    </div>
  </section>
)

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Vilkår og betingelser',
    'url': 'https://utekos.no/vilkar-betingelser',
    'inLanguage': 'nb-NO',
    'dateModified': '2025-11-03'
  }

  return (
    <main className='container mx-auto my-24 max-w-6xl px-4'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='relative border border-white/10 bg-background'>
        <GridCross className='left-0 top-0 -translate-x-1/2 -translate-y-1/2' />
        <GridCross className='right-0 bottom-0 translate-x-1/2 translate-y-1/2' />

        <div className='p-8 sm:p-12 lg:p-16'>
          <header className='text-center'>
            <h1 className='text-4xl font-bold mx-auto tracking-tight sm:text-5xl'>
              Vilkår og betingelser
            </h1>
            <p className='mt-4 text-muted-foreground'>
              Sist oppdatert: {lastUpdated}
            </p>
          </header>

          <div className='mt-12 lg:grid lg:grid-cols-12 lg:gap-16'>
            <div className='lg:col-span-8'>
              {termsSections.map(({ id, title, content }) => (
                <SectionWrapper key={id} id={id} title={title}>
                  {content}
                </SectionWrapper>
              ))}
            </div>

            <aside className='lg:col-span-4'>
              <div className='lg:sticky lg:top-28'>
                <PrivacyNav
                  sections={termsSections.map(({ id, title }) => ({
                    id,
                    title
                  }))}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
