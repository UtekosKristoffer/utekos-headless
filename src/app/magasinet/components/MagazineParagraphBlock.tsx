import type { MagazineBlock } from '../types'

type MagazineParagraphBlockProps = {
  block: Extract<MagazineBlock, { type: 'paragraph' }>
}

export function MagazineParagraphBlock({ block }: MagazineParagraphBlockProps) {
  return (
    <p className='font-utekos-text text-lg leading-[1.65] tracking-tight text-maritime-darkest/82 sm:text-xl'>
      {block.text}
    </p>
  )
}
