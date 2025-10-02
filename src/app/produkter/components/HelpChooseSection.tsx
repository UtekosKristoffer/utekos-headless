'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { choices } from './choices'
export function HelpChooseSection() {
  return (
    <section className='mb-24 w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
        {choices.map((choice, index) => (
          <motion.div
            key={choice.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link href={choice.href} className='group block h-full'>
              <Card className='flex flex-col h-full border-neutral-800 bg-sidebar-foreground transition-all hover:border-neutral-700'>
                <AspectRatio
                  ratio={2 / 3}
                  className='w-full overflow-hidden rounded-t-lg'
                >
                  <Image
                    src={choice.imageUrl}
                    alt={choice.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-105 rounded-t-lg'
                  />
                </AspectRatio>
                <CardContent className='p-6 flex-grow flex flex-col'>
                  <h3 className='text-lg font-semibold'>{choice.title}</h3>
                  <p className='mt-2 text-sm text-muted-foreground flex-grow'>
                    {choice.description}
                  </p>

                  <div
                    className={`flex items-center gap-1 mt-4 font-semibold text-sm ${choice.linkColor}`}
                  >
                    Se produkt
                    <ArrowRightIcon className='h-3 w-3 transition-transform group-hover:translate-x-1' />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
