// Path: src/app/handlehjelp/funksjonalitet/components/FunctionalityPageHero.tsx

export function FunctionalityPageHero() {
  return (
    <section className='container mx-auto px-4 text-center'>
      <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
        Ett plagg. <br className='hidden sm:block' />
        <span className='bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-800 bg-clip-text text-transparent'>
          Tre opplevelser.
        </span>
      </h1>
      <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-article-white md:text-xl'>
        Det unike med Utekos er friheten til å velge. Ved hjelp av smarte snorstrammere kan du lynraskt endre
        plagget fra en varmende kokong til en elegant parkas. Vi kaller det{' '}
        <strong>3-i-1 funksjonalitet</strong>.
      </p>
    </section>
  )
}
