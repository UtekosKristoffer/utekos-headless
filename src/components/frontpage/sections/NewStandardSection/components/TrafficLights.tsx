import { cn } from '@/lib/utils/className'

export const TrafficLights = ({
  variant = 'default'
}: {
  variant?: 'default' | 'colored'
}) => {
  const colors =
    variant === 'colored' ?
      ['bg-red-500/80', 'bg-blue-500/80', 'bg-green-500/80']
    : [
        'bg-sidebar-foreground',
        'bg-sidebar-foreground',
        'bg-sidebar-foreground'
      ]

  return (
    <div className='absolute top-3 left-3 z-20 flex gap-1.5'>
      {colors.map((color, i) => (
        <div key={i} className={cn('h-2 w-2 rounded-full', color)} />
      ))}
    </div>
  )
}
