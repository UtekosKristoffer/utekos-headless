// Path: src/app/skreddersy-varmen/components/ProductDetailsAccordion.tsx
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Leaf, ShieldCheck, Waves, Info } from 'lucide-react'
import type { ModelKey } from 'types/product/ProductTypes'

const triggerClassName =
  'font-google-sans text-left text-lg font-semibold text-maritime-darkest hover:text-maritime-blue hover:no-underline [&>svg]:text-maritime-darkest md:text-xl'

const itemClassName = 'border-maritime-darkest/20'

type FeatureIconKey = 'leaf' | 'shield' | 'waves'

type ProductDetailsContent = {
  heading: string
  materials: { label: string; value: string }[]
  functions: { title: string; text: string }[]
  features: {
    icon: FeatureIconKey
    title: string
    text: string
  }[]
  usage: {
    title: string
    items: string[]
  }[]
  fit: { title: string; text: string }[]
  care: {
    bullets: string[]
    noteTitle: string
    note: string
  }
}

const productDetailsByModel: Record<ModelKey, ProductDetailsContent> = {
  techdown: {
    heading: 'Alt du trenger å vite om TechDown™',
    materials: [
      { label: 'Skallstoff', value: 'Luméa™' },
      { label: 'Isolasjon', value: 'CloudWave™' },
      { label: 'Konstruksjon', value: '3-i-1' },
      { label: 'Belegg', value: 'Vannavstøtende finish' },
      { label: 'Glidelåser', value: 'YKK® Dual V-Zip™' },
      { label: 'Bruksområde', value: 'Helårsbruk ute' }
    ],
    functions: [
      {
        title: 'CloudWave™-isolasjon',
        text: 'Utviklet for stabil varme og god spenst, også når plagget utsettes for fuktige forhold.'
      },
      {
        title: '3-i-1 funksjonalitet',
        text: 'Juster plagget etter situasjonen: åpen parkas, oppfestet modus for mobilitet eller lunere tildekking når du sitter stille.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        text: 'To-spors glidelåsløsning som gjør det enklere å regulere ventilasjon og bevegelighet uten å åpne hele fronten.'
      }
    ],
    features: [
      {
        icon: 'waves',
        title: 'Holder varmen i fukt',
        text: 'CloudWave™-isolasjonen er laget for å bevare komfort og isolerende følelse under skiftende nordiske forhold.'
      },
      {
        icon: 'shield',
        title: 'Robust og allsidig',
        text: 'TechDown™ er valgt for deg som vil ha én varm og fleksibel Utekos til terrasse, hytte, båt og tur.'
      },
      {
        icon: 'leaf',
        title: 'Syntetisk komfort',
        text: 'Et praktisk alternativ for deg som ønsker høy varme uten tradisjonelt dunfyll.'
      }
    ],
    usage: [
      {
        title: 'Terrasse og hytteliv',
        items: ['Rolige kvelder ute', 'Bålpanne, hage og veranda', 'Hyttebruk gjennom store deler av året']
      },
      {
        title: 'Tur og pauseplagg',
        items: ['Pause etter aktivitet', 'Bålkos og leirliv', 'Ekstra varme når tempoet faller']
      },
      {
        title: 'Båt, bobil og camping',
        items: ['Kjølige morgener', 'Vindfulle kvelder', 'Praktisk varme når du er mye ute']
      },
      {
        title: 'Tribune og arrangement',
        items: ['Kalde sidelinjer', 'Utendørs arrangementer', 'Foto- og venteoppdrag i kulden']
      }
    ],
    fit: [
      {
        title: 'Rom for bevegelse og lag',
        text: 'TechDown™ er laget for å kunne brukes over andre klær uten at den mister den lune Utekos-følelsen.'
      },
      {
        title: 'Justerbar varme',
        text: 'Glidelås- og oppfestingsløsningene gjør det enkelt å åpne opp, ventilere eller pakke seg mer inn etter behov.'
      }
    ],
    care: {
      bullets: [
        'Maskinvask på skånsomt program',
        'Bruk mild såpe',
        'Unngå bleking',
        'Lufttørkes godt etter vask eller fuktig bruk',
        'Oppbevares tørt og helst ukomprimert'
      ],
      noteTitle: 'Viktig om oppbevaring',
      note: 'La plagget tørke helt før lengre lagring. Oppbevar det luftig når du kan, slik at isolasjonen bevarer spenst og form.'
    }
  },
  mikro: {
    heading: 'Alt du trenger å vite om Mikrofiber™',
    materials: [
      { label: 'Fôrstoff', value: 'Taffeta' },
      { label: 'Skallstoff', value: 'DuraLite™ Nylon' },
      { label: 'Belegg', value: 'DWR (inkl. flammehemming)' },
      { label: 'Trådtetthet', value: '380T' },
      { label: 'Trådtykkelse', value: '20D' },
      { label: 'Vekt', value: 'ca. 800g' },
      { label: 'Glidelåser', value: 'YKK®' }
    ],
    functions: [
      {
        title: '3-i-1 funksjonalitet',
        text: 'Modulært system for sømløs tilpasning. Veksle mellom parkas, oppfestet modus for mobilitet, eller fulldekket modus for maksimal isolasjon og kokong-følelse.'
      },
      {
        title: 'DuraLite™ Nylon (DWR)',
        text: 'Robust lettvektsmateriale utviklet for praktisk bruk ute. Materialet er vindtett, sterkt vannavvisende og har gode pusteegenskaper.'
      },
      {
        title: 'YKK® Dual V-Zip™',
        text: 'To-spors glidelåssystem med omvendt V-profil. Gir enkel ventilasjon og bevegelse uten at frontpartiet må åpnes helt opp.'
      }
    ],
    features: [
      {
        icon: 'waves',
        title: 'Håndterer fuktige forhold',
        text: 'Den syntetiske isolasjonen er laget for å tørke raskt og gi trygg komfort i fuktige morgener og regnbyger.'
      },
      {
        icon: 'leaf',
        title: 'Allergivennlig',
        text: '100 % syntetisk fyll gjør den til et godt valg for deg som vil unngå dun.'
      },
      {
        icon: 'shield',
        title: 'Lett og allsidig',
        text: 'Kolleksjonens letteste modell, godt egnet for bobil, båt, hytte og reise.'
      }
    ],
    usage: [
      {
        title: 'Båt- og hytteliv',
        items: ['Camping, båt og bobilliv', 'Perfekt på hytten eller terrassen hjemme']
      },
      {
        title: 'Fjellsport og turer',
        items: ['Pause og bålkos', 'Aktiv vandring', 'Ekstra varme når du sitter stille']
      },
      {
        title: 'Jakt og fiske',
        items: ['Posteringsjakt', 'Fiske', 'Tidlige morgener ute']
      },
      {
        title: 'Til vanns & annet',
        items: ['Båt- og seiltur', 'Isbading før og etter', 'På kalde tribuner', 'Fotooppdrag i kulden']
      }
    ],
    fit: [
      {
        title: 'Rom for bevegelse og ekstra lag',
        text: 'Utekos Mikrofiber™ er designet med sjenerøs passform som gir bevegelsesfrihet og plass til lag under.'
      },
      {
        title: 'Lett å ta med',
        text: 'Lavere vekt og mindre volum gjør den enkel å pakke med seg på reise, i bobilen, i båten eller på hytta.'
      }
    ],
    care: {
      bullets: [
        'Maskinvask på maks 30°C',
        'Bruk mild såpe',
        'Unngå tørketrommel',
        'La den lufttørke',
        'Unngå stryking og bleking'
      ],
      noteTitle: 'Viktig om oppbevaring',
      note: 'Oppbevares tørt. Sørg for at plagget tørkes godt etter bruk i fuktige omgivelser. For lengre lagring anbefales luftig og ukomprimert oppbevaring.'
    }
  }
}

