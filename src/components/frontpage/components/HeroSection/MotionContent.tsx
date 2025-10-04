import { motion } from 'framer-motion'
import { Award, ChevronDown } from 'lucide-react'
export function MotionContent() {
  return (
    <div className='mb-8 text-center'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='mb-6 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
      >
        <Award className='h-4 w-4 text-sky-800' />
        <span className='text-sm font-medium text-sky-800'>
          Holder deg varm - siden 2020
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl mt-6'
      >
        <span className='block'>Utekos™</span>
        <span className='block mt-2 bg-gradient-to-r from-sky-800 via-cyan-700 to-sky-800 bg-clip-text text-transparent'>
          Forleng de gode stundene ute.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className='mx-auto mt-6 mb-12 max-w-2xl md:max-w-4xl text-lg lg:text-2xl text-foreground/80 leading-relaxed'
      >
        Kompromissløs komfort, designet for å holde på varmen når øyeblikkene
        teller.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className='hidden md:flex justify-center mb-8'
      >
        <button
          onClick={() => {
            const section = document.getElementById('featured-product')
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className='group cursor-pointer'
          aria-label='Scroll til produkter'
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className='flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground'
          >
            <span className='text-xs uppercase tracking-wider'>Se mer</span>
            <ChevronDown className='h-5 w-5' />
          </motion.div>
        </button>
      </motion.div>
    </div>
  )
}
