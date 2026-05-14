'use client'

import { BrainCircuitIcon, ChevronDownIcon, SparklesIcon } from 'lucide-react'
import { useId, useState } from 'react'

import { Button } from '@/components/ui/button'

import type {
  NbccAiSummaryIntent,
  NbccAiSummaryPayload
} from '../lib/nbccAiSummary'

type NbccAiSummaryResponse = NbccAiSummaryPayload & {
  generated?: boolean
  error?: string
}

type NbccAiSummaryButtonProps = {
  intent: NbccAiSummaryIntent
  idleLabel: string
  completedLabel?: string
  trackingName: string
  trackingData: Record<string, string>
  buttonClassName: string
  containerClassName?: string
  panelClassName?: string
}

type Status = 'idle' | 'thinking' | 'completed'

const CLIENT_FALLBACKS: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
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

export function NbccAiSummaryButton({
  intent,
  idleLabel,
  completedLabel = 'Vis forklaring',
  trackingName,
  trackingData,
  buttonClassName,
  containerClassName = 'w-full',
  panelClassName = 'w-full'
}: NbccAiSummaryButtonProps) {
  const panelId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<NbccAiSummaryPayload | null>(null)
  const [generated, setGenerated] = useState<boolean | null>(null)

  const isThinking = status === 'thinking'
  const isCompleted = status === 'completed'

  const buttonLabel =
    isThinking ? 'Henter forklaring'
    : isCompleted && isOpen ? 'Skjul forklaring'
    : isCompleted ? completedLabel
    : idleLabel

  async function handleActivate() {
    if (isThinking) return

    if (isCompleted) {
      setIsOpen(previous => !previous)
      return
    }

    setStatus('thinking')
    setIsOpen(true)
    setGenerated(null)

    try {
      const minimumDelay = new Promise(resolve => setTimeout(resolve, 650))
      const fetchPromise = fetch(
        `/api/nbcc-ai-summary?intent=${encodeURIComponent(intent)}`,
        {
          cache: 'no-store'
        }
      )

      const [response] = await Promise.all([fetchPromise, minimumDelay])
      const data = (await response.json()) as NbccAiSummaryResponse

      if (!response.ok) {
        throw new Error(data.error || 'Kunne ikke hente forklaring')
      }

      setPayload({
        kicker: data.kicker,
        title: data.title,
        summary: data.summary,
        bullets: data.bullets,
        conclusion: data.conclusion
      })
      setGenerated(data.generated ?? true)
    } catch (error) {
      console.error(`[NbccAiSummaryButton] failed for ${intent}:`, error)
      setPayload(CLIENT_FALLBACKS[intent])
      setGenerated(false)
    } finally {
      setStatus('completed')
    }
  }

  return (
    <div className={containerClassName}>
      <Button
        type='button'
        variant='outline'
        size='lg'
        onClick={handleActivate}
        disabled={isThinking}
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-track={trackingName}
        data-track-data={JSON.stringify(trackingData)}
        className={buttonClassName}
      >
        {isThinking ?
          <BrainCircuitIcon className='h-4 w-4 animate-pulse' aria-hidden />
        : <SparklesIcon className='h-4 w-4' aria-hidden />}
        <span>{buttonLabel}</span>
        {isCompleted ?
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        : null}
      </Button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden'>
          <div
            className={`mt-3 overflow-hidden rounded-xl border border-[#f0c36a]/25 bg-[#16120e] text-left shadow-xl shadow-black/20 ${panelClassName}`}
          >
            {isThinking ?
              <div
                aria-live='polite'
                aria-busy='true'
                className='px-5 py-5 text-[#f5efe4]'
              >
                <div className='flex items-center gap-3'>
                  <BrainCircuitIcon
                    className='h-5 w-5 animate-pulse text-[#f0c36a]'
                    aria-hidden
                  />
                  <div>
                    <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0c36a]'>
                      Henter veiledning
                    </p>
                    <p className='mt-1 text-sm text-[#f5efe4]/75'>
                      Leser produkt- og størrelsesgrunnlaget...
                    </p>
                  </div>
                </div>
                <div className='mt-5 animate-pulse space-y-2.5'>
                  <div className='h-2.5 w-full rounded-full bg-white/15' />
                  <div className='h-2.5 w-[84%] rounded-full bg-white/15' />
                  <div className='h-2.5 w-[62%] rounded-full bg-white/15' />
                </div>
              </div>
            : payload ?
              <>
                <header className='border-b border-white/10 bg-white/[0.035] px-5 py-4'>
                  <div className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0c36a]'>
                    <SparklesIcon className='h-3.5 w-3.5' aria-hidden />
                    {payload.kicker}
                  </div>
                  <h3 className='mt-2 text-base font-semibold leading-snug text-white sm:text-lg'>
                    {payload.title}
                  </h3>
                  {generated === false ?
                    <p className='mt-2 text-xs text-[#f5efe4]/55'>
                      Viser standardveiledning akkurat nå.
                    </p>
                  : null}
                </header>

                <div className='px-5 py-5'>
                  <p className='text-sm leading-7 text-[#f5efe4]/88'>
                    {payload.summary}
                  </p>

                  <ul className='mt-5 space-y-3'>
                    {payload.bullets.map(item => (
                      <li
                        key={item}
                        className='flex items-start gap-3 text-sm leading-6 text-[#f5efe4]/82'
                      >
                        <span
                          aria-hidden
                          className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c36a]'
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className='mt-5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white'>
                    {payload.conclusion}
                  </p>
                </div>
              </>
            : null}
          </div>
        </div>
      </div>
    </div>
  )
}
