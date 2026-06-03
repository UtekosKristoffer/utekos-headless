// Path: src/app/handlehjelp/funksjonalitet/components/FunctionalityPageThreeModesSection.tsx
import { Coffee, Maximize2, Move } from 'lucide-react'

export function FunctionalityPageThreeModesSection() {
  return (
    <section className='container mx-auto mt-20 px-4'>
      <div className='grid gap-8 md:grid-cols-3'>
        {/* MODUS 1: FULLENGDE */}
        <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
          <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'>
            <Maximize2 className='h-6 w-6' />
          </div>
          <h3 className='mb-3 text-xl font-bold'>1. Fullengdemodus</h3>
          <p className='mb-4 font-bold text-xl md:text-2xl text-foreground pb-2'>For maksimal varme og ro</p>
          <p className='text-foreground font-utekos-text! mt-2 tracking-wide  md:text-xl! leading-text-paragraph'>
            Dette er utgangspunktet for selve utekosen. Her henger plagget i sin fulle lengde og fungerer som
            en isolerende kokong. Perfekt når du sitter i solveggen, ligger i hengekøyen eller nyter lange
            kvelder på terrassen. Her er fokuset total avslapning og maksimal varmebevaring.
          </p>
        </div>

        {/* MODUS 2: OPPJUSTERT */}
        <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
          <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'>
            <Coffee className='h-6 w-6' />
          </div>
          <h3 className='mb-3 text-xl font-bold'>2. Oppjustert modus</h3>
          <p className='mb-4 text-sm font-medium text-orange-700 dark:text-orange-400'>
            For raske ærend og innendørs bruk
          </p>
          <p className='text-muted-foreground'>
            Skal du en rask tur på kjøkkenet, hente mer kaffe eller et ærend på toalettet? Ved å stramme
            snoren i livet kan du raskt heise opp lengden. Dette gir deg umiddelbar mobilitet uten at plagget
            subber i bakken. Du beveger deg trygt og snublegirtt, uten å måtte ta av deg varmen.
          </p>
        </div>

        {/* MODUS 3: PARKAS */}
        <div className='group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 p-8 transition-all hover:border-sky-200 hover:shadow-lg dark:border-white/10 dark:bg-white/5'>
          <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'>
            <Move className='h-6 w-6' />
          </div>
          <h3 className='mb-3 text-xl font-bold'>3. Parkasmodus</h3>
          <p className='mb-4 text-sm font-medium text-green-700 dark:text-green-400'>
            For turer og aktiv eleganse
          </p>
          <p className='text-muted-foreground'>
            Skal du bevege deg over lengre avstander, gå tur med hunden eller slå av en prat med naboen? Ved å
            brette nedre del av plagget innunder deg og stramme til i livet, forvandles Utekos til en stilig
            parkas. Dette sikrer full bevegelsesfrihet og et elegant utseende, samtidig som du beholder den
            gode varmen.
          </p>
        </div>
      </div>
    </section>
  )
}
