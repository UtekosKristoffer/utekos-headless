'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Leaf, Snowflake, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

export function SeasonsSection() {
  const [activeTab, setActiveTab] = useState('autumn')

  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Ambient background glow */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/4 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/4 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
            Hytteglede i alle sesonger
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Utekos følger deg gjennom årets fire årstider
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
                    className='relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition-all duration-300 data-[state=active]:border-neutral-700 data-[state=active]:bg-neutral-900'
                  >
                    {/* Aurora glow on active */}
                    {isActive && (
                      <motion.div
                        layoutId='activeTab'
                        className='absolute -inset-x-2 -inset-y-8 opacity-25 blur-2xl'
                        style={{
                          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className='relative flex items-center justify-center gap-2 py-3'>
                      <Icon
                        className={`h-5 w-5 ${isActive ? season.iconColor : 'text-muted-foreground'} transition-colors`}
                      />
                      <span
                        className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'} transition-colors`}
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
                <TabsContent
                  key={season.value}
                  value={season.value}
                  className='mt-8'
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className='relative overflow-hidden border-neutral-800 bg-neutral-900/50'>
                      {/* Aurora effect */}
                      <div
                        className='absolute -inset-x-2 -inset-y-16 opacity-20 blur-3xl'
                        style={{
                          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${season.glowColor} 100%)`
                        }}
                      />

                      <CardContent className='relative p-8'>
                        <div className='mb-6 flex items-center gap-4'>
                          <div
                            className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background'
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
                  </motion.div>
                </TabsContent>
              )
            })}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
