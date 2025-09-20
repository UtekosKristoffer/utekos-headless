import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion' // Antatt plassering
import {
  Feather,
  Flame,
  Layers,
  Shield,
  Thermometer,
  Weight
} from 'lucide-react'
import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'

// STEG 1: Optimalisert Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://utekos.no'),
  title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
  description:
    'Oppdag materialene og teknologien som gjør Utekos-plaggene unikt varme, lette og slitesterke. Kvalitet i hver fiber for å forlenge de gode stundene utendørs.',
  alternates: {
    canonical: '/handlehjelp/teknologi-materialer'
  },
  openGraph: {
    title: 'Vår Teknologi | Kvaliteten og komforten bak Utekos',
    description: 'Lær om de unike materialene som sikrer din komfort.',
    url: '/handlehjelp/teknologi-materialer',
    siteName: 'Utekos',
    images: [
      {
        url: '/og-image-teknologi.jpg', // Bør være et relevant bilde
        width: 1200,
        height: 630,
        alt: 'Nærbilde av materialene brukt i Utekos-produkter.'
      }
    ],
    locale: 'no_NO',
    type: 'article' // 'article' er mer presist for en slik side
  }
}

// STEG 2: Strukturert Data (JSON-LD) for en artikkelside
const jsonLd: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Teknologien og materialene som definerer Utekos',
  'author': {
    '@type': 'Organization',
    'name': 'Utekos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Utekos',
    'logo': {
      '@type': 'ImageObject',
      'url':
        'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/utekos_black_circle_logo.png?v=1753228426' // Erstatt med faktisk logo-URL
    }
  },
  'description':
    'En detaljert gjennomgang av de høykvalitetsmaterialene og isolasjonsteknologiene som sikrer varme, komfort og lang levetid i alle våre produkter.',
  'image':
    'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/damentilpederbilde.png?v=1746789037'
}

const technologies = [
  {
    icon: Thermometer,
    title: 'Fillpower 650 – Premium varme, minimal vekt',
    content:
      'Fillpower måler spensten og isolasjonsevnen i dun. 650 regnes som premium kvalitet, og gir en perfekt balanse mellom enestående varme og lav vekt. Dette gjør at plagget enkelt kan komprimeres for tur, samtidig som det gir den lune, omsluttende følelsen du forventer av et høykvalitetsprodukt.',
    products: ['Utekos Dun']
  },
  {
    icon: Feather,
    title: 'Hollow Fiber – Lett og luftig isolasjon',
    content:
      'Denne smarte, syntetiske isolasjonen består av fibre med en hul kjerne. Dette fanger mer luft og gir eksepsjonelt god varme i forhold til vekten. Materialet er lett, pustende og tørker raskt – ideelt for det skiftende norske klimaet og aktivt uteliv.',
    products: ['Utekos Mikrofiber']
  },
  {
    icon: Weight,
    title: '140 g/m² – Optimal balanse',
    content:
      'Vekten på isolasjonen, målt i gram per kvadratmeter, er nøye utvalgt for å gi deg en perfekt balanse. Med 140 g/m² får du rikelig med varme for kjølige kvelder, uten at plagget blir tungt eller begrenser bevegelsesfriheten din.',
    products: ['Utekos Mikrofiber']
  },
  {
    icon: Shield,
    title: 'Shell Fabrix 20D / 380T – Fjærlett og robust beskyttelse',
    content:
      'Ytterstoffet er din første barriere mot elementene. Vårt tekniske materiale har en tettvevd struktur som gjør det svært vindavvisende, lett og slitesterkt. Den myke finishen gir en premium følelse og gjør plagget enkelt å pakke sammen.',
    products: ['Utekos Dun', 'Utekos Mikrofiber']
  },
  {
    icon: Layers,
    title: 'Nylon Taffeta – Silkemyk komfort på innsiden',
    content:
      'Innerstoffet er avgjørende for den totale komfortopplevelsen. Vi bruker Nylon Taffeta fordi det er glatt, lett og føles behagelig mot huden. Det glir lett over andre kleslag og sørger for minimal friksjon når du beveger deg.',
    products: ['Utekos Dun', 'Utekos Mikrofiber']
  },
  {
    icon: Flame,
    title: 'Flammehemmende Nylon med DWR – Trygghet rundt bålpannen',
    content:
      'For oss handler utekos om trygghet. Derfor bruker vi et ytterstoff som kombinerer flammehemmende egenskaper med en DWR-behandling (Durable Water Repellent). Dette gir deg et ekstra sikkerhetsnivå nær åpen ild, samtidig som det beskytter mot lett regn og fukt.',
    products: ['Utekos Dun']
  }
]
export default function ProductSpecsPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className='container mx-auto px-4 py-12 sm:py-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Kvalitet i hver fiber
          </h1>
          <p className='mt-4 text-lg text-foreground/80'>
            Vi er kompromissløse i våre materialvalg fordi vi vet at ekte utekos
            starter med total komfort. Her kan du utforske teknologien som
            sikrer at du holder deg varm og kan nyte de gode stundene lenger.
          </p>
        </div>

        <div className='mx-auto mt-12 max-w-4xl'>
          <Accordion type='single' collapsible className='w-full'>
            {technologies.map((tech, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={tech.title}
                className='border-white/10'
              >
                <AccordionTrigger className='py-6 text-left text-lg hover:no-underline'>
                  <div className='flex items-center gap-4'>
                    <tech.icon className='h-6 w-6 flex-shrink-0' />
                    <span>{tech.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='pb-6'>
                  <div className='prose prose-invert max-w-none text-foreground/80'>
                    <p>{tech.content}</p>
                    <div className='flex flex-wrap gap-2'>
                      {tech.products.map(product => (
                        <span
                          key={product}
                          className='text-xs font-medium bg-sidebar-foreground text-foreground/70 py-1 px-2.5 rounded-full'
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </>
  )
}
