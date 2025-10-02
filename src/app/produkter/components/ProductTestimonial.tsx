'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
export function ProductTestimonial() {
  return (
    <section className='mb-24 max-w-3xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Card className='border-neutral-800 bg-sidebar-foreground'>
          <CardContent className='p-12 text-center'>
            <blockquote className='text-xl italic text-foreground/90'>
              &quot;Utekos har totalt forandret hvordan vi bruker hytten om
              høsten. Kvaliteten er helt fantastisk. Anbefales på det
              varmeste!&quot;
            </blockquote>
            <p className='mt-6 font-semibold'>- Anne, Hytteeier</p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
