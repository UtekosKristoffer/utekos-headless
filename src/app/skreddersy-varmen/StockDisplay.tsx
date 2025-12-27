import { Check, Clock } from 'lucide-react'

interface StockDisplayProps {
  count: number
  available: boolean
  theme?: 'light' | 'dark'
}

export function StockDisplay({
  count,
  available,
  theme = 'light'
}: StockDisplayProps) {
  const styles =
    theme === 'dark' ?
      {
        scarcity: 'bg-[#E07A5F]/20 text-[#E07A5F] border-[#E07A5F]/30',
        stock: 'bg-emerald-900/30 text-emerald-100 border-emerald-500/30',
        soldOut: 'bg-white/10 text-white/60 border-white/10'
      }
    : {
        scarcity: 'bg-[#E07A5F]/10 text-[#E07A5F] border-[#E07A5F]/20',
        stock: 'bg-emerald-50 text-emerald-800 border-emerald-100',
        soldOut: 'bg-stone-100 text-stone-500'
      }

  if (count === 0 || !available) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full w-fit border border-transparent ${styles.soldOut}`}
      >
        <Clock className='w-4 h-4' />
        <span className='text-sm font-medium'>Utsolgt</span>
      </div>
    )
  }

  if (count < 10) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${styles.scarcity}`}
      >
        <span className='relative flex h-2.5 w-2.5'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-75'></span>
          <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E07A5F]'></span>
        </span>
        <span className='text-sm font-semibold'>Kun {count} igjen</span>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${styles.stock}`}
    >
      <div
        className={
          theme === 'dark' ?
            'bg-emerald-400/20 p-1 rounded-full'
          : 'bg-emerald-500/20 p-1 rounded-full'
        }
      >
        <Check className='w-3 h-3' strokeWidth={3} />
      </div>
      <span className='text-sm font-medium'>På lager</span>
    </div>
  )
}
