// Path: src/app/handlehjelp/sammenlign-modeller/components/ComparisonTable.tsx
import { comparisonRows, modelRecommendations } from '../utils/comparisonData'
import { TableCellContent } from './TableCellContent'

export function ComparisonTable() {
  return (
    <div className='max-w-full overflow-x-auto border border-maritime-blue/14 bg-cloud-dancer [contain:paint]'>
      <table className='w-full min-w-[880px] border-collapse text-left'>
        <caption className='sr-only'>
          Sammenligning av Utekos Dun, Utekos Mikrofiber og Utekos TechDown
        </caption>
        <thead>
          <tr className='bg-maritime-blue text-cloud-dancer'>
            <th
              scope='col'
              className='w-[20%] p-5 font-google-sans text-base font-bold tracking-[-0.01em]'
            >
              Egenskap
            </th>
            {modelRecommendations.map(model => (
              <th
                key={model.key}
                scope='col'
                className='w-[26.6%] p-5 text-center font-google-sans text-base font-bold tracking-[-0.01em]'
              >
                {model.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map(row => (
            <tr key={row.feature} className='border-b border-maritime-blue/12'>
              <th
                scope='row'
                className='p-5 align-top font-google-sans text-base font-bold leading-[1.05] tracking-[-0.01em] text-maritime-blue'
              >
                <span>{row.feature}</span>
                <span className='mt-2 block font-utekos-text text-xs font-medium leading-[1.35] tracking-tight text-maritime-blue/62'>
                  {row.shortAnswer}
                </span>
              </th>
              {modelRecommendations.map(model => (
                <td key={model.key} className='p-5 text-center align-top'>
                  <TableCellContent value={row.values[model.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
