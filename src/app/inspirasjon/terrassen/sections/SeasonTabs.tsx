// Path: src/app/inspirasjon/terrassen/sections/SeasonTabs.tsx

'use client'

import { useState } from 'react'
import { GlassWater, Leaf, Snowflake, Sun } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    icon: Sun,
    iconColor: 'text-bleached-mauve',
    glowColor: 'var(--bleached-mauve)',
    activeBackground: 'var(--bleached-mauve)',
    activeText: 'var(--maritime-darkest)',
    title: 'Den første kaffen ute',
    description:
      'Det er noe magisk med den første dagen det er varmt nok til å sitte ute. Med Utekos kan den dagen komme uker tidligere.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: GlassWater,
    iconColor: 'text-ancient-water',
    glowColor: 'var(--ancient-water)',
    activeBackground: 'var(--ancient-water)',
    activeText: 'var(--maritime-darkest)',
    title: 'Når duggfallet kommer',
    description:
      'Ikke la den kjølige kveldsluften avslutte den gode samtalen. Forleng de lyse sommerkveldene til langt etter at solen har gått ned.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Leaf,
    iconColor: 'text-primary-button',
    glowColor: 'var(--primary-button)',
    activeBackground: 'var(--primary-button)',
    activeText: 'var(--maritime-darkest)',
    title: 'Høstkvelder med klar luft',
    description: 'Pakk deg inn i komfort og nyt den skarpe, klare høstluften med en kopp te og en god bok.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-overcast',
    glowColor: 'var(--overcast)',
    activeBackground: 'var(--overcast)',
    activeText: 'var(--maritime-darkest)',
    title: 'En kort pause i frisk luft',
    description:
      'Noen ganger trenger man bare fem minutter ute, selv om det er kaldt. Perfekt for en rask pause med gløgg eller kaffe på vinteren.'
  }
] as const

type SeasonValue = (typeof seasons)[number]['value']

export function SeasonsTabs() {
  const [activeTab, setActiveTab] = useState<SeasonValue>('summer')

  return (
    <Tabs
      defaultValue='summer'
      className='mx-auto max-w-4xl'
      onValueChange={value => setActiveTab(value as SeasonValue)}
    >
      <TabsList className='grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0 sm:grid-cols-4'>
        {seasons.map(season => {
          const Icon = season.icon
          const isActive = activeTab === season.value

          return (
            <TabsTrigger
              key={season.value}
              value={season.value}
              className='seasons-tab-trigger relative h-auto min-h-14 overflow-hidden rounded-full border border-cloud-dancer/14 bg-maritime-darkest/72 px-5 py-4 text-sm font-semibold leading-[1.35] tracking-tight font-utekos-text text-cloud-dancer transition-[background-color,border-color,color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-maritime-darkest data-[state=active]:border-transparent data-[state=active]:text-maritime-darkest data-[state=active]:shadow-[0_18px_42px_-30px_color-mix(in_oklch,var(--maritime-darkest)_88%,transparent)] focus-visible:ring-2 focus-visible:ring-primary-button/70 focus-visible:ring-offset-2 focus-visible:ring-offset-havdyp motion-reduce:transition-none motion-reduce:hover:translate-y-0'
              style={{
                backgroundColor: isActive ? season.activeBackground : undefined,
                color: isActive ? season.activeText : undefined
              }}
            >
              {isActive && (
                <div
                  className='seasons-active-glow'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 36%, ${season.glowColor} 100%)`
                  }}
                />
              )}

              <div className='relative flex items-center justify-center gap-2.5'>
                <Icon
                  className={`size-5 transition-colors motion-reduce:transition-none ${
                    isActive ? 'text-maritime-darkest' : season.iconColor
                  }`}
                  aria-hidden='true'
                />
                <span className='leading-[1.35]'>{season.label}</span>
              </div>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {seasons.map(season => {
        const Icon = season.icon

        return (
          <TabsContent key={season.value} value={season.value} className='mt-8'>
            <div className='seasons-tab-content-enter'>
              <Card className='relative overflow-hidden border-cloud-dancer/12 bg-maritime-darkest/78 shadow-[0_26px_72px_-52px_color-mix(in_oklch,var(--maritime-darkest)_95%,transparent)]'>
                <div
                  className='absolute -inset-x-2 -inset-y-16 opacity-20 blur-3xl'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 34%, ${season.glowColor} 100%)`
                  }}
                />

                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div
                      className='flex size-12 items-center justify-center rounded-full border border-cloud-dancer/18 bg-havdyp/58 transition-shadow duration-300 motion-reduce:transition-none'
                      style={{
                        boxShadow: `0 0 20px color-mix(in oklch, ${season.glowColor} 28%, transparent)`
                      }}
                    >
                      <Icon className={`size-6 ${season.iconColor}`} aria-hidden='true' />
                    </div>
                    <h3 className='text-2xl font-semibold leading-[1.1] tracking-tight font-utekos-text text-cloud-dancer'>
                      {season.title}
                    </h3>
                  </div>

                  <p className='text-lg leading-[1.45] tracking-tight font-utekos-text text-cloud-dancer/88'>
                    {season.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
