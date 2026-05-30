import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineComparisonBlockProps = {
  block: Extract<MagazineBlock, { type: 'comparison' }>
}

export function MagazineComparisonBlock({ block }: MagazineComparisonBlockProps) {
  return (
    <section className='my-16'>
      <h2 className='text-balance font-google-sans text-4xl font-bold leading-[0.95]   text-maritime-darkest sm:text-5xl'>
        <MagazineInlineTitle text={block.title} />
      </h2>
      <div className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {block.columns.map(column => (
          <section
            key={column.title}
            className='rounded-lg border border-maritime-darkest/10 bg-cloud-dancer p-5'
          >
            <h3 className='font-google-sans text-2xl font-bold leading-[0.95]   text-maritime-darkest'>
              <MagazineInlineTitle text={column.title} />
            </h3>
            {column.text && (
              <p className='mt-3   text-base leading-[1.55]   text-maritime-darkest/74'>{column.text}</p>
            )}
            <ul className='mt-5 space-y-3'>
              {column.items.map(item => (
                <li key={item} className='flex gap-3   text-sm leading-[1.45]   text-maritime-darkest/80'>
                  <span className='mt-1 size-2 shrink-0 rounded-full bg-[var(--magazine-accent)]' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
