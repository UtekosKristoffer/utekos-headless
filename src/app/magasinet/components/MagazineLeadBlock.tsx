import type { MagazineBlock } from '../types'

type MagazineLeadBlockProps = {
  block: Extract<MagazineBlock, { type: 'lead' }>
}

export function MagazineLeadBlock({ block }: MagazineLeadBlockProps) {
  return (
    <p className='text-balance font-utekos-text text-2xl font-medium leading-[1.32] tracking-tight text-maritime-darkest sm:text-3xl'>
      {block.text}
    </p>
  )
}
