import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/className'

interface StoryNodeViewProps {
  icon: LucideIcon
  label: string
  description: string
  tone: 'before' | 'after'
}

const toneStyles = {
  before: {
    card: 'border-white/10 bg-gradient-to-br from-maritime-blue/95 to-maritime-blue/80 shadow-[0_16px_40px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-[1.2]',
    iconWrap:
      'border-white/10 bg-gradient-to-br from-white/10 to-transparent text-cloud-dancer shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]',
    label: 'text-cloud-dancer',
    description: 'text-cloud-dancer/80'
  },
  after: {
    card: 'border-white/60 bg-gradient-to-br from-overcast/95 to-overcast/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-2xl backdrop-saturate-[1.2]',
    iconWrap:
      'border-white/80 bg-gradient-to-br from-ancient-water/90 to-ancient-water/40 text-maritime-blue shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]',
    label: 'text-maritime-blue',
    description: 'text-mountain-view'
  }
} as const

export function StoryNodeView({
  icon: Icon,
  label,
  description,
  tone
}: StoryNodeViewProps) {
  const styles = toneStyles[tone]

  return (
    <article
      className={cn(
        'group relative z-10 mx-auto w-full overflow-hidden rounded-[1.25rem] p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-highlight focus-within:ring-offset-2 focus-within:ring-offset-transparent',
        styles.card
      )}
    >
      {/* Premium shine overlay on hover */}
      <div
        className='pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full'
        aria-hidden='true'
      />

      <div className='relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start'>
        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:shadow-md',
            styles.iconWrap
          )}
        >
          <Icon aria-hidden='true' className='size-6 stroke-[1.5]' />
        </div>

        <div className='min-w-0 flex-1 space-y-2.5 pt-1'>
          <h3
            className={cn(
              'text-[1.125rem] font-medium leading-[0.9] tracking-[-0.01em]',
              styles.label
            )}
          >
            {label}
          </h3>

          <p
            className={cn(
              'text-[1rem] font-normal leading-[1.45] tracking-[-0.02em]',
              styles.description
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
