import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import type { Route } from 'next' // <-- Import Route type

interface NewProductInStoreNoticeViewProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  logoBoxRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  mapsUrl: string
}

export function NewProductInStoreNoticeView({
  containerRef,
  logoBoxRef,
  contentRef,
  mapsUrl
}: NewProductInStoreNoticeViewProps) {
  return (
    <section className='mt-24 w-full py-12'>
      <div className='container mx-auto max-w-6xl px-4 md:max-w-7xl'>
        <div
          ref={containerRef}
          className='relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/80 p-10 shadow-2xl'
        >
          {/* Background Glow */}
          <div
            className='pointer-events-none absolute left-1/2 top-0 -z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px]'
            style={{
              background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
            }}
          />

          <div className='flex flex-col items-center gap-8 text-center'>
            <div className='relative flex h-32 w-full items-center justify-center overflow-visible'>
              {/* Particles Container */}
              <div className='absolute left-1/2 top-1/2 z-0 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`smoke-${i}`}
                    className={`smoke-particle absolute h-20 w-20 rounded-full blur-xl ${
                      i % 2 === 0 ? 'bg-neutral-200/40' : 'bg-sky-200/30'
                    }`}
                    style={{ left: i * 5, top: i * 2 }}
                  />
                ))}

                {[...Array(8)].map((_, i) => (
                  <div
                    key={`spark-${i}`}
                    className={`spark-particle absolute h-1 w-1 rounded-full blur-[1px] ${
                      i % 2 === 0 ? 'bg-amber-300' : 'bg-orange-400'
                    }`}
                    style={{ left: i * 2, top: i * 2 }}
                  />
                ))}
              </div>

              {/* Logo Box */}
              <div
                ref={logoBoxRef}
                className='relative z-10 flex h-16 items-center justify-center rounded-2xl border-2 border-white/90 bg-white px-8 shadow-[0_0_30px_rgba(255,255,255,0.2)] opacity-0 will-change-transform'
              >
                <Image
                  src={IntersportLogo}
                  alt='Intersport logo'
                  width={120}
                  height={34}
                  className='h-auto w-full max-w-[120px]'
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              className='flex flex-col items-center gap-6 opacity-0'
            >
              <h2 className='text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                På plass hos Intersport Laksevåg!
              </h2>

              <p className='max-w-4xl text-balance text-lg leading-relaxed text-neutral-300'>
                Nå kan du se, prøve og kjenne på vår splitter nye{' '}
                <strong className='text-white'>Utekos TechDown™</strong> hos
                våre gode venner på Intersport Laksevåg. Ta turen innom for å
                bli en av de første som får oppleve den neste generasjonen av
                Utekos®!
              </p>

              <Button
                asChild
                size='lg'
                className='group mt-4 h-12 rounded-full px-8 text-base'
              >
                {/* FIX: Caster string til Route for å tilfredsstille Typed Routes */}
                <Link href={mapsUrl as Route} target='_blank'>
                  Vis vei til butikken
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
