// Path: src/app/magasinet/components/MagazineOverviewHero.tsx

export function MagazineOverviewHero() {
  return (
    <section className='relative overflow-hidden rounded-[2rem] border border-maritime-darkest/10 bg-maritime-darkest px-6 py-14 text-cloud-dancer shadow-[0_28px_90px_rgba(20,24,22,0.18)] sm:px-10 sm:py-18 lg:px-14 lg:py-20'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]' />

      <div className='relative max-w-4xl'>
        <p className='mb-5 inline-flex w-fit rounded-full bg-cloud-dancer/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cloud-dancer/80 ring-1 ring-cloud-dancer/15'>
          Utekos Magasinet
        </p>

        <h1 className='text-balance font-google-sans text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl'>
          Inspirasjon for gode stunder ute
        </h1>

        <p className='mt-6 max-w-3xl font-utekos-text text-lg leading-[1.6] text-cloud-dancer/82 sm:text-xl'>
          Guider, råd og historier for deg som vil forlenge sesongen på hytta, terrassen, båten eller i
          bobilen — med varme, komfort og mer tid ute.
        </p>
      </div>
    </section>
  )
}
