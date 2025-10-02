'use client'

import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { comparisonData } from '../config'

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className='w-full overflow-x-auto'
    >
      <table className='w-full min-w-[700px] border-collapse text-left'>
        <thead>
          <tr>
            <th className='p-4 border-b border-neutral-800 font-semibold w-[35%]'>
              Egenskap
            </th>
            <th className='p-4 border-b border-neutral-800 font-semibold text-center'>
              Utekos Dun™
            </th>
            <th className='p-4 border-b border-neutral-800 font-semibold text-center'>
              Utekos Fiberdun™
            </th>
            <th className='p-4 border-b border-neutral-800 font-semibold text-center'>
              Utekos Mikrofiber™
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map(
            ({ feature, icon: Icon, dun, mikrofiber, fiberdun, iconColor }) => (
              <tr key={feature}>
                <td className='p-4 border-b border-neutral-800 flex items-center gap-3'>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <span>{feature}</span>
                </td>
                <td className='p-4 border-b border-neutral-800 text-center font-medium'>
                  <TableCellContent value={dun} />
                </td>
                <td className='p-4 border-b border-neutral-800 text-center font-medium'>
                  <TableCellContent value={fiberdun} />
                </td>
                <td className='p-4 border-b border-neutral-800 text-center font-medium'>
                  <TableCellContent value={mikrofiber} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
