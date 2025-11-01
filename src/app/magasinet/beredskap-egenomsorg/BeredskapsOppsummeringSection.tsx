// Path: src/app/magasinet/beredskap-egenomsorg/BeredskapOppsummeringSection.tsx
import { Check, ShieldCheck } from 'lucide-react'

export function BeredskapOppsummeringSection() {
  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='bg-sidebar-foreground rounded-2xl border border-border shadow-xl p-8 sm:p-10'>
          <div className='flex flex-col sm:flex-row items-start gap-6'>
            <div className='flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-amber-800 to-amber-700 text-white shadow-md'>
              <ShieldCheck className='h-7 w-7' />
            </div>

            <div className='flex-1 sm:min-w-0'>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4'>
                <span className='block'>Oppsummert</span>
                <span className='block'>
                  Fra passiv varme til aktiv trygghet
                </span>
              </h2>

              <p className='text-lg text-article-white leading-relaxed mb-6'>
                DSBs råd om pledd, soveposer og dyner er et godt utgangspunkt
                for passiv varme. Utekos bygger videre med praktiske egenskaper
                som øker komfort, funksjonalitet og robusthet. Dette styrker
                evnen til å mestre aktuelle beredskapssituasjoner.
              </p>

              <ul className='space-y-3'>
                <ChecklistItem
                  title='Juster og fungér'
                  body='3-i-1-funksjonaliteten lar deg justere passformen etter behov, slik at skift av antrekk kan unngås.'
                />
                <ChecklistItem
                  title='Spar ressurser'
                  body='Du holder deg varm, tørr og funksjonell. Det bevarer både den sosiale varmen og den psykologiske tryggheten.'
                />
                <ChecklistItem
                  title='Bevar normaliteten'
                  body='En investering som gir trygghet og komfort i hverdagen, samtidig som den er klar til bruk når det virkelig gjelder.'
                />
              </ul>

              <p className='text-base text-article-white leading-relaxed font-medium mt-6 pt-6 border-t border-border'>
                Utekos er mer enn et allsidig koseprodukt. Det er et funksjonelt
                beredskapselement som dekker grunnleggende behov for varme og
                trygghet under uforutsette forhold. Kombinasjonen av praktisk
                funksjon, lav vekt og høy komfort oppgraderer egenberedskapen.
                Det er en investering i kroppens og sinnets robusthet når det
                virkelig gjelder, og for å forlenge gode stunder ute når alt er
                normalt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChecklistItem({
  title,
  body,
  accentClass = 'text-amber-800'
}: {
  title: string
  body: string
  accentClass?: string
}) {
  return (
    <li className='flex items-start'>
      <Check className='h-5 w-5 text-amber-800 mr-3 flex-shrink-0 mt-1' />
      <span className='text-article-white'>
        <span className={`block font-semibold ${accentClass}`}>{title}</span>
        <span className='block sm:mt-0.5'>{body}</span>
      </span>
    </li>
  )
}
