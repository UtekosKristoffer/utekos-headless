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
    title: 'Vårcamping med',
    hasBrandTitle: true,
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
    title: 'Sommerkvelder med stil',
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
    title: 'Høstens fargeprakt i komfort',
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
    title: 'Vintercamping for de modige',
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
    <Tabs defaultValue='spring' className='mx-auto max-w-4xl' onValueChange={setActiveTab}>
      <TabsList className='grid w-full grid-cols-4 gap-2 bg-transparent p-1'>
        {seasons.map(season => {
          const Icon = season.icon
          const isActive = activeTab === season.value

          return (
            <TabsTrigger
              key={season.value}
              value={season.value}
              className='bobil-seasons-tab-trigger relative overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest/58 transition-all duration-300 data-[state=active]:border-cloud-dancer/18 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-maritime-darkest'
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
                  className={`size-5 transition-colors ${isActive ? 'text-maritime-darkest' : 'text-cloud-dancer/90'}`}
                />
                <span
                  className={`font-google-sans font-bold tracking-[-0.01em] transition-colors ${isActive ? 'text-maritime-darkest' : 'text-cloud-dancer/90'}`}
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
                      className='flex size-12 items-center justify-center rounded-lg border border-cloud-dancer/18 bg-maritime-darkest transition-shadow duration-300'
                      style={{
                        boxShadow: `0 0 20px ${season.glowColor}20`
                      }}
                    >
                      <Icon className={`size-6 ${season.iconColor}`} />
                    </div>
                    <h3 className='font-google-sans text-2xl font-bold leading-[0.95] tracking-[-0.01em] text-cloud-dancer'>
                      {season.hasBrandTitle ?
                        <span className='inline-flex flex-wrap items-baseline gap-x-2'>
                          <span>{season.title}</span>
                          <UtekosWordmark className='h-[0.74em] w-auto translate-y-[0.05em]' />
                        </span>
                      : season.title}
                    </h3>
                  </div>

                  <p className='  mb-6 text-lg leading-[1.5]   text-cloud-dancer/90'>{season.intro}</p>

                  <ul className='space-y-3'>
                    {season.tips.map((tip, index) => (
                      <li
                        key={index}
                        className='bobil-seasons-tip-enter flex items-start gap-3'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className='mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full border border-cloud-dancer/18 bg-maritime-darkest'>
                          <Check className={`size-4 ${season.iconColor}`} />
                        </div>
                        <span className='  leading-[1.5]   text-cloud-dancer/90'>{tip}</span>
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
