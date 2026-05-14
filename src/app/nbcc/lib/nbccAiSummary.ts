import 'server-only'

import { gateway, generateObject } from 'ai'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

import {
  comfyrobeData,
  tecDownData,
  utekosData
} from '@/app/handlehjelp/storrelsesguide/data'

import {
  nbccFaqItems,
  nbccProducts,
  nbccSteps
} from '../data/nbccLandingPageContent'

export const nbccAiSummaryIntents = ['how-to-use', 'sizes'] as const

export type NbccAiSummaryIntent = (typeof nbccAiSummaryIntents)[number]

const NbccAiSummarySectionSchema = z.object({
  title: z.string().min(2).max(72).describe('Kort seksjonstittel på norsk.'),
  body: z
    .string()
    .min(20)
    .max(520)
    .optional()
    .describe('Valgfri brødtekst for seksjonen.'),
  items: z
    .array(z.string().min(8).max(220))
    .min(1)
    .max(6)
    .optional()
    .describe('Valgfrie punkter eller steg.'),
  style: z
    .enum(['paragraph', 'list', 'steps'])
    .optional()
    .describe('Hvordan seksjonen bør vises i UI.')
})

export const NbccAiSummarySchema = z.object({
  kicker: z
    .string()
    .min(2)
    .max(36)
    .describe('Kort merkelapp på norsk, maks 3 ord.'),
  title: z
    .string()
    .min(4)
    .max(72)
    .describe('Kort, trygg og konkret tittel på norsk.'),
  intro: z
    .string()
    .min(60)
    .max(620)
    .describe(
      'Vennlig intro i naturlig norsk, skrevet som en dyktig kundeservice-ansatt.'
    ),
  sections: z
    .array(NbccAiSummarySectionSchema)
    .min(2)
    .max(5)
    .describe('Strukturerte seksjoner som hjelper kunden videre.')
})

export type NbccAiSummarySection = z.infer<typeof NbccAiSummarySectionSchema>
export type NbccAiSummaryPayload = z.infer<typeof NbccAiSummarySchema>

const NBCC_AI_MODEL =
  process.env.NBCC_AI_SUMMARY_MODEL?.trim() || 'anthropic/claude-haiku-4.5'

const NBCC_AI_MODEL_FALLBACK =
  process.env.NBCC_AI_SUMMARY_FALLBACK_MODEL?.trim() || 'google/gemini-2.5-pro'

