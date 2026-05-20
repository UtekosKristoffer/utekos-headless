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
    iconColor: 'text-pink-400',
    glowColor: 'var(--soft-warm)',
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
    title: 'Høstkvelder med klar luft',
    description:
      'Pakk deg inn i komfort og nyt den skarpe, klare høstluften med en kopp te og en god bok.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-sky-400',
    glowColor: 'var(--ancient-water)',
    title: 'En kort pause i frisk luft',
    description:
      'Noen ganger trenger man bare fem minutter ute, selv om det er kaldt. Perfekt for en rask pause med gløgg eller kaffe på vinteren.'
  }
]

export function SeasonsTabs() {
  const [activeTab, setActiveTab] = useState('summer')

  return (
    <Tabs
      defaultValue='summer'
      className='mx-auto max-w-4xl'
      onValueChange={setActiveTab}
    >
      <TabsList className='grid w-full grid-cols-4 gap-2 bg-transparent p-1'>
        {seasons.map(season => {
          const Icon = season.icon
          const isActive = activeTab === season.value

          return (
            <TabsTrigger
              key={season.value}
              value={season.value}
              className='seasons-tab-trigger relative overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest/58 transition-all duration-300 data-[state=active]:border-cloud-dancer/18 data-[state=active]:bg-maritime-darkest'
            >
              {isActive && (
                <div
                  className='seasons-active-glow'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />
              )}

              <div className='relative flex items-center justify-center gap-2 py-3'>
                <Icon
                  className={`h-5 w-5 transition-colors ${isActive ? season.iconColor : 'text-overcast'}`}
                />
                <span
                  className={`font-medium transition-colors ${isActive ? 'text-cloud-dancer' : 'text-overcast'}`}
                >
                  {season.label}
                </span>
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
              <Card className='relative overflow-hidden border-cloud-dancer/12 bg-maritime-darkest/58'>
                <div
                  className='absolute -inset-x-2 -inset-y-16 opacity-20 blur-3xl'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />

                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div
                      className='flex h-12 w-12 items-center justify-center rounded-lg border border-cloud-dancer/18 bg-maritime-darkest transition-shadow duration-300'
                      style={{
                        boxShadow: `0 0 20px ${season.glowColor}20`
                      }}
                    >
                      <Icon className={`h-6 w-6 ${season.iconColor}`} />
                    </div>
                    <h3 className='text-2xl font-semibold text-cloud-dancer'>
                      {season.title}
                    </h3>
                  </div>

                  <p className='text-lg leading-[1.45] tracking-normal text-overcast'>
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
