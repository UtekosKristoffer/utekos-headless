import Link from 'next/link'
import Image from 'next/image'
import { BadgeCheckIcon } from '@/components/animate-icons/icons/badge-check'
import { CompassIcon } from '@/components/animate-icons/icons/compass'
import BrandBadge from '@/components/BrandComponents/utils/BrandBadge'
import IntersportLogo from '@public/logo/Intersport_logo.svg'
import type { Route } from 'next'

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
          className='relative overflow-hidden rounded-3xl border border-chocolate-plum/20 bg-overcast shadow-[0_24px_80px_-56px_rgba(49,36,38,0.55)]'
        >
          <div className='pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-mountain-view/50 to-transparent' />

          <div className='flex flex-col items-center gap-8 px-6 py-10 text-center sm:px-10'>
            <div className='relative flex h-32 w-full items-center justify-center overflow-visible'>
              <div
                ref={logoBoxRef}
                className='relative z-10 flex h-16 min-w-48 items-center justify-center rounded-2xl border border-mountain-view/20 bg-cloud-dancer px-8 opacity-0 shadow-[0_16px_40px_-28px_rgba(49,36,38,0.65)] will-change-transform'
              >
                <Image
                  src={IntersportLogo}
                  alt='Intersport logo'
                  width={1024}
                  height={112}
                  className='max-w-[120px]'
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </div>
            </div>

            <div
              ref={contentRef}
              className='flex flex-col items-center gap-6 opacity-0'
            >
              <h2 className='text-balance text-3xl font-bold tracking-tight text-maritime-blue sm:text-4xl'>
                På plass hos Intersport Laksevåg!
              </h2>

              <p className='max-w-4xl text-balance text-lg leading-relaxed text-maritime-blue/90'>
                Nå kan du se, prøve og kjenne på vår splitter nye{' '}
                <Link
                  href={'/produkter/utekos-techdown' as Route}
                  className='group relative mx-1 inline-flex items-center justify-center rounded-md px-2 py-0.5 outline-none transition-transform hover:scale-[1.03] active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--chocolate-plum)] focus-visible:ring-offset-2 focus-visible:ring-offset-overcast'
                >
                  <span className='gsap-highlight absolute inset-0 -z-10 -skew-x-12 scale-x-0 rounded-md bg-gradient-to-r from-[var(--espresso)] via-[var(--plum-truffle)] to-[var(--delicioso)] blur-[3px] will-change-transform opacity-70 transition-opacity group-hover:opacity-100' />

                  <span className='gsap-highlight absolute inset-0 -z-10 -rotate-1 scale-x-0 rounded-lg border border-[var(--chocolate-plum)]/40 bg-gradient-to-br from-[var(--espresso)] via-[var(--raisin)] to-[var(--after-dark)] will-change-transform shadow-sm transition-all group-hover:shadow-md' />

                  <span className='relative z-10 inline-flex items-center gap-1.5 font-semibold text-cloud-dancer'>
                    <BadgeCheckIcon
                      size={16}
                      animateOnHover='check'
                      className='shrink-0 text-cloud-dancer'
                    />
                    Utekos TechDown™
                  </span>
                </Link>{' '}
                hos våre gode venner på Intersport Laksevåg. Ta turen innom for
                å bli en av de første som får oppleve den neste generasjonen av
                Utekos®!
              </p>

              <Link
                href={mapsUrl as Route}
                target='_blank'
                rel='noreferrer'
                className='group my-4 inline-flex rounded-full transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chocolate-plum focus-visible:ring-offset-2 focus-visible:ring-offset-overcast'
              >
                <BrandBadge
                  backgroundColor='var(--chocolate-plum)'
                  textColor='var(--cloud-dancer)'
                  className='cursor-pointer gap-2 border border-[var(--chocolate-plum)]/30 shadow-sm transition-shadow group-hover:shadow-md'
                >
                  <CompassIcon
                    size={16}
                    animateOnHover='default'
                    className='shrink-0 text-cloud-dancer'
                  />
                  <span>Vis vei til butikken</span>
                </BrandBadge>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