const FALLBACK_SUMMARIES: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
  'how-to-use': {
    kicker: 'Medlemsfordel',
    title: 'Slik bruker du NBCC-fordelen',
    intro:
      'Som samarbeidspartner med NBCC gleder vi oss over å kunne tilby deg en hyggelig medlemsrabatt. Det er vår måte å bidra til at de gode øyeblikkene ute kan bli enda litt lunere, mer komfortable og vare enda lenger.',
    sections: [
      {
        title: 'Støtt din lokalavdeling',
        style: 'paragraph',
        body: 'Et lite tips før du bestiller: Sjekk gjerne om lokalavdelingen din har en egen avtale med Utekos. Da anbefaler vi at du bruker deres dedikerte rabattkode. Prisen for deg blir akkurat den samme, samtidig som du støtter det viktige sosiale arbeidet i ditt nærområde.'
      },
      {
        title: 'Hvor finner jeg koden?',
        style: 'paragraph',
        body: 'Du finner rabattkoden din ved å logge inn på Min Side hos NBCC, eller under medlemsfordelene dine i Gnist-appen.'
      },
      {
        title: 'Slik bruker du fordelen din',
        style: 'steps',
        items: [
          'Hent rabattkoden din via Min Side hos NBCC eller Gnist-appen.',
          'Legg Utekos-favorittene dine i handlekurven her hos oss.',
          'Gå til kassen og skriv inn koden i rabattfeltet.',
          'Medlemsrabatten trekkes fra automatisk før du betaler.'
        ]
      }
    ]
  },
  'sizes': {
    kicker: 'Størrelseshjelp',
    title: 'Finn din størrelse',
    intro:
      'Det er enklere enn du tror! Utekos er skapt for å være romslig, lunt og behagelig – du skal jo tross alt slappe av. Fordi plaggene våre har en raus unisex-passform, trenger du ikke finregne på centimeterne. Kjernekonseptet er at plagget skal kunne justeres og tilpasses etter personlig behov.',
    sections: [
      {
        title: 'Utekos TechDown™',
        style: 'list',
        body: 'TechDown™ har en lun og mer kroppsnær passform enn de mest oversized modellene, men er fortsatt laget for komfort, bevegelse og justering.',
        items: [
          'Liten: total lengde fra nakke til bunn er 152 cm. Passer best for deg som ønsker en kortere og nettere variant.',
          'Middels: total lengde er 162 cm. Passer best for deg som er 170–180 cm. Er du lavere enn 170 cm, får du en romsligere passform.',
          'Stor: total lengde er 166 cm. Passer best for deg som er 180–195 cm, eller for deg som er lavere og ønsker mer romslighet.',
          'Ekstra Stor: passer best for deg som er 190 cm og oppover, eller for deg som ønsker maksimal romslighet, lengde i kroppen og ekstra plass i ermene.'
        ]
      },
      {
        title: 'Utekos Mikrofiber™',
        style: 'list',
        body: 'Mikrofiber™ er lett, lun og enkel å tilpasse med snorstramming. Her er total lengde ofte det mest nyttige målet å starte med.',
        items: [
          'Medium: total lengde fra nakke til bunn er 170 cm. Passer godt opptil ca. 180 cm, særlig hvis du bruker plagget over lettere klær.',
          'Large: total lengde er 200 cm. Passer godt over 180 cm, eller hvis du ønsker mer plass til tykkere lag og ekstra lunhet.'
        ]
      },
      {
        title: 'Comfyrobe™',
        style: 'list',
        body: 'Comfyrobe™ er designet som ditt personlige, beskyttende skall mot vær og vind. Den har en romslig, rektangulær og omsluttende passform, med forlenget rygg, splitter i sidene for bevegelsesfrihet og justerbare ermer som ikke skal være i veien.',
        items: [
          'S: total lengde fra skulder og ned er 97 cm. Et godt valg hvis du vil ha en romslig robe som fortsatt føles lett å håndtere.',
          'L: total lengde er 113 cm. Velg denne hvis du ønsker mest dekning, mer lengde og god plass over klær.'
        ]
      }
    ]
  }
}

export function isNbccAiSummaryIntent(
  value: string | null
): value is NbccAiSummaryIntent {
  return value === 'how-to-use' || value === 'sizes'
}

export function getNbccAiSummaryFallback(
  intent: NbccAiSummaryIntent
): NbccAiSummaryPayload {
  return FALLBACK_SUMMARIES[intent]
}

function formatProductFacts(): string {
  return nbccProducts
    .map(product => {
      const color =
        product.color ? `\n  Fargevariant i NBCC-utvalg: ${product.color}` : ''

      return `- ${product.title}
  Kortnavn: ${product.shortTitle}
  Beskrivelse: ${product.description}
  Best for: ${product.bestFor}
  Størrelser vist på NBCC-siden: ${product.sizes.join(' → ')}${color}`
    })
    .join('\n\n')
}

function formatStepFacts(): string {
  return nbccSteps
    .map((step, index) => `${index + 1}. ${step.title}: ${step.description}`)
    .join('\n')
}

function formatFaqFacts(): string {
  return nbccFaqItems
    .map(item => `- ${item.question}: ${item.answer}`)
    .join('\n')
}

function formatComfyrobeSizeFacts(): string {
  return comfyrobeData
    .map(row => `- ${row.measurement}: S ${row.xs}, M ${row.ml}, L ${row.lxl}`)
    .join('\n')
}

function formatMikrofiberSizeFacts(): string {
  return utekosData
    .map(row => `- ${row.measurement}: Medium ${row.m}, Large ${row.l}`)
    .join('\n')
}

function formatTechDownSizeFacts(): string {
  return tecDownData
    .map(
      row =>
        `- ${row.measurement}: Liten ${row.liten}, Middels ${row.middels}, Stor ${row.stor}`
    )
    .join('\n')
}

