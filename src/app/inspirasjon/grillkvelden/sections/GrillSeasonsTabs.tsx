// GrillSeasonsTabs.tsx (Client Component - separat fil)
'use client'

import { useState } from 'react'
import { Flame, Leaf, Snowflake, Sun } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'spring',
    label: 'Vårgrilling',
    icon: Sun,
    iconColor: 'text-yellow-400',
    glowColor: '#facc15',
    title: 'Sesongstarten',
    description:
      'Vær den første i nabolaget til å dra frem grillen. Med Utekos er ikke en kjølig vårkveld noen hindring for en vellykket premiere.'
  },
  {
    value: 'summer',
    label: 'Sommerfest',
    icon: Flame,
    iconColor: 'text-orange-500',
    glowColor: '#f97316',
    title: 'De lange sommerkveldene',
    description:
      'Selv på sommeren blir det kaldt når solen går ned. Hold festen i gang og la gjestene bli sittende i komfort til langt på natt.'
  },
  {
    value: 'autumn',
    label: 'Høstglød',
    icon: Leaf,
    iconColor: 'text-green-500',
    glowColor: '#22c55e',
    title: 'Høstens farger og smaker',
    description:
      'Høsten er perfekt for grilling med rike smaker. Nyt den skarpe, klare luften rundt grillen med venner, uten å tenke på temperaturen.'
  },
  {
    value: 'winter',
    label: 'Vintergrill',
    icon: Snowflake,
    iconColor: 'text-blue-400',
    glowColor: '#60a5fa',
    title: 'For de tøffeste grill entusiastene',
    description:
      'Vintergrilling er en unik opplevelse. Utekos er essensielt for å holde grillmesteren (og gjestene) varme mellom slagene.'
  }
]

export function GrillSeasonsTabs() {
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
              className='grill-seasons-tab-trigger relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
            >
              {isActive && (
                <div
                  className='grill-seasons-active-glow'
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
                  className={`font-medium text-sm transition-colors ${isActive ? 'text-primary-foreground' : 'text-primary-foreground'}`}
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
            <div className='grill-seasons-tab-content-enter'>
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
