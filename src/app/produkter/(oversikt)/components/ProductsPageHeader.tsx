import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

const STAR_POSITIONS = [
  { top: 8, left: 12 },
  { top: 18, left: 78 },
  { top: 26, left: 34 },
  { top: 39, left: 91 },
  { top: 47, left: 56 },
  { top: 58, left: 21 }
] as const

export function ProductsPageHeader() {
  return (
    <header
      className='relative mb-12 w-full rounded-3xl overflow-hidden bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--ancient-water)_16%,transparent),transparent_42%),linear-gradient(180deg,color-mix(in_oklab,var(--havdyp)_90%,black)_0%,color-mix(in_oklab,var(--background)_94%,black)_100%)] pt-12 pb-16'
    >
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='gsap-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(245,243,239,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,243,239,0.045)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

        <div className='absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 opacity-25 mix-blend-screen'>
          <div
            className='gsap-spotlight size-full bg-linear-to-b from-ancient-water via-very-peri/18 to-transparent blur-[120px] will-change-transform'
            style={{
              transform: 'translate(0, 0)'
            }}
          />
        </div>

        <div className='absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cloud-dancer/30 to-transparent' />

        {STAR_POSITIONS.map((position, i) => (
          <div
            key={i}
            className='gsap-star absolute h-1 w-1 animate-pulse rounded-full bg-cloud-dancer opacity-16'
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
              boxShadow: '0 0 10px rgba(245,243,239,0.42)'
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 text-center relative z-10'>
        <div className='gsap-badge mb-8 inline-flex items-center justify-center'>
          <BrandBadge
            backgroundColor='var(--havdyp)'
            textColor='var(--cloud-dancer)'
            className='group relative border border-cloud-dancer/18 px-5 py-2.5 shadow-[0_14px_32px_-24px_rgba(8,10,24,0.62)] sm:px-6 sm:py-3'
          >
            <span className='absolute inset-0 overflow-hidden rounded-full'>
              <span className='absolute top-0 -left-[100%] size-full bg-linear-to-r from-transparent via-cloud-dancer/25 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]' />
            </span>
            <UtekosWordmark
              className='relative z-10 h-auto w-[98px] sm:w-[112px]'
              style={{ color: 'var(--cloud-dancer)' }}
            />
          </BrandBadge>
        </div>

        <h1 className='perspective-1000 mx-auto max-w-5xl text-3xl font-bold   font-google-sans text-foreground sm:text-5xl md:text-7xl'>
          <span className='block overflow-hidden'>
            <span className='gsap-title-line block'>Kolleksjonen for</span>
          </span>
          <span className='block overflow-hidden pt-2'>
            <span className='gsap-title-line block   font-google-sans  bg-linear-to-r from-ancient-water via-cloud-dancer to-overcast bg-clip-text py-1 leading-tight text-transparent'>
              kompromissløs komfort
            </span>
          </span>
        </h1>

        <p className='gsap-desc mx-auto     mt-8 max-w-2xl text-lg leading-[1.5] text-foreground/95 md:text-xl'>
          Vi har{' '}
          <span className='relative inline-block font-medium      text-foreground'>
            redefinert
            <span className='gsap-underline absolute bottom-0 left-0 h-[2px] w-full origin-left bg-primary    ' />
          </span>{' '}
          utekosen gjennom teknologi og funksjonalitet.
          <br className='hidden md:block' />
          Utforsk vår kolleksjon og{' '}
          <span className='relative inline-block px-1'>
            <span className='gsap-highlight absolute inset-0 origin-left rounded bg-very-peri/24 -skew-x-6' />
            <span className='relative z-10 font-medium text-ancient-water'>skreddersy</span>
          </span>{' '}
          din egen varme.
        </p>
      </div>

      <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent' />
    </header>
  )
}