function buildNbccPrompt(intent: NbccAiSummaryIntent): string {
  const task =
    intent === 'how-to-use' ?
      `Oppgave: Forklar NBCC-fordelen på en måte som føles varm, presis og nyttig for et NBCC-medlem som allerede er på Utekos-siden.

Svaret skal ha denne strukturen:
- intro: én varm introduksjon om samarbeidet med NBCC og medlemsrabatten.
- sections[0]: "Støtt din lokalavdeling" med forklaring om lokalavdelingens dedikerte rabattkode.
- sections[1]: "Hvor finner jeg koden?" med forklaring om Min Side hos NBCC og Gnist-appen.
- sections[2]: "Slik bruker du fordelen din" som steg-for-steg-liste.

Viktig:
- Ikke lag en avsluttende oppsummering.
- Ikke skriv "Det viktigste er enkelt".
- Ikke lag tre varianter av samme forklaring.
- Ikke bruk en CTA som sender brukeren bort fra Utekos.
- Ikke skriv "for eksempel" om Min Side eller Gnist.
- Ikke anta at kunden skal på tur.
- Bruk "Utekos-favorittene dine" eller tilsvarende inkluderende formulering.
- Forklar at rabattkoden skrives inn i kassen og at rabatten trekkes fra før betaling.
- Ikke legg til prosenter, priser eller vilkår som ikke står i fakta.`
    : `Oppgave: Lag en størrelsesveiledning som hjelper NBCC-medlemmer å velge riktig Utekos-størrelse.

Svaret skal ha denne strukturen:
- title: "Finn din størrelse"
- intro: vennlig forklaring om at Utekos er romslig, lunt, behagelig og justerbart. Første setning må være nøyaktig: "Det er enklere enn du tror!"
- Én seksjon for Utekos TechDown™.
- Én seksjon for Utekos Mikrofiber™.
- Én seksjon for Comfyrobe™.

Viktig:
- Ikke lag en avsluttende oppsummering.
- Ikke bare list størrelsesnavn.
- Bruk nyttige mål, spesielt total lengde.
- Nevn TechDown Ekstra Stor.
- TechDown Middels: passer best 170–180 cm. Lavere enn 170 cm gir romsligere passform. Mot 180 cm blir mer kroppsnært.
- TechDown Stor: passer best 180–195 cm. Over 195 cm anbefales Ekstra Stor.
- TechDown Ekstra Stor: passer best 190 cm og oppover, eller for lavere personer som ønsker maksimal romslighet og lengde.
- Mikrofiber Medium: total lengde 170 cm, opptil ca. 180 cm, lettere klær.
- Mikrofiber Large: total lengde 200 cm, over 180 cm eller mer plass til tykke lag.
- Comfyrobe: forklar den som et beskyttende skall, romslig rektangulær passform, forlenget rygg, splitter og justerbare ermer.
- Comfyrobe S: total lengde 97 cm.
- Comfyrobe L: total lengde 113 cm.
- Ikke skriv tørt metaspåk som "samlet kan størrelsene leses".
- Ikke skriv "NBCC-utvalget bruker ulike størrelsesnavn".`

  return `Du er en erfaren norsk kundeservice- og produktveileder for Utekos sin NBCC-landingsside.

Kontekst:
- Leseren er NBCC-medlem eller vurderer å bruke NBCC-medlemsfordelen.
- Leseren er på Utekos sin NBCC-side akkurat nå.
- Målet ditt er å øke trygghet, redusere friksjon og gjøre neste handling enkel.
- Tonen skal være vennlig, trygg, kompetent og konkret.
- Skriv som en motivert kundeservice-ansatt med full kontroll, ikke som en intern produktdatabase.

${task}

Generelle regler:
- Skriv på norsk bokmål.
- Bruk "du".
- Basér deg kun på fakta under.
- Ikke bruk emoji.
- Ikke nevn AI, prompt, data eller oppsummering.
- Ikke bruk markdown.
- Ikke skriv overforklarende eller internt.
- Returner strukturert innhold som matcher skjemaet.

Produkter på NBCC-siden:
${formatProductFacts()}

Slik brukes fordelen:
${formatStepFacts()}

FAQ-fakta:
${formatFaqFacts()}

Størrelsesguide — Comfyrobe:
Comfyrobe er oversized og beskyttende. Den er ment å kunne trekkes over klær og gi god bevegelsesfrihet.
Beste tips: Velg normal størrelse for romslig, men kontrollerbar passform. Vurder større størrelse hvis kunden vil ha maksimal plass til tykke lag eller en bevisst overdimensjonert stil.
${formatComfyrobeSizeFacts()}

Størrelsesguide — TechDown:
TechDown har mer kroppsnær passform, justerbar midje og nettere design.
Liten: total lengde fra nakke til bunn er 152 cm.
Middels: total lengde er 162 cm. Passer best for deg som er 170–180 cm. Er du lavere enn 170 cm får du en romslig passform. Ligger du mot 180 cm får du en mer kroppsnær passform.
Stor: total lengde er 166 cm. Passer best for deg som er 180–195 cm. Perfekt for deg over 180 cm, eller for deg som er lavere og ønsker romslighet. Er du over 195 cm anbefales Ekstra Stor.
Ekstra Stor: passer best for deg som er 190 cm og oppover. Ekstra lengde i kroppen og ermene. Også et godt valg for deg som er lavere, men ønsker maksimal romslighet og lengde.
Måltabellen under viser Liten, Middels og Stor. NBCC-utvalget inkluderer også Ekstra Stor for TechDown.
${formatTechDownSizeFacts()}

Størrelsesguide — Mikrofiber:
Mikrofiber/Utekos har stor forskjell mellom Medium og Large. Passformen kan formes med snorstramming i livet og nederst.
Medium: total lengde fra nakke til bunn er 170 cm. Opptil ca. 180 cm, generøs men tettere passform, best over lettere klær.
Large: total lengde fra nakke til bunn er 200 cm. Over 180 cm, eller hvis kunden ønsker oversized følelse, maksimal plass til tykke lag og mer kokong-effekt.
${formatMikrofiberSizeFacts()}`
}

