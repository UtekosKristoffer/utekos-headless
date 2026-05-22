import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SocialProofCardProps {
  readonly title: string
  readonly Icon: LucideIcon
  readonly iconWrapperClass: string
  readonly iconColorClass: string
  readonly hoverBorderClass: string
  readonly cardClass?: string
  readonly titleClass?: string
  readonly shineClass?: string
  readonly children: ReactNode
}

export function SocialProofCard({
  title,
  Icon,
  iconWrapperClass,
  iconColorClass,
  hoverBorderClass,
  cardClass,
  titleClass,
  shineClass,
  children
}: SocialProofCardProps) {
  const surfaceClass =
    cardClass ?? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'

  const shineStyle = shineClass ?? 'via-white/10'

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-colors duration-500 ${hoverBorderClass} ${surfaceClass}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent ${shineStyle} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none`}
        aria-hidden='true'
      />

      <div className='relative flex flex-col items-center text-center'>
        <div
          className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${iconWrapperClass}`}
        >
          <Icon className={`size-6 ${iconColorClass}`} />
        </div>
        <p
          className={`text-lg font-bold tracking-tight ${titleClass ?? 'text-white'}`}
        >
          {title}
        </p>
        {children}
      </div>
    </article>
  )
}
