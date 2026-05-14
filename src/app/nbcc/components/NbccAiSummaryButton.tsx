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
  trackingName: string
  trackingData: Record<string, string>
  buttonClassName: string
  containerClassName?: string
  panelMode?: 'inline' | 'overlay'
}

type Status = 'idle' | 'thinking' | 'completed'

const CLIENT_FALLBACKS: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
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

export function NbccAiSummaryButton({
  intent,
  idleLabel,
  trackingName,
  trackingData,
  buttonClassName,
  containerClassName = 'relative w-full',
  panelMode = 'inline'
}: NbccAiSummaryButtonProps) {
  const panelId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<NbccAiSummaryPayload | null>(null)
  const [generated, setGenerated] = useState<boolean | null>(null)

  const isThinking = status === 'thinking'
  const isCompleted = status === 'completed'

  const buttonLabel =
    isThinking ? 'Genererer...'
    : isCompleted && isOpen ? 'Skjul forklaring'
    : isCompleted ? 'Vis forklaring'
    : idleLabel

  const panelPositionClass =
    panelMode === 'overlay' ?
      'sm:absolute sm:left-0 sm:top-full sm:z-30 sm:w-[min(32rem,calc(100vw-2rem))]'
    : 'w-full'

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
      const minimumDelay = new Promise(resolve => setTimeout(resolve, 1200))
      const fetchPromise = fetch(
        `/api/nbcc-ai-summary?intent=${encodeURIComponent(intent)}`,
        {
          cache: 'no-store'
        }
      )

      const [response] = await Promise.all([fetchPromise, minimumDelay])
      const data = (await response.json()) as NbccAiSummaryResponse

      if (!response.ok) {
        throw new Error(data.error || 'Kunne ikke hente AI-oppsummering')
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

      {isOpen ?
        <div id={panelId} className={`mt-3 ${panelPositionClass}`}>
          <div className='overflow-hidden rounded-xl border border-[#f0c36a]/25 bg-[#17130f]/95 text-left shadow-2xl shadow-black/25 backdrop-blur'>
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
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#f0c36a]'>
                      Atlas prosesserer
                    </p>
                    <p className='mt-1 text-sm text-[#f5efe4]/80'>
                      Lager en kort og praktisk forklaring...
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
                <header className='border-b border-white/10 bg-white/[0.04] px-5 py-4'>
                  <div className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0c36a]'>
                    <SparklesIcon className='h-3.5 w-3.5' aria-hidden />
                    {payload.kicker}
                  </div>
                  <h3 className='mt-2 text-lg font-semibold leading-snug text-white'>
                    {payload.title}
                  </h3>
                  {generated === false ?
                    <p className='mt-2 text-xs text-[#f5efe4]/55'>
                      Viser standardforklaring fordi AI-svaret ikke var
                      tilgjengelig akkurat nå.
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
      : null}
    </div>
  )
}
