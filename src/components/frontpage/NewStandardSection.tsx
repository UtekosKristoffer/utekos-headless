import { InfoCardStack } from '@/components/frontpage/InfoCardStack'
import { AnimatedChat } from '@/components/frontpage/AnimatedChat'
export function NewStandardSection() {
  return (
    <section className='mx-auto max-w-[95%] pt-12 md:max-w-7xl'>
      <div className='mx-auto'>
        <div className='overflow-hidden rounded-xl border border-neutral-800'>
          <div className='grid lg:grid-cols-2'>
            {/* Venstre kolonne med salgstekst OG de nye kortene */}
            <div className='flex flex-col justify-between bg-sidebar-foreground p-8 lg:p-12'>
              <div>
                <h2 className='text-3xl font-bold tracking-tight text-foreground'>
                  En opplevelse bygget på tillit
                </h2>
                <p className='mt-4 text-lg text-muted-foreground mb-2'>
                  Fra du besøker siden vår til du nyter kveldssolen i ditt
                  Utekos-plagg – vi er dedikerte til å levere en trygg og
                  førsteklasses opplevelse i alle ledd.
                </p>
              </div>
              <div className='mt-12 lg:mt-0'>
                <InfoCardStack />
              </div>
            </div>

            {/* Høyre kolonne med den animerte chatten */}
            <div className='relative min-h-[400px]'>
              <AnimatedChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
