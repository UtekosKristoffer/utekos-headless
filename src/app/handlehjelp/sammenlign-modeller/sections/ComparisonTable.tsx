import {
  Check,
  Minus,
  Thermometer,
  Feather,
  Droplets,
  WashingMachine,
  Star,
  Layers,
  Shield
} from 'lucide-react'
import { comparisonData } from '../config'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { cn } from '@/lib/utils/className'

const iconMap = {
  'star': Star,
  'thermometer': Thermometer,
  'droplets': Droplets,
  'feather': Feather,
  'washing-machine': WashingMachine,
  'layers': Layers,
  'shield': Shield,
  'check': Check
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

// ENDRINGEN ER I DENNE KOMPONENTEN:
function TableCellContent({ value }: { value: string | boolean }) {
  // Logikk for boolean (sjekkboks/minus) er beholdt
  if (typeof value === 'boolean') {
    return value ?
        <Check className='mx-auto h-5 w-5 text-green-500' />
      : <Minus className='mx-auto h-5 w-5 text-neutral-600' />
  }

  return (
    <span className='text-sm leading-relaxed text-muted-foreground'>
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
      <table className='w-full min-w-[800px] border-collapse text-left'>
        <thead>
          <tr className='border-b border-neutral-800'>
            <th className='w-[25%] p-4 font-semibold'>Egenskap</th>
            <th className='w-[25%] p-4 text-center font-semibold'>
              Utekos Dun™
            </th>
            <th className='w-[25%] p-4 text-center font-semibold'>
              Utekos Mikrofiber™
            </th>
            <th className='w-[25%] p-4 text-center font-semibold'>
              Utekos TechDown™
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map(
            ({ feature, icon, dun, mikrofiber, techdown, iconColor }) => (
              <tr key={feature} className='border-b border-neutral-800'>
                <td className='p-4 align-top'>
                  <div className='flex items-center gap-3'>
                    <IconRenderer
                      name={icon as IconName}
                      className={cn('h-5 w-5 flex-shrink-0', iconColor)}
                    />
                    <span className='font-semibold'>{feature}</span>
                  </div>
                </td>
                <td className='p-4 text-center align-top'>
                  <TableCellContent value={dun} />
                </td>
                <td className='p-4 text-center align-top'>
                  <TableCellContent value={mikrofiber} />
                </td>
                <td className='p-4 text-center align-top'>
                  <TableCellContent value={techdown} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </AnimatedBlock>
  )
}
