import { type LucideIcon } from 'lucide-react'
interface AnatomyLayerData {
  id: number
  layerLabel: string
  title: string
  subtitle: string
  description: string
  highlight: string
  icon: LucideIcon
  colors: {
    text: string
    subText: string
    icon: string
    border: string
    shadow: string
    bgGradient: string
  }
}
interface AnatomyCardProps {
  data: AnatomyLayerData
  index: number
  total: number
}

export function AnatomyCard({ data, index, total }: AnatomyCardProps) {
  const Icon = data.icon
  const zIndex = total - index

  return (
    <div
      className={`tech-card absolute inset-0 rounded-3xl border border-slate-700 shadow-2xl flex items-center justify-center backface-hidden will-change-transform ${data.colors.bgGradient}`}
      style={{ zIndex }}
    >
      <div className='absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]' />

      <div className='relative z-10 text-center p-4'>
        <Icon
          className={`w-20 h-20 mx-auto mb-4 drop-shadow-lg ${data.colors.icon}`}
        />

        <div
          className={`text-xs font-mono mb-2 border-b pb-1 w-full opacity-50 ${data.colors.text} ${data.colors.border}`}
        >
          {data.layerLabel}
        </div>

        <div className={`text-2xl font-bold ${data.colors.text}`}>
          {data.title}
        </div>

        <div className={`text-sm mt-1 ${data.colors.subText}`}>
          {data.subtitle}
        </div>
      </div>
    </div>
  )
}