function cleanText(value: string): string {
  return value
    .trim()
    .replace(/^["“”]+/, '')
    .replace(/["“”]+$/, '')
    .replace(/\s+/g, ' ')
}

function normalizeSections(
  sections: NbccAiSummarySection[]
): NbccAiSummarySection[] {
  return sections.map(section => {
    const normalizedSection: NbccAiSummarySection = {
      title: cleanText(section.title)
    }

    if (section.body) {
      normalizedSection.body = cleanText(section.body)
    }

    if (section.items?.length) {
      normalizedSection.items = section.items.map(cleanText).filter(Boolean)
    }

    if (section.style) {
      normalizedSection.style = section.style
    }

    return normalizedSection
  })
}

function normalizeSummaryPayload(
  payload: NbccAiSummaryPayload
): NbccAiSummaryPayload {
  return {
    kicker: cleanText(payload.kicker),
    title: cleanText(payload.title),
    intro: cleanText(payload.intro),
    sections: normalizeSections(payload.sections)
  }
}

async function generateWithModel(
  intent: NbccAiSummaryIntent,
  modelId: string
): Promise<NbccAiSummaryPayload> {
  const { object } = await generateObject({
    model: gateway(modelId),
    schema: NbccAiSummarySchema,
    prompt: buildNbccPrompt(intent),
    temperature: 0.25,
    maxOutputTokens: 1050
  })

  return normalizeSummaryPayload(object)
}

async function generateNbccAiSummaryUncached(
  intent: NbccAiSummaryIntent
): Promise<NbccAiSummaryPayload> {
  try {
    return await generateWithModel(intent, NBCC_AI_MODEL)
  } catch (error) {
    console.warn(
      `[nbcc-ai-summary] primary model failed for ${intent}, retrying fallback`,
      error
    )

    return generateWithModel(intent, NBCC_AI_MODEL_FALLBACK)
  }
}

export async function generateNbccAiSummary(
  intent: NbccAiSummaryIntent
): Promise<NbccAiSummaryPayload> {
  const cached = unstable_cache(
    (selectedIntent: NbccAiSummaryIntent) =>
      generateNbccAiSummaryUncached(selectedIntent),
    ['nbcc-ai-summary:v6', intent],
    {
      revalidate: 3600,
      tags: [`nbcc-ai-summary-v6-${intent}`]
    }
  )

  return cached(intent)
}
