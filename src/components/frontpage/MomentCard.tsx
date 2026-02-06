import { cn } from '@/lib/utils/className'
import { useInView } from '@/hooks/useInView'
import type { Moment } from '@/components/frontpage/utils/moments'

export function MomentCard({
  moment,
  index
}: {
  moment: Moment
  index: number
}) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const Icon = moment.icon

  return (
    <div
      ref={ref}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-700 ease-out hover:border-neutral-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={cn(
          'absolute -inset-x-0 top-0 h-[250px] opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40',
          'bg-gradient-to-b',
          moment.gradient
        )}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-700/50 bg-neutral-800/50 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:border-neutral-600'>
          <Icon
            className={cn(
              'h-6 w-6 text-neutral-200 transition-colors',
              moment.highlightColor
            )}
          />
        </div>

        <h3 className='mb-3 text-xl font-bold text-white tracking-wide'>
          {moment.title}
        </h3>

        <p className='text-base leading-relaxed text-neutral-400 font-light'>
          {moment.description}
        </p>
      </div>
    </div>
  )
}
