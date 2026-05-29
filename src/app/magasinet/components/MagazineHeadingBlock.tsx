import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineHeadingBlockProps = {
  block: Extract<MagazineBlock, { type: 'heading' }>
}

export function MagazineHeadingBlock({ block }: MagazineHeadingBlockProps) {
  if (block.level === 3) {
    return (
      <div className='pt-4'>
        {block.eyebrow && (
          <p className='mb-3 font-utekos-text text-sm font-semibold leading-[1.4] tracking-tight text-havdyp'>
            {block.eyebrow}
          </p>
        )}
        <h3 className='text-balance font-google-sans text-3xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-4xl'>
          <MagazineInlineTitle text={block.text} />
        </h3>
      </div>
    )
  }

  return (
    <div className='pt-6'>
      {block.eyebrow && (
        <p className='mb-3 font-utekos-text text-sm font-semibold leading-[1.4] tracking-tight text-havdyp'>
          {block.eyebrow}
        </p>
      )}
      <h2 className='text-balance font-google-sans text-4xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-5xl'>
        <MagazineInlineTitle text={block.text} />
      </h2>
    </div>
  )
}
