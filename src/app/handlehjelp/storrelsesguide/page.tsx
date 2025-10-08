import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Ruler } from 'lucide-react'
import type { Metadata } from 'next'
import { jsonLd } from './jsonLd'
import Image from 'next/image'
import ComfyFrontSkisse from '../../../../public/ComfyFrontSkisse.png'
import UtekosSkisse from '@public/skisse-utekos.jpg'
import { comfyrobeData, utekosData } from './data'
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Størrelsesguide for Utekos | Finn din perfekte passform',
  description:
    'Sikre deg den ultimate komforten. Vår detaljerte størrelsesguide for Utekos Dun, Mikrofiber og Comfyrobe hjelper deg å velge riktig størrelse for de gode stundene.',
  alternates: {
    canonical: '/handlehjelp/storrelsesguide'
  },
  openGraph: {
    title: 'Størrelsesguide for Utekos | Finn din perfekte passform',
    description:
      'Finn riktig størrelse og sikre deg den unike Utekos-komforten.',
    url: '/handlehjelp/storrelsesguide',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-storrelsesguide.webp',
        width: 1200,
        height: 630,
        alt: 'Illustrasjon av måleskjema for Utekos-produkter.'
      }
    ],
    locale: 'no_NO',
    type: 'website'
  }
}

export default function SizeGuidePage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Finn din perfekte passform
          </h1>
          <p className='mt-4 text-lg text-foreground/80'>
            Riktig størrelse er nøkkelen til den ultimate komfortopplevelsen.
            Våre plagg er designet for å være romslige og behagelige. Bruk
            guiden under for å finne størrelsen som sikrer deg maksimal utekos.
          </p>
        </div>

        <div className='mx-auto mt-10 max-w-3xl rounded-lg border border-neutral-800 bg-sidebar-foreground p-6'>
          <div className='flex items-start gap-4'>
            <Ruler className='h-8 w-8 flex-shrink-0 text-foreground/80' />
            <div>
              <h2 className='text-lg font-semibold '>Vårt beste måletips</h2>
              <p className='mt-1 text-foreground/70'>
                Finn frem et lignende plagg du elsker passformen på. Legg det
                flatt og mål det. Sammenlign deretter med målene i våre tabeller
                – det er den sikreste måten å treffe perfekt på.
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto mt-12 max-w-6xl'>
          <Tabs defaultValue='comfyrobe' className='w-full'>
            {/* ENDRING 1: Byttet til 'flex' for å håndtere begge scenarioer */}
            <TabsList className='flex h-auto w-full flex-wrap rounded-lg border border-neutral-800 bg-sidebar-foreground p-1.5 md:flex-nowrap'>
              {/* ENDRING 2: 'flex-1' gjelder nå kun for medium skjermer og opp (md:) */}
              <TabsTrigger
                value='comfyrobe'
                className='md:flex-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-950 data-[state=active]:shadow-sm'
              >
                Comfyrobe™
              </TabsTrigger>
              <TabsTrigger
                value='dun'
                className='md:flex-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-950 data-[state=active]:shadow-sm'
              >
                Utekos Dun™
              </TabsTrigger>
              <TabsTrigger
                value='mikrofiber'
                className='md:flex-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-950 data-[state=active]:shadow-sm'
              >
                Utekos Mikrofiber™
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value='comfyrobe'
              className='mt-6 overflow-hidden rounded-lg border border-neutral-800'
            >
              <div className='grid gap-6 p-4 md:grid-cols-2 md:p-6'>
                <div className='flex items-center justify-center rounded-lg bg-sidebar-foreground p-4'>
                  <Image
                    src={ComfyFrontSkisse}
                    alt='Skisse av Comfyrobe med mål'
                    width={597}
                    height={503}
                    className='rounded-lg bg-white object-contain'
                  />
                </div>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Måling</TableHead>
                        <TableHead className='text-right'>XS/S</TableHead>
                        <TableHead className='text-right'>M/L</TableHead>
                        <TableHead className='text-right'>L/XL</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comfyrobeData.map(row => (
                        <TableRow key={row.measurement}>
                          <TableCell>{row.measurement}</TableCell>
                          <TableCell className='text-right'>{row.xs}</TableCell>
                          <TableCell className='text-right'>{row.ml}</TableCell>
                          <TableCell className='text-right'>
                            {row.lxl}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value='dun'
              className='mt-6 overflow-hidden rounded-lg border border-neutral-800'
            >
              <div className='grid gap-6 p-4 md:grid-cols-2 md:p-6'>
                <div className='flex items-center justify-center rounded-lg bg-sidebar-foreground p-4'>
                  <Image
                    src={UtekosSkisse}
                    alt='Skisse av Utekos Dun med mål'
                    width={300}
                    height={500}
                    className='rounded-lg object-contain'
                  />
                </div>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Måling</TableHead>
                        <TableHead className='text-right'>Medium</TableHead>
                        <TableHead className='text-right'>Large</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utekosData.map(row => (
                        <TableRow key={row.measurement}>
                          <TableCell>{row.measurement}</TableCell>
                          <TableCell className='text-right'>{row.m}</TableCell>
                          <TableCell className='text-right'>{row.l}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value='mikrofiber'
              className='mt-6 overflow-hidden rounded-lg border border-neutral-800'
            >
              <div className='grid gap-6 p-4 md:grid-cols-2 md:p-6'>
                <div className='flex items-center justify-center rounded-lg bg-sidebar-foreground p-4'>
                  <Image
                    src={UtekosSkisse}
                    alt='Skisse av Utekos Mikrofiber med mål'
                    width={300}
                    height={500}
                    className='rounded-lg object-contain'
                  />
                </div>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Måling</TableHead>
                        <TableHead className='text-right'>Medium</TableHead>
                        <TableHead className='text-right'>Large</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utekosData.map(row => (
                        <TableRow key={row.measurement}>
                          <TableCell>{row.measurement}</TableCell>
                          <TableCell className='text-right'>{row.m}</TableCell>
                          <TableCell className='text-right'>{row.l}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
