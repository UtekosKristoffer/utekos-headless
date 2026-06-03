import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

type MagazineOverviewHeroProps = {
  articleCount: number
}

export function MagazineOverviewHero({ articleCount }: MagazineOverviewHeroProps) {
  return (
    <section className='bg-havdyp py-16 text-foreground sm:py-24'>
      <div className='container mx-auto px-4'>
        <div className='max-w-5xl'>
          <BrandBadge
            backgroundColor='var(--ancient-water)'
            textColor='var(--background)'
            className='gap-2 border border-cloud-dancer/12 px-5 py-2 text-sm font-semibold leading-[1.35]  '
          >
            <UtekosWordmark className='h-4 w-auto' />
            <span>Magasinet</span>
          </BrandBadge>
          <h1 className='mt-7 max-w-4xl text-balance font-google-sans text-5xl font-bold leading-[0.9]   sm:text-6xl lg:text-7xl'>
            Inspirasjon for gode stunder ute
          </h1>
          <p className='mt-6 max-w-3xl   text-xl   text-foreground/86 sm:text-2xl'>
            Guider, råd og historier for deg som vil forlenge sesongen på hytten, terrassen, båten eller i
            bobilen med varme, komfort og mer tid ute.
          </p>
          <p className='mt-8   text-sm leading-text-paragraph   text-foreground/68'>
            {articleCount} publiserte artikler
          </p>
        </div>
      </div>
    </section>
  )
}
