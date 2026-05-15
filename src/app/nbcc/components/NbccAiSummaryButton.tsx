'use client'

import { BrainCircuitIcon, ChevronDownIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import type {
  NbccAiSummaryIntent,
  NbccAiSummaryPayload,
  NbccAiSummarySection
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

const NBCC_LOGIN_URL = 'https://gnist.styreweb.com/Account/Login?ReturnUrl=%2F'
const MINIMUM_THINKING_TIME_MS = 2500

const CLIENT_FALLBACKS: Record<NbccAiSummaryIntent, NbccAiSummaryPayload> = {
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

function LinkedSectionBody({
  intent,
  section
}: {
  intent: NbccAiSummaryIntent
  section: NbccAiSummarySection
}) {
  if (!section.body) return null

  const shouldLinkNbccLogin =
    intent === 'how-to-use'
    && section.title.toLowerCase() === 'hvor finner jeg koden?'
    && section.body.includes('Min Side hos NBCC')

  if (!shouldLinkNbccLogin) {
    return (
      <p className='mt-2 text-sm leading-6 text-[#f5efe4]/78'>{section.body}</p>
    )
  }

  const [before, after] = section.body.split('Min Side hos NBCC')

  return (
    <p className='mt-2 text-sm leading-6 text-[#f5efe4]/78'>
      {before}
      <a
        href={NBCC_LOGIN_URL}
        target='_blank'
        rel='noreferrer'
        className='font-semibold text-[#f0c36a] underline decoration-[#f0c36a]/40 underline-offset-4 hover:text-[#ffd886]'
      >
        Min Side hos NBCC
      </a>
      {after}
    </p>
  )
}

function renderSectionItems(section: NbccAiSummarySection) {
  if (!section.items?.length) return null

  if (section.style === 'steps') {
    return (
      <ol className='mt-3 space-y-2.5'>
        {section.items.map((item, index) => (
          <li
            key={item}
            className='flex gap-3 text-sm leading-6 text-[#f5efe4]/82'
          >
            <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0c36a]/15 text-[11px] font-bold text-[#f0c36a]'>
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className='mt-3 space-y-2.5'>
      {section.items.map(item => (
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
  )
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
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<NbccAiSummaryPayload | null>(null)

  const isThinking = status === 'thinking'
  const isCompleted = status === 'completed'

  const buttonLabel =
    isThinking ? 'Henter forklaring'
    : isCompleted && isOpen ? 'Skjul forklaring'
    : isCompleted ? completedLabel
    : idleLabel

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Node)) return

      if (!rootRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  async function handleActivate() {
    if (isThinking) return

    if (isCompleted) {
      setIsOpen(previous => !previous)
      return
    }

    setStatus('thinking')
    setIsOpen(true)

    try {
      const minimumDelay = new Promise(resolve =>
        setTimeout(resolve, MINIMUM_THINKING_TIME_MS)
      )
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
        intro: data.intro,
        sections: data.sections
      })
    } catch (error) {
      console.error(`[NbccAiSummaryButton] failed for ${intent}:`, error)
      setPayload(CLIENT_FALLBACKS[intent])
    } finally {
      setStatus('completed')
    }
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className={containerClassName}>
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
        className={`grid transition-all duration-300 ease-out ${panelClassName} ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='w-full overflow-hidden'>
          <div className='mt-3 w-full overflow-hidden rounded-xl border border-[#f0c36a]/25 bg-[#16120e] text-left shadow-xl shadow-black/20'>
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
                      Setter sammen en ryddig forklaring...
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
                </header>

                <div className='px-5 py-5'>
                  <p className='text-sm leading-7 text-[#f5efe4]/88'>
                    {payload.intro}
                  </p>

                  <div className='mt-5 space-y-5'>
                    {payload.sections.map(section => (
                      <section
                        key={section.title}
                        className='rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4'
                      >
                        <h4 className='text-sm font-semibold text-white'>
                          {section.title}
                        </h4>

                        <LinkedSectionBody intent={intent} section={section} />

                        {renderSectionItems(section)}
                      </section>
                    ))}
                  </div>

                  {intent === 'sizes' ?
                    <p className='mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-[#f5efe4]/72'>
                      Er du fremdeles usikker? Ta en rask titt i{' '}
                      <Link
                        href='/handlehjelp/storrelsesguide'
                        className='font-semibold text-[#f0c36a] underline decoration-[#f0c36a]/40 underline-offset-4 hover:text-[#ffd886]'
                      >
                        størrelsesguiden vår
                      </Link>
                      .
                    </p>
                  : null}

                  <div className='mt-5 flex justify-end border-t border-white/10 pt-4'>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={handleClose}
                      className='rounded-md border-white/20 bg-white/[0.04] px-4 text-white hover:bg-white/[0.10]'
                    >
                      Skjul forklaring
                    </Button>
                  </div>
                </div>
              </>
            : null}
          </div>
        </div>
      </div>
    </div>
  )
}
