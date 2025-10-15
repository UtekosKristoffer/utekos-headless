import { NewsletterForm } from '@/components/form/NewsLetterForm'

export function MagazineNewsletterSignup() {
  return (
    <section className='border-t border-neutral-800 bg-sidebar-foreground'>
      <div className='container mx-auto max-w-2xl px-4 py-16 text-center sm:py-24'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Likte du det du leste?
        </h2>
        <p className='mx-auto mt-4 max-w-xl text-lg text-muted-foreground'>
          Bli den første som får vite om nye artikler, tips og produktnyheter.
          Meld deg på Utekos Magasinet og få inspirasjonen rett i innboksen.
        </p>
        <div className='mx-auto mt-8 max-w-sm'>
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
