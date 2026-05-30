'use client'

import { cn } from '@/lib/utils/className'
import { useInView } from '@/hooks/useInView'
import type { Moment, MomentTheme } from '@/components/frontpage/utils/moments'

const momentThemeStyles: Record<
  MomentTheme,
  {
    wrapper: string
    glow: string
    iconWrap: string
    title: string
    desc: string
  }
> = {
  maritime: {
    wrapper:
      'border-white/30 bg-gradient-to-br from-bleached-mauve/95 to-bleached-mauve/80 shadow-[0_16px_40px_rgba(49,36,38,0.16)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] backdrop-blur-2xl',
    glow: 'from-dusted-peri/20 via-dusted-peri/5 to-transparent',
    iconWrap:
      'border-chocolate-plum/18 bg-gradient-to-br from-cloud-dancer/92 to-overcast/88 text-chocolate-plum shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]',
    title: 'text-havdyp',
    desc: 'text-havdyp/80'
  },
  plum: {
    wrapper:
      'border-white/10 bg-gradient-to-br from-chocolate-plum/95 to-chocolate-plum/80 shadow-[0_16px_40px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl',
    glow: 'from-soft-warm/20 via-soft-warm/5 to-transparent',
    iconWrap:
      'border-white/10 bg-gradient-to-br from-white/10 to-transparent text-soft-warm shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
    title: 'text-cloud-dancer',
    desc: 'text-cloud-dancer/80'
  },
  overcast: {
    wrapper:
      'border-white/40 bg-gradient-to-br from-overcast/95 to-overcast/80 shadow-[0_16px_40px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-2xl',
    glow: 'from-mountain-view/20 via-mountain-view/5 to-transparent',
    iconWrap:
      'border-white/80 bg-gradient-to-br from-ancient-water/90 to-ancient-water/40 text-havdyp shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]',
    title: 'text-havdyp',
    desc: 'text-havdyp/80'
  }
}

export function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const Icon = moment.icon
  const styles = momentThemeStyles[moment.theme]

  return (
    <div
      ref={ref}
      className={cn(
        'group relative h-full overflow-hidden rounded-[1.5rem] p-8 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-2xl',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        styles.wrapper
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={cn(
          'absolute -inset-x-0 top-0 h-[250px] opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-50 bg-gradient-to-b',
          styles.glow
        )}
        aria-hidden='true'
      />

      <div
        className='pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full'
        aria-hidden='true'
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='mb-6 flex items-center gap-4'>
          <div
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ease-out group-hover:scale-[1.1] group-hover:shadow-md',
              styles.iconWrap
            )}
          >
            <Icon aria-hidden='true' className='size-5 stroke-[1.5]' />
          </div>

          <h3 className={cn('animate-header-item', styles.title)}>{moment.title}</h3>
        </div>

        <p className={cn('animate-header-item text-maritime-darkest', styles.desc)}>{moment.description}</p>
      </div>
    </div>
  )
}
