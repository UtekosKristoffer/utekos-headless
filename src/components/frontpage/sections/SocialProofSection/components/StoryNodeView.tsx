import type { LucideIcon } from 'lucide-react'

interface StoryNodeViewProps {
  icon: LucideIcon
  label: string
  description: string
  iconColor: string
  glowColor: string
}

export function StoryNodeView({
  icon: Icon,
  label,
  description,
  iconColor,
  glowColor
}: StoryNodeViewProps) {
  return (
    <div className='group relative mx-auto w-full overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600'>
      <div
        className='absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-40'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex items-start gap-4'>
        <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-500'>
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
        <div className='flex-1'>
          <p className='mb-2 text-lg font-semibold text-foreground'>{label}</p>
          <p className='leading-relaxed text-muted-foreground'>{description}</p>
        </div>
      </div>

      <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-xl opacity-20 blur-sm'
          style={{ background: glowColor }}
        />
      </div>
    </div>
  )
}
