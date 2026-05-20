// BoatSeasonsTabs.tsx (Client Component - separat fil)
'use client'

import { useState } from 'react'
import { Anchor, Fish, LifeBuoy, Sun } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'spring',
    label: 'Vår',
    icon: LifeBuoy,
    iconColor: 'text-ancient-water',
    glowColor: 'var(--ancient-water)',
    title: 'Komfort under vårpussen',
    description:
      'Vårpussen kan være en kald fornøyelse. Hold varmen mens du gjør båten klar for sesongens eventyr, selv på kjølige aprildager.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: Sun,
    iconColor: 'text-primary-button',
    glowColor: 'var(--primary-button)',
    title: 'Når solen har gått ned',
    description:
      'Ikke la gåsehuden jage deg under dekk. Forleng de magiske sommerkveldene i cockpiten eller på flybridgen.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Fish,
    iconColor: 'text-dusted-peri',
    glowColor: 'var(--soft-warm)',
    title: 'Høstfiske i komfort',
    description:
      'Høsten byr på fantastisk lys og gode fiskemuligheter. Nyt den skarpe, klare luften uten å fryse mens du venter på napp.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Anchor,
    iconColor: 'text-slate-400',
    glowColor: 'var(--overcast)',
    title: 'Tilsyn i Vinteropplag',
    description:
      'Selv om båten ligger på land, krever den tilsyn. Gjør de kalde turene til havna for å sjekke presenning og motor langt mer behagelige.'
  }
]

export function BoatSeasonsTabs() {
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
              className='boat-seasons-tab-trigger relative overflow-hidden rounded-lg border border-cloud-dancer/12 bg-maritime-darkest/58 transition-all duration-300 data-[state=active]:border-cloud-dancer/18 data-[state=active]:bg-maritime-darkest'
            >
              {isActive && (
                <div
                  className='boat-seasons-active-glow'
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
                  className={`font-medium text-sm transition-colors ${isActive ? 'text-cloud-dancer' : 'text-overcast'}`}
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
            <div className='boat-seasons-tab-content-enter'>
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
