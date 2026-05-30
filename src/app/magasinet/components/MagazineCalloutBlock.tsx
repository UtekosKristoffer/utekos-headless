import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineCalloutBlockProps = {
  block: Extract<MagazineBlock, { type: 'callout' }>
}

const calloutClassByTone = {
  quiet: 'border-maritime-darkest/12 bg-cloud-dancer text-maritime-darkest',
  dark: 'border-cloud-dancer/12 bg-maritime-darkest text-cloud-dancer',
  accent: 'border-maritime-darkest/14 bg-[var(--magazine-accent)] text-maritime-darkest',
  commerce: 'border-primary/30 bg-primary text-maritime-darkest'
} satisfies Record<Extract<MagazineBlock, { type: 'callout' }>['tone'], string>

export function MagazineCalloutBlock({ block }: MagazineCalloutBlockProps) {
  return (
    <aside className={`my-14 rounded-lg border p-6 sm:p-8 ${calloutClassByTone[block.tone]}`}>
      {block.title && (
        <h3 className='font-google-sans text-2xl font-bold leading-[0.95]   sm:text-3xl'>
          <MagazineInlineTitle text={block.title} />
        </h3>
      )}
      <p className='mt-4   text-lg leading-[1.55]   opacity-90'>{block.text}</p>
    </aside>
  )
}
