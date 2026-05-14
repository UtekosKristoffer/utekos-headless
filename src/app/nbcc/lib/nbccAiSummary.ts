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

export const NbccAiSummarySchema = z.object({
  kicker: z
    .string()
    .min(2)
    .max(36)
    .describe('Kort merkelapp på norsk, maks 3 ord.'),
  title: z.string().min(4).max(72).describe('Kort og konkret tittel på norsk.'),
  summary: z
    .string()
    .min(40)
    .max(420)
    .describe('Kort oppsummering i naturlig norsk prosa.'),
  bullets: z
    .array(z.string().min(8).max(170))
    .min(3)
    .max(5)
    .describe('3–5 konkrete, kundehjelpende punkter.'),
  conclusion: z
    .string()
    .min(20)
    .max(180)
    .describe('Én avsluttende setning som gjør neste steg tydelig.')
})

export type NbccAiSummaryPayload = z.infer<typeof NbccAiSummarySchema>

const NBCC_AI_MODEL =
  process.env.NBCC_AI_SUMMARY_MODEL?.trim() || 'anthropic/claude-haiku-4.5'

const NBCC_AI_MODEL_FALLBACK =
  process.env.NBCC_AI_SUMMARY_FALLBACK_MODEL?.trim() || 'google/gemini-2.5-pro'

const FALLBACK_SUMMARIES: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
  'how-to-use': {
    kicker: 'Medlemsfordel',
    title: 'Slik bruker du NBCC-fordelen',
    summary:
      'Finn fordelskoden din hos NBCC, velg Utekos-produktet som passer turen din, og legg inn koden i kassen. Rabatten trekkes automatisk før betaling, så du ser medlemsprisen før du fullfører kjøpet.',
    bullets: [
      'Finn fordelskoden i NBCCs medlemsflate, for eksempel Min Side eller Gnist.',
      'Velg produkt og størrelse hos Utekos før du går videre til kassen.',
      'Lim inn fordelskoden i rabattfeltet. Da oppdateres prisen automatisk.',
      'Kontroller at rabatten er trukket fra før du betaler.'
    ],
    conclusion:
      'Kort sagt: finn kode hos NBCC, velg Utekos, bruk koden i kassen.'
  },
  'sizes': {
    kicker: 'Størrelseshjelp',
    title: 'Velg størrelse etter bruk og passform',
    summary:
      'Start med hvordan plagget skal brukes. Velg mindre når du vil ha en nettere og mer kontrollert passform, og større når du vil ha ekstra plass til tykke lag, mer bevegelsesrom eller en tydelig oversized følelse.',
    bullets: [
      'TechDown™: Velg Middels hvis du er opptil ca. 175–180 cm eller ønsker en nettere passform. Velg Stor hvis du er over ca. 180–185 cm eller vil ha mer rom.',
      'Mikrofiber™: Velg Medium hvis du er opptil ca. 180 cm og bruker plagget over lettere klær. Velg Large hvis du er over 180 cm eller vil ha plass til tykkere lag.',
      'Comfyrobe™: Plagget er bevisst oversized. Velg S for en romslig, men mer håndterlig robe. Velg L hvis du vil ha mest dekning og plass over klær.',
      'Er du mellom to størrelser, velg etter bruk: tettere og lettere å bevege seg i = ned; mer lag-på-lag og maksimal lunhet = opp.'
    ],
    conclusion:
      'For campingbruk velger mange den størrelsen som gir plass til varme lag uten at plagget føles i veien.'
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
      `Oppgave: Forklar kort hvordan NBCC-medlemsfordelen hos Utekos fungerer.

Skriv som en hjelpsom handleveileder:
- Forklar hvor medlemmet finner fordelskoden.
- Forklar at kunden velger produkt og størrelse hos Utekos.
- Forklar at koden legges inn i kassen.
- Forklar at prisen oppdateres før betaling.
- Ikke legg til prosenter, priser eller vilkår som ikke står i fakta.`
    : `Oppgave: Lag konkret størrelseshjelp for NBCC-medlemmer som skal velge Utekos.

Skriv som en hjelpsom butikkmedarbeider, ikke som en teknisk oppsummering.

Målet:
- Gjør det enklere å velge størrelse.
- Bruk høyde, passform og bruksområde der faktaene støtter det.
- Forklar hva kunden bør velge hvis de står mellom to størrelser.
- Knytt rådene til campingbruk: lag-på-lag, kalde kvelder, bevegelsesrom og komfort.
- Ikke bare list opp størrelsene.
- Ikke skriv setninger som "NBCC-utvalget bruker ulike størrelsesnavn".
- Ikke skriv metaformuleringer som "samlet kan størrelsene leses".
- Ikke gi centimeter- eller høydepåstander som ikke finnes i faktaene.
- For TechDown Ekstra Stor: det finnes som valg på NBCC-siden, men måltabellen under har bare Liten, Middels og Stor. Gi derfor kun generell veiledning for Ekstra Stor: mest romslig valg, mest plass til lag under.`

  return `Du er en presis norsk produktveileder for Utekos sin NBCC-landingsside.

${task}

Regler:
- Skriv på norsk bokmål.
- Basér deg kun på fakta under.
- Ikke bruk emoji.
- Ikke nevn at teksten er AI-generert.
- Ikke bruk markdown.
- Vær kort, trygg, nyttig og konkret.
- Returner strukturert innhold som matcher skjemaet.
- Skriv for en kunde som vurderer å kjøpe, ikke for en intern produktdatabase.

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
Liten: opptil 165–170 cm, eller lavere person som ønsker ekstra romslig følelse.
Medium/Middels: opptil 175–180 cm, eller lavere person som ønsker ekstra romslig passform.
Large/Stor: over 180–185 cm, eller lavere person som ønsker ekstra romslig passform. Over 195 cm kan bli for lite.
${formatTechDownSizeFacts()}

Størrelsesguide — Mikrofiber:
Mikrofiber/Utekos har stor forskjell mellom Medium og Large. Passformen kan formes med snorstramming i livet og nederst.
Medium: opptil ca. 180 cm, generøs men tettere passform, best over lettere klær.
Large: over 180 cm, eller hvis kunden ønsker oversized følelse, maksimal plass til tykke lag og mer kokong-effekt.
${formatMikrofiberSizeFacts()}`
}

function cleanText(value: string): string {
  return value
    .trim()
    .replace(/^["“”]+/, '')
    .replace(/["“”]+$/, '')
    .replace(/\s+/g, ' ')
}

function normalizeSummaryPayload(
  payload: NbccAiSummaryPayload
): NbccAiSummaryPayload {
  return {
    kicker: cleanText(payload.kicker),
    title: cleanText(payload.title),
    summary: cleanText(payload.summary),
    bullets: payload.bullets.map(cleanText).filter(Boolean),
    conclusion: cleanText(payload.conclusion)
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
    temperature: 0.2,
    maxOutputTokens: 850
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
    ['nbcc-ai-summary:v2', intent],
    {
      revalidate: 3600,
      tags: [`nbcc-ai-summary-v2-${intent}`]
    }
  )

  return cached(intent)
}
