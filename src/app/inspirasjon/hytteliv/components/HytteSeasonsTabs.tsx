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
    iconColor: 'text-primary',
    glowColor: 'var(--primary)',
    title: 'Påskesol og vårfølelse',
    description:
      'Nyt de første solstrålene på terrassen med varme som varer. God på påskefjellet og den første helgen på sjøhytten.'
  },
  {
    value: 'summer',
    label: 'Sommer',
    icon: Flame,
    iconColor: 'text-dusted-peri',
    glowColor: 'var(--soft-warm)',
    title: 'Forleng sommerkveldene',
    description: 'Hold varmen når samtalen varer lenge. Utekos gir myk komfort på sene sommerkvelder.'
  },
  {
    value: 'autumn',
    label: 'Høst',
    icon: Leaf,
    iconColor: 'text-mountain-view',
    glowColor: 'var(--mountain-view)',
    title: 'Høstluft og varme pauser',
    description:
      'Ta med varmen ut når luften blir klar. God for en kopp te på trappa eller en rolig stund ved bålpannen.'
  },
  {
    value: 'winter',
    label: 'Vinter',
    icon: Snowflake,
    iconColor: 'text-ancient-water',
    glowColor: 'var(--ancient-water)',
    title: 'Vintervarme etter skituren',
    description: 'Få varme raskt etter skituren eller når du kommer fram til en kald hytte og fyrer i peisen.'
  }
]

export function HytteSeasonsTabs() {
  const [activeTab, setActiveTab] = useState('autumn')

  return (
    <Tabs defaultValue='autumn' className='mx-auto max-w-4xl' onValueChange={setActiveTab}>
      <TabsList className='grid h-auto w-full grid-cols-4 gap-2 rounded-xl border border-maritime-darkest/12 bg-cloud-dancer p-1 shadow-[0_18px_46px_-36px_rgba(14,18,35,0.55)]'>
        {seasons.map(season => {
          const Icon = season.icon
          const isActive = activeTab === season.value

          return (
            <TabsTrigger
              key={season.value}
              value={season.value}
              className='hytte-seasons-tab-trigger relative min-h-12 overflow-hidden rounded-lg border border-maritime-darkest/12 px-3 transition-all duration-300 data-[state=active]:border-havdyp/24'
              style={{
                background:
                  isActive ? 'var(--havdyp)' : (
                    'color-mix(in oklch, var(--cloud-dancer) 82%, var(--overcast))'
                  ),
                color: isActive ? 'var(--cloud-dancer)' : 'var(--maritime-darkest)'
              }}
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
                  className={`size-5 transition-colors ${isActive ? season.iconColor : 'text-maritime-darkest'}`}
                />
                <span
                  className={`leading-[1] font-medium tracking-[-0.01em] transition-colors ${isActive ? 'text-cloud-dancer' : 'text-maritime-darkest'}`}
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
              <Card
                className='relative overflow-hidden border-maritime-darkest/14 py-0 text-maritime-darkest shadow-[0_28px_72px_-46px_rgba(14,18,35,0.58)]'
                style={{
                  backgroundColor: 'var(--cloud-dancer)',
                  backgroundImage:
                    'linear-gradient(135deg, var(--cloud-dancer) 0%, color-mix(in oklch, var(--ancient-water) 62%, var(--cloud-dancer)) 100%)'
                }}
              >
                <div
                  className='absolute -inset-x-2 -inset-y-16 opacity-18 blur-3xl'
                  style={{
                    background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                  }}
                />

                <CardContent className='relative p-8'>
                  <div className='mb-6 flex items-center gap-4'>
                    <div
                      className='flex size-12 items-center justify-center rounded-lg border border-maritime-darkest/14 bg-cloud-dancer transition-shadow duration-300'
                      style={{
                        boxShadow: `0 0 20px ${season.glowColor}20`
                      }}
                    >
                      <Icon className={`size-6 ${season.iconColor}`} />
                    </div>
                    <h3 className='text-2xl leading-[1] font-semibold tracking-[-0.01em] text-maritime-darkest'>
                      {season.title}
                    </h3>
                  </div>
                  <p className='text-lg leading-[1.45] tracking-[-0.01em] text-havdyp'>
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
