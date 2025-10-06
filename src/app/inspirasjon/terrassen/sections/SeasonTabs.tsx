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
    glowColor: '#f472b6',
    title: 'Den første kaffen ute',
    description:
      'Det er noe magisk med den første dagen det er varmt nok til å sitte ute. Med Utekos kan den dagen komme uker tidligere.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: GlassWater,
    iconColor: 'text-cyan-400',
    glowColor: '#22d3ee',
    title: 'Når duggfallet kommer',
    description:
      'Ikke la den kjølige kveldsluften avslutte den gode samtalen. Forleng de lyse sommerkveldene til langt etter at solen har gått ned.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Leaf,
    iconColor: 'text-amber-500',
    glowColor: '#f59e0b',
    title: 'Høstkvelder med klar luft',
    description:
      'Pakk deg inn i komfort og nyt den skarpe, klare høstluften med en kopp te og en god bok.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-sky-400',
    glowColor: '#38bdf8',
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
              className='seasons-tab-trigger relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
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
                  className={`h-5 w-5 transition-colors ${isActive ? season.iconColor : 'text-muted-foreground'}`}
                />
                <span
                  className={`font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
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
              <Card className='relative overflow-hidden border-neutral-800 bg-neutral-900/50'>
                <div
                  className='absolute -inset-x-2 -inset-y-16 opacity-20 blur-3xl'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />

                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div
                      className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-shadow duration-300'
                      style={{
                        boxShadow: `0 0 20px ${season.glowColor}20`
                      }}
                    >
                      <Icon className={`h-6 w-6 ${season.iconColor}`} />
                    </div>
                    <h3 className='text-2xl font-semibold text-foreground'>
                      {season.title}
                    </h3>
                  </div>

                  <p className='text-lg leading-relaxed text-muted-foreground'>
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
