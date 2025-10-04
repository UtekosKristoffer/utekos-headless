import heroImage from '@public/frontpage-kate-linn.webp'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className='group relative mb-8 rounded-2xl md:max-w-7xl border mx-auto border-neutral-800 shadow-2xl overflow-hidden'
    >
      {/* Subtle gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none' />

      {/* Ambient glow around image */}
      <div
        className='absolute -inset-1 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-40'
        style={{
          background:
            'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)'
        }}
      />

      <div className='relative'>
        <Image
          src={heroImage}
          alt='To personer i Utekos-plagg sitter på en stein i skogen og deler et hyggelig øyeblikk, fullt påkledd for varme og komfort.'
          width={2048}
          height={1363}
          className='rounded-xl mx-auto w-full h-[60vh] xl:h-[80vh] object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.02]'
          priority
          fetchPriority='high'
        />
      </div>

      {/* Bottom gradient bar */}
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500' />
    </motion.div>
  )
}