const featureIconMap = {
  leaf: Leaf,
  shield: ShieldCheck,
  waves: Waves
} as const

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between gap-2 border-b border-maritime-darkest/12 pb-1 last:border-0 md:justify-start'>
      <span className='w-32 shrink-0 font-semibold text-maritime-darkest'>{label}:</span>
      <span className='text-maritime-darkest/82'>{value}</span>
    </div>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <li>
      <h4 className='mb-1 text-base font-bold text-maritime-darkest'>{title}</h4>
      <p className='text-sm leading-[1.45] text-maritime-darkest/82 md:text-base'>{text}</p>
    </li>
  )
}

function UsageGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className='mb-3 border-b border-maritime-darkest/20 pb-1 font-utekos-text text-lg text-maritime-darkest'>
        {title}
      </h4>
      <ul className='list-inside list-disc space-y-1 text-sm text-maritime-darkest/82'>{children}</ul>
    </div>
  )
}

function ProductFeatureIcon({ icon }: { icon: FeatureIconKey }) {
  const Icon = featureIconMap[icon]

  return <Icon className='mt-1 shrink-0 text-mountain-view' size={20} />
}

export function ProductDetailsAccordion({ selectedModel }: { selectedModel: ModelKey }) {
  const content = productDetailsByModel[selectedModel]

  return (
    <section
      key={selectedModel}
      className='w-full bg-overcast px-6 pb-24 pt-6 text-maritime-darkest'
      aria-live='polite'
    >
      <div className='mx-auto max-w-3xl'>
        <h2 className='my-8 text-center font-google-sans text-4xl font-bold leading-[0.95] tracking-normal text-maritime-darkest md:text-5xl'>
          {content.heading}
        </h2>

        <Accordion key={`details-${selectedModel}`} type='single' collapsible className='w-full'>
          <AccordionItem value='materials' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Materialer</AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-1 gap-x-8 gap-y-4 p-2 text-base leading-[1.45] md:grid-cols-2'>
                {content.materials.map(row => (
                  <SpecRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='functions' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Nøkkelfunksjoner</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-6 p-2'>
                {content.functions.map(item => (
                  <DetailBlock key={item.title} title={item.title} text={item.text} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='features' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Egenskaper</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-6 p-2'>
                {content.features.map(feature => (
                  <li key={feature.title} className='flex gap-4'>
                    <ProductFeatureIcon icon={feature.icon} />
                    <div>
                      <h4 className='mb-1 text-base font-bold text-maritime-darkest'>{feature.title}</h4>
                      <p className='text-maritime-darkest/82'>{feature.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='usage' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Bruksområder</AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-1 gap-8 p-2 md:grid-cols-2'>
                {content.usage.map(group => (
                  <UsageGroup key={group.title} title={group.title}>
                    {group.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </UsageGroup>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='fit' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Passform</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4 p-2 text-base leading-[1.45] text-maritime-darkest/82'>
                {content.fit.map(item => (
                  <p key={item.title}>
                    <strong className='mb-1 block text-maritime-darkest'>{item.title}</strong>
                    {item.text}
                  </p>
                ))}
                <p className='rounded-2xl border border-cloud-dancer/15 bg-maritime-blue p-4 text-sm leading-[1.45] text-cloud-dancer'>
                  <strong>Tips:</strong> Bruk linken ved størrelsevelgeren og i menyen over for å se de
                  nøyaktige målene i tabellen.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='care' className={itemClassName}>
            <AccordionTrigger className={triggerClassName}>Vedlikehold</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4 p-2'>
                <ul className='list-inside list-disc space-y-1 text-maritime-darkest/82'>
                  {content.care.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className='mt-4 flex gap-3 rounded-2xl border-l-4 border-primary-button bg-maritime-blue p-4 text-cloud-dancer'>
                  <Info className='shrink-0 text-primary-button' />
                  <div className='text-sm leading-[1.45]'>
                    <span className='mb-1 block font-bold'>{content.care.noteTitle}</span>
                    {content.care.note}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
