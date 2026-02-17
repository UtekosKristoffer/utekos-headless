import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SocialProofCardProps {
  readonly title: string
  readonly Icon: LucideIcon
  readonly iconWrapperClass: string
  readonly iconColorClass: string
  readonly hoverBorderClass: string
  readonly children: ReactNode
}

export function SocialProofCard({
  title,
  Icon,
  iconWrapperClass,
  iconColorClass,
  hoverBorderClass,
  children
}: SocialProofCardProps) {
  return (
    <div
      className={`gsap-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.04] ${hoverBorderClass}`}
    >
      <div className='gsap-shine absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none' />

      <div className='relative flex flex-col items-center text-center'>
        <div
          className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${iconWrapperClass}`}
        >
          <Icon className={`gsap-icon h-6 w-6 ${iconColorClass}`} />
        </div>
        <p className='text-lg font-bold text-white tracking-tight'>{title}</p>
        {children}
      </div>
    </div>
  )
}
