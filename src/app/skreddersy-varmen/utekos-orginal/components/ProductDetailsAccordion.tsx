import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Leaf, ShieldCheck, Waves, Thermometer, Info } from 'lucide-react'

export function ProductDetailsAccordion() {
  return (
    <section className='w-full bg-[#F4F1EA] text-[#2C2420] pb-24 px-6'>
      <div className='max-w-3xl mx-auto'>
        <h3 className='font-serif text-2xl md:text-3xl my-8 text-center text-[#2C2420]'>
          Alt du trenger å vite
        </h3>

        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='materials'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Materialer
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-base leading-relaxed p-2'>
                <SpecRow label='Fôrstoff' value='Taffeta' />
                <SpecRow label='Skallstoff' value='DuraLite™ Nylon' />
                <SpecRow label='Belegg' value='DWR (inkl. flammehemming)' />
                <SpecRow label='Trådtetthet' value='380T' />
                <SpecRow label='Trådtykkelse' value='20D' />
                <SpecRow label='Vekt' value='ca. 800g' />
                <SpecRow label='Glidelåser' value='YKK®' />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* --- FUNKSJONER --- */}
          <AccordionItem value='functions'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Nøkkelfunksjoner
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-6 p-2'>
                <DetailBlock
                  title='3-i-1 funksjonalitet'
                  text='Modulært system for sømløs tilpasning. Veksle mellom parkas, oppfestet modus for mobilitet, eller fulldekket modus for maksimal isolasjon og "kokong-følelse".'
                />
                <DetailBlock
                  title='DuraLite™ Nylon (DWR)'
                  text='Vårt robuste lettvekts-materiale (20D/380T). Utviklet for å tåle røff bruk i nordisk natur, enten det er slitasje fra terrenget eller bruk rundt leirplassen. Materialet er vindtett, sterkt vannavvisende og har utmerkede pusteegenskaper.'
                />
                <DetailBlock
                  title='YKK® Dual V-Zip™'
                  text='To-spors glidelåssystem med omvendt V-profil. Gir direkte tilgang til innvendig justering og effektiv ventilasjon uten at frontpartiet må åpnes helt opp.'
                />
                <DetailBlock
                  title='Isolert og justerbar hette'
                  text='Romslig konstruksjon med god isolasjon. Utformet for å gi optimal beskyttelse mot vær og vind, med god plass til lue eller ekstra bekledning under.'
                />
                <DetailBlock
                  title='Lommer og varmemuffe'
                  text='Utstyrt med dype sidelommer for trygg oppbevaring, samt en sentrert, fôret muffe på magen som fungerer som en effektiv håndvarmer.'
                />
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='features'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Egenskaper
            </AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-6 p-2'>
                <li className='flex gap-4'>
                  <Waves className='shrink-0 text-[#E07A5F] mt-1' size={20} />
                  <div>
                    <h4 className='font-bold text-base mb-1'>
                      Håndterer fuktige forhold
                    </h4>
                    <p className='text-[#2C2420]/80'>
                      Den avanserte, syntetiske isolasjonen er konstruert for å
                      prestere optimalt i fuktige forhold. Den beholder
                      isolerende evne når den blir våt og tørker svært raskt.
                    </p>
                  </div>
                </li>
                <li className='flex gap-4'>
                  <Leaf className='shrink-0 text-[#E07A5F] mt-1' size={20} />
                  <div>
                    <h4 className='font-bold text-base mb-1'>Allergivennlig</h4>
                    <p className='text-[#2C2420]/80'>
                      Et gjennomtenkt vegansk valg som gir full trygghet og
                      komfort for deg med dunallergi eller for deg som
                      foretrekker produkter uten animalske materialer.
                    </p>
                  </div>
                </li>
                <li className='flex gap-4'>
                  <ShieldCheck
                    className='shrink-0 text-[#E07A5F] mt-1'
                    size={20}
                  />
                  <div>
                    <h4 className='font-bold text-base mb-1'>
                      Robust og allsidig
                    </h4>
                    <p className='text-[#2C2420]/80'>
                      Utekos™-modellen med lavest vekt, best egnet for både
                      rolig hygge og aktivitet.
                    </p>
                  </div>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='usage'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Bruksområder
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-2'>
                <UsageGroup title='Båt- og hytteliv'>
                  <li>Camping, båt og bobillivet</li>
                  <li>Perfekt på hytten eller terrassen hjemme</li>
                </UsageGroup>

                <UsageGroup title='Fjellsport og turer'>
                  <li>Pause og bålkos</li>
                  <li>Aktiv vandring, toppturer og skiturer</li>
                  <li>Isklatring og krevende fjellsport</li>
                </UsageGroup>

                <UsageGroup title='Jakt og fiske'>
                  <li>Smygjakt og posteringsjakt</li>
                  <li>Fiske (inkludert isfiske)</li>
                </UsageGroup>

                <UsageGroup title='Til vanns & Annet'>
                  <li>Båt- og seiltur</li>
                  <li>Isbading (før og etter)</li>
                  <li>På kalde tribuner</li>
                  <li>Fotooppdrag i kulden</li>
                </UsageGroup>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* --- PASSFORM --- */}
          <AccordionItem value='fit'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Passform
            </AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4 p-2 text-base leading-relaxed text-[#2C2420]/80'>
                <p>
                  <strong className='text-[#2C2420] block mb-1'>
                    Rom for bevegelse og ekstra lag
                  </strong>
                  Utekos Mikrofiber™ er designet med sjenerøs passform som gir
                  deg full bevegelsesfrihet og gjør det enkelt å ha flere lag
                  under uten at det føles trangt.
                </p>
                <p>
                  <strong className='text-[#2C2420] block mb-1'>
                    Fra parkas til fullstendig tildekket på sekunder
                  </strong>
                  Med smarte snorstramminger justerer du enkelt passformen for
                  optimal varme og komfort. Gå fra en luftig, beskyttende parkas
                  til en tett og varmende kokong.
                </p>
                <p className='bg-[#E07A5F]/10 p-4 rounded-lg border border-[#E07A5F]/20 text-sm'>
                  <strong className='text-[#E07A5F]'>Tips:</strong> Bruk linken
                  ved størrelsevelgeren og i menyen over for å se de nøyaktige
                  målene i tabellen.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* --- VASKEANVISNING --- */}
          <AccordionItem value='care'>
            <AccordionTrigger className='text-lg md:text-xl font-serif hover:no-underline hover:text-[#E07A5F]'>
              Vedlikehold
            </AccordionTrigger>
            <AccordionContent>
              <div className='p-2 space-y-4'>
                <ul className='list-disc list-inside space-y-1 text-[#2C2420]/80'>
                  <li>Maskinvask på maks 30°C</li>
                  <li>Bruk mild såpe</li>
                  <li>
                    <span className='font-bold text-[#2C2420]'>
                      Unngå tørketrommelen
                    </span>
                  </li>
                  <li>La den lufttørke (tørker raskt)</li>
                  <li>Unngå stryking og bleking</li>
                </ul>

                <div className='mt-4 flex gap-3 p-4 bg-[#2C2420]/5 rounded-lg border-l-4 border-[#E07A5F]'>
                  <Info className='shrink-0 text-[#E07A5F]' />
                  <div className='text-sm leading-relaxed'>
                    <span className='font-bold block mb-1'>
                      Viktig om oppbevaring
                    </span>
                    Oppbevares tørt. Materialet vil absorbere fuktighet under
                    normal bruk, så sørg for at den tørkes godt etter bruk i
                    fuktige omgivelser. For lengre lagring anbefales det å
                    oppbevare plagget ukomprimert (hengende eller løst foldet)
                    for å bevare loft og form.
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between md:justify-start gap-2 border-b border-[#2C2420]/10 pb-1 last:border-0'>
      <span className='font-semibold text-[#2C2420] w-32 shrink-0'>
        {label}:
      </span>
      <span className='text-[#2C2420]/80'>{value}</span>
    </div>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <li>
      <h4 className='font-bold text-base mb-1 text-[#2C2420]'>{title}</h4>
      <p className='text-[#2C2420]/80 leading-relaxed text-sm md:text-base'>
        {text}
      </p>
    </li>
  )
}

function UsageGroup({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className='font-serif text-lg text-[#E07A5F] mb-3 border-b border-[#E07A5F]/20 pb-1'>
        {title}
      </h4>
      <ul className='list-disc list-inside space-y-1 text-[#2C2420]/80 text-sm'>
        {children}
      </ul>
    </div>
  )
}
