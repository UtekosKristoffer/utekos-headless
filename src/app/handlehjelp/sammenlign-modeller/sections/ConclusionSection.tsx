import { Button } from '@/components/ui/button'
import Link from 'next/link'
export function ConclusionSection() {
  return (
    <section className='py-24 bg-sidebar-foreground'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Fortsatt usikker?
        </h2>
        <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
          Vår anbefaling: For maksimal allsidighet og bekymringsfri bruk i all
          slags vær, velg Mikrofiber. For den ultimate luksusfølelsen på kalde,
          tørre dager, velg Dun.
        </p>
        <div className='mt-8 flex flex-wrap gap-4 justify-center'>
          <Button asChild size='lg'>
            <Link href='/produkter'>Se hele kolleksjonen</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/kontaktskjema'>Kontakt oss for råd</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
