import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBlock } from '@/components/AnimatedBlock'
import { Coffee, HeartHandshake, Moon } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { UseCase } from '../types'

export const useCasesData: UseCase[] = [
  {
    icon: Coffee,
    time: 'Morgen',
    title: 'Kaffe på en kald terrasse',
    description:
      'Nyt soloppgangen og den første kaffekoppen utendørs, varm og komfortabel.',
    temperature: '2-10°C',
    color: 'var(--ancient-water)',
    iconColor: 'text-maritime-darkest'
  },
  {
    icon: Moon,
    time: 'Kveld',
    title: 'Stjernekikking uten å fryse',
    description:
      'Forleng de sosiale kveldene rundt bålpannen eller under en klar stjernehimmel.',
    temperature: '4-12°C',
    color: 'var(--bleached-mauve)',
    iconColor: 'text-bleached-mauve'
  },
  {
    icon: HeartHandshake,
    time: 'Ankomst',
    title: 'Velkommen til varmen',
    description:
      'Perfekt ved ankomst til en kald hytte. Få varmen umiddelbart mens du fyrer i peisen.',
    temperature: 'Alle temperaturer',
    color: 'var(--mountain-view)',
    iconColor: 'text-mountain-view'
  }
]

export function UseCasesGrid({ useCases }: { useCases: UseCase[] }) {
  return (
    <section id='bruksomrader' className='bg-overcast py-24'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='text-fluid-display text-maritime-darkest font-bold tracking-normal'>
            Hyttekos fra morgen til kveld
          </h2>
          <p className='mt-4 text-lg text-maritime-darkest'>
            Uansett tid på døgnet, er Utekos med på å skape de perfekte
            øyeblikkene.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {useCases.map((useCase, useCaseIndex) => (
            <AnimatedBlock
              key={useCase.title}
              className='will-animate-fade-in-up'
              delay={`${useCaseIndex * 0.1}s`}
              threshold={0.2}
            >
              <Card
                className='@container group/card relative isolate overflow-hidden rounded-[1.5rem] border border-maritime-darkest/14 bg-[var(--use-case-accent)] py-0 text-[var(--use-case-text)] shadow-[0_28px_72px_-48px_rgba(10,16,32,0.72)] transition-all duration-500 hover:-translate-y-1 hover:border-maritime-darkest/22 hover:shadow-[0_34px_86px_-52px_rgba(10,16,32,0.82)]'
                style={
                  {
                    '--use-case-accent': useCase.color,
                    '--use-case-text':
                      useCaseIndex === 2 ?
                        'var(--cloud-dancer)'
                      : 'var(--maritime-darkest)',
                    '--use-case-muted':
                      useCaseIndex === 2 ?
                        'color-mix(in oklab, var(--cloud-dancer) 82%, transparent)'
                      : 'color-mix(in oklab, var(--maritime-darkest) 78%, transparent)',
                    '--use-case-soft':
                      useCaseIndex === 2 ?
                        'color-mix(in oklab, var(--cloud-dancer) 24%, transparent)'
                      : 'color-mix(in oklab, var(--cloud-dancer) 34%, transparent)',
                    '--use-case-border':
                      useCaseIndex === 2 ?
                        'color-mix(in oklab, var(--cloud-dancer) 24%, transparent)'
                      : 'color-mix(in oklab, var(--maritime-darkest) 18%, transparent)'
                  } as CSSProperties
                }
              >
                <div
                  className='pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500'
                  style={{
                    background:
                      'radial-gradient(118% 92% at 12% 0%, var(--use-case-soft) 0%, transparent 56%), linear-gradient(135deg, color-mix(in oklab, var(--cloud-dancer) 18%, transparent) 0%, transparent 38%, color-mix(in oklab, var(--maritime-darkest) 10%, transparent) 100%)'
                  }}
                />
                <div
                  className='pointer-events-none absolute inset-x-0 top-0 h-px opacity-100'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--use-case-border), transparent)'
                  }}
                />
                <div
                  className='pointer-events-none absolute -inset-y-24 -left-[78%] w-2/3 rotate-12 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover/card:left-[112%] group-hover/card:opacity-100'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, color-mix(in oklab, var(--cloud-dancer) 36%, transparent), transparent)'
                  }}
                />
                <div
                  className='pointer-events-none absolute inset-0 opacity-55 mix-blend-soft-light'
                  style={{
                    background:
                      'linear-gradient(165deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 18%, transparent 42%)'
                  }}
                />
                <CardContent className='relative flex flex-col p-8'>
                  <div className='mb-4 flex items-center gap-4'>
                    <div
                      className='flex size-[3.25rem] items-center justify-center rounded-full border border-[var(--use-case-border)] bg-cloud-dancer shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_16px_34px_-24px_rgba(0,0,0,0.55)]'
                    >
                      <useCase.icon className={`size-6 ${useCase.iconColor}`} />
                    </div>
                    <div className='min-w-0'>
                      <h3 className='text-balance text-2xl font-semibold leading-tight text-[var(--use-case-text)]'>
                        {useCase.title}
                      </h3>
                    </div>
                  </div>
                  <div className='mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm'>
                    <p className='font-semibold tracking-wide text-[var(--use-case-text)]'>
                      {useCase.time}
                    </p>
                    <span className='h-1 w-1 rounded-full bg-[var(--use-case-muted)]' />
                    <p className='font-medium text-[var(--use-case-muted)]'>
                      {useCase.temperature}
                    </p>
                  </div>
                  <p className='text-base leading-[1.45] tracking-normal text-[var(--use-case-muted)]'>
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
