// Path: src/app/skreddersy-varmen/components/ProductDetailsAccordion.tsx
'use client'

import type { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Leaf, ShieldCheck, Waves, Info, type LucideIcon } from 'lucide-react'
import type { ModelKey } from '@/api/constants'

const styles = {
  item: 'border-background/20 px-4',
  trigger:
    'font-google-sans text-left text-lg font-semibold text-background hover:text-havdyp hover:no-underline [&>svg]:text-background md:text-xl',
  content: 'space-y-6 p-2',
  blockTitle: 'mb-1 text-base font-semibold text-background',
  blockText: 'text-sm leading-relaxed tracking-normal text-background/90',
  groupTitle:
    'mb-3 border-b border-background/60 pb-1   text-base font-semibold leading-relaxed tracking-normal text-background',
  list: 'list-inside list-disc space-y-1 text-sm   text-background/90',
  callout:
    'rounded-2xl border border-cloud-dancer/15 bg-havdyp p-4 text-sm leading-relaxed tracking-normal text-cloud-dancer'
} as const

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
  'utekos-techdown': {
    heading: 'Produktdetaljer',
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
  'utekos-mikrofiber': {
    heading: 'Produktdetaljer',
    materials: [
      { label: 'Innerfôr', value: 'Taffeta' },
      { label: 'Skallstoff', value: 'DuraLite™ Nylon' },
      { label: 'Belegg', value: 'DWR (inkl. flammehemming)' },
      { label: 'Trådtetthet', value: '380T' },
      { label: 'Trådtykkelse', value: '20D' },
      { label: 'Vekt', value: 'Omtrent 800 gram' },
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
        items: ['Camping, båt og bobilliv', ' På hytten, utenfor bobilen, i båten og på din egen terrasse']
      },
      {
        title: 'Fjellsport og turer',
        items: ['Pause og bålkos', 'Aktiv vandring', 'Ekstra varme når du sitter stille']
      },
      {
        title: 'På kalde tribuner',
        items: ['Konserter', 'Fotballkamper', 'Skirenn']
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
      noteTitle: 'Vedlikeholdsanvisning',
      note: 'Sørg for at plagget tørkes godt etter bruk i fuktige omgivelser. For lengre lagring anbefales luftig og ukomprimert oppbevaring.'
    }
  }
}

const featureIconMap = {
  leaf: Leaf,
  shield: ShieldCheck,
  waves: Waves
} as const

function Section({ value, title, children }: { value: string; title: string; children: ReactNode }) {
  return (
    <AccordionItem value={value} className={styles.item}>
      <AccordionTrigger className={styles.trigger}>{title}</AccordionTrigger>
      <AccordionContent>
        <div className={styles.content}>{children}</div>
      </AccordionContent>
    </AccordionItem>
  )
}

function DetailBlock({ title, text, icon }: { title: string; text: string; icon?: FeatureIconKey }) {
  const Icon = icon ? featureIconMap[icon] : null

  return (
    <div className='flex gap-3'>
      {Icon && <Icon className='mt-1 shrink-0 text-mountain-view' size={20} />}
      <div>
        <h4 className={styles.blockTitle}>{title}</h4>
        <p className={styles.blockText}>{text}</p>
      </div>
    </div>
  )
}

function UsageGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className={styles.blockTitle}>{title}</h4>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function ProductDetailsAccordion({ selectedModel }: { selectedModel: ModelKey }) {
  const content = productDetailsByModel[selectedModel]

  return (
    <section key={selectedModel} className='w-full bg-overcast pb-24 pt-6 text-background' aria-live='polite'>
      <div className='mx-auto max-w-3xl'>
        <h2 className='my-8 max-sm:pl-0 text-center max-sm:text-left text-3xl max-w-[90%] mx-auto md:max-w-4xl font-google-sans text-background sm:text-5xl tracking-normal'>
          {content.heading}
        </h2>

        <Accordion key={`details-${selectedModel}`} type='single' collapsible className='w-full'>
          <Section value='materials' title='Materialer'>
            {content.materials.map(row => (
              <DetailBlock key={row.label} title={row.label} text={row.value} />
            ))}
          </Section>

          <Section value='functions' title='Nøkkelfunksjoner'>
            {content.functions.map(item => (
              <DetailBlock key={item.title} title={item.title} text={item.text} />
            ))}
          </Section>

          <Section value='features' title='Egenskaper'>
            {content.features.map(feature => (
              <DetailBlock
                key={feature.title}
                title={feature.title}
                text={feature.text}
                icon={feature.icon}
              />
            ))}
          </Section>

          <Section value='usage' title='Bruksområder'>
            {content.usage.map(group => (
              <UsageGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </Section>

          <Section value='fit' title='Passform'>
            {content.fit.map(item => (
              <DetailBlock key={item.title} title={item.title} text={item.text} />
            ))}
            <p className={styles.callout}>
              <strong>Tips:</strong> Bruk linken ved størrelsevelgeren og i menyen over for å se de nøyaktige
              målene i tabellen.
            </p>
          </Section>

          <Section value='care' title='Vaskeanvisning'>
            <p className={styles.blockTitle}>{content.care.noteTitle}</p>
            <ul className={styles.list}>
              {content.care.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className={styles.callout}>{content.care.note}</p>
          </Section>
        </Accordion>
      </div>
    </section>
  )
}
