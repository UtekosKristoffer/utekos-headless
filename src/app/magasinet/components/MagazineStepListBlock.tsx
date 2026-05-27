import type { MagazineBlock } from '../types'
import { MagazineInlineTitle } from './MagazineInlineTitle'

type MagazineStepListBlockProps = {
  block: Extract<MagazineBlock, { type: 'stepList' }>
}

export function MagazineStepListBlock({ block }: MagazineStepListBlockProps) {
  return (
    <section className='my-16'>
      {(block.title || block.intro) && (
        <header className='mb-8'>
          {block.title && (
            <h2 className='text-balance font-google-sans text-4xl font-bold leading-[0.95] tracking-tight text-maritime-darkest sm:text-5xl'>
              <MagazineInlineTitle text={block.title} />
            </h2>
          )}
          {block.intro && (
            <p className='mt-4 max-w-2xl font-utekos-text text-lg leading-[1.55] tracking-tight text-maritime-darkest/76'>
              {block.intro}
            </p>
          )}
        </header>
      )}
      <ol className='space-y-4'>
        {block.steps.map((step, index) => (
          <li
            key={step.title}
            className='grid gap-4 rounded-lg border border-maritime-darkest/10 bg-cloud-dancer p-5 sm:grid-cols-[3rem_1fr]'
          >
            <div className='flex size-11 items-center justify-center rounded-lg bg-maritime-darkest font-google-sans text-lg font-bold leading-none text-cloud-dancer'>
              {index + 1}
            </div>
            <div>
              <h3 className='font-google-sans text-2xl font-bold leading-[0.95] tracking-tight text-maritime-darkest'>
                <MagazineInlineTitle text={step.title} />
              </h3>
              <p className='mt-3 font-utekos-text text-base leading-[1.55] tracking-tight text-maritime-darkest/76'>
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
