// HytteSeasonsTabs.tsx (Client Component - separat fil)
'use client'

import { useState } from 'react'
import { Flame, Leaf, Snowflake, Sun } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    icon: Sun,
    iconColor: 'text-yellow-400',
    glowColor: '#facc15',
    title: 'Påskesol og Vårfornemmelser',
    description:
      'Nyt de første varme solstrålene på terrassen uten å la den kjølige luften stoppe deg. Perfekt for påskefjellet eller den første helgen på sjøhytten.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: Flame,
    iconColor: 'text-orange-500',
    glowColor: '#f97316',
    title: 'Forleng sommerkveldene',
    description:
      'Ikke la gåsehud avslutte den gode samtalen. Utekos er hemmeligheten bak de uforglemmelige sommerkveldene som varer til langt på natt.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Leaf,
    iconColor: 'text-green-500',
    glowColor: '#22c55e',
    title: 'Høstkos i høyoppløsning',
    description:
      'Opplev høstens farger og den skarpe, klare luften i total komfort. Perfekt for en kopp te på trappa eller rundt bålpannen.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-blue-400',
    glowColor: '#60a5fa',
    title: 'Vintermagi og peiskos',
    description:
      'Den ultimate følelsen etter en lang skitur. Eller når du ankommer en kald hytte og trenger øyeblikkelig varme mens peisen knitrer i gang.'
  }
]

export function HytteSeasonsTabs() {
  const [activeTab, setActiveTab] = useState('autumn')

  return (
    <Tabs
      defaultValue='autumn'
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
              className='hytte-seasons-tab-trigger relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
            >
              {isActive && (
                <div
                  className='hytte-seasons-active-glow'
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
            <div className='hytte-seasons-tab-content-enter'>
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
