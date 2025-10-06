import {
  Check,
  Minus,
  Thermometer,
  Feather,
  Droplets,
  Wind,
  Package,
  WashingMachine
} from 'lucide-react'
import { comparisonData } from '../config'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

const iconMap = {
  'thermometer': Thermometer,
  'feather': Feather,
  'droplets': Droplets,
  'wind': Wind,
  'package': Package,
  'washing-machine': WashingMachine
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={className} /> : null
}

// Hjelpekomponent for å rendre innholdet i en celle, for renere kode
function TableCellContent({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ?
        <Check className='mx-auto h-5 w-5 text-green-500' />
      : <Minus className='mx-auto h-5 w-5 text-neutral-600' />
  }

  const isHighlighted = [
    'Uovertruffen',
    'Overlegen',
    'Svært enkel',
    'Ultralett',
    'Utmerket'
  ].includes(value)

  return (
    <span
      className={
        isHighlighted ? 'text-primary-foreground' : 'text-foreground/90'
      }
    >
      {value}
    </span>
  )
}

export function ComparisonTable() {
  return (
    <AnimatedBlock
      className='will-animate-fade-in-up w-full overflow-x-auto'
      threshold={0.3}
    >
      <table className='w-full min-w-[700px] border-collapse text-left'>
        <thead>
          <tr>
            <th className='w-[35%] border-b border-neutral-800 p-4 font-semibold'>
              Egenskap
            </th>
            <th className='border-b border-neutral-800 p-4 text-center font-semibold'>
              Utekos Dun™
            </th>
            <th className='border-b border-neutral-800 p-4 text-center font-semibold'>
              Utekos Fiberdun™
            </th>
            <th className='border-b border-neutral-800 p-4 text-center font-semibold'>
              Utekos Mikrofiber™
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map(
            ({ feature, icon, dun, mikrofiber, fiberdun, iconColor }) => (
              <tr key={feature}>
                <td className='flex items-center gap-3 border-b border-neutral-800 p-4'>
                  <IconRenderer
                    name={icon as IconName}
                    className={cn('h-5 w-5', iconColor)}
                  />
                  <span>{feature}</span>
                </td>
                <td className='border-b border-neutral-800 p-4 text-center font-medium'>
                  <TableCellContent value={dun} />
                </td>
                <td className='border-b border-neutral-800 p-4 text-center font-medium'>
                  <TableCellContent value={fiberdun} />
                </td>
                <td className='border-b border-neutral-800 p-4 text-center font-medium'>
                  <TableCellContent value={mikrofiber} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </AnimatedBlock>
  )
}
