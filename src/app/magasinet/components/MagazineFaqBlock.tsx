import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineFaqBlockProps = {
  block: Extract<MagazineBlock, { type: 'faq' }>
}

export function MagazineFaqBlock({ block }: MagazineFaqBlockProps) {
  return (
    <section className='my-16'>
      {block.title && (
        <h2 className='text-balance font-google-sans text-4xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-5xl'>
          <MagazineInlineTitle text={block.title} />
        </h2>
      )}
      <dl className='mt-8 space-y-4'>
        {block.items.map(item => (
          <div
            key={item.question}
            className='rounded-lg border border-maritime-darkest/10 bg-cloud-dancer p-5'
          >
            <dt className='font-google-sans text-xl font-bold leading-[1.05] tracking-tight text-maritime-darkest'>
              {item.question}
            </dt>
            <dd className='mt-3 font-utekos-text text-base leading-[1.55] tracking-tight text-maritime-darkest/76'>
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
