'use client'

import { useState } from 'react'
import { Sun, Mountain, Sunrise, Wind, Check } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    icon: Sunrise,
    iconColor: 'text-green-500',
    glowColor: '#22c55e',
    title: 'Vårcamping med Utekos',
    intro:
      'Våren byr på fantastiske muligheter for bobilisten, men temperaturene kan være uforutsigbare.',
    tips: [
      'Start dagen tidlig med Utekos og kaffe for å se naturen våkne',
      'Perfekt for påskecamping i fjellet når kveldene fortsatt er kjølige',
      'Nyt de første varme solstrålene uten å fryse i skyggen'
    ]
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: Sun,
    iconColor: 'text-yellow-500',
    glowColor: '#eab308',
    title: 'Sommerkvelder med stil',
    intro:
      'Selv om sommeren er varm, blir kveldene ofte overraskende kjølige, spesielt ved kysten.',
    tips: [
      'Forleng de lyse kveldene utendørs uten å pakke inn i tepper',
      'Ideell ved kysten hvor vinden kan gjøre kveldene kjølige',
      'Perfekt for sosiale samlinger på campingplassen'
    ]
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Mountain,
    iconColor: 'text-orange-500',
    glowColor: '#f97316',
    title: 'Høstens fargeprakt i komfort',
    intro:
      'Høsten er mange bobilisters favoritt-sesong, og med Utekos kan du nyte den fullt ut.',
    tips: [
      'Opplev de spektakulære høstfargene fra tidlig morgen til sen kveld',
      'Hold varmen under nordlys-jakt på kjølige høstkvelder',
      'Nyt bålkosen uten å måtte sitte for nær flammene'
    ]
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Wind,
    iconColor: 'text-blue-400',
    glowColor: '#60a5fa',
    title: 'Vintercamping for de modige',
    intro:
      'For de som bruker bobilen året rundt, er Utekos den ultimate følgesvennen.',
    tips: [
      'Essensielt tilbehør for skiferier med bobil',
      'Hold varmen mens du venter på at bobilen varmes opp',
      'Perfekt for julecamping og nyttårsfeiring på fjellet'
    ]
  }
]

export function BobilSeasonsTabs() {
  const [activeTab, setActiveTab] = useState('spring')

  return (
    <Tabs
      defaultValue='spring'
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
              className='bobil-seasons-tab-trigger relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
            >
              {isActive && (
                <div
                  className='bobil-seasons-active-glow'
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
            <div className='bobil-seasons-tab-content-enter'>
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

                  <p className='mb-6 text-lg text-muted-foreground'>
                    {season.intro}
                  </p>

                  <ul className='space-y-3'>
                    {season.tips.map((tip, index) => (
                      <li
                        key={index}
                        className='bobil-seasons-tip-enter flex items-start gap-3'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-background mt-0.5'>
                          <Check className={`h-4 w-4 ${season.iconColor}`} />
                        </div>
                        <span className='text-muted-foreground leading-relaxed'>
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
