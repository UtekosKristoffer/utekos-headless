// Path: src/app/inspirasjon/isbading/sections/IceBathingSeasonsTabs.tsx
'use client'

import { useState } from 'react'
import { CloudRain, Snowflake, Sun, Wind } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

const seasons = [
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-cyan-400',
    glowColor: '#22d3ee',
    title: 'Høysesong for endorfiner',
    description:
      'Når isen legger seg og vannet er på sitt kaldeste. Dette er tiden for de mest intense opplevelsene, hvor Utekos er skillet mellom smertefull kulde og komfortabel mestring.'
  },
  {
    value: 'spring',
    label: 'Vår',
    icon: Sun,
    iconColor: 'text-yellow-400',
    glowColor: '#facc15',
    title: 'Vårløsning og smeltevann',
    description:
      'Dagene blir lengre, men vannet er fortsatt iskaldt. Nyt kontrasten mellom den varmende vårsolen i ansiktet og det kjølige vannet, trygt pakket inn i din Utekos.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: CloudRain,
    iconColor: 'text-blue-500',
    glowColor: '#3b82f6',
    title: 'Morgenbad og sommerregn',
    description:
      'For de dagene hvor norsk sommer viser seg fra sin kjølige side. Perfekt etter et morgenbad før solen har stått opp, eller som varme etter en svømmetur i regnet.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Wind,
    iconColor: 'text-slate-400',
    glowColor: '#94a3b8',
    title: 'Tilvenningsfasen',
    description:
      'Luften blir skarpere og vannet kjøles ned. Høsten er den perfekte tiden å bygge toleranse på. Utekos gjør det enkelt å forlenge sesongen inn i mørketiden.'
  }
]

export function SeasonsSection() {
  const [activeTab, setActiveTab] = useState('winter')

  return (
    <Tabs
      defaultValue='winter'
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
              className='relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
            >
              {isActive && (
                <div
                  className='absolute inset-0 opacity-20'
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
                  className={`hidden font-medium sm:inline ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
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
            <div className='animate-in fade-in zoom-in-95 duration-300'>
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
