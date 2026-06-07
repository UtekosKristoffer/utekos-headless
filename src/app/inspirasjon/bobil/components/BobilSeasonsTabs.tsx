'use client'

import { useState } from 'react'
import { Sun, Mountain, Sunrise, Wind, Check } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import UtekosWordmark from '@/components/BrandComponents/utils/UtekosWordmark'

const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    icon: Sunrise,
    iconColor: 'text-mountain-view',
    glowColor: 'var(--mountain-view)',
    title: 'Vårcamping',
    hasBrandTitle: false,
    intro: 'Våren byr på fantastiske muligheter for bobilisten, men temperaturene kan være uforutsigbare.',
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
    iconColor: 'text-primary',
    glowColor: 'var(--primary)',
    title: 'Sommerkvelder',
    intro: 'Selv om sommeren er varm, blir kveldene ofte overraskende kjølige, spesielt ved kysten.',
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
    iconColor: 'text-bleached-mauve',
    glowColor: 'var(--bleached-mauve)',
    title: 'Høstens fargeprakt',
    intro: 'Høsten er mange bobilisters favoritt-sesong, og med Utekos kan du nyte den fullt ut.',
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
    iconColor: 'text-ancient-water',
    glowColor: 'var(--ancient-water)',
    title: 'Vintercamping',
    intro: 'For de som bruker bobilen året rundt, er Utekos den ultimate følgesvennen.',
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
      className='mx-auto w-full max-w-5xl flex-col gap-6'
      onValueChange={setActiveTab}
    >
      <TabsList className='grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0 sm:grid-cols-4'>
        {seasons.map(season => {
          const Icon = season.icon
          const isActive = activeTab === season.value

          return (
            <TabsTrigger
              key={season.value}
              value={season.value}
              className='bobil-seasons-tab-trigger relative h-auto min-h-20 overflow-hidden rounded-xl border border-cloud-dancer/12 bg-background/58 px-3 py-3 transition-all duration-300 hover:border-cloud-dancer/28 hover:bg-background/72 data-active:border-cloud-dancer/24 data-active:bg-(--primary) data-active:text-background'
            >
              {isActive && (
                <div
                  className='bobil-seasons-active-glow'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />
              )}

              <div className='relative flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:gap-2'>
                <Icon
                  className={`size-5 transition-colors ${isActive ? 'text-background' : 'text-foreground/90'}`}
                />
                <span
                  className={`font-google-sans font-bold tracking-[-0.01em] transition-colors ${isActive ? 'text-background' : 'text-foreground/90'}`}
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
          <TabsContent key={season.value} value={season.value} className='mt-0 min-w-0 w-full'>
            <div className='bobil-seasons-tab-content-enter'>
              <Card className='relative overflow-hidden rounded-2xl border-cloud-dancer/12 bg-background/58 py-0'>
                <div
                  className='absolute -inset-x-2 -inset-y-16 opacity-20 blur-3xl'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />

                <CardContent className='relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12 lg:p-10'>
                  <div>
                    <div className='mb-5 flex items-center gap-4'>
                      <div
                        className='flex size-12 shrink-0 items-center justify-center rounded-xl border border-cloud-dancer/18 bg-background transition-shadow duration-300'
                        style={{
                          boxShadow: `0 0 20px ${season.glowColor}20`
                        }}
                      >
                        <Icon className={`size-6 ${season.iconColor}`} />
                      </div>
                      <h3 className='font-google-sans text-2xl font-bold leading-none tracking-[-0.01em] text-foreground sm:text-3xl'>
                        {season.hasBrandTitle ?
                          <span className='inline-flex flex-wrap items-baseline gap-x-2'>
                            <span>{season.title}</span>
                            <UtekosWordmark className='h-[0.74em] w-auto translate-y-[0.05em]' />
                          </span>
                        : season.title}
                      </h3>
                    </div>
                    <p className='text-lg leading-[1.5] text-foreground/90'>{season.intro}</p>
                  </div>

                  <ul className='grid gap-3'>
                    {season.tips.map((tip, index) => (
                      <li
                        key={index}
                        className='bobil-seasons-tip-enter flex items-start gap-3 rounded-xl border border-cloud-dancer/10 bg-background/36 p-4'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className='mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-cloud-dancer/18 bg-background'>
                          <Check className={`size-4 ${season.iconColor}`} />
                        </div>
                        <span className='leading-[1.5] text-foreground/90'>{tip}</span>
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
