import { GridCross } from '@/components/legal/GridCross'
import { PrivacyNav } from '@/components/legal/PrivacyNav'
import { privacySections } from '@/db/config/privacy.config' // Vi legger innholdet i en egen fil for ryddighet
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Personvernerklæring | Utekos',
  description:
    'Les hvordan Utekos samler inn, bruker og beskytter dine personopplysninger i samsvar med gjeldende lover. Din trygghet er viktig for oss.',
  alternates: {
    canonical: '/personvern'
  },
  openGraph: {
    title: 'Personvernerklæring | Utekos',
    description:
      'Din trygghet er viktig for oss. Se hvordan vi håndterer dine data.',
    url: '/personvern',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-legal.webp',
        width: 1200,
        height: 630,
        alt: 'Utekos logo med teksten personvern.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

// Hjelpekomponent for de dekorative linjene og kryssene
const SectionWrapper = ({
  id,
  title,
  children
}: {
  id: string
  title: string
  children: React.ReactNode
}) => (
  <div id={id} className='relative py-12 scroll-mt-24'>
    <GridCross className='left-[-16px] top-[60px] hidden lg:block' />
    <GridCross className='right-[-16px] top-[60px] hidden lg:block' />
    <div className='absolute inset-x-0 top-[75px] h-px border-t border-dashed border-white/10 hidden lg:block' />
    <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
    <div className='prose prose-invert mt-6 max-w-none text-foreground/80'>
      {children}
    </div>
  </div>
)

export default function PrivacyPolicyPage() {
  return (
    <main className='container mx-auto my-24 max-w-6xl px-4'>
      <div className='relative border border-white/10 bg-background'>
        <GridCross className='left-0 top-0 -translate-x-1/2 -translate-y-1/2' />
        <GridCross className='right-0 bottom-0 translate-x-1/2 translate-y-1/2' />

        <div className='p-8 sm:p-12 lg:p-16'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
              Personvernerklæring
            </h1>
            <p className='mt-4 text-muted-foreground'>
              Sist oppdatert: 11. juni 2025
            </p>
          </div>

          <div className='mt-12 lg:grid lg:grid-cols-12 lg:gap-16'>
            <div className='lg:col-span-8'>
              {privacySections.map(section => (
                <SectionWrapper
                  key={section.id}
                  id={section.id}
                  title={section.title}
                >
                  {section.content}
                </SectionWrapper>
              ))}
            </div>
            <aside className='lg:col-span-4'>
              <PrivacyNav
                sections={privacySections.map(({ id, title }) => ({
                  id,
                  title
                }))}
              />
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
