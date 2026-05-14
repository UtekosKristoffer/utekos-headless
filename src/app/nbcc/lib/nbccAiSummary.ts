import 'server-only'

import { gateway, generateObject } from 'ai'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'

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
    .array(z.string().min(8).max(140))
    .min(3)
    .max(5)
    .describe('3–5 korte punkter med konkret, nyttig informasjon.'),
  conclusion: z
    .string()
    .min(20)
    .max(180)
    .describe(
      'Én avsluttende setning som gjør valget eller handlingen tydelig.'
    )
})

export type NbccAiSummaryPayload = z.infer<typeof NbccAiSummarySchema>

const NBCC_AI_MODEL =
  process.env.NBCC_AI_SUMMARY_MODEL?.trim() || 'anthropic/claude-haiku-4.5'

const NBCC_AI_MODEL_FALLBACK =
  process.env.NBCC_AI_SUMMARY_FALLBACK_MODEL?.trim() || 'google/gemini-2.5-pro'

const FALLBACK_SUMMARIES: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
  'how-to-use': {
    kicker: 'Medlemsfordel',
    title: 'Slik brukes NBCC-fordelen',
    summary:
      'Som NBCC-medlem finner du fordelskoden i Min Side eller Gnist under medlemsfordeler. Velg Utekos-produktet som passer turen din, legg det i handlekurven og skriv inn koden i kassen. Da trekkes medlemsrabatten automatisk før du betaler.',
    bullets: [
      'Finn fordelskoden hos NBCC i Min Side eller Gnist.',
      'Velg Utekos-produkt og størrelse før du går til kassen.',
      'Legg inn fordelskoden i rabattfeltet, så oppdateres prisen automatisk.'
    ],
    conclusion:
      'Kort sagt: koden gjør ordinær pris om til NBCC-medlemspris før betaling.'
  },
  'sizes': {
    kicker: 'Størrelser',
    title: 'Størrelser fra lavest til høyest',
    summary:
      'NBCC-utvalget bruker litt ulike størrelsesnavn per produkt. Comfyrobe går fra S til L, Mikrofiber fra Medium til Large, og TechDown fra Middels til Ekstra Stor. Samlet kan størrelsene leses fra lavest til høyest som S, Middels/Medium, Stor/Large og Ekstra Stor.',
    bullets: [
      'Comfyrobe: S → L.',
      'Mikrofiber: Medium → Large.',
      'TechDown: Middels → Stor → Ekstra Stor.',
      'Samlet rekkefølge: S → Middels/Medium → Stor/Large → Ekstra Stor.'
    ],
    conclusion:
      'Velg lavere størrelse for tettere passform og høyere størrelse for mer romslighet.'
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
  Størrelser: ${product.sizes.join(' → ')}${color}`
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

function buildNbccPrompt(intent: NbccAiSummaryIntent): string {
  const task =
    intent === 'how-to-use' ?
      `Oppgave: Forklar kort hvordan NBCC-medlemsfordelen hos Utekos fungerer.

Svar slik:
- Forklar hvor fordelskoden finnes.
- Forklar hva kunden gjør hos Utekos.
- Forklar at rabatten trekkes i kassen.
- Bruk trygg, tydelig og praktisk tone.
- Ikke legg til prosenter, priser eller vilkår som ikke står i fakta.`
    : `Oppgave: Generer kort størrelseinformasjon for NBCC-utvalget.

Svar slik:
- Oppsummer størrelsene fra laveste til høyeste.
- Vis produktvis størrelsesrekkefølge.
- Forklar at navn varierer mellom produktene.
- Bruk benevnelsen: S → Middels/Medium → Stor/Large → Ekstra Stor når du oppsummerer samlet.
- Ikke påstå eksakte kroppsmål, centimeter eller garantier som ikke står i fakta.`

  return `Du er en presis norsk produktveileder for Utekos sin NBCC-landingsside.

${task}

Regler:
- Skriv på norsk bokmål.
- Basér deg kun på fakta under.
- Ikke bruk emoji.
- Ikke nevn at teksten er AI-generert.
- Ikke bruk markdown.
- Vær kort, nyttig og konkret.
- Returner strukturert innhold som matcher skjemaet.

Produkter:
${formatProductFacts()}

Slik brukes fordelen:
${formatStepFacts()}

FAQ-fakta:
${formatFaqFacts()}`
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
    temperature: 0.25,
    maxOutputTokens: 700
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
    ['nbcc-ai-summary', intent],
    {
      revalidate: 3600,
      tags: [`nbcc-ai-summary-${intent}`]
    }
  )

  return cached(intent)
}
