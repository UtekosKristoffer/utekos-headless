import { NewsletterForm } from '@/components/form/NewsLetterForm'

export function NewsLetter() {
  return (
    <>
      <div className='mt-12 border-t border-neutral-800 pt-12'>
        <div className='mx-auto max-w-lg text-center'>
          <h3 className='font-semibold text-lg text-foreground'>
            Bli en del av Utekos-familien
          </h3>
          <p className='text-muted-foreground text-sm mt-1 mb-4'>
            Motta inspirasjon, nyheter og eksklusive tilbud rett i innboksen
            din.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </>
  )
}
